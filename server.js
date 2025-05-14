const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;
const API_TOKEN = "eyJ0eXAiOiJKV1QiLCJh..."; // তোমার আসল API token এখানে বসাও

app.get("/clan/:tag", async (req, res) => {
  const tag = encodeURIComponent("#" + req.params.tag);
  const url = `https://api.clashofclans.com/v1/clans/${tag}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });

    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).send(text);
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
