const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await axios.post('https://api.akkio.com/v1/your-endpoint', {
      message: userMessage,
    }, {
      headers: {
        'Authorization': `Bearer YOUR_AKKIO_API_KEY`,
        'Content-Type': 'application/json',
      },
    });

    res.json({ reply: response.data.reply });
  } catch (error) {
    console.error('Error communicating with Akkio API:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
