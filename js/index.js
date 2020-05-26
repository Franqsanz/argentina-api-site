window.addEventListener('load', () => {
    registerSW()
    callApi()
})

const provinces = []

fetch('http://localhost:33528/api/v1/provinces')
    .then(res => res.json())
    .then(data => provinces.push(...data))

function findProvinces(a, province) {
    return province.filter(place => {
        const regex = new RegExp(a, 'gi')
        return place.province.match(regex)
    })
}

function numberCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function displayProvince() {
    const provinceArray = findProvinces(this.value, provinces)
    const htmlProvince = provinceArray.map(province => {
        const regex = new RegExp(this.value, 'gi')
        const provinceName = province.province.replace(regex, `<mark class="markName">${this.value}</mark>`)
        return `
            <div class="card">
                <div class="infoCity"> ${provinceName} </div>
                <div class="infoPopulation">
                    <h2>Población</h2>
                    ${numberCommas(province.populations)}
                </div>
                <div class="infoProvince">
                    <h2>Ciudad Capital</h2>
                    ${province.capital}
                </div>
                <div class="infoProvince">
                    <h2>Fundación</h2>
                    ${numberCommas(province.foundation)}
                </div>
                <div class="infoProvince">
                <h2>Fundador</h2>
                    ${numberCommas(province.founder || 'Desconocido')}
                </div>
                <div class="infoProvince">
                    <h2>Coordenadas</h2>
                    <ul class="ulCoord">
                        <li class="liCoord">
                            <h2>Latitud:</h2> ${province.latitude}
                        </li>
                        <li class="liCoord">
                            <h2>Longitud:</h2> ${province.longitude}
                        </li>
                    </ul>
                </div>
                <div class="infoRank">
                    <h2>Rango</h2>
                    ${province.rank}
                </div>
            </div>
            `
    }).join('');
    section.innerHTML = htmlProvince

    if (!htmlProvince) {
        const notData = `
            <div class="notData">
                🧐¡Ups esta provincia no existe!
            </div>
        `
        section.innerHTML = notData
    }
}

const search = document.querySelector('.search')
const section = document.querySelector('section')

search.addEventListener('change', displayProvince)
search.addEventListener('keyup', displayProvince)

async function callApi() {
    let load = '<div class="load"></div>'
    section.innerHTML = load

    let URI = 'http://localhost:33528/api/v1/provinces';
    const res = await fetch(URI);
    const data = await res.json();

    let html = ''
    data.forEach(province => {
        html += `
            <div class="card">
                <div class="infoCity"> ${province.province} </div>
                <div class="infoPopulation">
                    <h2>Población</h2>
                    ${numberCommas(province.populations)}
                </div>
                <div class="infoProvince">
                    <h2>Ciudad Capital</h2>
                    ${province.capital}
                </div>
                <div class="infoProvince">
                <h2>Fundación</h2>
                    ${numberCommas(province.foundation)}
                </div>
                <div class="infoProvince">
                <h2>Fundador</h2>
                    ${numberCommas(province.founder || 'Desconocido')}
                </div>
                <div class="infoProvince">
                    <h2>Coordenadas</h2>
                    <ul class="ulCoord">
                        <li class="liCoord">
                            <h2>Latitud:</h2> ${province.latitude}
                        </li>
                        <li class="liCoord">
                            <h2>Longitud:</h2> ${province.longitude}
                        </li>
                    </ul>
                </div>
                <div class="infoRank">
                    <h2>Rango</h2>
                    ${province.rank}
                </div>
            </div>
        `
        section.innerHTML = html
    });
}

async function registerSW() {
    if ('serviceWorker' in navigator) {
        try {
            await navigator.serviceWorker.register('./sw.js')
        } catch (error) {
            console.log('SW registro fallido')
        }
    }
}

// 15771581
// 3384649
// 3269134
// 1780854
// 1494358
// 1259903
// 1243386
// 1117121
// 1083740
// 1021242
// 883684
// 698476
// 685870
// 650511
// 573881
// 553528
// 515203
// 445477
// 378977
// 343765
// 328155
// 276407
// 132116
// 3038430