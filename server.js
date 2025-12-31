const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let printQueue = [];

app.post('/send', (req, res) => {
  const job = {
    id: Date.now(),
    text: req.body.text,
    status: 'QUEUED',
  };

  printQueue.push(job);

  res.json({
    message: 'Print job received',
    job,
  });
});

app.get('/jobs', (req, res) => {
  res.json(printQueue);
});

app.delete('/jobs/:id', (req, res) => {
  printQueue = printQueue.filter((j) => j.id != req.params.id);
  res.json({ message: 'Job removed' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Cloud server running on port', PORT);
});
