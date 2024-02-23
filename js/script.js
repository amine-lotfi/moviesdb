// https://github.com/amine-lotfi

const APIKey = "300a0375";

const searchButton = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const resultWrapper = document.getElementById("result-wrapper");


searchButton.addEventListener("click", () => {
    // if the input is empty
    if (searchInput.value === "") {

        resultWrapper.innerHTML = `
                
                    <div class="text-center mt-4 mb-4 get-animated">
                        <h4 class="text-warning mb-0 mt-2 fw-bol"><i class="bi bi-info-circle"></i> You must type the movie name.</h4>
                    </div>
                
                    `;

    } else {

        let APIUrl = `http://www.omdbapi.com/?apikey=${APIKey}&t=${searchInput.value}`;

        fetch(APIUrl)
            .then((response) => response.json())
            .then((data) => {

                // if no result was found
                if (data.Response === "False") {

                    resultWrapper.innerHTML = `
                
                    <div class="text-center mt-4 mb-4 get-animated">
                        <img src="/assets/error.png" class="img-fluid w-50" alt="">
                        <h4 class="text-warning mb-0 mt-2 fw-bol"><i class="bi bi-info-circle"></i> No movie/serie was found.</h4>
                    </div>
                    `;
                } else {

                    resultWrapper.innerHTML = `
                    
                    <div class="card p-4 mx-auto mt-5 w-75 get-animated">
                        <div class="card-body p-0 text-center">

                        <div class="row align-items-center">

                            <div class="col-md-4">
                                <img src="${data.Poster}" class="img-fluid" alt="">
                            </div>

                            <div class="col-md-8">
                                <h1 class="mb-2">${data.Title}</h1>

                                <h5 class="me-3 d-inline">${data.Rated}</h5>
                                <h5 class="me-3 d-inline">${data.Year}</h5>
                                <h5 class="d-inline">${data.Runtime}</h5>

                                <h4 class="mt-3 mb-3 text-center"><i class="bi bi-star-fill"></i> ${data.imdbRating}</h4>

                                <p class="genre-text me-3 d-inline text-center">${data.Genre.split(',').join('&nbsp;&nbsp;&nbsp;')}</p>
                            </div>

                        </div>

                    </div>

                    <div class="row mt-3 text-center">

                        <div class="col-md-12">
        
                            <h2>Plot:</h2>
                            <p>${data.Plot}</p>
        
                        </div>

                        <div class="col-md-12">
                            <h4>Info:</h4>

                            
                            <p><i class="bi bi-info-circle-fill"></i> Type: ${data.Type}</p>
                            <p><i class="bi bi-info-circle-fill"></i> Release date: ${data.Released}</p>
                            <p><i class="bi bi-info-circle-fill"></i> Director: ${data.Director}</p>
                            <p><i class="bi bi-info-circle-fill"></i> Writers: ${data.Writer}</p>
                            <p><i class="bi bi-info-circle-fill"></i> Actors: ${data.Actors}</p>
                            <p><i class="bi bi-info-circle-fill"></i> Language: ${data.Language}</p>
                            <p><i class="bi bi-info-circle-fill"></i> Country: ${data.Country}</p>
                            <p><i class="bi bi-info-circle-fill"></i> Awards: ${data.Awards}</p>
                            <p><i class="bi bi-info-circle-fill"></i> IMDB rating: ${data.imdbRating}</p>
                            <p><i class="bi bi-info-circle-fill"></i> IMDB votes: ${data.imdbVotes}</p>
                        </div>
        
                    </div>
                </div>
                    
                    `;

                }

            }).catch(error => {
                console.error("Error fetching data", error);
            });

    }

});

// this to capitalize the first letter of the description
function capitalizeFirstLetter(string) {

    return string.charAt(0).toUpperCase() + string.slice(1);
}

// this to add an event listener for the Enter key press event on the input field
searchInput.addEventListener("keyup", function (event) {

    // check if the Enter key (key code 13) is pressed
    if (event.keyCode === 13) {

        // trigger a click event on the submit button
        searchButton.click();
    }
});