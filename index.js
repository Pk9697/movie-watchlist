// http://www.omdbapi.com/?s=${inputValue}&apikey=61e4be91
const inputBox=document.getElementById('input-field');
const searchBtn=document.getElementById('search-btn');


async function search(){
    const inputValue=inputBox.value;
    if(inputValue){

        const promise=await fetch(`http://www.omdbapi.com/?s=${inputValue}&apikey=61e4be91`)
        const data=await promise.json()
        console.log(data)
        let moviesHtml=''
        let index=0;
        if(data.Response==="True"){

            for(movie of data.Search){
                const res=await fetch(`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=61e4be91`)
                const movieData=await res.json();
                moviesHtml=
                    `
                        ${moviesHtml}
                        <div class="movie-card">
                            <div class="movie-poster">
                                <img src=${movieData.Poster} alt="">
                            </div>
                            <div class="movie-body">
                                <div class="movie-header">
                                    <h2>${movieData.Title} <img src="./icons/star.png" alt=""> <span>${movieData.imdbRating}</span></h2>
                                </div>
                                <div class="movie-type">
                                    <p>${movieData.Runtime} <span>${movieData.Genre}</span></p>
                                    <div class="movie-watchlist-div" id=movie-${index}>
                                        <img src="./icons/plus.png" alt="">
                                        <button> Watchlist</button>
                                    </div>
                                </div>
                                <p class="movie-details">
                                    ${movieData.Plot}
                                </p>
                            </div>
                        </div>
                    `
                
                index++;
                document.getElementById('movies-div').innerHTML=moviesHtml
            }
        }else{
            document.getElementById('movies-div').innerHTML=`
                <div id="movies-start">              
                    <h3>Unable to find what you're looking for.Please try another search</h3>
                </div>
            `
        }
    }
    // console.log(moviesHtml)
}
searchBtn.addEventListener('click',search)
