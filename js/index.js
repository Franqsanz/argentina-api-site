'use strict';

window.addEventListener('load', () => {
    registerSW()
    callApi()
})

async function registerSW() {
    if ('serviceWorker' in navigator) {
        try {
            await navigator.serviceWorker.register('./sw.js')
        } catch (error) {
            console.log('SW registro fallido')
        }
    }
}

function numberCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const cards = document.querySelector('.contentCards')

async function callApi() {
    let load = '<div class="load"></div>'
    cards.innerHTML = load

    let endpoint = 'http://localhost:33528/api/v1/provinces/';
    const res = await fetch(endpoint);
    const data = await res.json();

    let html = ''

    data.forEach(province => {
        html += `
            <div class="card fontOperator">
                <div class="infoCity"> ${province.province} </div>
                <div class="infoPopulation">
                    <h2 class="titleContentCard">Población</h2>
                    ${numberCommas(province.populations)}
                </div>
                <div class="infoProvince">
                    <h2 class="titleContentCard">Capital</h2>
                    ${province.capital}
                </div>
                <div class="infoProvince">
                    <h2 class="titleContentCard">Superficie Km²</h2>
                    ${numberCommas(province.surface)}
                </div>
                <div class="infoProvince">
                    <h2 class="titleContentCard">Fundación</h2>
                    ${numberCommas(province.foundation)}
                </div>
                <div class="infoProvince">
                    <h2 class="titleContentCard">Fundador</h2>
                    ${numberCommas(province.founder || 'Desconocido')}
                </div>
                <div class="infoProvince">
                    <h2 class="titleContentCard">Coordenadas</h2>
                    <ul class="ulCoord">
                        <li class="liCoord">
                            <h2 class="titleContentCard">Latitud:</h2> ${province.latitude}
                        </li>
                        <li class="liCoord">
                            <h2 class="titleContentCard">Longitud:</h2> ${province.longitude}
                        </li>
                    </ul>
                </div>
                <div class="infoRank">
                    <h2 class="titleContentCard">Región Geográfica</h2>
                    ${province.geographic_region}
                </div>
                <div class="infoRank">
                    <h2 class="titleContentCard">Rango</h2>
                    ${province.rank}
                </div>
            </div>
        `
        cards.innerHTML = html
    });
}