function getTheme() {
  return localStorage.getItem("theme") || "dark";
}

function setTheme(theme) {
  console.log("The theme for jeroenpeeters.be has been set to " + theme);
  document.getElementsByTagName("html")[0].setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

function changeTheme() {
  setTheme(getTheme() === "light" ? "dark" : "light");
  document.getElementsByClassName("theme-switcher_gutter")[0].src = "/assets/svg/" + getTheme() + ".svg";
}

class ThemeSwitcher extends HTMLElement {
  constructor() {
    super();
    
    this.currentTheme = getTheme();
    setTheme(this.currentTheme);
  }
  
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <img class="theme-switcher_gutter" src="/assets/svg/${this.currentTheme}.svg" />
    <input type="checkbox" id="theme-switcher" name="switch" role="switch" ${this.currentTheme === "dark" ? "checked" : ""} onclick="${changeTheme.name}()" />
    `;
  }
}

customElements.define("theme-switcher", ThemeSwitcher);
