// import { watchListData } from "./index.js";
// console.log(watchListData);
console.log("watchlist.js loaded");
const watchListData=localStorage.getItem('watchListData')?JSON.parse(localStorage.getItem('watchListData')):[];
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
                    <div class="movie-watchlist-div" data-addtowatchlist=${movie.imdbID}>
                        <img class="addimg" src="./icons/plus.png" alt="" data-addtowatchlist=${movie.imdbID}>
                        <button class="addbtn" data-addtowatchlist=${movie.imdbID}> Watchlist</button>
                    </div>
                </div>
                <p class="movie-details">
                    ${movie.Plot}
                </p>
            </div>
        </div>
        `
    }).join('')
    document.getElementById('movies-div').innerHTML=moviesHtml

}
renderWatchlist()