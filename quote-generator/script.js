// Global Declarations
const quote = document.getElementById('quote');
const author = document.getElementById('author');
const newQuote = document.getElementById('new-quote');
const twitterButton = document.getElementById('twitter')
const quoteText = document.querySelector('.quote-text')
const quoteContainer = document.querySelector('.quote-container')
const loader = document.querySelector('.loader')
let allQuotes = [];

// Show Loader
function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loader
function hideLoadingSpinner() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}
// Get Quotes from API
async function initQuotes() {
    showLoadingSpinner();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const something = await fetch(apiUrl);
        allQuotes = await something.json();
    } catch (error) { 
        alert('Error')
    }
}

// Get One Quote 
async function getOneQuote() {
    showLoadingSpinner()
    // Pick a random quote from allQuotes array
    if(allQuotes.length == 0) {
         await initQuotes();
    }
    const oneQuote = allQuotes[Math.floor(Math.random() * allQuotes.length)];
    
    // Check if author field is blank and replace it with 'Unknown'
    if(!oneQuote.author) {
    author.textContent = "Unkown"; 
    } else {
        author.textContent = oneQuote.author; 
    }
    
    // Check if text field very long otherwise change font size
    quote.textContent = oneQuote.text;
    if(quote.textContent.length > 120) {
        quoteText.classList.add("long-quote-text")
    } else {
        quoteText.classList.remove("long-quote-text")
    }
 hideLoadingSpinner()
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote.textContent} - ${author.textContent}`
    window.open(twitterUrl, '_blank')
}

// Event Listeners
newQuote.addEventListener('click', getOneQuote)
twitterButton.addEventListener('click', tweetQuote)

// First Run
getOneQuote()
