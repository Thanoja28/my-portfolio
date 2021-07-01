
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

// -----------------------------------------------------

// popovers display
function displayPop() {
  var popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
}

// ------------------------------------------------------

// knowledge breaker
const containerQuote = document.getElementById('container-quote');
const textQuote = document.getElementById('quote');
const textAuthor = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('quote-new');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show loading
function showLoadingSpinner() {
  loader.hidden = false;
  containerQuote.hidden = true;
}

// hide loading
function removeLoadingSpinner() {
  containerQuote.hidden = false;
  loader.hidden = true;

}

// Show New Quote
function newQuote() {

  // Get a random quote from an apiQuotes array
  const quotes = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  // Check if Author field is blank and replace it with "Unknown"
  if (!quotes.author) {
    textAuthor.textContent = 'Unknown';
  }

  else {
    textAuthor.textContent = quotes.author;
  }

   // check Quote length to determine style
   if(quotes.text.length > 150) {

    textQuote.classList.add('long-quote');
  }

  else {
    textQuote.classList.remove('long-quote');
  }

  textQuote.textContent = quotes.text;
}

// Get Quotes from API
async function getQuotes() {
  showLoadingSpinner();
  const apiUrl = 'https://type.fit/api/quotes';

  try {

    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();

    // stop loader
    removeLoadingSpinner();

  } catch (error) {

      alert('no Quotes found');
  }
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${textQuote.textContent} - ${textAuthor.textContent}`;
  window.open(twitterUrl, '_blank');
}

//  add EventListeners for the buttons
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// onLoad
getQuotes();


