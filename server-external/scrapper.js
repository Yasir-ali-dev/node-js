const request = require("request");
const cheerio = require("cheerio");
const express = require("express");
const app = express();

let $ = cheerio.load("<h2 class='title'>Hello there</h2><h2>Hello Quit</h2>");
$("h2.title").text("heelo");
$("h2").addClass("quit");

$ = cheerio.load(
  `<ul id="fruits">
<li class="apple">Apple</li>
<li class="orange">Orange</li>
<li class="pear">Pear</li>
</ul>`,
  null,
  false
);

console.log($.html());
app.get("/", async (req, res) => {
  let $;
  const file = await request(
    "https://sfbay.craigslist.org/search/apa?bedrooms=1&bathrooms=1&availabilityMode=0",
    async function (err, response, body) {
      $ = await cheerio.load(body);
      res.json($.text());
    }
  );
});

app.listen(4000, () => {
  console.log("port is listening to the port 4000");
});
