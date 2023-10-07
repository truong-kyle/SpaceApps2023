const axios = require('axios').default();

function alertEnglish(){
    alert(translate("FIRE"));
}

const english = document.getElementById('sendEnglish');

async function translate(text) {  
    let res = await axios.post(`https://translation.googleapis.com/language/translate/v2?key=${AIzaSyDklsjfLr9guxD8jRTparMiCtzpK967E2s}`,  
    { q: text, target: "fr" }  );  
let translation = res.data.data.translations[0].translatedText;  
return translation;}

english.addEventListener('click', alertEnglish);