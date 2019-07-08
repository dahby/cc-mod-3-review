'use strict';

const form = document.getElementById('new-movie');
const container = document.getElementById('container');
const url = 'http://localhost:3000/movies'

function fetchAllMovies() {
  fetch(url)
  .then(res => res.json())
  .then(json => displayAllMovies(json))
}

function displayAllMovies(allMovies) {
  for (let i = 0; i < allMovies.length; i++) {
    displaySingleMovie(allMovies[i])
  }
}

function displaySingleMovie(movie) {

  const movieCard = document.createElement('div');
  const movieTitle = document.createElement('h4');
  const movieImage = document.createElement('img');
  const movieLikes = document.createElement('p');
  const likeBtn = document.createElement('button');

  movieTitle.textContent = movie.title;
  movieImage.setAttribute('src', movie.image);
  movieLikes.textContent = `Likes: ${movie.likes}`;
  likeBtn.textContent = "Like";

  movieTitle.addEventListener('click', () => {
    // console.log('title clicked', movie.id)
    fetchOneMovie(movie);
  })

  likeBtn.addEventListener('click', () => {
    persistLikes(movie, movieLikes)
  })

  movieCard.appendChild(movieTitle);
  movieCard.appendChild(movieImage);
  movieCard.appendChild(movieLikes);
  movieCard.appendChild(likeBtn);

  container.appendChild(movieCard);
}

function fetchOneMovie(movie) {
  fetch(`${url}/${movie.id}`)
  .then(res => res.json())
  .then(json => {
    while (container.firstChild) {
      container.removeChild(container.firstChild)
    }
    displaySingleMovie(json)
  })
}

function likeFunction(movie, movieLikeHtmlEl) {
  movieLikeHtmlEl.textContent = `Likes: ${movie.likes}`;
}

function persistLikes(movie, movieLikes) {
  movie.likes++;
  fetch(`${url}/${movie.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      likes: movie.likes
    })
  })
  .then(res => res.json())
  .then(json => {
    // likeFunction(json, movieLikes)
    movieLikes.textContent = `Likes: ${json.likes}`;
  })
}

fetchAllMovies();