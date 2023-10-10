import { Worm, name } from "./game";

function component() {
  const element = document.createElement("div");
  element.innerHTML = "Hello redish worm";
  return element;
}

document.body.appendChild(component());

customElements.define(name, Worm);

function componentWorm() {
  const element = document.createElement(name);
  return element;
}

document.body.appendChild(componentWorm());
