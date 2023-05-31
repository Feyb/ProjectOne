import express from 'express';

const app = express();
// const router = express.Router();

const port = 3000;
app.use(express.static('source/public'));

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening at http://localhost:${port}`);
});
