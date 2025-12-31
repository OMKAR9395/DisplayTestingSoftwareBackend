const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 🧠 In-memory queue (later DB use karta yeil)
let printQueue = [];

/**
 * 1️⃣ Frontend → Print send
 */
app.post('/send', (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ message: 'Text is required' });
  }

  const job = {
    id: Date.now(),
    text,
    status: 'QUEUED',
    message: 'Job queued successfully',
  };

  printQueue.push(job);

  res.json({
    message: 'Print job received',
    job,
  });
});

/**
 * 2️⃣ Agent → Get pending jobs
 */
app.get('/jobs', (req, res) => {
  res.json(printQueue.filter((j) => j.status === 'QUEUED'));
});

/**
 * 3️⃣ Agent → Job printed (remove)
 */
app.delete('/jobs/:id', (req, res) => {
  const id = Number(req.params.id);
  printQueue = printQueue.filter((job) => job.id !== id);

  res.json({ message: 'Job removed' });
});

app.put('/jobs/:id/status', (req, res) => {
  const job = printQueue.find((j) => j.id == req.params.id);
  if (job) {
    job.status = req.body.status;
    job.message = req.body.message;
  }
  res.json({ ok: true });
});

/**
 * Health check (optional)
 */
app.get('/', (req, res) => {
  res.send('Printer Cloud Server Running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Cloud backend running on port', PORT);
});
