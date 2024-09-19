document.getElementById('suggestionForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const title = document.getElementById('movieTitle').value;
    const poster = document.getElementById('moviePoster').value;
    const description = document.getElementById('movieDescription').value;
    
    const suggestion = document.createElement('div');
    suggestion.className = 'suggestion';
    suggestion.innerHTML = `
        <h2>${title}</h2>
        <img src="${poster}" alt="${title}">
        <p>${description}</p>
        <button class="thumbs-up">👍</button>
        <button class="thumbs-down">👎</button>
    `;
    
    document.getElementById('suggestions').appendChild(suggestion);
    
    document.getElementById('suggestionForm').reset();
});

document.getElementById('suggestions').addEventListener('click', function(event) {
    if (event.target.classList.contains('thumbs-up')) {
        // Handle thumbs up
    } else if (event.target.classList.contains('thumbs-down')) {
        // Handle thumbs down
    }
});