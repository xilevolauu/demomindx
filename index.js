//back to top
let mybutton = document.getElementById("myBtn-top");
window.onscroll = function() { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 60 || document.documentElement.scrollTop > 60) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

function topFunction() {
    document.documentElement.scrollTop = 0;
}

//slide
let index = 1;
changeImg = function() {
    let imgs = ["./assets/img/slider/thiet-ke-web-tin-tuc1.png", "./assets/img/slider/thiet-ke-website-tin-tuc.png"];
    document.getElementById('img').src = imgs[index];
    index++;
    if (index == 2) {
        index = 0;
    }
}
setInterval(changeImg, 2000);
//popup image
let modal = document.getElementById('myModal');
let images = document.getElementsByClassName('myImages');
let modalImg = document.getElementById("img01");
let captionText = document.getElementById("caption");
for (let i = 0; i < images.length; i++) {
    let img = images[i];
    img.onclick = function() {
        modal.style.display = "block";
        modalImg.src = this.src;
        captionText.innerHTML = this.alt;
    }
}
//close popup image
let span = document.getElementsByClassName("close")[0];
span.onclick = function() {
        modal.style.display = "none";
    }
    //menu mobile
let header = document.getElementById('header');
let mobileMenu = document.getElementById('mobile-menu');
mobileMenu.onclick = function() {
    let isClosed = header.clientHeight === 46;
    if (isClosed) {
        header.style.height = 'auto'
    } else {
        header.style.height = '46px'
    }
}


//add api


async function api() {
    let resStoryID = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty")
    let storyID = await resStoryID.json()
    let listContent = document.getElementById("listContent")
    let html = ``;
    let data = [];
    for (let i = 0; i < 3; i++) {
        let resStory = await fetch(`https://hacker-news.firebaseio.com/v0/item/${storyID[i]}.json?print=pretty`)
        let story = await resStory.json();
        data.push(story);

    }
    for (x = 0; x < data.length; x++) {
        html = html + `<div class="col s-col-full places-item">
    <a href="${data[x].url}">
    <img src="./assets/img/news.jpg" style="width:100%;height:180px";background-color:white;" >
    </a>
        <div class="places-body">
            <p class="places-desc">${data[x].title}</p>
            <p class="places-desc">Content by ${data[x].by}</p>
            <p class="places-desc">Review Score:${data[x].score}</p>
        </div>
    </div>`
    }
    listContent.innerHTML = html;
}
api()