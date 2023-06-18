TODO:

- express : server mit express, js
  - controller - get data from store (controller)
  - services - handle data from db (model)
  - routes - calls controllers depending on the url (view?)
  - db (storage)
- webapp : frontend mit html, css, js, handlebars
  - services - api calls (model)
  - controller - rendering, eventListeners (controller)
  - utils - for additional "common" stuff
  - hbs views in html or in extra file (view)
  - index.html start page where everything gets included

Folgende Befehle sind möglich

| Befehl            | Beschreibung                                  |
| ----------------- | --------------------------------------------- |
| npm run stylelint | Testet ob die CSS Files in Ordnung sind.      |
| npm run w3c       | Testet ob die HTML Files in Ordnung sind.     |
| npm run eslint    | Testet ob die JS Files in Ordnung sind.       |
| npm run all       | Führt die Tests für CSS/HTML/JS aus.          |
| npm run start     | Started den Web-Server: http://localhost:3000 |

Die Vorlage beinhaltet CSS/HTML/JS-Linter. Diese sind konfiguriert.

- Live Server nutzen: https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer
