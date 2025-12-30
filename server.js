const express = require('express');
const net = require('net');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PRINTER_IP = '192.168.1.110';
const PRINTER_PORT = 9100;
// app.post('/send', (req, res) => {
//   const { command } = req.body;
//   const client = new net.Socket();

//   client.connect(9100, '192.168.1.110', () => {
// // console.log(command);
// const finalCmd = normalizeCommand(command);
// client.write(Buffer.from(finalCmd, 'ascii'));
//     setTimeout(() => {
//       res.json({
//         success: true,
//         message: 'Command sent to printer'
//       });
//       client.destroy();
//     }, 300);
//   });

//   client.on('error', err => {
//     res.status(500).json({
//       success: false,
//       message: 'Printer connection failed',
//       error: err.message
//     });
//   });
// });
app.post('/send', (req, res) => {
  res.json({
    status: 'API LIVE',
    received: req.body,
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Printer API running on port', PORT);
});

function normalizeCommand(cmd) {
  // Remove extra spaces at end
  cmd = cmd.trimEnd();

  // If no newline at end, add it
  if (!cmd.endsWith('\n')) {
    cmd += '\n';
  }

  return cmd;
}
