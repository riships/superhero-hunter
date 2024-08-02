let favList = document.getElementById('superhero-list');


function favHeroDataFunc(characterArr) {
    let favSuperheroIds = JSON.parse(localStorage.getItem('favHeroId')) || []
    let favSuperheroes;
    if (characterArr != undefined && characterArr != null && characterArr != '') {
        favSuperheroes = characterArr.filter(characterItem => favSuperheroIds.includes(characterItem.id))
    }
    let superheroList = document.getElementById('superhero-list');
    let characterHTML = "";
    favSuperheroes.forEach(character => {
        characterHTML += `
                    <div class="character-card">
                        <div onclick="heroData(${character.id})">
                            <h2>${character.name}</h2>
                            <img src="${character.thumbnail.path}.${character.thumbnail.extension}" alt="${character.name}">
                            <p>${character.description || 'No description available.'}</p>
                        </div>
                        <button onclick="removeFromFav(${character.id})">Remove from Favourite</button>
                    </div>`;
    });
    if (superheroList != null && superheroList != '') {
        superheroList.innerHTML = characterHTML;
    }
}
function removeFromFav(characterId) {
    let favSuperheroIds = JSON.parse(localStorage.getItem('favHeroId')) || []
    let removedFavSuperheroes = favSuperheroIds.filter(favSuperheroId => favSuperheroId !== characterId);
    window.localStorage.setItem('favHeroId', JSON.stringify(removedFavSuperheroes));
    favHeroDataFunc(characterArr)
}
