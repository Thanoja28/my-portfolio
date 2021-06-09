
// Navbar Animations

const nav = document.querySelector('#main');
    let topOfNav = nav.offsetTop;
    console.log(topOfNav);

    function fixNav() {
      if (window.scrollY >= topOfNav) {
        document.body.style.paddingTop = nav.offsetHeight + 'px';
        document.body.classList.add('fixed-nav');
      } else {
        document.body.classList.remove('fixed-nav');
        document.body.style.paddingTop = 0;
      }
    }

    window.addEventListener('scroll', fixNav);


    // Mole Game scripts

    const holes = document.querySelectorAll('.hole');
const scorebox = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let lstHole;
let timeUp = false;
let score = 0;

  function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole === lstHole) {
      console.log('Ah nah thats the same one bud');
      return randomHole(holes);
    }
    lstHole = hole;
    return hole;
  }

  function peep() {
    const time = randomTime(200, 1000);
    const hole = randomHole(holes);
    hole.classList.add('up');
    setTimeout(() => {
      hole.classList.remove('up');
      if (!timeUp) peep();
    }, time);
  }

  function startGame() {
    scorebox.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => timeUp = true, 10000)
  }

  function scoregenerator(e) {
    if(!e.isTrusted) return;
    score++;
    this.parentNode.classList.remove('up');
    scorebox.textContent = score;
  }

  moles.forEach(mole => mole.addEventListener('click', scoregenerator));

  // popovers display

  function displayPop() {
  var popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
}

