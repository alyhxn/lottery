const fetchAndConvertXML = require("./fetch");
const cron = require("node-cron");
const processAndSaveData = require("./read");
const path = require("path");

console.log("Fetching and converting XML...");
cron.schedule("*/30 * * * *", async () => {
  try {
    const fetchedData = await fetchAndConvertXML();
    if (fetchedData) {
      console.log("Processing and saving data...");
      await processAndSaveData();
      console.log("Operation Done..!");
    }
  } catch (error) {
    console.error("Error during cron job execution:", error);
  }
});
