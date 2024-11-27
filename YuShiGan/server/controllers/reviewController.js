const https = require("https");

const getReviews = (req, res) => {
  const { productUrl } = req.body;

  const username = process.env.OXYLABS_USERNAME;
  const password = process.env.OXYLABS_PASSWORD;

  const body = {
    source: "universal",
    url: productUrl,
    geo_location: "United States",
    parse: true,
    context: [
      { key: "autoselect_variant", value: true },
      { key: "force_render", value: true },
    ],
  };

  const options = {
    hostname: "realtime.oxylabs.io",
    path: "/v1/queries",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Basic " + Buffer.from(`${username}:${password}`).toString("base64"),
    },
  };

  const request = https.request(options, (response) => {
    let data = "";

    response.on("data", (chunk) => {
      data += chunk;
    });

    response.on("end", () => {
      try {
        const responseData = JSON.parse(data);
        const rating = responseData?.results?.[0]?.content?.rating?.score;
        const count = responseData?.results?.[0]?.content?.rating?.count;

        if (rating && count) {
          res.json({
            success: true,
            rating,
            count,
          });
        } else {
          res.json({
            success: false,
            message: "Rating or review count not found.",
          });
        }
      } catch (error) {
        res.status(500).json({
          success: false,
          error: "Failed to parse response",
        });
      }
    });
  });

  request.on("error", (error) => {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  });

  request.write(JSON.stringify(body));
  request.end();
};

// Use module.exports to export
module.exports = {
  getReviews,
};
