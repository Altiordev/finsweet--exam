const menuOpen = document.querySelector('.nav__menuOpen'),
    mobileMenu = document.querySelector('.nav__mobileMenu'),
    menuClose = document.getElementById('nav__menuClose'),
    menuItem = document.querySelectorAll('.nav__mobileMenu-item'),
    navItem = document.querySelectorAll('.nav__menu-item');

menuOpen.addEventListener('click', () => {
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
});

menuClose.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = 'auto';
});

menuItem.forEach((item) => {
    item.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    })
})

navItem.forEach((item) => {
    item.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    })
})