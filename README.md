# My Favourite Superheroes

This project is a simple web application that displays a list of your favorite superheroes. It allows you to view detailed information about each superhero and remove them from your favorites list. The application uses local storage to manage the list of favorite superheroes.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Project Structure](#project-structure)
- [Setup](#setup)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This web application showcases a list of favorite superheroes. You can view details of each superhero and manage your favorites list by removing superheroes. The application is built using HTML, CSS, and JavaScript.

## Features

- Display a list of favorite superheroes.
- Fetch and display superhero details dynamically.
- Remove superheroes from the favorites list.
- Persist favorite superheroes using local storage.

## Project Structure

my-favourite-superheroes/
├── css/
│ └── style.css
├── js/
│ ├── fav.js
│ └── script.js
├── index.html
└── README.md


- `css/style.css`: Contains the styling for the application.
- `js/fav.js`: Handles fetching and displaying favorite superheroes.
- `js/script.js`: Contains additional scripts and utilities.
- `index.html`: The main HTML file for the application.

## Setup

1. **Clone the repository:**

    ```sh
    git clone https://github.com/yourusername/my-favourite-superheroes.git
    ```

2. **Navigate to the project directory:**

    ```sh
    cd my-favourite-superheroes
    ```

3. **Open `index.html` in your preferred web browser.**

## Usage

1. **Display Favorite Superheroes:** The list of favorite superheroes is displayed on page load based on the IDs stored in the local storage.

2. **Remove from Favorites:** Click the "Remove from Favourite" button to remove a superhero from the favorites list. The list will automatically update.

### Example `fav.js`:

```javascript
let favList = document.getElementById('superhero-list');

function favHeroDataFunc(characterArr) {
    let favSuperheroIds = JSON.parse(localStorage.getItem('favHeroId')) || []
    let favSuperheroes;
    if (characterArr != undefined && characterArr != null && characterArr != '') {
        favSuperheroes = characterArr.filter(characterItem => favSuperheroIds.includes(characterItem.id))
    }
    let characterHTML = '';
    let superheroList = document.getElementById('superhero-list');
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
