const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const fetch = require("isomorphic-fetch");

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });

app.get("/open_ai", (req, res) => {
  const prompt = req.query.prompt;

  // Make the fetch call to the OpenAI API here
  // Assuming it returns a Promise, you can use .then() to handle the result
  fetch("https://api.openai.com/v1/engines/davinci/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer NULL",
    },
    body: JSON.stringify({ prompt }),
  })
    .then((response) => response.json())
    .then((data) => {
      // Extract the processed result from the data received from the OpenAI API
      const result = data.choices[0].text.split(" ")[1];

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
