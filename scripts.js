const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyEKGU9_qYbkEszUN4hcaq7tfwgErq6SidNyoJIuCfMsTEwH7pKtrLerpYVjhAWZDSl/exec';

// Event listener for form submission
document.getElementById('suggestionForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const title = document.getElementById('movieTitle').value;
    const poster = document.getElementById('moviePoster').value;
    const description = document.getElementById('movieDescription').value;
    
    console.log('Sending data:', { title, poster, description }); // Log data being sent
    
    fetch(`${GOOGLE_SCRIPT_URL}?action=add&title=${encodeURIComponent(title)}&poster=${encodeURIComponent(poster)}&description=${encodeURIComponent(description)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Data added:', data); // Log success message
            document.getElementById('suggestionForm').reset();
            loadSuggestions();
        })
        .catch(error => console.error('Error adding suggestion:', error));
});

// Function to load suggestions from Google Sheets
function loadSuggestions() {
    fetch(`${GOOGLE_SCRIPT_URL}?action=get`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Fetched data:', data); // Log fetched data
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
        })
        .catch(error => console.error('Error fetching suggestions:', error));
}

// Function to update thumbs up or down
function updateThumbs(id, type) {
    fetch(`${GOOGLE_SCRIPT_URL}?action=update&id=${id}&type=${type}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Thumbs updated:', data); // Log success message
            loadSuggestions();
        })
        .catch(error => console.error('Error updating thumbs:', error));
}

// Load suggestions on page load
loadSuggestions();