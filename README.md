# pokedexApp

url: https://pokedexapp.azurewebsites.net/

## Features
##### -This react typescript app contains 2 pages a pokedex page and a pokemon page for each pokemon achieved using react router.

##### -Pokedex page displaying 721 pokemon from generation 1 to generation 6 using PokeApi (https://pokeapi.co/).

##### -Search bar for pokemon and a filter for generations.
![Pokedex page](/images/pokedexPageImg.png)

##### -Pokemon page showing various statistics taken from the PokeApi.
![Pokedex page](/images/pokemonPageImg.png)

##### This was deployed using azure pipeline

The build pipeline archives and publishes the build artifact whenever the master branch is updated
and the release pipeline deploys the project in order to create a continuous deployment.
