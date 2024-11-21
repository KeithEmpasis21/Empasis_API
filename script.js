const searchButton = document.getElementById('searchButton');
const searchQuery = document.getElementById('searchQuery');
const resultsDiv = document.getElementById('results');

searchButton.addEventListener('click', async () => {
    const query = searchQuery.value.trim();
    if (!query) {
        resultsDiv.innerHTML = '<p>Please enter a search term.</p>';
        return;
    }

    const apiUrl = `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&limit=5`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Error fetching data');

        const data = await response.json();
        displayResults(data.data);
    } catch (error) {
        resultsDiv.innerHTML = `<p>Error: ${error.message}</p>`;
    }
});

function displayResults(animeList) {
    if (animeList.length === 0) {
        resultsDiv.innerHTML = '<p>No results found.</p>';
        return;
    }

    resultsDiv.innerHTML = animeList.map(anime => `
        <div class="anime">
            <h3>${anime.title}</h3>
            <img src="${anime.images.jpg.image_url}" alt="${anime.title}" width="100">
            <p>${anime.synopsis || 'No synopsis available.'}</p>
            <p><strong>Episodes:</strong> ${anime.episodes || 'Unknown'}</p>
        </div>
    `).join('');
}