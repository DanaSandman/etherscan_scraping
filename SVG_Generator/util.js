const puppeteer = require("puppeteer");
const {
  readFileSync,
  writeFileSync
} = require("fs");

function toBase64(svgString) {
  return `data:image/svg+xml;base64,${Buffer.from(svgString).toString("base64")}`;
}

/**
 * Generate an SVG representing a Card
 *
 * The SVG generation makes use of libraries which require a DOM. Hence,
 * it is necessary to provide a DOM environment for the same.
 * We are using puppeteer for the same and executing an HTML file
 * which generates the desired SVG ouput.
 *
 * This SVG output is then returned by the function.
 *
 * @param {JSON} data
 * @param {Object} oCardConfig [{
 *     width = 290,
 *     height = 250,
 *     // padding
 *     yPadding = 25,
 *     xPadding = 50,
 *     // gap between lines
 *     zGap = 0,
 *     yGap = 45,
 *     strokeWidth = 5,
 *     colors,
 *     yVars
 * }={}]
 * @returns base64 image of the generated SVG Card
 */
async function generateCardSVG(data, oCardConfig) {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      // this is required in order to inclue <scripts> in the injected HTML page
      "--disable-web-security",
      "--disable-features=IsolateOrigins",
      "--disable-site-isolation-trials",
    ],
  });

  // Prepare the HTML file:
  //
  // The HTML page has been created in chunks in order to inject the
  // dataset in the page.
  const htmlContentHead = readFileSync("./SVG_Generator/head.html", "utf8");
  const htmlContentBody = readFileSync("./SVG_Generator/body.html", "utf8");
  // prepare dataset
  const htmlData = `<script>const DATASET = ${data};</script>`;
  const htmlConfig = `<script>const CARD_CONFIG = ${JSON.stringify(oCardConfig)};</script>`;
  const htmlCloseHead = `</head>`;

  // join chunks together to form the HTML page's content
  const htmlContent = `${htmlContentHead}${htmlData}${htmlConfig}${htmlCloseHead}${htmlContentBody}`;

  // writeFileSync("./index.html", htmlContent);

  // ./

  // Execute the contents of the page
  //

  // create a new tab
  const page = await browser.newPage();
  // Toggles bypassing page's Content-Security-Policy.
  page.setBypassCSP(true);

  // Configure the navigation timeout
  // await page.setDefaultNavigationTimeout(60*1000);

  // Log errors
  page
    .on("console", (consoleObj) => console.log(consoleObj.text()))
    .on("requestfailed", console.error.bind(console, "REQUEST_FAILED:\n"));

  // Inject HTML page content
  await page.setContent(htmlContent, /* { waitUntil: ["load", "networkidle0"] } */ );


  // Wait for the SVG to get drawn
  await page.waitForSelector("#svg-container svg");

  // Get the contents of the generated SVG element
  const svgContainer = await page.$eval(
    "#svg-container",
    (node) => node.innerHTML
  );

  // Optionally save the contents in a file
  writeFileSync("./output.svg", toBase64(svgContainer));

  // close puppeteer
  await browser.close();

  // return base64 image of the SVG element
  return toBase64(svgContainer);
}


module.exports = {
  generateCardSVG,
  toBase64
};