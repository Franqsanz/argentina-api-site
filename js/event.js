'use strict';

const btnFloat = document.querySelector('.btnNavFloat');
const nav = document.querySelector('nav');
const aNav = document.querySelectorAll('.aNav');

function menuOpen() {
    btnFloat.classList.toggle('open');
    nav.classList.toggle('navOpen');

    const status = nav.setAttribute('status', 'visible')

    if (status === 'visible') {
        nav.setAttribute('status', 'hidden')
        btnFloat.setAttribute('aria-expanded', 'false');
    } else {
        nav.setAttribute('status', 'visible')
        btnFloat.setAttribute('aria-expanded', 'true');
    }
}

btnFloat.addEventListener('click', menuOpen);
aNav.forEach(a => a.addEventListener('click', menuOpen));