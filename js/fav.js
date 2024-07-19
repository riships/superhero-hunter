let favList = document.getElementById('superhero-list');
let favSuperheroIds = localStorage.getItem('favHeroId')||[]

function favHeroDataFunc(characters) {
    let favSuperheroes;
    if (characters != undefined && characters != null && characters != '') {
        favSuperheroes = characters.filter(characterItem => favSuperheroIds.includes(characterItem.id))
    }
    let characterHTML = '';
    let superheroList = document.getElementById('superhero-list')
    favSuperheroes.forEach(character => {
        
        characterHTML += `
                    <div class="character-card">
                        <div onclick="heroData(${character.id})">
                            <h2>${character.name}</h2>
                            <img src="${character.thumbnail.path}.${character.thumbnail.extension}" alt="${character.name}">
                            <p>${character.description || 'No description available.'}</p>
                        </div>
                        <button onclick="setFavId(${character.id})">Remove from Favourite</button>
                    </div>`;
    });
    if (superheroList != null && superheroList != '') {
        superheroList.innerHTML = characterHTML;
    }
}
