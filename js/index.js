window.addEventListener('load', () => {
    registerSW()
    callApi()
})

// const provinces = []

// fetch('http://localhost:33528/api/v1/provinces')
//     .then(res => res.json())
//     .then(data => provinces.push(...data))

// function findProvinces(a, province) {
//     return province.filter(place => {
//         const regex = new RegExp(a, 'gi')
//         return place.province.match(regex)
//     })
// }

function numberCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// function displayProvince() {
//     const provinceArray = findProvinces(this.value, provinces)
//     const htmlProvince = provinceArray.map(province => {
//         const regex = new RegExp(this.value, 'gi')
//         const provinceName = province.province.replace(regex, `<mark class="markName">${this.value}</mark>`)
//         return `
//             <div class="card">
//                 <div class="infoCity"> ${provinceName} </div>
//                 <div class="infoPopulation">
//                     <h2>Población</h2>
//                     ${numberCommas(province.populations)}
//                 </div>
//                 <div class="infoProvince">
//                     <h2>Ciudad Capital</h2>
//                     ${province.capital}
//                 </div>
//                 <div class="infoProvince">
//                     <h2>Fundación</h2>
//                     ${numberCommas(province.foundation)}
//                 </div>
//                 <div class="infoProvince">
//                 <h2>Fundador</h2>
//                     ${numberCommas(province.founder || 'Desconocido')}
//                 </div>
//                 <div class="infoProvince">
//                     <h2>Coordenadas</h2>
//                     <ul class="ulCoord">
//                         <li class="liCoord">
//                             <h2>Latitud:</h2> ${province.latitude}
//                         </li>
//                         <li class="liCoord">
//                             <h2>Longitud:</h2> ${province.longitude}
//                         </li>
//                     </ul>
//                 </div>
//                 <div class="infoRank">
//                     <h2>Rango</h2>
//                     ${province.rank}
//                 </div>
//             </div>
//             `
//     }).join('');
//     section.innerHTML = htmlProvince

//     if (!htmlProvince) {
//         const notData = `
//             <div class="notData">
//                 🧐¡Ups esta provincia no existe!
//             </div>
//         `
//         section.innerHTML = notData
//     }
// }

// const search = document.querySelector('.search')
const cards = document.querySelector('.contentCards')
// const contentSearch = document.querySelector('.contentSearch')

// search.addEventListener('change', displayProvince)
// search.addEventListener('keyup', displayProvince)

async function callApi() {
    let load = '<div class="load"></div>'
    cards.innerHTML = load

    // let filter = `
    //         <div class="filterSearch" id="provincias">
    //             <input type="text" class="search" placeholder="Buscar Provincias">
    //         </div>`
    // contentSearch.innerHTML = filter

    let endpoint = 'http://localhost:33528/api/v1/provinces/';
    const res = await fetch(endpoint);
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
                    <h2>Capital</h2>
                    ${province.capital}
                </div>
                <div class="infoProvince">
                <h2>Superficie Km²</h2>
                    ${numberCommas(province.surface)}
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
                    <h2>Región Geográfica</h2>
                    ${province.geographic_region}
                </div>
                <div class="infoRank">
                    <h2>Rango</h2>
                    ${province.rank}
                </div>
            </div>
        `
        cards.innerHTML = html
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