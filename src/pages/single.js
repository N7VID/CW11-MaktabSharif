import { root, router } from "../../main";
import Cookies from "js-cookie";

export const single = async function (match) {
  if (!Cookies.get("token")) {
    router.navigate("/login");
    return;
  }
  const response = await fetch(
    `https://countryapi.io/api/name/${match.params.name}`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  );
  const data = await response.json();
  const country = Object.values(data)[0];
  root.innerHTML = `
  <div class="container flex justify-between items-center my-10 mx-auto max-w-6xl">
  <div>
    <a href="/" class="bg-white h-4 rounded-2xl px-10 py-2" data-navigo>Back Home</a>
  </div>
  <div>
    <h1 class=" text-5xl text-white font-light">
      ${match.params.name}
    </h1>
  </div>
  <div>
    <a href="#" class="bg-white h-4 rounded-2xl px-10 py-2">Mark as Read</a>
  </div>
</div>

<div class="container flex flex-col justify-center items-center bg-[#D9D9D9] max-w-3xl mx-auto mt-16 rounded-[30px]">
  <div class="my-8 w-48"><img src="${country.flag.large}" alt=""/></div>
  <div class="container grid grid-cols-2 p-8 gap-x-4 gap-y-2">
    <div class="bg-white rounded-2xl px-5 py-2 text-center font-semibold text-xl">Capital</div>
    <div class="bg-white rounded-2xl px-5 py-2 text-center text-xl">${
      country.capital
    }</div>
    <div class="bg-white rounded-2xl px-5 py-2 text-center font-semibold text-xl">Continent</div>
    <div class="bg-white rounded-2xl px-5 py-2 text-center text-xl">${
      country.region
    }</div>
    <div class="bg-white rounded-2xl px-5 py-2 text-center font-semibold text-xl">Population</div>
    <div class="bg-white rounded-2xl px-5 py-2 text-center text-xl">${
      country.population
    }</div>
    <div class="bg-white rounded-2xl px-5 py-2 text-center font-semibold text-xl">Language</div>
    <div class="bg-white rounded-2xl px-5 py-2 text-center text-xl">${Object.values(
      country.languages
    )}</div>
    <div class="bg-white rounded-2xl px-5 py-2 text-center font-semibold text-xl">Time Zone</div>
    <div class="bg-white rounded-2xl px-5 py-2 text-center text-xl">${
      country.timezones
    }</div>
  </div>
</div>

  `;
};
