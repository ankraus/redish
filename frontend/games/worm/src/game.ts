const test = "test2";
const name = "redish-game-worm";

class Worm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    this.shadowRoot.innerHTML = `
          <div id="game">
              <h1>Game worm</h1>
              <div>
                  Message: ${test}
              </div>
              <div>
                  <input type="text" placeholder="und">
              </div>
              <div>
                  <input type="text" placeholder="ab">
              </div>
              <div>
                  <button id="search">Play</button>
              </div>
          </div>
      `;
  }
}

export { name, test, Worm };
