const API_KEY= "4e0e35e00f6c48c69631172d04f84c19";
const url = "https://newsapi.org/v2/everything?q=";
window.addEventListener('load',()=>fetchNews('INDIA'));

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`)
    const data = await res.json();
    console.log(data);
    bindData(data.articles);
}

function bindData(articles) {
   const cardsContainer = document.getElementById('cards-container');
   const newscardtemplate = document.getElementById('template-news-card');

   cardsContainer.innerHTML = '';

   articles.forEach((article) => {
       if(!article.urlToImage) return;
       const cardclone = newscardtemplate.content.cloneNode(true);
       fillDataInCard(cardclone,article);
       cardsContainer.appendChild(cardclone);
   });
}

function fillDataInCard(cardclone,article) {
    const newsImg = cardclone.querySelector('#news-img');
    const newsTitle = cardclone.querySelector('#news-title');
    const newsSource = cardclone.querySelector('#news-source');
    const newsDesc = cardclone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString('en-US',{
        timeZone: "Asia/Jakarta"
    });

    newsSource.innerHTML=`${article.source.name}. ${date}`;
    cardclone.firstElementChild.addEventListener('click',()=>{
        window.open(article.url, "_blank");
    })
}
let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active')
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');
}

const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('search-text');

searchButton.addEventListener('click', ()=>{
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = null;    
    
})