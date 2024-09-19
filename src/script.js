function updateTime() {
  const now = new Date();
  const timeString = now.toLocaleTimeString("es-DO", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "America/Santo_Domingo",
  });
  document.getElementById("current-time").textContent = timeString;
}

function spanishDate(date) {
  var date = new Date(date);
  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "America/Santo_Domingo",
  };
  return date.toLocaleDateString("es-DO", options);
}

setInterval(updateTime, 1000);
updateTime();
const date = spanishDate();

const lotteryTimes = ["9AM", "10AM", "11AM", "12PM"];
const lotteryResults = document.getElementById("lottery-results");

fetch("processedResults.json")
  .then((response) => response.json())
  .then((data) => {
    const lotteryResults = document.getElementById("lottery-results");
    data.forEach((result) => {
      const resultCard = document.createElement("div");
      resultCard.className = "bg-white rounded-lg shadow-md p-4";
      resultCard.innerHTML = `
            <div class="flex max-lg:flex-col justify-between items-center mb-2">
                <h2 class="text-lg font-semibold">${result.title}</h2>
                <div class="flex gap-4 items-center">
                    <span class="flex gap-1 h-5 items-center text-gray-500"><img src="assets/calendar.svg" alt="calendar">${spanishDate(
                      result.date
                    )}</span>
                    <span class="flex gap-1 h-5 items-center text-right text-[#003F5E] font-black"><img src="assets/history.svg" alt="history">${
                      result.time
                    }</span>
                </div>
            </div>
            <div class="flex max-lg:flex-col items-center justify-between">
                <div class="flex space-x-2">
                    ${result.code
                      .split("-")
                      .map((number) =>
                        !number
                          ? `<div class="w-30 h-10 p-2 text-lg rounded bg-[#003F5E] flex items-center justify-center text-blue-100">Esperando resultado</div>`
                          : ` <div class="w-20 h-20 text-3xl rounded-full bg-[#003F5E] flex items-center justify-center text-blue-100 font-bold">
                            ${number}
                          </div>
                    `
                      )
                      .join("")}
                </div>
            </div>
        `;
      lotteryResults.appendChild(resultCard);
    });
  })
  .catch((error) => {
    console.error("Error fetching the lottery results:", error);
    document.getElementById("lottery-results").textContent =
      "Error loading lottery results.";
  });
