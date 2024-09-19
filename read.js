const fs = require("fs");

const lotteryTimesMap = {
  Anguilla: ["9:00AM", "10:00AM", "11:00AM", "12:00PM"],
  "La Primera": ["12:00PM", "8:00PM"],
  "La Suerte": ["12:30PM", "6:00PM"],
  Real: ["12:55PM"],
  LoteDom: ["1:55PM"],
  "Lotería Nacional": ["2:30PM", "9:00PM"],
  Loteka: ["7:55PM"],
  Leidsa: ["8:55PM"],
  Florida: ["1:30PM", "9:50PM"],
  "New York": ["2:30PM", "10:30PM"],
  "King Lottery": ["12:30AM", "7:30PM"],
  "Gana Más": ["2:30PM"],
  "Nacional Noche": ["9:00PM"],
};

function processData(data) {
  const usedTimes = {};
  const result = data.map((item) => {
    const response = {};
    const title = item.title[0];
    const pubDate = item.pubDate[0];

    const titleMatch = title.match(/de\s(.*?)\sde/);
    if (titleMatch) {
      response.title = titleMatch[1].trim();
    }

    let timeMatch = title.match(/(\d+(?:AM|PM))/i);
    response.time = timeMatch ? timeMatch[0] : null;

    if (!response.time && response.title) {
      const titleLower = response.title.toLowerCase();
      const matchedLottery = Object.keys(lotteryTimesMap).find(
        (lotteryName) => {
          return titleLower.includes(lotteryName.toLowerCase());
        }
      );

      if (matchedLottery) {
        if (!usedTimes[matchedLottery]) {
          usedTimes[matchedLottery] = 0;
        }
        const availableTimes = lotteryTimesMap[matchedLottery];

        response.time =
          availableTimes[usedTimes[matchedLottery]] || availableTimes[0];

        usedTimes[matchedLottery]++;

        if (usedTimes[matchedLottery] >= availableTimes.length) {
          usedTimes[matchedLottery] = 0;
        }
      }
    }
    response.date = new Date(pubDate).toLocaleDateString("es-DO", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "America/Santo_Domingo",
    });

    let codeMatch = title.match(/\d{2}-\d{2}-\d{2}/);
    response.code = codeMatch ? codeMatch[0] : "";

    return response;
  });
  return result;
}

async function processAndSaveData() {
  const file = fs.readFileSync("output.json", "utf-8");
  if (!file) {
    console.error("Error: output.json not found");
    return;
  }
  const jsonData = JSON.parse(file);
  if (!jsonData) throw new Error("Error :file not readable");
  const processedData = processData(jsonData);
  fs.writeFileSync(
    "processedResults.json",
    JSON.stringify(processedData, null, 2),
    "utf8"
  );

  console.log("Processed data saved to processedResults.json");
}

module.exports = processAndSaveData;
