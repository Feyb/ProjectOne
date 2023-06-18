import { CryptoUtil } from '../utils/crypto-util.js';

export class User {
  constructor(email, passwort) {
    this.email = email;
    this.passwortHash = CryptoUtil.hashPwd(passwort);
  }
}
