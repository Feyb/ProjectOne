import { authService } from '../services/auth-service.js';

export default class LoginController {
  containerId = "menu-container";
  templateId = "menu-template";
  loginId = "login";
  logoutId = "logout";


  constructor() {
    this.templateElement = document.querySelector(`#${this.templateId}`);
    this.menuContinerElement = document.querySelector(`#${this.containerId}`);
    this.btnLogin = document.querySelector(`#${this.loginId}`);
    this.btnLogout = document.querySelector(`#${this.logoutId}`);
  }

  async renderMenu() {
    const loggedIn = authService.isLoggedIn();
    const source = this.templateElement.innerHTML;
    const template = Handlebars.compile(source);
    this.menuContinerElement.innerHTML = template({ loggedIn });
  }

  addEventListeners() {
    document.addEventListener("click", async event => {
      if (event.target.dataset.action === 'login') {
        await authService.login("fabio@feyb.ch", "123456");
        location.reload();
      }
      if (event.target.dataset.action === 'logout') {
        await authService.logout();
        await this.renderMenu();
      }
    });
  }
}
