console.log("Started");

const API_KEY = "api_key=b95959182c9d9fb5a46ab3ddc2605d86";
const BASE_URL = "https://api.themoviedb.org/3";
let MID = '/movie/now_playing?language=en-US&page=';
let PAGE='1&';
let API_URL = BASE_URL + MID +PAGE+ API_KEY;
const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";


//fetching 'ind' number of pages from a given API_URL from MID
const fet=(ind) =>{  
    for(num=1;num<=ind;num++){
        PAGE=`${num}&`;
        API_URL = BASE_URL + MID +PAGE+ API_KEY;
    fetch(API_URL)
    .then((response) => {
        console.log(response);
        return response.json();
    }).then((data) => {
        for (i = 0; i < data.results.length; i++) {
            let element =
                `<div id="item${i}" class=" movie">
                    <div class="card-div">
                        <img class="moviecard" src="`+ IMG_BASE_URL + `${data.results[i].poster_path}">
                    </div>
                    <div class="title">${data.results[i].original_title}</div>
                    <div class="rating">
                        <div class ="avg"><span class ="star" style="font-size:150%; color:goldenrod;">&starf;</span> ${data.results[i].vote_average}</div>
                        <div class="pole">${data.results[i].vote_count} likes</div>
                    </div> 
                </div>`;

            var container = document.getElementById('menu');
            container.innerHTML += element;
        }
        console.log("Got all movies 😁");

    })}
}

fet(1);

const fetchTv=()=>{

    fetch(API_URL)//cannot use the regular fet() function here because the attribute name in TV shows from website is not default 
    .then((response) => {       // original_title..its original_name so had to write the entire function again
        console.log(response);
        return response.json();
    }).then((data) => {
        for (i = 0; i < data.results.length; i++) {
            let element =
                `<div id="item${i}" class=" movie">
                    <div class="card-div">
                        <img class="moviecard" src="`+ IMG_BASE_URL + `${data.results[i].poster_path}">
                    </div>
                    <div class="title">${data.results[i].original_name}</div>
                    <div class="rating">
                        <div class ="avg"><span class ="star" style="font-size:150%; color:goldenrod;">&starf;</span> ${data.results[i].vote_average}</div>
                        <div class="pole">${data.results[i].vote_count} likes</div>
                    </div> 
                </div>`;

            var container = document.getElementById('menu');
            container.innerHTML += element;
        }
        console.log("Got all movies 😁");

    })
}


//function for NEW MOVIES filter 
const newMovies=() =>{
    console.log('clicked');
    MID= '/movie/now_playing?language=en-US&page='; //API for new movies from tdmb
    document.getElementById('menus').innerHTML=`<div class="heading"> 
                                                        NOW PLAYING
                                                </div>
                                                <div id="menu">
                                                </div>`;//refreshing the MENUS id
    var container = document.getElementById('menu');
    container.innerHTML = null;//clearing the previous results
    fet(5);//fetches 5 pages
}

//function for POPULAR MOVIES filter 
const popMovies=() =>{
    console.log('clicked');
    MID='/movie/popular?language=en-US&page='; //corresponding API 
    document.getElementById('menus').innerHTML=`<div class="heading">
                                                    POPULAR MOVIES
                                                </div>
                                                <div id="menu">
                                                </div>`; //refreshing menus id
    var container = document.getElementById('menu');
    container.innerHTML = null;//clearing the previous results
    fet(5); //fetches five pages
}

//function for TOP rated movies fetching
const topMovies=()=>{
    console.log('clicked');
    MID= '/movie/top_rated?language=en-US&page=1&';
    document.getElementById('menus').innerHTML=`<div class="heading">
                                                    TOP RATED MOVIES
                                                </div>
                                                <div id="menu">
                                                </div>`;
    var container = document.getElementById('menu');
    container.innerHTML = null;//clearing the previous results

    fet(7);//fetches seven pages
}

//function for upcoming movies
const upMovies= () =>{
    console.log('clicked');
    MID='/movie/upcoming?language=en-US&page=';
    document.getElementById('menus').innerHTML=`<div class="heading">
                                                    UP COMING MOVIES
                                                </div>
                                                <div id="menu">
                                                </div>`;
    var container = document.getElementById('menu');
    container.innerHTML = null;//clearing the previous results
    fet(3);
}

//function for fetching TV SHOWS
const tv =() =>{
    console.log('clicked');
    API_URL=BASE_URL + '/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&sort_by=vote_count.desc&page=1&' + API_KEY;
    document.getElementById('menus').innerHTML=`<div class="heading">
                                                    TV SHOWS
                                                </div>
                                                <div id="menu">
                                                </div>`;
    var container = document.getElementById('menu');
    container.innerHTML = null;
    fetchTv();
}

//search functionaility

const search_movie=()=>{
    
        let query=document.getElementById('query').value; //getting the input value entered in the form
    
        //using tdmb's searching API url for searching
        API_URL=`https://api.themoviedb.org/3/search/movie?query=`+query+`&include_adult=false&language=en-US&page=1&`+API_KEY;

        document.getElementById('menus').innerHTML=` <div id="menu"></div>`;
        var container = document.getElementById('menu'); //clearing the previous data
        container.innerHTML = null;
        fetch(API_URL) //fetching data
        .then((response) => {
            console.log(response);
            return response.json();
        }).then((data) => {
            if(data.results.length===0){
                document.getElementById('menus').innerHTML=`<div class="oops">
                                                                OOPS! NO RESULTS FOUND <br>
                                                                please check your spelling
                                                            </div>
                                                            <div id="menu">
                                                            </div>`;
              }
            for (i = 0; i < data.results.length; i++) {
                let element =
                    `<div id="item${i}" class=" movie">
                        <div class="card-div">
                            <img class="moviecard" src="`+ IMG_BASE_URL + `${data.results[i].poster_path}" alt="poster">
                        </div>
                        <div class="title">${data.results[i].original_title}</div>
                        <div class="rating">
                            <div class ="avg"><span class ="star" style="font-size:150%; color:goldenrod;">&starf;</span> ${data.results[i].vote_average}</div>
                            <div class="pole">${data.results[i].vote_count} likes</div>
                        </div> 
                    </div>`;

                var container = document.getElementById('menu');
                container.innerHTML += element;
            }
            console.log("Got all movies 😁");
        })
    
}