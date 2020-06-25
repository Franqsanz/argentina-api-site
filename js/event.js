'use strict';

const btnFloat = document.querySelector('.btnNavFloat');
const nav = document.querySelector('nav');
const aNav = document.querySelectorAll('.aNav');

function menuOpen() {
    btnFloat.classList.toggle('open');
    nav.classList.toggle('navOpen');
}

btnFloat.addEventListener('click', menuOpen);
aNav.forEach(a => a.addEventListener('click', menuOpen));