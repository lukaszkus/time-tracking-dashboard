const daily = document.querySelector('.daily');
const weekly = document.querySelector('.weekly');
const monthly = document.querySelector('.monthly');

const svg = `<svg class="stats__icon" width="21" height="5" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"
                fill="#BBC0FF" fill-rule="evenodd" />
            </svg>`;


async function getData() {
    let url = 'https://raw.githubusercontent.com/lukaszkus/time-tracking-dashboard/main/data.json';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function renderDaily() {
  let data = await getData();

    data.forEach(item => {
      const { title, timeframes: { daily: {current, previous} } } = item;
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
              <span class="stats__date">Yesterday - ${previous}${hr}</span>
            </div>
        </div>
      `;

      const dashBoard = document.querySelector('.dashboard');
      dashBoard.appendChild(newArticle).innerHTML = component;
      newArticle.className = `card card--${title.toLowerCase()} card__stats`;
    });
};

async function renderWeekly() {
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
              <span class="stats__date">Last week - ${previous}${hr}</span>
            </div>
        </div>
      `;

      const dashBoard = document.querySelector('.dashboard');
      dashBoard.appendChild(newArticle).innerHTML = component;
      newArticle.className = `card card--${title.toLowerCase()} card__stats`;
    });
};
renderWeekly();

async function renderMonthly() {
  let data = await getData();

    data.forEach(item => {
      const { title, timeframes: { monthly: {current, previous} } } = item;
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
              <span class="stats__date">Last Month - ${previous}${hr}</span>
            </div>
        </div>
      `;

      const dashBoard = document.querySelector('.dashboard');
      dashBoard.appendChild(newArticle).innerHTML = component;
      newArticle.className = `card card--${title.toLowerCase()} card__stats`;
    });
};


daily.addEventListener('click', function(e) {
  e.preventDefault();
  daily.classList.add('active');
  weekly.classList.remove('active');
  monthly.classList.remove('active');

  const removeElements = (el) => el.forEach(el => el.remove());
  removeElements(document.querySelectorAll('.card__stats'));
  
  renderDaily();
});


weekly.addEventListener('click', function (e) {
  e.preventDefault();
  weekly.classList.add('active');
  daily.classList.remove('active');
  monthly.classList.remove('active');

  const removeElements = (el) => el.forEach(el => el.remove());
  removeElements(document.querySelectorAll('.card__stats'));
  
  renderWeekly();
});

monthly.addEventListener('click', function (e) {
  e.preventDefault();
  monthly.classList.add('active');
  daily.classList.remove('active');
  weekly.classList.remove('active');

  const removeElements = (el) => el.forEach(el => el.remove());
  removeElements(document.querySelectorAll('.card__stats'));
  
  renderMonthly();
});
