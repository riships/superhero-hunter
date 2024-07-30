async function getHeroData() {
    /* Here get the hero id from localstorage */
    const heroId = window.localStorage.getItem('heroId');
    if (!heroId) {
        return;
    }

    /* in this url paased the hero id to get the data of that hero */
    let url;
    if (heroId && ts && publicKey && hash) {
        url = `https://gateway.marvel.com:443/v1/public/characters/${heroId}?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
    } else {
        console.error('Missing required parameters: heroId, ts, publicKey, or hash');
    }
    let data = await fetchCharacters(url);
    let hero;
    if (data) {
        hero = data[0]
    }
    if (hero) {
        // console.log(hero);
        const charDiv = document.getElementById('char-div');
        if (charDiv) {

            const heroHtml = `
                    <div class="character">
                        <h1>${hero.name}</h1>
                        <img src="${hero.thumbnail.path}.${hero.thumbnail.extension}" alt="${hero.name}" />
                        <div class="section">
                            <h2>Description</h2>
                            <p>${hero.description || "No description available."}</p>
                        </div>
                        <div class="section">
                            <h2>Comics</h2>
                            <ul>
                                ${hero.comics.items.map(comic => `<li>${comic.name}</a></li>`).join('')}
                            </ul>
                        </div>
                        <div class="section">
                            <h2>Series</h2>
                            <ul>
                                ${hero.series.items.map(series => `<li>${series.name}</a></li>`).join('')}
                            </ul>
                        </div>
                        <div class="section">
                            <h2>Stories</h2>
                            <ul>
                                ${hero.stories.items.map(story => `<li>${story.name}</a></li>`).join('')}
                            </ul>
                        </div>
                        <div class="section">
                            <h2>Events</h2>
                            <ul>
                                ${hero.events.items.map(event => `<li><a href="${event.resourceURI}">${event.name}</a></li>`).join('')}
                            </ul>
                        </div>
                        <div class="section links">
                            <h2>Links</h2>
                            ${hero.urls.map(url => `<a href="${url.url}">${url.type}</a>`).join(' ')}
                        </div>
                    </div>`;
            charDiv.innerHTML = heroHtml;
        } else {
            console.error('Element with ID "char-div" not found.');
        }
    } else {
        console.log('Failed to fetch characters');
    }
}
getHeroData();



