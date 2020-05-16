const btnFloat = document.querySelector('.btnNavFloat');
const nav = document.querySelector('.ulNav');

function menuOpen() {
    btnFloat.classList.toggle('open');
    nav.classList.toggle('ulOpen');
}

btnFloat.addEventListener('click', menuOpen);