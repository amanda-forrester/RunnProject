const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/message', (req, res) => {
  res.json({ message: "Hello from server!" });
});

// Route to fetch clients
app.get('/api/clients', async (req, res) => {
  try {
    const response = await axios.get('https://api.runn.io/clients', {
      headers: {
        Authorization: `Bearer ${process.env.API_TOKEN}`, // Correctly use the environment variable
        'Accept-Version': '1.0.0'
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching clients');
  }
});

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});

