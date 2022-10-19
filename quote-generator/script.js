// Global Declarations
const quote = document.getElementById('quote');
const author = document.getElementById('author');
const newQuote = document.getElementById('new-quote');
const twitterButton = document.getElementById('twitter')
const quoteContainer = document.querySelector('.quote-text')
let allQuotes = [];

// Get Quotes from API
async function initQuotes() {
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const something = await fetch(apiUrl);
        allQuotes = await something.json();
    } catch (error) { 
        alert('Error')
    }
}

// Get One Quote 
async function getOneQuote() {
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
        quoteContainer.classList.add("long-quote-text")
    } else {
        quoteContainer.classList.remove("long-quote-text")
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote.textContent} - ${author.textContent}`
    window.open(twitterUrl, '_blank')
}

getOneQuote()

// Event Listeners
newQuote.addEventListener('click', getOneQuote)
twitterButton.addEventListener('click', tweetQuote)