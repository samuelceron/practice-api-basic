const API_URL_RANDOM = `https://api.thecatapi.com/v1/images/search?limit=2&api_key=${API_KEY}`;
const API_URL_FAVORITES = `https://api.thecatapi.com/v1/favourites/?api_key=${API_KEY}`;
const API_URL_FAVORITES_DELETE = (id) =>  `https://api.thecatapi.com/v1/favourites/${id}?api_key=${API_KEY}`;


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
    //parseamos a JSON
    const data = await res.json();
    console.log("Random")
    
    console.log(data)
    
    if (res.status !== 200) {
        spanError.innerHTML = "Ocurrió un error: " + res.status + data.message;
    } else{
        const img1 = document.getElementById('img1');
        const img2 = document.getElementById('img2');  
        const btn1 = document.getElementById('btn1');
        const btn2 = document.getElementById('btn2');

        img1.src = data[0].url;
        img2.src = data[1].url;

        btn1.onclick = () => saveFavoriteMichi(data[0].id);
        btn2.onclick = () => saveFavoriteMichi(data[1].id);


        }
    }


async function loadFavoriteCats(){
    const res = await fetch(API_URL_FAVORITES)
    const data = await res.json();
    console.log("Favorites")
    console.log(data)
    if (res.status !== 200) {
        spanError.innerHTML = "Ocurrió un error: " + res.status + data.message;
    }else{
        const section = document.getElementById('favoriteCats')
        section.innerHTML = ""
        const h2 = document.createElement('h2');
        const h2text = document.createTextNode("Gatos favoritos")
        h2.appendChild(h2text);
        section.appendChild(h2);

        data.forEach(cat => {
            const article = document.createElement('article');
            const img = document.createElement('img');
            const btn = document.createElement('button');
            const btnText = document.createTextNode('Quitar de favoritos'); 
            
            img.src = cat.image.url;
            img.width = 150;
            
            btn.appendChild(btnText);
            btn.onclick = () => deleteFavoriteCat(cat.id)
            article.appendChild(img);
            article.appendChild(btn);
            section.appendChild(article);
        });
    }
}

async function saveFavoriteMichi(id){
    const res = await fetch(API_URL_FAVORITES,{
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            image_id: id
        }),
    })

    const data = await res.json();

    if (res.status !== 200) {
        spanError.innerHTML = "Ocurrió un error: " + res.status + data.message;
    }else{
        console.log('Gato guardado en favoritos')
        loadFavoriteCats();

    }
}

async function deleteFavoriteCat(id){
    const res = await fetch(API_URL_FAVORITES_DELETE(id),{
        method: 'DELETE',
    })
    const data = await res.json();

    if (res.status !== 200) {
        spanError.innerHTML = "Ocurrió un error: " + res.status + data.message;
    }else{
        console.log('Gato eliminado de favoritos');
        loadFavoriteCats();

    }
}

loadRandomCats();
loadFavoriteCats();
