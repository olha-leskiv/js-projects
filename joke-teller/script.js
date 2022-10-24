let audioElement = document.getElementById('audio');
let joke = '';

const button = document.getElementById('button');

// Toggle Disable Button
function toggleBtn() {
    button.disabled = !button.disabled;
    console.log('worked')
}

// Get Jokes from Jokes Api
async function getJokeFromApi() {
    const apiUrl = 'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist';
    try {
     let response = await fetch(apiUrl);
     let jokeText = await response.json();
     if(jokeText.type === "twopart") {
        joke = `${jokeText.setup} ... ${jokeText.delivery}`;
     } else {
     joke = jokeText.joke;
     }
     speakJoke(joke);
     toggleBtn();
    } catch (error) {
     console.log(error)
    }
 }

// Speak a Joke
function speakJoke(joke) {
    VoiceRSS.speech({
        key: '96ae576f094b44469085d7694e29fd8e',
        src: joke,
        hl: 'en-us',
        v: 'John',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Events
button.addEventListener('click', getJokeFromApi);
audioElement.addEventListener('ended', toggleBtn);
