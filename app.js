// Import dependencies
const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const path=require('path');
const bodyParser = require('body-parser');
// const fetch = require('node-fetch');
// const fetch = require('fetch');
// Initialize express app and load environment variables
const app = express();
dotenv.config();
// app.use(bodyParser.json());
// Set up routes
// app.set('views',path.join(__dirname,'public'));
app.use(bodyParser.json());
const apiUrl = 'http://localhost:3000/register';
// app.use(Json.sr)
app.post('/register', async (req, res) => {
  const t = req.body;
//   const t={
//     "companyName": "abc"
// };
  const response = await axios.post(apiUrl,t);
  if (response.ok) {
    const {companyName, clientID,clientSecret} = await response.json();
    return res.status(200).json({ message: 'Company registration successful',companyName, clientID,clientSecret });
  } else {
    return res.status(response.status).json({ message: 'Company registration failed' });
  }
});



app.get("/trains", async (req, res) => {
  try {
    // Make GET request to external API to fetch list of trains
    const response = await axios.get("http://localhost:3000/trains");

    // Send back the list of trains to the client
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong.");
  }
});

app.get("/trains/:trainNumber", async (req, res) => {
  try {
    // Extract the train number from the request parameters
    const { trainNumber } = req.params;

    // Make GET request to external API to fetch information about a specific train
    const response = await axios.get(`https://external-api.com/trains/${trainNumber}`);

    // Send back the information about the train to the client
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong.");
  }
});

app.post("/auth", async (req, res) => {
  try {
    // Extract the user's credentials from the request body
    const {    companyName,clientID,clientSecret } = req.body;

    // Make POST request to external API to authenticate the user
    const response = await axios.post("http://localhost:3000/auth", {
      companyName,clientID,clientSecret 
    });

    // Send back the authentication token to the client
    res.send(response.data.token);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong.");
  }
});

app.get('/train_details', async (req, res) => {
  const apiUrl = 'https://example.com/api/train_details';
  
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    // Sort the data according to departure time
    data.sort((a, b) => {
      const timeA = a.departureTime.Hours * 60 + a.departureTime.Minutes;
      const timeB = b.departureTime.Hours * 60 + b.departureTime.Minutes;
      return timeA - timeB;
    });
    
    return res.json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
