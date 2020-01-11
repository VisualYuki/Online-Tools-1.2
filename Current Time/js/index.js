const hours = document.querySelector(".hours"),
  minuts = document.querySelector(".minuts"),
  seconds = document.querySelector(".seconds"),
  colonArray = document.querySelectorAll(".colon"),
  clock = document.querySelector(".clock"),
  timeInfo = document.querySelector(".time-info");

let h, m, s, date;

updateTimeInfo();
updateDate();

setInterval(function() {
  updateDate();
}, 1000);

function updateDate() {
  date = new Date();
  h = date.getHours().toString();
  m = date.getMinutes().toString();
  s = date.getSeconds().toString();

  if (h.length == 1) h = 0 + h;
  if (m.length == 1) m = 0 + m;
  if (s.length == 1) s = 0 + s;

  hours.textContent = h;
  minuts.textContent = m;
  seconds.textContent = s;

  if (parseInt(s) % 2)
    colonArray[0].style = colonArray[1].style = "color: #000";
  else colonArray[0].style = colonArray[1].style = "color: #808080";

  if (h === "00") updateTimeInfo();
}

function updateTimeInfo() {
  date = new Date();
  month = date.getMonth();
  year = date.getFullYear().toString();
  monthDay = date.getDate();
  day = getDayName(date.getDay());

  if (month < 10) month = "0" + (month + 1);
  if (monthDay < 10) monthDay = "0" + (monthDay + 1);

  timeInfo.textContent = day + " " + monthDay + "." + month + "." + year;
}

function getDayName(day) {
  switch (day) {
    case 0:
      return "Monday";
      break;
    case 1:
      return "Tuesday";
      break;
    case 2:
      return "Wednesday";
      break;
    case 3:
      return "Thursday";
      break;
    case 4:
      return "Friday";
      break;
    case 5:
      return "Saturday";
      break;
    case 6:
      return "Sunday";
      break;
  }
}
