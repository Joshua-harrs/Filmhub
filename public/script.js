fetch('/api/movies')
  .then(res => res.json())
  .then(movies => {
    movies.forEach(movie => {
      const card = document.createElement('div');
      card.className = 'movie-card';
      card.innerHTML = `
        <img src="${movie.poster}" alt="${movie.title}" />
        <h3>${movie.title}</h3>
        <a href="${movie.link}" target="_blank">
          <button class="watch-btn">🎥 Watch Now</button>
        </a>
      `;
      moviesContainer.appendChild(card);
    });
  });
