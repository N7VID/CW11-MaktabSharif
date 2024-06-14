import Navigo from "navigo";
import { home } from "./src/pages/home";
import "./style.css";
import { single } from "./src/pages/single";
import { login } from "./src/pages/login";
export const root = document.getElementById("app");
const cardsDiv = document.getElementById("cards");

export const router = new Navigo("/");
export const password = "Admin123";
export const email = "admin@gmail.com";

router.on("/", home).on("/single", single).on("/login", login).resolve();
