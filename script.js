



document.querySelector(".search-div").addEventListener("submit", (e) => {
    e.preventDefault();
    const value = document.querySelector(".search-input").value
    const moviesData = []
    const genres = []
    let movieGenres = []
    let imgPath = `https://image.tmdb.org/t/p/original`;
    console.log(value)
    const url = `https://api.themoviedb.org/3/search/movie?query=${value}`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MGRhMDI0MDI3OWQwMTQ5Y2JlZjIzNDlhMzBiNWVlYSIsInN1YiI6IjU2Y2ZjYWJiYzNhMzY4MWU0NDAwNTQ4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.N4fQwyEQMyNvkGSD2SDJBf9K_iHlt0WcZw0yFZktmkw'
        }
    };

    fetch(url, options)
        .then(res => res.json())
        .then(json => {
            console.log(json)
            moviesData.push(json.results[0])
            console.log(moviesData)
            console.log(imgPath + json.results[0].poster_path)
            document.querySelector(".search-poster").src = imgPath + json.results[0].poster_path
            document.querySelector(".title").innerText = json.results[0].original_title;
            // document.querySelector(".category").innerText = json.results[0].original_title;
            document.querySelector(".discription").innerText = json.results[0].overview;
            document.querySelector(".relese-date").innerText = json.results[0].release_date;
            movieGenres = json.results[0].genre_ids;
            document.querySelector(".search-input").value = ""

        })
        .then(data => {
            const url2 = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc' + '&with_genres=' + encodeURI(movieGenres.join(','));
            const options2 = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MGRhMDI0MDI3OWQwMTQ5Y2JlZjIzNDlhMzBiNWVlYSIsInN1YiI6IjU2Y2ZjYWJiYzNhMzY4MWU0NDAwNTQ4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.N4fQwyEQMyNvkGSD2SDJBf9K_iHlt0WcZw0yFZktmkw'
                }
            };

            fetch(url2, options2)
                .then(res => res.json())
                .then(json => {
                    console.log("reccoo")
                    console.log(json)

                    let str = '';

                    json.results.map(movie => {
                        str += ` <li class="splide__slide">
                        <div class="inside-li">
                            <div class="li-image">
                            <img class="li-img" src=${imgPath + movie.poster_path} alt="">
                            </div>
                            <h3>${movie.original_title}</h3>
                            <p>Action, Adventure, Drama</p>
                        </div>
                    </li>`
                    })
                    document.querySelector('ul[data-ref="ul"]').innerHTML = str;
                    console.log(document.querySelector('ul[data-ref="ul"]').innerHTML)
                    console.log(str)
                    var splide = new Splide('.splide', {
                        width: "100%",
                        perPage: 4,
                        gap: "4%",
                        autoWidth: true,
                        pagination: false,
                    });

                    splide.mount();
                })
                .catch(err => console.error('error:' + err));
        })
        .catch(err => console.error('error:' + err));
})






var splide = new Splide('.splider-two', {
    type: 'loop',
    perPage: 3,
    gap: "10%",
    breakpoints: {
        800: {
            perPage: 2,
        },
        480: {
            perPage: 1,
        },
    },
});
splide.mount();







