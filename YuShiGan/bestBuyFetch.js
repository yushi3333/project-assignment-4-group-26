const https = require("https");

const username = "Yushi_62gLj";
const password = "Gys008111911=";
const body = {
    source: "universal",
    url: "https://www.bestbuy.com/site/lenovo-yoga-book-9i-2-in-1-13-3-2-8k-dual-screen-oled-touchscreen-laptop-intel-core-ultra-7-155u-with-16gb-memory-1tb-ssd-tidal-teal/6571365.p?skuId=6571365",
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
            // Extract rating and count
            const rating = responseData?.results?.[0]?.content?.rating?.score;
            const count = responseData?.results?.[0]?.content?.rating?.count;

            if (rating && count) {
                console.log(`Rating: ${rating}`);
                console.log(`Review Count: ${count}`);
            } else {
                console.log("Rating or review count not found in the response.");
            }
        } catch (error) {
            console.error("Failed to parse response:", error);
        }
    });
});

// Uncomment to handle request errors
// request.on("error", (error) => {
//     console.error("Error:", error);
// });

request.write(JSON.stringify(body));
request.end();
