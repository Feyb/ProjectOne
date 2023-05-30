import express from 'express';

const app = express();
// const router = express.Router();

const port = 3000;
app.use(express.static('source/public'));

/* POST create */
// router.post('/create', (req, res) => {
//   let { title } = req.body;
//   let { desc } = req.body;
//   let importance = req.body.range_value;
//   let date = req.body.toDoUntil;
//   // var date = dateorg.slice(0,10);
//   let createDate = new Date().toLocaleString();

//   let note = {
//     title,
//     description: desc,
//     importance,
//     date,
//     isFinished: "",
//     createdate: createDate
//   };

//   data.addNote(note);
// });

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening at http://localhost:${port}`);
});
