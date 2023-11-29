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

const options = {
  url: "https://www.reddit.com/r/funny.json",
  method: "GET",
  headers: {
    Accept: "application/json",
  },
};

let formOptions = {
  url: "http://http://mockbin.com/request",
  form: {
    email: "me@example.com",
    password: "myPassword",
  },
};

app.get("/stack", (req, res) => {
  request(
    "https://stackabuse.com/the-node-js-request-module/",
    async (err, response, body) => {
      res.json({ body });
    }
  );
});
app.get("/reddit", (req, res) => {
  request(formOptions, async (err, response, body) => {
    console.log(req.body);
    res.json({ body });
  });
});

app.listen(4000, () => {
  console.log("port is listening to the port 4000");
});
