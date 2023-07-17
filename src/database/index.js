/* const fs = require("fs");

const dbProducts = JSON.parse(fs.readFileSync("./src/database/products.json", "utf-8"));
module.exports = dbProducts; */

const fs = require("fs");
const path = require("path");

module.exports = {
      carousel: JSON.parse(fs.readFileSync(path.join(__dirname, "/banner.json"), "utf-8")),

      readJSON: (json) => {
            return JSON.parse(fs.readFileSync(path.resolve(__dirname, json)));
      },
      writeJSON: (json, array) => {
            fs.writeFileSync(path.resolve(__dirname, json), JSON.stringify(array, null, 3), "utf-8");
      },
};
