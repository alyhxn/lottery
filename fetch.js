const axios = require("axios");
const xml2js = require("xml2js");
const fs = require("fs");
const parser = new xml2js.Parser();

const url = "https://enloteria.com/rss";

const fetchAndConvertXML = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((response) => {
        const xmlData = response.data;
        parser.parseString(xmlData, (err, result) => {
          if (err) {
            console.error("Error parsing XML:", err);
            return reject(err);
          }
          const items = result.rss.channel[0].item;
          const json = JSON.stringify(items, null, 4);
          fs.writeFile("output.json", json, (err) => {
            if (err) {
              console.error("Error writing JSON to file:", err);
              return reject(err);
            }
            console.log("JSON file has been saved as output.json");
            resolve(true);
          });
        });
      })
      .catch((error) => {
        console.error("Error fetching the XML:", error);
        reject(error);
      });
  });
};

module.exports = fetchAndConvertXML;
