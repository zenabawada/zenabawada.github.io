const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const fetch = require("isomorphic-fetch");
require("dotenv").config();

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });

app.get("/open_ai", (req, res) => {
  const apiKey = process.env.OPENAI_API_KEY;
  const prompt = req.query.prompt;
  const messages = [
    {
      role: "user",
      content: prompt,
    },
  ];

  // Make the fetch call to the OpenAI API here
  // Assuming it returns a Promise, you can use .then() to handle the result
  fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      model: "gpt-3.5-turbo",
    },

    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: messages,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      // Extract the processed result from the data received from the OpenAI API
      //console.log(data.choices[0].text);
      // return;
      const result = data.choices[0].message.content.split("\n")[0];

      const response = {
        prompt: prompt,
        result: result,
      };

      res.json(response);
    })
    .catch((error) => {
      console.log("Error in OpenAI API request:", error);
      res.status(500).json({ error: "Error in OpenAI API request" });
    });
});

app.use(express.static("public"));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
