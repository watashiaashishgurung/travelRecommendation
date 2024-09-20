document.getElementById('searchButton').addEventListener('click', function() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    fetch('APIdata.json')
        .then(response => response.json())
        .then(data => {
            let found = false;
            data.countries.forEach(country => {
                country.cities.forEach(city => {
                    if (city.name.toLowerCase().includes(query)) {
                        found = true;
                        resultsDiv.innerHTML += `
                            <div class="city">
                                <h2>${city.name}</h2>
                                <img src="${city.imageUrl}" alt="${city.name}">
                                <p>${city.description}</p>
                            </div>
                        `;
                    }
                });
            });

            if (!found) {
                resultsDiv.innerHTML = 'No results found.';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultsDiv.innerHTML = 'An error occurred while fetching data.';
        });
});

document.getElementById('resetButton').addEventListener('click', function() {
    document.getElementById('searchInput').value = '';
    document.getElementById('results').innerHTML = '';
});