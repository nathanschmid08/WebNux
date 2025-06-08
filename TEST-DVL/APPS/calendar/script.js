const calendarDays = document.getElementById("calendarDays");
const monthYear = document.getElementById("monthYear");

let currentDate = new Date();

function renderCalendar(date) {
  calendarDays.innerHTML = "";

  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDay = (firstDay.getDay() + 6) % 7; // Mo = 0

  monthYear.textContent = `${date.toLocaleString('de-DE', { month: 'long' })} ${year}`;

  for (let i = 0; i < startDay; i++) {
    calendarDays.innerHTML += `<div></div>`;
  }

  for (let day = 1; day <= lastDay.getDate(); day++) {
    const isToday =
      day === new Date().getDate() &&
      month === new Date().getMonth() &&
      year === new Date().getFullYear();

    calendarDays.innerHTML += `<div class="day ${isToday ? "today" : ""}">${day}</div>`;
  }
}

function changeMonth(offset) {
  currentDate.setMonth(currentDate.getMonth() + offset);
  renderCalendar(currentDate);
}

renderCalendar(currentDate);