
// selecting what classes will be modified
const pokemonName = document.querySelector('.pokemon-name');
const pokemonNumber = document.querySelector('.pokemon-number');
const pokemonImage = document.querySelector('.pokemon-image');

const form = document.querySelector('.form');
const input = document.querySelector('.input-search');

const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

//function to fecth data from the API
const fetchPokemon = async (pokemon) => {

    
    const APIresponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    //console.log(APIresponse);

    //only returns data if API response is found(200) EXIST
    if (APIresponse.status == 200) {
        //extracting response in JSON
        const data = await APIresponse.json();

        //console.log(data);

        return data;
    }

}

//rendering pokemon
const renderPokemon = async (pokemon) => {

    //show Loading message while the render is not ready.
    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

    //fetch the pokemon information
    const data = await fetchPokemon(pokemon);

    //only returns fetched information if 'data' EXIST
    if (data) {
        //adding fetched data into HTML (line2)
        
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        pokemonImage.style.display = 'block';

        //clears the value after searched.
        input.value = '';
        searchPokemon = data.id;

    } else {

        //if the reuturn doesnt exist, hide image, update name, and number.
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not found!';
        pokemonNumber.innerHTML = '';
    }



}

//listening the form submission (submit), receives an event, and call the render function.
form.addEventListener('submit', (event) => {

    //prevent empty values
    event.preventDefault();

    //calls fuction that renders the data submitted.
    //note that it needs to transform all lowercase, otherwise API won't understand.
    renderPokemon(input.value.toLowerCase());

});

//listening the button to run prev or next event.
buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
    renderPokemon(searchPokemon);
    }
    
})

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
})


//to aways render the 1st pokemon when load.
renderPokemon('1');