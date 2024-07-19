function getHeroData() {
    /* Here get the hero id from localstorage */
    const heroId = window.localStorage.getItem('heroId');
    if (!heroId) {
        // console.error('Hero ID not found.');
        return;
    }

    /* in this url paased the hero id to get the data of that hero */
    const url = `https://gateway.marvel.com:443/v1/public/characters/${heroId}?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            const charDiv = document.getElementById('char-div');
            if (charDiv) {
                const hero = data.data.results[0];
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
                                ${hero.comics.items.map(comic => `<li><a href="${comic.resourceURI}">${comic.name}</a></li>`).join('')}
                            </ul>
                        </div>
                        <div class="section">
                            <h2>Series</h2>
                            <ul>
                                ${hero.series.items.map(series => `<li><a href="${series.resourceURI}">${series.name}</a></li>`).join('')}
                            </ul>
                        </div>
                        <div class="section">
                            <h2>Stories</h2>
                            <ul>
                                ${hero.stories.items.map(story => `<li><a href="${story.resourceURI}">${story.name}</a></li>`).join('')}
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
        })
        .catch(error => console.error('Error fetching hero data:', error));
}

document.addEventListener('DOMContentLoaded', getHeroData);
