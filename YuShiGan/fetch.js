import https from "https";

const username = "Yushi_62gLj";
const password = "Gys008111911=";

//https://www.google.com/search?q=Google+Shopping+product+page+laptop&sca_esv=271b3fc3b185c18a&hl=zh-CN&sxsrf=ADLYWIIx2ddoGyAofpF7_Imh-gyTT0jucg:1732681631073&source=univ&udm=28&ved=1t:6869&ictx=111&biw=1440&bih=812&dpr=2#ip=1&oshopproduct=gid:18172451850590248421,mid:576462789997219150,oid:1396967875012047877,iid:4270879407856999641,rds:UENfMTgxNzI0NTE4NTA1OTAyNDg0MjF8UFJPRF9QQ18xODE3MjQ1MTg1MDU5MDI0ODQyMQ%3D%3D,pvt:hg,pvo:3&oshop=apv&pvs=0
const body = {
    source: "google_shopping_product",
    domain: "com",
    query: "10017768929322973780",
    parse: true,
    content: ["reviews"]  // Add this line to indicate that reviews are specifically needed
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

            if (responseData && responseData.results && responseData.results.length > 0) {
                const productData = responseData.results[0].content;

                if (productData && productData.reviews) {
                    const reviews = productData.reviews;

                    console.log("Product Rating:", reviews.rating);
                    console.log("Number of Reviews:", reviews.reviews_count);
                    console.log("Top Review:", JSON.stringify(reviews.top_review, null, 2));

                   
                    // console.log("Reviews by Stars:");
                    // console.log(JSON.stringify(reviews.reviews_by_stars, null, 2));
                } else {
                    console.log("No reviews found in the response.");
                }
            } else {
                console.log("No product data found in the response.");
            }
        } catch (error) {
            console.error("Error parsing JSON response:", error);
        }
    });
});

// request.on("error", (error) => {
//     console.error("Error:", error);
// });

request.write(JSON.stringify(body));
request.end();
