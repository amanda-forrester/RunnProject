const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
const TOKEN_PATH = 'token.json';

// Load client secrets
const credentialsPath = path.join(__dirname, 'credentials.json');
const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));

const { client_secret, client_id, redirect_uris } = credentials.web;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

// Check if we have previously stored a token.
fs.readFile(TOKEN_PATH, (err, token) => {
  if (err) return getNewToken(oAuth2Client);
  oAuth2Client.setCredentials(JSON.parse(token));
});

// Get and store new token
function getNewToken(oAuth2Client) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
}

// Route to handle OAuth2 callback
app.get('/oauth2callback', (req, res) => {
  const code = req.query.code;
  oAuth2Client.getToken(code, (err, token) => {
    if (err) return res.status(400).send('Error retrieving access token');
    oAuth2Client.setCredentials(token);
    // Store token
    fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
      if (err) console.error(err);
    });
    res.send('Authentication successful! You can close this tab.');
  });
});

// Helper function to get the email content
async function getEmailContent(auth, messageId) {
  const gmail = google.gmail({ version: 'v1', auth });
  const res = await gmail.users.messages.get({
    userId: 'me',
    id: messageId,
  });
  return res.data;
}

//Route to fetch Gmail messages
app.get('/api/emails', async (req, res) => {
  try {
    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
    const response = await gmail.users.messages.list({
      userId: 'me',
      maxResults: 10,
    });

    const messages = response.data.messages || [];
    const emailPromises = messages.map(message => getEmailContent(oAuth2Client, message.id));
    const emailDetails = await Promise.all(emailPromises);

    res.json(emailDetails);
  } catch (error) {
    console.error('Error fetching emails:', error);
    res.status(500).send('Error fetching emails');
  }
});

//Runn API
app.get('/api/clients', async (req, res) => {
  try {
    const response = await axios.get('https://api.runn.io/clients', {
      headers: {
        Authorization: `Bearer ${process.env.API_TOKEN}`,
        'Accept-Version': '1.0.0',
      },
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


