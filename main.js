const API_URL_RANDOM = `https://api.thecatapi.com/v1/images/search?limit=2&api_key=${API_KEY}`;
const API_URL_FAVORITES = `https://api.thecatapi.com/v1/favourites/?api_key=${API_KEY}`;

const spanError = document.getElementById('error');
//Promesas
// fetch(URL)
//     .then(res => res.json())
//     .then(data =>{
//         const img = document.querySelector('img');
//         img.src = data[0].url
//     })

//ASYNC/AWAIT
async function loadRandomCats(){
    const res = await fetch(API_URL_RANDOM)
    const data = await res.json();
    console.log("Random")
    
    console.log(data)
    
    if (res.status !== 200) {
        spanError.innerHTML = "Ocurrió un error: " + res.status + data.message;
    } else{
        const img1 = document.getElementById('img1');
        const img2 = document.getElementById('img2');  

        img1.src = data[0].url;
        img2.src = data[1].url;

        }
    }


async function loadFavoriteCats(){
    const res = await fetch(API_URL_FAVORITES)
    const data = await res.json();
    console.log("Favorites")
    console.log(data)
    if (res.status !== 200) {
        spanError.innerHTML = "Ocurrió un error: " + res.status + data.message;
    }
}

async function saveFavoriteMichis(){
    const res = await fetch(API_URL_FAVORITES,{
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            image_id: "MjAzMTMwNw"
        }),
    })

    const data = await res.json();

    if (res.status !== 200) {
        spanError.innerHTML = "Ocurrió un error: " + res.status + data.message;
    }
}

loadRandomCats();
loadFavoriteCats();
