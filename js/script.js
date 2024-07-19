const publicKey = '2ad351d49d3e85a45986cb168e2061b3';
const privateKey = 'e476d13f73a6abf127b9870af7d8e8445887dcab';
const ts = new Date().getTime().toString();
const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();

function fetchCharacterData() {
    const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            favHeroDataFunc(data.data.results)
            const characterContainer = document.getElementById('character-container');
            const characterArr = data.data.results;
            

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
            renderCharacters(characterArr);
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
        })
        .catch(error => console.error('Error:', error));
}

/* Here we have added hero data in localstorage and onclick moved to hero pages */

function heroData(heroId) {
    window.localStorage.setItem('heroId', heroId);
    window.location.href = 'hero.html';
}


/* Here we will add fav hero id to localstorage */
let favIdArr = []
function setFavId(favId){ 
    favIdArr.push(favId)
    window.localStorage.setItem('favHeroId', favIdArr);
}

fetchCharacterData();
