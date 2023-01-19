/* json formatter extension para visualizar mejor la api */

// Esta funcion "Math.random()" es para que nos llame numeros aleatorios.
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

getRandomInt(1,151) // Cada una de estas sera un pokemon diferente

// Este evento es para que primero se cargue nuestro html y posteriormente nuestro javascript
document.addEventListener(('DOMContentLoaded'), () => {
  const random = getRandomInt(1,151)
  fetchData(random);
})

// Procedemos a solicitar la api
const fetchData = async (id) => {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json()
    const pokemon = {
      img: data.sprites.other.dream_world.front_default,
      nombre:data.name,
      hp: data.stats[0].base_stat,
      experience: data.base_experience,
      ataque:data.stats[1].base_stat,
      defensa:data.stats[2].base_stat,
      especial:data.stats[3].base_stat
    }
    console.log(data)    
    pintarCard(pokemon)
  } catch (error) {
    
  }
}


const pintarCard = (pokemon) => {
  const main = document.querySelector('main');
  const template = document.getElementById('template').content;
  const fragment = document.createDocumentFragment();
  const clone = template.cloneNode(true);

  clone.querySelector('.main__imagen img').setAttribute('src', pokemon.img ) 
  clone.querySelector('.main__datos h6').innerHTML= `${pokemon.nombre} <span>${pokemon.hp} hp</span>` // no coloque el text content porque me eliminaba en span, en cambio con el innerHTML puedo agregar etiquetas y al ser algo muy corto no afectara el rendimiento
  clone.querySelector('.main__datos p').textContent = `${pokemon.experience} Exp`
  clone.querySelectorAll('.reactions__item h6')[0].textContent = `${pokemon.ataque}K`
  clone.querySelectorAll('.reactions__item h6')[1].textContent = `${pokemon.especial}K`
  clone.querySelectorAll('.reactions__item h6')[2].textContent = `${pokemon.defensa}K`

  fragment.appendChild(clone);
  main.appendChild(fragment)
}


