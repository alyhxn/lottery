function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    document.getElementById('current-time').textContent = timeString;
}

setInterval(updateTime, 1000);
updateTime(); // Initial call

const lotteryTimes = ['9AM', '10AM', '11AM', '12PM'];
const lotteryResults = document.getElementById('lottery-results');

lotteryTimes.forEach(time => {
    const resultCard = document.createElement('div');
    resultCard.className = 'bg-white rounded-lg shadow-md p-4';
    resultCard.innerHTML = `
        <div class="flex max-lg:flex-col justify-between items-center mb-2">
            <h2 class="text-lg font-semibold">Anguilla ${time}</h2>
            <div class="flex gap-4 items-center">
                <span class="flex gap-1 h-5 items-center text-gray-500"><img src="assets/calendar.svg" alt="calendar">Dom 08 de septiembre, 2024</span>
                <span class="flex gap-1 h-5 items-center text-right text-[#005643] font-black"><img src="assets/history.svg" alt="history">${time === '9AM' ? '9:00AM' : time}</span>
            </div>
        </div>
        <div class="flex max-lg:flex-col items-center justify-between">
            <img src="assets/logo2.svg" alt="Anguilla Lottery" class="mr-4">
            <div class="flex space-x-2">
                ${Array.from({length: 3}, () => `
                    <div class="w-20 h-20 text-3xl rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold">
                        ${Math.floor(Math.random() * 100).toString().padStart(2, '0')}
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    lotteryResults.appendChild(resultCard);
});