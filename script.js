document.getElementById('searchButton').addEventListener('click', function() {
    initiateSearch();
});

document.getElementById('resetButton').addEventListener('click', function() {
    document.getElementById('searchInput').value = '';
    document.getElementById('results').innerHTML = '';
});

document.getElementById('searchInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        initiateSearch();
    }
});

function initiateSearch() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    fetch('APIdata.json')
        .then(response => response.json())
        .then(data => {
            let found = false;
            data.countries.forEach(country => {
                country.cities.forEach(city => {
                    // Check if the city name or keywords "beach" or "temple" are in the query
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
                resultsDiv.innerHTML = 'No results found.';
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