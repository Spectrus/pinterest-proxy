const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

app.get("/pinterest", async (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).json({ error: "Missing query" });

  try {
    const response = await axios.get(
      "https://pinterest-scraper-api.p.rapidapi.com/pins",    // ← updated path
      {
        params: { query },
        headers: {
          "x-rapidapi-host": "pinterest-scraper-api.p.rapidapi.com",
          "x-rapidapi-key": process.env.RAPIDAPI_KEY,
        },
      }
    );

    res.json(response.data);
  } catch (err) {
    // Log the HTTP status and body from RapidAPI so you can see
    console.error(
      "Pinterest fetch failed:",
      err.response?.status,
      err.response?.data || err.message
    );
    res
      .status(502)
      .json({ error: "Pinterest fetch failed", details: err.response?.data });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
