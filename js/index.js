let gameDetailsPage = document.querySelector(".gameDetails");
let carousel_inner = document.querySelectorAll(".carousel-inner div");
let carousel_indicators = document.querySelectorAll(".carousel-indicators button");
let nav_link = document.querySelectorAll(".nav-link");
let gamesTable = document.querySelector(".gamesTable");
let input = document.querySelector("input");
let search = document.querySelector(".search");

var hhtpReqDetailsArr = []
var targetGameID;
var category;
var gamesArr = [];


function DisplayAllGames() {
    const gamesdata = null;
    const games = new XMLHttpRequest();
    games.withCredentials = true;
    var game = []
    gamesArr = [];
    $(".loadingScreen").fadeIn(200)
    games.open("GET", "https://free-to-play-games-database.p.rapidapi.com/api/games");
    games.setRequestHeader("X-RapidAPI-Key", "9118f301bemsh8e883dcceb053b1p1d35a0jsn0ae27cf66249");
    games.setRequestHeader("X-RapidAPI-Host", "free-to-play-games-database.p.rapidapi.com");

    games.send(gamesdata);
    games.addEventListener("readystatechange", function () {
	if (this.readyState === this.DONE) {
		gamesArr = JSON.parse(this.response)
        for (let a = 0; a < gamesArr.length; a++) {
            game += `<div class="col-xxl-2 col-xl-3 col-md-4 col-sm-6">
            <div id="${gamesArr[a].id}" class="card shadow rounded-1 border-1">
            <img src="${gamesArr[a].thumbnail}" class="card-img-top" alt="...">
            <div class="card-body">
                <div class="titleTop d-flex align-items-center justify-content-between">
                <h5 class="card-title text-light fs-6 fw-bold">${gamesArr[a].title}</h5>
                <p class="freeBtn border-0 rounded-1 text-light">Free</p>
                </div>
                <p class="card-text fw-lighter">${gamesArr[a].short_description}</p>
            </div>
            <div class="cardFooter d-flex justify-content-between align-items-center border-top border-dark p-2">
                <p>${gamesArr[a].genre}</p>
                <p>${gamesArr[a].platform}</p>
            </div>
            </div>
            </div>`
        }
        
        gamesTable.innerHTML = game
        $(".loadingScreen").fadeOut(400)
        var cards = document.querySelectorAll(".gamesTable .card");
        for (let d = 0; d < cards.length; d++) {
            cards[d].addEventListener("click", ()=>{
                targetGameID = cards[d].id
                gameDetails(targetGameID)
            })
            
        }
        //Input
        input.addEventListener("input", ()=> {
            if (input.value == '') {
                $(".loadingScreen").fadeIn(200)
                $(".allGames").addClass("active")
                DisplayAllGames()
            }else {
        var game2 = []
        $(nav_link).removeClass("active")
        for (let y = 0; y < gamesArr.length; y++) {
            if (gamesArr[y].title.toLowerCase().includes(input.value.toLowerCase())) {
                
                for (let a = 0; a < gamesArr.length; a++) {
                    game2 = `<div class="col-xxl-3 col-xl-3 col-md-4 col-sm-6 m-auto">
                    <div id="${gamesArr[y].id}" class="card shadow rounded-1 border-1">
                    <img src="${gamesArr[y].thumbnail}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <div class="titleTop d-flex align-items-center justify-content-between">
                        <h5 class="card-title text-light fs-6 fw-bold">${gamesArr[y].title}</h5>
                        <p class="freeBtn border-0 rounded-1 text-light">Free</p>
                        </div>
                        <p class="card-text fw-lighter">${gamesArr[y].short_description}</p>
                    </div>
                    <div class="cardFooter d-flex justify-content-between align-items-center border-top border-dark p-2">
                        <p>${gamesArr[y].genre}</p>
                        <p>${gamesArr[y].platform}</p>
                    </div>
                    </div>
                    </div>`
                }
                
                gamesTable.innerHTML = game2
                $(".loadingScreen").fadeOut(400)
                var cards = document.querySelectorAll(".gamesTable .card");
                for (let d = 0; d < cards.length; d++) {
                    cards[d].addEventListener("click", ()=>{
                        targetGameID = cards[d].id
                        gameDetails(targetGameID)
                    })
                    
                }

            }
        }}
    })
        }
    });


}

//all games navbar
$(".allGames").click(()=>{DisplayAllGames()})
function displayGames(category) {
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    const data = null;
    var game = []
    var xhrArr = [];
    $(".loadingScreen").fadeIn(200)
    xhr.open("GET", `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`);
    xhr.setRequestHeader("X-RapidAPI-Key", "9118f301bemsh8e883dcceb053b1p1d35a0jsn0ae27cf66249");
    xhr.setRequestHeader("X-RapidAPI-Host", "free-to-play-games-database.p.rapidapi.com");
    xhr.send(data);
    xhr.addEventListener("readystatechange", function () {
        
    if (xhr.readyState === 4 && xhr.status === 200) {
        
        xhrArr = JSON.parse(xhr.response)
        for (let k = 0; k < xhrArr.length; k++) {
            game += `<div class="col-xxl-2 col-xl-3 col-md-4 col-sm-6">
            <div id="${xhrArr[k].id}" class="card shadow rounded-1 border-1">
            <img src="${xhrArr[k].thumbnail}" class="card-img-top" alt="...">
            <div class="card-body">
                <div class="titleTop d-flex align-items-center justify-content-between">
                <h5 class="card-title text-light fs-6 fw-bold">${xhrArr[k].title}</h5>
                <p class="freeBtn border-0 rounded-1 text-light">Free</p>
                </div>
                <p class="card-text fw-lighter">${xhrArr[k].short_description}</p>
            </div>
            <div class="cardFooter d-flex justify-content-between align-items-center border-top border-dark p-2">
                <p>${xhrArr[k].genre}</p>
                <p>${xhrArr[k].platform}</p>
            </div>
            </div>
            </div>`
        }
        
        gamesTable.innerHTML = game
        $(".loadingScreen").fadeOut(400)
        var cards = document.querySelectorAll(".gamesTable .card");
        for (let d = 0; d < cards.length; d++) {
            cards[d].addEventListener("click", ()=>{
                targetGameID = cards[d].id
                gameDetails(targetGameID)
            })
            
        }
    }
});
}
function gameDetails(targetGameID) {
    $(".loadingScreen").fadeIn(200)
    const details = null;
    const hhtpReqDetails = new XMLHttpRequest();
    hhtpReqDetailsArr = []
    hhtpReqDetails.withCredentials = true;
    hhtpReqDetails.open("GET", `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${targetGameID}`);
    hhtpReqDetails.setRequestHeader("X-RapidAPI-Key", "9118f301bemsh8e883dcceb053b1p1d35a0jsn0ae27cf66249");
    hhtpReqDetails.setRequestHeader("X-RapidAPI-Host", "free-to-play-games-database.p.rapidapi.com");

    hhtpReqDetails.addEventListener("readystatechange", function () {
    if (hhtpReqDetails.readyState === 4 && hhtpReqDetails.status === 200) {
        hhtpReqDetailsArr = JSON.parse(hhtpReqDetails.response)
        $(".gameDetails").fadeIn(300)
        displayDetailsInfo(hhtpReqDetailsArr)
    }
});
hhtpReqDetails.send(details);
}

function displayDetailsInfo(hhtpReqDetailsArr) {


    for (let f = 0; f < carousel_inner.length; f++) {
        $(carousel_inner).removeClass("active")
        $(carousel_inner[0]).addClass("active")
                        
        for (let s = 0; s < carousel_indicators.length; s++) {
            $(carousel_indicators).removeClass("active")
            $(carousel_indicators[0]).addClass("active")
            
        }
    }
    $(".loadingScreen").fadeOut(400)
    $(".gameDetPic").attr( "src", `${hhtpReqDetailsArr.thumbnail}`)
    $(".gameDetSS1").attr( "src", `${hhtpReqDetailsArr.screenshots[0].image}`)
    $(".gameDetSS2").attr( "src", `${hhtpReqDetailsArr.screenshots[1].image}`)
    $(".gameDetSS3").attr( "src", `${hhtpReqDetailsArr.screenshots[2].image}`)
    $(".gameDetTitle").html(`${hhtpReqDetailsArr.title}`)
    $(".gameDetCategory").html(`${hhtpReqDetailsArr.genre}`)
    $(".gameDetPlatform").html(`${hhtpReqDetailsArr.platform}`)
    $(".gameDetStatus").html(`${hhtpReqDetailsArr.status}`)
    $(".gameDetDesc").html(`${hhtpReqDetailsArr.description}`)
    $(".gameDetProfBtn").attr( "href", `${hhtpReqDetailsArr.freetogame_profile_url}`)
    $(".gameDetWebBtn").attr( "href", `${hhtpReqDetailsArr.game_url}`)

}




// Navbar Links
for (let i = 0; i < nav_link.length; i++) {
    nav_link[i].addEventListener("click", ()=> {
        $(nav_link).removeClass("active")
        $(nav_link[i]).addClass("active")
        if (nav_link[i].innerHTML == "All") {
            DisplayAllGames()
        }else{
        category = nav_link[i].innerHTML.replace(/\s+/g, '-').toLowerCase();
        displayGames(category)
    }
    });
    
}


// $(document).load()
//Scroll
document.addEventListener("scroll", ()=> {
    if (scrollY == 0) {
        $(".navbar-collapse").addClass("show")
    }
    if (scrollY >= 150) {
        $("nav").css("background-color","rgba(58, 73, 123, 0.975)")
        $("#navbar").removeClass("fullPage")
        $(".topBtn").fadeIn(500)
    }else{
        $("nav").css("background-color","rgba(58, 73, 123, 0.6)")
        $("#navbar").addClass("fullPage")
        $(".topBtn").fadeOut(500)
    }
})


//Close Game Details Page   
let closeGameDetails  = document.querySelector(".closeGameDetails")
$(".closeGameDetails").click(()=>{
    $(".gameDetails").fadeOut(200)
})
document.addEventListener("keydown", function(e) {
    if (e.which == 27) {
        $(".gameDetails").fadeOut(200)
    }
})

DisplayAllGames()




