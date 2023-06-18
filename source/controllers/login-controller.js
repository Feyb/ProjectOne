import { authService } from '../services/login/auth-service.js';
const btnLogin = document.querySelector("#login");

btnLogin.addEventListener("click", async () => {
  await authService.login("fabio", "123456");
});
