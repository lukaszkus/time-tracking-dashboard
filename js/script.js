const daily = document.querySelector('.daily');
const weekly = document.querySelector('.weekly');
const monthly = document.querySelector('.monthly');

const svg = `<svg class="stats__icon" width="21" height="5" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"
                fill="#BBC0FF" fill-rule="evenodd" />
            </svg>`;


let dailyData = [];

async function getData() {
    let url = 'https://raw.githubusercontent.com/lukaszkus/time-tracking-dashboard/main/data.json';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function renderData() {
  let data = await getData();

    data.forEach(item => {
      const { title, timeframes: { weekly: {current, previous} } } = item;
      const newArticle = document.createElement("article");

      const hr = current !== 1 || previous !== 1 ? "hrs" : "hr";

      const component = `
        <div class="stats">
            <div class="stats__row">
              <h2 class="stats__title">${title}</h2>
              ${svg}
            </div>
            <div class="stats__row">
              <p class="stats__hours">${current}${hr}</p>
              <span class="stats__date">Last Week - ${previous}${hr}</span>
            </div>
        </div>
      `;

      const dashBoard = document.querySelector('.dashboard');
      dashBoard.appendChild(newArticle).innerHTML = component;
      newArticle.className = `card card--${title.toLowerCase()} card__stats`;
    });
};
renderData();



async function renderDaily() {
  let data = await getData();

  let dailyCurrent = [];
  let dailyPrevious = [];

  const statsHours = document.querySelectorAll(".stats__hours");
  const statsDate = document.querySelectorAll(".stats__date");

  data.forEach(item => {
    let { timeframes: { daily: {current, previous} } } = item;
    dailyCurrent.push(current);
    dailyPrevious.push(previous);
  });

  for (i = 0; i < statsHours.length; i++) {
    let hr = i === 1 ? "hr" : "hrs";
    statsHours[i].innerHTML = `${dailyCurrent[i]}${hr}`;
  }

  for (i = 0; i < statsDate.length; i++) {
    let hr = i === 1 ? "hr" : "hrs";
    statsDate[i].innerHTML = `Yesterday - ${dailyPrevious[i]}${hr}`;
  }
}

async function renderWeekly() {
  let data = await getData();

  let weeklyCurrent = [];
  let weeklyPrevious = [];

  const statsHours = document.querySelectorAll(".stats__hours");
  const statsDate = document.querySelectorAll(".stats__date");

  data.forEach(item => {
    let { timeframes: { weekly: {current, previous} } } = item;
    weeklyCurrent.push(current);
    weeklyPrevious.push(previous);
  });

  for (i = 0; i < statsHours.length; i++) {
    let hr = i === 1 ? "hr" : "hrs";
    statsHours[i].innerHTML = `${weeklyCurrent[i]}${hr}`;
  }

  for (i = 0; i < statsDate.length; i++) {
    let hr = i === 1 ? "hr" : "hrs";
    statsDate[i].innerHTML = `Last Week - ${weeklyPrevious[i]}${hr}`;
  }
}

async function renderMonthly() {
  let data = await getData();

  let monthlyCurrent = [];
  let monthlyPrevious = [];

  const statsHours = document.querySelectorAll(".stats__hours");
  const statsDate = document.querySelectorAll(".stats__date");

  data.forEach(item => {
    let { timeframes: { monthly: {current, previous} } } = item;
    monthlyCurrent.push(current);
    monthlyPrevious.push(previous);
  });

  for (i = 0; i < statsHours.length; i++) {
    let hr = i === 1 ? "hr" : "hrs";
    statsHours[i].innerHTML = `${monthlyCurrent[i]}${hr}`;
  }

  for (i = 0; i < statsDate.length; i++) {
    let hr = i === 1 ? "hr" : "hrs";
    statsDate[i].innerHTML = `Last Month - ${monthlyPrevious[i]}${hr}`;
  }
}

daily.addEventListener('click', function (e) {
  e.preventDefault();
  daily.classList.add('active');
  weekly.classList.remove('active');
  monthly.classList.remove('active');
  
  renderDaily();
});


weekly.addEventListener('click', function (e) {
  e.preventDefault();
  weekly.classList.add('active');
  daily.classList.remove('active');
  monthly.classList.remove('active');
  
  renderWeekly();
});

monthly.addEventListener('click', function (e) {
  e.preventDefault();
  monthly.classList.add('active');
  daily.classList.remove('active');
  weekly.classList.remove('active');
  
  renderMonthly();
});
