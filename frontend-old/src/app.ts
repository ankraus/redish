import "./style.scss";

function component() {
  import("worm/game").then((worm) => {
    const headline = document.createElement("h1");
    headline.innerHTML = "Hello redish " + worm.test;
    document.body.appendChild(headline);

    const gameWorm = document.createElement(worm.name);
    document.body.appendChild(gameWorm);
  });
}

const h = document.createElement("h1");
h.innerHTML = "hello";
document.body.appendChild(h);

setTimeout(() => component(),2000);
