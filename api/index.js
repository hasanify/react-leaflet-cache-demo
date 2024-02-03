const axios = require("axios");
const express = require("express");
const cache = require("memory-cache");

const app = express();

const loadFromCache = (req, res, next) => {
  const { s, z, x, y } = req.query;
  const cacheKey = `map:/${s}-${z}-${x}-${y}`;
  const cachedData = cache.get(cacheKey);

  if (cachedData) {
    console.log("Loading from cache");
    return res.type("image/png").send(cachedData);
  } else return next();
};

app.get("/map", loadFromCache, async (req, res) => {
  try {
    console.log("called external API");
    const { s, z, x, y } = req.query;
    const { data } = await axios.get(
      `https://${s}.tile.openstreetmap.org/${z}/${x}/${y}.png`,
      {
        responseType: "arraybuffer",
      }
    );
    res.type("image/png").send(data);

    const cacheKey = `map:/${s}-${z}-${x}-${y}`;
    cache.put(cacheKey, data, 60 * 1000 * 60);
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/check-cache", (req, res) => {
  const cacheKeys = cache.keys();

  const cacheContents = cacheKeys.map((key) => ({
    key,
    data: cache.get(key),
  }));

  res.json(cacheContents);
});

app.listen(3001, () => {
  console.log("Server Started at localhost:3001");
});
