import { root, router } from "../../main";
import Cookies from "js-cookie";
import debounce from "lodash.debounce";

let query;
let inputPlace;

export const home = async function (country) {
  if (country.params === null || !country) {
    query = `https://countryapi.io/api/all`;
    inputPlace = "";
  } else {
    query = `https://countryapi.io/api/name/${country}`;
    inputPlace = country;
  }
  if (!Cookies.get("token")) {
    router.navigate("/login");
    return;
  }

  const request = await fetch(query, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });

  const data = await request.json();
  const countries = Object.values(data);
  console.log(countries);

  const homePage = `
  <div>
    <h1 class="flex justify-around text-5xl mt-12 mx-auto text-white font-bold">
      Country List
    </h1>
  </div>
  <div class="container flex justify-around my-12 mx-auto items-center max-w-7xl">
    <div>
      <a href="/login" class="bg-white h-4 rounded-2xl px-10 py-2" onclick="logout()" data-navigo>Log Out</a>
    </div>
    <div class="flex flex-col items-center justify-center">
      <input
        id="searchInput"
        class="rounded-xl h-10 outline-none w-64 pl-2 bg-[#D9D9D9]"
        type="text"
        placeholder="Search"
        value="${inputPlace}"
      />
    </div>
    <div>
      <a href="#" class="bg-white h-4 rounded-2xl px-10 py-2">About Us</a>
    </div>
  </div>

<div id="cards" class="grid grid-cols-4 gap-12 mx-auto mt-20 mb-12 max-w-6xl">
  ${countries
    .map((item) => {
      return `
  <div class="bg-[#D9D9D9] rounded-2xl overflow-hidden flex justify-center flex-col items-center">
    <div>
      <img src="${item.flag.large}" class=" object-cover w-52" />
    </div>
    <div class="font-extrabold text-lg py-4 text-center">${item.name}</div>
    <div class="mb-4 bg-[#1400FF] rounded-2xl text-white px-8 py-2 cursor-pointer hover:bg-[#040c45] transition">
      <a data-navigo href="/single?name=${item.name}">Show Details</a>
    </div>
  </div>
    `;
    })
    .join("")}
</div>`;

  root.innerHTML = homePage;
  root
    .querySelector("#searchInput")
    .addEventListener("input", debounce(handleSearch, 500));
};

function handleSearch(event) {
  let country = event.target.value.trim();
  home(country);
}
window.logout = function () {
  Cookies.remove("token");
};
