const minify = require("html-minifier").minify;
const path = require("path");
const fs = require("fs");
const htmlPath = "./dist/index.html";
const workboxAssets = "./dist/wb-assets/workbox-v3.6.3/";

const result = minify(fs.readFileSync(htmlPath, { encoding: "utf8" }), {
  removeAttributeQuotes: true,
  minifyJS: true,
  minifyCSS: true,
});
fs.writeFileSync(htmlPath, result, { encoding: "utf8" });

Wb();
console.log("Minify Successful!");

function Wb() {
  const prodWbJs = [];
  fs.readdirSync(workboxAssets).forEach(file => {
    file = path.join(__dirname, workboxAssets, file);
    if (file.endsWith(".map") || file.endsWith(".dev.js")) {
      fs.unlinkSync(file);
    } else {
      prodWbJs.push(file);
    }
  });
  // 移除 //# sourceMappingURL
  const lines = 2;
  prodWbJs.forEach(file => {
    let result = fs.readFileSync(file, { encoding: "utf8" });
    result = result.split("\n");
    if (result[result.length - lines] !== undefined && result.length > lines) {
      fs.writeFileSync(file, result.slice(0, result.length - lines).join("\n"), { encoding: "utf8" });
    }
  });
}