# Generate an SVG Card

Run `node index.js`

This creates a file named output.svg.

`index.js` demonstrates how to call the function `generateCardSVG()`which generates the SVG output.

# How this works?

We are using a 3D engine which generates SVG in 2D – [zzz.dog](https://zzz.dog/api). It requires DOM to work. So we are using [Puppeteer](https://developers.google.com/web/tools/puppeteer) to emulate DOM and generate the SVG.

We essentially create an HTML file dynamically and capture the SVG output.

Files: 
- `head.html` loads necessary JavasScript libraries
- `body.html` has the code that generates the SVG output
- `util.js` contains the function `generateCardSVG()`which orchestrates generation of SVG using Puppeteer.

---

`generateCardSVG()`

It returns the SVG ouput as well as writes a file named `output.svg`
