const publicKey = '2ad351d49d3e85a45986cb168e2061b3';
const privateKey = 'e476d13f73a6abf127b9870af7d8e8445887dcab';
const ts = new Date().getTime().toString();
const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();



let characterArr;
async function fetchCharacters(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.data.results;
    } catch (error) {
        console.error('Error fetching characters:', error);
        return null;
    }
}

async function main() {
    const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
    characterArr = await fetchCharacters(url);
    if (characterArr) {
        renderCharacters(characterArr);
        favHeroDataFunc(characterArr);

    } else {
        console.log('Failed to fetch characters');
    }
}

main();


const characterContainer = document.getElementById('character-container');
function renderCharacters(characters) {
    let characterHTML = '';
    characters.forEach(character => {
        characterHTML += `
                    <div class="character-card">
                        <div onclick="heroData(${character.id})">
                            <h2>${character.name}</h2>
                            <img src="${character.thumbnail.path}.${character.thumbnail.extension}" alt="${character.name}">
                            <p>${character.description || 'No description available.'}</p>
                        </div>
                        <button onclick="setFavId(${character.id})">Add to Favourites</button>
                    </div>`;
    });
    if (characterContainer != null && characterContainer != '') {
        characterContainer.innerHTML = characterHTML;
    }
}
/* Here the serch-bar function implemented to search char in the page */

let serchBar = document.getElementById('search-bar');
if (serchBar != null) {

    serchBar.addEventListener('input', function (e) {
        const query = e.target.value.toLowerCase();
        const filteredCharacters = characterArr.filter(character =>
            character.name.toLowerCase().includes(query)
        );
        renderCharacters(filteredCharacters);
    });
}

/* Here we have added hero data in localstorage and onclick moved to hero pages */

function heroData(heroId) {
    window.localStorage.setItem('heroId', heroId);
    window.location.href = 'hero.html';
}


/* Here we will add fav hero id to localstorage */
let favIdArr;
let favHeroCount = JSON.parse(localStorage.getItem('favHeroId')) || [];
if (favHeroCount === undefined) {
    favIdArr = []
}else{
    favIdArr = favHeroCount
}

function setFavId(favId) {
    if (favId != undefined) {
        favIdArr.push(favId)
        window.localStorage.setItem('favHeroId', JSON.stringify(favIdArr));
    }
    /* Here the count of fav heros set */
    
    if (document.getElementById('numberOfFavCount')) {
        document.getElementById('numberOfFavCount').innerHTML = favHeroCount.length;
    }
}
setFavId()
