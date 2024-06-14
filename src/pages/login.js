import { root, router } from "../../main";
import Cookies from "js-cookie";

export const login = function () {
  root.innerHTML = `
  <div class="container mx-auto my-20 bg-[#D9D9D9] rounded-[30px] p-16 max-w-80">
  <h1 class="font-semibold text-center mb-10 text-2xl">LOGIN</h1>
  <form action="">
    <label for="email">Email:</label>
    <input type="email" value="" placeholder="Email" id="email" class="my-4 rounded-md pl-4 outline-none py-2"/>
    <label for="password">Password:</label>
    <input type="password" value="" placeholder="Password" id="password" class="my-4 rounded-md pl-4 outline-none py-2"/>
    <button type="button" onclick="handleLogin()" class="bg-[#1400FF] rounded-lg text-white ml-14 py-2 px-6 mt-8">
      LogIn
    </button>
  </form>
</div>
`;
};
window.handleLogin = function () {
  Cookies.set("token", "zP6URL7bbChrTTa1tWfAM7WlwUbjs2y85cACoeMF");
  router.navigate("/");
};
