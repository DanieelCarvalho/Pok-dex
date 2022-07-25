const pokemonName = document.querySelector('.pokemonName') 
const pokemonNumber = document.querySelector('.pokemonNumber') 
const pokemonImage = document.querySelector('.pokemonImage')

const form = document.querySelector('.form');
const input = document.querySelector('.inputSearch')
const btnPrev = document.querySelector('.btnPrev')
const btnNext = document.querySelector('.btnNext')
 
let searchPokemon = 1

const fetchPokemon = async (pokemon) =>{
    const APIResponse = await  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    
    if(APIResponse.status ===200){
    const data = await APIResponse.json();
    return data;
    }
}
const renderPokemon = async (pokemon) =>{
    
    pokemonName.innerHTML = "Loading...";
    pokemonNumber.innerHTML = "";

    const data = await fetchPokemon(pokemon);

    

    if(data){

    pokemonName.innerHTML = data.name;
    pokemonImage.style.display = "block"
    pokemonNumber.innerHTML = data.id
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value= "";
    searchPokemon = data.id;
    } else{
        pokemonName.innerHTML = "Not found"
        pokemonNumber.innerHTML = ""
        pokemonImage.style.display = "none"
    }    
};

form.addEventListener('submit', (event) =>{
    event.preventDefault();
    renderPokemon(input.value.toLowerCase())
    
});

btnPrev.addEventListener('click', () =>{
    if(searchPokemon > 1){
    searchPokemon -=1;
    renderPokemon(searchPokemon)
    }
});
btnNext.addEventListener('click', () =>{
    searchPokemon +=1;
    renderPokemon(searchPokemon)
});
renderPokemon(searchPokemon)