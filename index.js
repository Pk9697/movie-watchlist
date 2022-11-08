// http://www.omdbapi.com/?s=${inputValue}&apikey=61e4be91
console.log("index.js loaded")
const inputBox=document.getElementById('input-field');
const searchBtn=document.getElementById('search-btn');

const moviesData=[]
const watchListData=localStorage.getItem('watchListData')?JSON.parse(localStorage.getItem('watchListData')):[];

searchBtn.addEventListener('click',search)

document.addEventListener('click',function(e){
    // e.preventDefault()
    if(e.target.dataset.addtowatchlist){
        addtowatchlist(e.target.dataset.addtowatchlist)
    }
})
function check(movieData){
    for(let watchlist of watchListData){
        // console.log(watchlist.imdbID,movieData.imdbID)
        if(watchlist.imdbID == movieData.imdbID){
            return true
        }
    }
    return false
}

function addtowatchlist(movieID){
    // if(!watchListData.includes(e.target.dataset.addtowatchlist)){
    //     watchListData.unshift(e.target.dataset.addtowatchlist)
    // }
    const movieData=moviesData.filter(movie=>movie.imdbID===movieID)[0]
    console.log(movieData)
    if(!check(movieData)){
        watchListData.unshift(movieData)
        localStorage.setItem('watchListData',JSON.stringify(watchListData))
        document.getElementById(`img-${movieData.imdbID}`).disabled=true
        document.getElementById(`btn-${movieData.imdbID}`).disabled=true
        document.getElementById(`btn-${movieData.imdbID}`).classList.add('btn-disable')
        document.getElementById(`img-${movieData.imdbID}`).classList.add('btn-disable')
    }
    // console.log(check(movieData))
    // console.log(watchListData)
}

async function search(){
    const inputValue=inputBox.value;
    if(inputValue){

        const promise=await fetch(`http://www.omdbapi.com/?s=${inputValue}&apikey=61e4be91`)
        const data=await promise.json()
        console.log(data)
        if(data.Response==="True"){

            for(let movie of data.Search){
                const res=await fetch(`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=61e4be91`)
                const movieData=await res.json();
                moviesData.push(movieData)
                renderMovies()
            }
        }else{
            document.getElementById('movies-div').innerHTML=`
                <div id="movies-start">              
                    <h3>Unable to find what you're looking for.Please try another search</h3>
                </div>
            `
        }
    }
}

function renderMovies(){
    const moviesHtml=moviesData.map(movie=>{
        let disabledClass=''
        let disabled=''
        if(check(movie)){
            disabledClass='btn-disable'
            disabled='disabled'
        }
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
                    <div class="movie-watchlist-div "  data-addtowatchlist=${movie.imdbID}>
                        <img id="img-${movie.imdbID}" class="addimg ${disabledClass}" ${disabled}  src="./icons/plus.png" alt="">
                        <button id="btn-${movie.imdbID}" class="addbtn ${disabledClass}" ${disabled} data-addtowatchlist=${movie.imdbID}> Watchlist</button>
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
