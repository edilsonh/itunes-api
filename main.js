let container = document.getElementById("results");
let button = document.getElementById("submitButton");
let search = document.getElementById("textInput");
let musicPlayer = document.getElementById("musicPlayer");
let nowPlaying = document.getElementById("nowPlaying")

button.addEventListener("click", function(e) {
  let fullUrl = "https://itunes.apple.com/";
  e.preventDefault();
  fullUrl = `${fullUrl}search?term=${search.value}&entity=musicTrack`;
  fetch(fullUrl)
    .then(function(response) {
      if(response.status !== 200) {
        console.log(response.status);
        return;
      }
      response.json().then(function(data) {
        let templateHolder = "";
        data.results.forEach(function(items) {
          //console.log(items);
          let template =
          `
          <section class="song-container">
            <img src="${items.artworkUrl100}">
            <p class="songTitle">${items.trackName}</p>
            <p>By ${items.artistName}</p>
          </section>

          `
          templateHolder += template;
        })
        container.innerHTML = templateHolder;
        search.value = "";

        let songTitle = document.getElementsByClassName("songTitle");

        for (let i = 0; i < songTitle.length; i++) {
          songTitle[i].addEventListener("click", function(e) {
              musicPlayer.setAttribute("src", data.results[i].previewUrl);
              nowPlaying.innerHTML = `${data.results[i].trackName} by ${data.results[i].artistName}`;
          })
        }

      })
    })
})
