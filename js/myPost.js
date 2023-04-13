const openModal = document.querySelector('.myPost__btn'),
    closeModal = document.querySelector('.close__addPost'),
    modal = document.querySelector('.addPost__modal'),
    addPostWrapper = document.querySelector('.addPost'),
    addPostBtn = document.querySelector('.btn__addPost'),
    deletePostsBtn = document.querySelector('.myPost__btn-delete'),
    postWrapper = document.querySelector('.myPost__main'),
    addPostForm = document.querySelector('.addPostForm');

openModal.addEventListener('click', () => {
    modal.classList.add('active');
    addPostWrapper.classList.add('active');
    document.body.style.overflowY = 'hidden'
})

closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
    addPostWrapper.classList.remove('active');
    document.body.style.overflowY = 'auto'
})


addPostForm.addEventListener('submit', (e) => {
    // e.preventDefault();
    modal.classList.remove('active');
    addPostWrapper.classList.remove('active');
    document.body.style.overflowY = 'auto';

    const img = document.querySelector('.addPost__img').files[0],
        theme = document.querySelector('.addPost__type').value,
        title = document.querySelector('.addPost__title').value,
        description = document.querySelector('.addPost__description').value;

    const reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onloadend = () => {
        const imgUrl = reader.result;
        let id = Date(Date.now()).toString();
        const postObj = {
            imgUrl: imgUrl,
            theme: theme,
            title: title,
            description: description
        }

        localStorage.setItem(id, JSON.stringify(postObj));
    };


    addPostForm.reset();
})

addPostBtn.addEventListener('click', () => {
    setActive()
})


for (const key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {

        const objCard = JSON.parse(localStorage.getItem(key));

        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML += `        
            <img src="${objCard.imgUrl}" alt="person">
            <div class="card__text">
            <span class="card__theme">${objCard.theme}</span>
            <h3 class="card__title">${objCard.title}</h3>
            <p class="card__info">${objCard.description}</p>
            </div>            
            `

        postWrapper.appendChild(card)
    }
}

deletePostsBtn.addEventListener('click', () => {
    localStorage.clear();
    location.reload();
    window.location.reload();
})