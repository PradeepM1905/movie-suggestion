const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyEKGU9_qYbkEszUN4hcaq7tfwgErq6SidNyoJIuCfMsTEwH7pKtrLerpYVjhAWZDSl/exec';

document.getElementById('suggestionForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const title = document.getElementById('movieTitle').value;
    const poster = document.getElementById('moviePoster').value;
    const description = document.getElementById('movieDescription').value;
    
    fetch(`${GOOGLE_SCRIPT_URL}?action=add&title=${encodeURIComponent(title)}&poster=${encodeURIComponent(poster)}&description=${encodeURIComponent(description)}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('suggestionForm').reset();
            loadSuggestions();
        });
});

function loadSuggestions() {
    fetch(`${GOOGLE_SCRIPT_URL}?action=get`)
        .then(response => response.json())
        .then(data => {
            const suggestionsDiv = document.getElementById('suggestions');
            suggestionsDiv.innerHTML = '';
            data.forEach((row, index) => {
                const suggestionDiv = document.createElement('div');
                suggestionDiv.className = 'suggestion';
                suggestionDiv.innerHTML = `
                    <h2>${row[0]}</h2>
                    <img src="${row[1]}" alt="${row[0]}">
                    <p>${row[2]}</p>
                    <button class="thumbs-up" onclick="updateThumbs(${index}, 'up')">👍 ${row[3]}</button>
                    <button class="thumbs-down" onclick="updateThumbs(${index}, 'down')">👎 ${row[4]}</button>
                `;
                suggestionsDiv.appendChild(suggestionDiv);
            });
        });
}

function updateThumbs(id, type) {
    fetch(`${GOOGLE_SCRIPT_URL}?action=update&id=${id}&type=${type}`)
        .then(response => response.json())
        .then(data => {
            loadSuggestions();
        });
}

// Load suggestions on page load
loadSuggestions();