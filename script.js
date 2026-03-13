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
  console.log(slideIndex)
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
    console.log(target.id)

  });
});

fetch('src/operatorList.json')
    .then(response => response.json())
    .then(data => {
        const attacker = document.querySelector('#attackerList');
        const defender = document.querySelector('#defenderList');
        data[0].attacker.forEach((item) => {
            const cards = document.createElement("div")
            cards.setAttribute("class", "operator-cards")
            cards.style.backgroundImage = `url(src/img/operators/attacker/${item.name}.avif)`
            
            const title = document.createElement("span")
            title.innerText = item.name

            const shining = document.createElement("div")
            shining.setAttribute("class", "shining")

            cards.appendChild(title)
            cards.appendChild(shining)
            attacker.appendChild(cards)
        });
        data[0].defender.forEach((item) => {
            const cards = document.createElement("div")
            cards.setAttribute("class", "operator-cards")
            cards.style.backgroundImage = `url(src/img/operators/defender/${item.name}.avif)`
            
            const title = document.createElement("span")
            title.innerText = item.name

            const shining = document.createElement("div")
            shining.setAttribute("class", "shining")

            cards.appendChild(title)
            cards.appendChild(shining)
            defender.appendChild(cards)
        });

    })
    .catch(error => console.error('Error loading JSON data:', error));
