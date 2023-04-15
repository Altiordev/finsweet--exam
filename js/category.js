const apiKey = "49krSK-rLHZBDM8MZNiZEsLqgsm8U3hEBZquwHeDA18";
const input = document.querySelector('.category__search');
const form = document.querySelector('.category__form');
const pagenation = document.querySelector('.category__pagination');
const resultsContainer = document.querySelector('.category__resaults');
const heading = document.getElementById('heading');
let url = 'https://api.newscatcherapi.com/v2/search?q=Business';

let page = 1;

let forMaxPage = 0;

let minPage = 1;
let middlePage = 2;
let maxPage = 10;

function getPage() {
    const prevBtn = document.createElement('span');
    const minBtn = document.createElement('button');
    const middleBtn = document.createElement('button');
    const dots = document.createElement('span');
    const maxBtn = document.createElement('button');
    const nextBtn = document.createElement('span');
    prevBtn.textContent = '< Prev';
    minBtn.textContent = minPage;
    middleBtn.textContent = middlePage;
    dots.textContent = '...';
    maxBtn.textContent = maxPage;
    nextBtn.textContent = 'Next >';


    prevBtn.addEventListener('click', () => {
        pagenation.innerHTML = '';
        if (middlePage == forMaxPage) {
            maxPage -= 10;
        }
        if (minPage == 1) {
            prevBtn.style.opacity = '0.5';
        } else if (minPage > 1) {
            minPage -= 1;
            middlePage -= 1;
        }

        getPage();
    })

    minBtn.addEventListener('click', () => {
        pagenation.innerHTML = '';
        page = minPage;

        minBtn.classList.add('active');
        middleBtn.classList.remove('active');
        maxBtn.classList.remove('active');

        getData();
        getPage();
    })

    middleBtn.addEventListener('click', () => {
        pagenation.innerHTML = '';
        page = middlePage;

        middleBtn.classList.add('active');
        minBtn.classList.remove('active');
        maxBtn.classList.remove('active');

        getData();
        getPage();
    })

    maxBtn.addEventListener('click', () => {
        pagenation.innerHTML = '';
        page = maxPage;

        maxBtn.classList.add('active');
        minBtn.classList.remove('active');
        middleBtn.classList.remove('active');

        getData();
        getPage();
    })

    nextBtn.addEventListener('click', () => {
        pagenation.innerHTML = '';
        minPage += 1;
        middlePage += 1;
        if (middlePage == maxPage) {
            maxPage += 10;
            forMaxPage += 10;
        }
        getPage();

    })

    pagenation.append(prevBtn, minBtn, middleBtn, dots, maxBtn, nextBtn);
}

function getData() {
    let query = input.value;

    if (!input.value) {
        url = `https://api.newscatcherapi.com/v2/search?q=${heading.textContent}&page=${page}`;
    } else {
        url = `https://api.newscatcherapi.com/v2/search?q=${query}`;
    }

    fetch(url, {
            method: "GET",
            headers: {
                "x-api-key": apiKey
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            resultsContainer.innerHTML = '';
            const fourData = data.articles.slice(1, 5);

            fourData.map((card) => {
                // console.log(card);

                const resaultCard = document.createElement('div');
                resaultCard.classList.add('card');
                resaultCard.innerHTML = `
                <div class="card">
                <div class="card__img-wrapper">
                <img src="${card.media}" alt="Response Image">
                </div>                       
                        <div class="card__text">
                            <span class="card__theme">${data.user_input.q}</span>
                            <h3 class="card__title">${card.title}</h3>
                            <p class="card__info">${card.published_date}</p>
                        </div>
                </div>
                `

                resultsContainer.appendChild(resaultCard);
            })
        }).then(() => {
            pagenation.innerHTML = '';
            getPage();
            const pagenationItems = document.querySelectorAll('.category__pagination button');
            console.log(pagenationItems);

            pagenationItems.forEach((item) => {
                if (item.textContent == page) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            })

        })
        .catch(error => {
            console.log(error);
        });
}

getData();


form.addEventListener('submit', (e) => {
    e.preventDefault();
    getData();
    getPage();
    page = 1;
    minPage = 1;
    middlePage = 2;
    maxPage = 10;
    form.reset();
});