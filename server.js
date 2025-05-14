const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

// এখানে API token বসবে Render-এর Environment Variables এর ভিতরে
const token = process.env.API_TOKEN;

app.get('/player/:tag', async (req, res) => {
  const tag = req.params.tag.replace('#', '%23');
  const url = `https://api.clashofclans.com/v1/players/${tag}`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      message: "Data not found or an error occurred"
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
