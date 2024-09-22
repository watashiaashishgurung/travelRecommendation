document.getElementById('searchButton').addEventListener('click', function() {
    initiateSearch(document.getElementById('searchInput').value.toLowerCase());
});

document.getElementById('resetButton').addEventListener('click', function() {
    document.getElementById('searchInput').value = '';
    document.getElementById('results').innerHTML = '';
});

document.getElementById('searchInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        initiateSearch(document.getElementById('searchInput').value.toLowerCase());
    }
});

document.getElementById('bookNowButton').addEventListener('click', function() {
    searchBeachesAndTemples();
});

function initiateSearch(query) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    fetch('APIdata.json')
        .then(response => response.json())
        .then(data => {
            let found = false;

            data.countries.forEach(country => {
                // Check for country criteria
                if (query.includes('country') || query.includes('countries')) {
                    found = true;
                    const countryCities = country.cities.slice(0, 2); // Get first 2 cities
                    countryCities.forEach(city => {
                        const cityDiv = document.createElement('div');
                        cityDiv.classList.add('city');
                        cityDiv.innerHTML = `
                            <h2>${city.name}</h2>
                            <img src="${city.imageUrl}" alt="${city.name}">
                            <p>${city.description}</p>
                        `;
                        cityDiv.addEventListener('click', function() {
                            showModal(city);
                        });
                        resultsDiv.appendChild(cityDiv);
                    });
                }

                country.cities.forEach(city => {
                    if (city.name.toLowerCase().includes(query) || 
                        (query.includes('beach') && city.description.toLowerCase().includes('beach')) || 
                        (query.includes('temple') && city.description.toLowerCase().includes('temple'))) {
                        found = true;
                        const cityDiv = document.createElement('div');
                        cityDiv.classList.add('city');
                        cityDiv.innerHTML = `
                            <h2>${city.name}</h2>
                            <img src="${city.imageUrl}" alt="${city.name}">
                            <p>${city.description}</p>
                        `;
                        cityDiv.addEventListener('click', function() {
                            showModal(city);
                        });
                        resultsDiv.appendChild(cityDiv);
                    }
                });
            });

            if (!found) {
                const noResultsDiv = document.createElement('div');
                noResultsDiv.classList.add('no-results');
                noResultsDiv.innerHTML = `
                    Your destination did not reach the most popular 21 holiday destinations of summer 2024.
                `;
                resultsDiv.appendChild(noResultsDiv);

                // Add event listener to close the no-results div and reset search when clicking outside
                document.addEventListener('click', function(event) {
                    if (!noResultsDiv.contains(event.target)) {
                        resultsDiv.innerHTML = '';
                        document.getElementById('searchInput').value = '';
                    }
                }, { once: true });
            }

            // Scroll to the results section
            resultsDiv.scrollIntoView({ behavior: 'smooth' });
        })
        .catch(error => {
            console.error('Error:', error);
            resultsDiv.innerHTML = 'An error occurred while fetching data.';
        });
}

function searchBeachesAndTemples() {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    fetch('APIdata.json')
        .then(response => response.json())
        .then(data => {
            let found = false;
            let beachCount = 0;
            let templeCount = 0;

            data.countries.forEach(country => {
                country.cities.forEach(city => {
                    if (beachCount < 2 && city.description.toLowerCase().includes('beach')) {
                        found = true;
                        beachCount++;
                        const cityDiv = document.createElement('div');
                        cityDiv.classList.add('city');
                        cityDiv.innerHTML = `
                            <h2>${city.name}</h2>
                            <img src="${city.imageUrl}" alt="${city.name}">
                            <p>${city.description}</p>
                        `;
                        cityDiv.addEventListener('click', function() {
                            showModal(city);
                        });
                        resultsDiv.appendChild(cityDiv);
                    } else if (templeCount < 2 && city.description.toLowerCase().includes('temple')) {
                        found = true;
                        templeCount++;
                        const cityDiv = document.createElement('div');
                        cityDiv.classList.add('city');
                        cityDiv.innerHTML = `
                            <h2>${city.name}</h2>
                            <img src="${city.imageUrl}" alt="${city.name}">
                            <p>${city.description}</p>
                        `;
                        cityDiv.addEventListener('click', function() {
                            showModal(city);
                        });
                        resultsDiv.appendChild(cityDiv);
                    }
                });
            });

            if (!found) {
                const noResultsDiv = document.createElement('div');
                noResultsDiv.classList.add('no-results');
                noResultsDiv.innerHTML = `
                    No beaches or temples found in the most popular 21 holiday destinations of summer 2024.
                `;
                resultsDiv.appendChild(noResultsDiv);

                // Add event listener to close the no-results div and reset search when clicking outside
                document.addEventListener('click', function(event) {
                    if (!noResultsDiv.contains(event.target)) {
                        resultsDiv.innerHTML = '';
                        document.getElementById('searchInput').value = '';
                    }
                }, { once: true });
            }

            // Scroll to the results section
            resultsDiv.scrollIntoView({ behavior: 'smooth' });
        })
        .catch(error => {
            console.error('Error:', error);
            resultsDiv.innerHTML = 'An error occurred while fetching data.';
        });
}

function showModal(city) {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>${city.name}</h2>
            <img src="${city.imageUrl}" alt="${city.name}">
            <p>${city.description}</p>
        </div>
    `;
    document.body.appendChild(modal);

    // Show the modal
    modal.style.display = 'flex';

    // Close button event
    modal.querySelector('.close').addEventListener('click', function() {
        closeModal(modal);
    });

    // Close modal when clicking outside the modal-content
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal(modal);
        }
    });
}

function closeModal(modal) {
    modal.style.display = 'none';
    document.body.removeChild(modal);
}