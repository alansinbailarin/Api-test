//importaciones del archivo config.js
import { ApiKey2, Api_key } from "./config.js";
import { urlApi } from "./config.js";
import { urlPrinc } from "./config.js";
import { urlPrincNews } from "./config.js";
import { urlNews } from "./config.js";
import { urlRecentWord} from "./config.js";
import { urlRecentWord2} from "./config.js";
import { urlNewsSearch} from "./config.js"

//datos del modal
const open = document.getElementById('open');
const modal_container = document.getElementById('modal_container');
const close = document.getElementById('close');

open.addEventListener('click', () => {
    modal_container.classList.add('show');
});

close.addEventListener('click', () => {
    modal_container.classList.remove('show');
});

//añadimos nuestras funciones
(function () {
    getNews();
    fetchNews();
    wordOfTheDay();
    onRequestHandler();
})();


//funcion para traer datos de la api sobre el covid
async function getNews (){
    await fetch(urlApi, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': urlPrinc,
            'X-RapidAPI-Key': Api_key
        }
        
    })
        .then(response => response.json())
        .then(response => {
            console.log("Covid News OK...");
            console.log(response);
            
            document.getElementById('country').textContent = response[0].Country;
            document.getElementById('totalCases').textContent = response[0].TotalCases;
            document.getElementById('activeCases').textContent = response[0].ActiveCases;
            document.getElementById('newCases').textContent = response[0].NewCases;
            document.getElementById('totalDeaths').textContent = response[0].TotalDeaths;
            document.getElementById('newDeaths').textContent = response[0].NewDeaths;
            document.getElementById('totalRecovered').textContent = response[0].TotalRecovered;
        })
        .catch(err => {console.error(err);
    });
}

//funcion para traer datos de la api sobre las noticias
async function fetchNews(){
    await fetch(urlNews, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': urlPrincNews,
            'X-RapidAPI-Key': Api_key
        }
    })
        .then(response => response.json())
        .then((response) => {
            console.log("Api news OK")
            console.log(response)

            
            for (var i = 0; i < response.articles.length; i++) {
                document.getElementById('output').innerHTML += "<div class='card'><h2>"+response.articles[i].title+"</h2><span>"+response.articles[i].summary+"</span><p class='publicacion'>"+response.articles[i].published_date+"</p><h1 class='topic'>"+response.articles[i].topic+"</h1></div> <br>";
                
            }
        });
} 


//funcion para traer datos de la api sobre la palabra del dia
async function wordOfTheDay(){
    await fetch(urlRecentWord, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': urlRecentWord2,
            'X-RapidAPI-Key': Api_key
        }
    })
        .then(response => response.json())
        .then((response) => {
            console.log("Word of the day OK..")
            console.log(response)

            document.getElementById('word').textContent = response[0].word;
            document.getElementById('mean').textContent = response[0].mean;
            document.getElementById('date').textContent = response[0].date;
        });
}

