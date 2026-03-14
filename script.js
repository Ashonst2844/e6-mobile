function goToPage(target) {
    console.log(target)
    location.href = "#"+target
}

let slideIndex = 1;
showSlides(slideIndex);

function changeSlide(n) {
  showSlides(slideIndex += n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("about-slides");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slides[slideIndex-1].style.display = "flex";  
  slides[slideIndex-1].style.animation = "slide 1s";  
}

const category = document.querySelectorAll('input[name="operator"]');
const contents = document.querySelectorAll('.display');

category.forEach(radio => {
  radio.addEventListener('change', () => {

    contents.forEach(c => c.classList.remove('active'));

    const target = document.querySelector("#" + radio.value + "List");
    if (target) {
        target.classList.add('active');
    }
  });
});

let charName = ""

fetch('src/operatorList.json')
    .then(response => response.json())
    .then(data => {
        const attacker = document.querySelector('#attackerList');
        const defender = document.querySelector('#defenderList');

        const preview = document.getElementById('operatorPreview')
        const namePreview = document.getElementById('namePreview')
        const imgPreview = document.getElementById('imagePreview')
        const primary = document.getElementById('primary')
        const secondary = document.getElementById('secondary')
        const ability = document.getElementById('ability')
        const primaryPreview = document.getElementById('primaryWeapon')
        const secondaryPreview = document.getElementById('secondaryWeapon')
        const abilityPreview = document.getElementById('abilitySkill')
        data.forEach((item) => {
            const cards = document.createElement("div")
            cards.setAttribute("class", "operator-cards")
            cards.style.backgroundImage = `url(src/img/operators/${item.name}.avif)`
            
            const title = document.createElement("span")
            title.innerText = item.name

            const shining = document.createElement("div")
            shining.setAttribute("class", "shining")

            cards.appendChild(title)
            cards.appendChild(shining)
            if (item.type === "attacker") {
              attacker.appendChild(cards)
            } else {
              defender.appendChild(cards)
            }


            cards.addEventListener('click', () => {
              imgPreview.setAttribute("src", `src/img/operators/${item.name}.avif`)
              namePreview.innerText = item.name
              primary.style.backgroundImage = `url(src/img/ability/${item.name}/primary.webp)`
              secondary.style.backgroundImage = `url(src/img/ability/${item.name}/secondary.webp)`
              ability.setAttribute("src", `src/img/ability/${item.name}/ability.webp`)
              primaryPreview.innerText = item.primary
              secondaryPreview.innerText = item.secondary
              abilityPreview.innerText = item.ability
              preview.style.display = "flex"
            });
        });
    })
    .catch(error => console.error('Error loading JSON data:', error));

fetch('src/mapList.json')
    .then(response => response.json())
    .then(data => {
        const container = document.querySelector('#mapsBox');
        data.forEach((item) => {
            const cards = document.createElement("div")
            cards.setAttribute("class", "map-cards")
            cards.style.backgroundImage = `url(src/img/maps/${item.name}.avif)`
            
            const title = document.createElement("span")
            title.innerText = item.name

            cards.appendChild(title)
            container.appendChild(cards)
        });

    })
    .catch(error => console.error('Error loading JSON data:', error));

document.querySelector("#close").addEventListener('click', ()=> {
  const modal = document.getElementById('operatorPreview');
  if (modal) {
    modal.style.display = 'none';
  }
})