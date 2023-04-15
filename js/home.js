const popBlogsCards = document.querySelector('.pop_blogs__cards');
let url = 'https://api.newscatcherapi.com/v2/search?q=News'

fetch(url, {
    method: 'GET',
    headers: {
        'x-api-key': '49krSK-rLHZBDM8MZNiZEsLqgsm8U3hEBZquwHeDA18'
    }
}).then((response) => response.json()).then((data) => {

    const threeData = data.articles.slice(0, 3)

    threeData.map((card) => {
        console.log(card);
        const blogCard = document.createElement('div');
        blogCard.classList.add('card');

        if (card.author == '') {
            blogCard.innerHTML = `
            <img class="card__img" src="${card.media}" alt="person">
        
            <div class="card__text">
                <p class="card__by">By <span>No author!</span> | ${card.published_date} </p>
        
                <h4 class="card__title">${card.topic}</h4>
        
                <p class="card__info">${card.title}</p>
            </div>`
        } else {
            blogCard.innerHTML = `
        <img class="card__img" src="${card.media}" alt="person">
    
        <div class="card__text">
            <p class="card__by">By <span>${card.author}</span> | ${card.published_date} </p>
    
            <h4 class="card__title">${card.topic}</h4>
    
            <p class="card__info">${card.title}</p>
        </div>`
        }


        popBlogsCards.appendChild(blogCard);
    })

}).catch((error) => console.error(error));