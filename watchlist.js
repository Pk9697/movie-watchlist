// import { watchListData } from "./index.js";
// console.log(watchListData);
console.log("watchlist.js loaded");
let watchListData=localStorage.getItem('watchListData')?JSON.parse(localStorage.getItem('watchListData')):[];

document.addEventListener('click',function(e){
    if(e.target.dataset.removefromwatchlist){
        removeFromWatchlist(e.target.dataset.removefromwatchlist)
    }
})

function removeFromWatchlist(imdbID){
    watchListData=watchListData.filter(watchlist=>watchlist.imdbID!==imdbID)
    renderWatchlist()
    localStorage.setItem('watchListData',JSON.stringify(watchListData))
}

function renderWatchlist(){
    const moviesHtml=watchListData.map(movie=>{
        return `
        <div class="movie-card">
            <div class="movie-poster">
                <img src=${movie.Poster} alt="">
            </div>
            <div class="movie-body">
                <div class="movie-header">
                    <h2>${movie.Title} <img src="./icons/star.png" alt=""> <span>${movie.imdbRating}</span></h2>
                </div>
                <div class="movie-type">
                    <p>${movie.Runtime} <span>${movie.Genre}</span></p>
                    <div class="movie-watchlist-div" data-removefromwatchlist=${movie.imdbID}>
                        <img class="addimg" src="./icons/minus.png" alt="" data-removefromwatchlist=${movie.imdbID}>
                        <button class="addbtn" data-removefromwatchlist=${movie.imdbID}> Remove</button>
                    </div>
                </div>
                <p class="movie-details">
                    ${movie.Plot}
                </p>
            </div>
        </div>
        `
    }).join('')

    if(watchListData.length===0){
        document.getElementById('movies-div').innerHTML=`
        <div id="movies-start">
            <h3>Your watchlist is looking a little empty...</h3>
            <div class="movie-watchlist-div">
                <img src="./icons/plus.png" alt="">
                <a href="./index.html">Let's add some movies!</a>
            </div>
        </div>
        `
    }else{
        document.getElementById('movies-div').innerHTML=moviesHtml
    }

}
renderWatchlist()