document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Simple validation (you can add more complex validation if needed)
        if (name && email && message) {
            // Display success message
            alert('Thank you for contacting us, ' + name + '! We will get back to you shortly.');

            // Clear the form
            form.reset();
        } else {
            // Display error message
            alert('Please fill in all fields.');
        }
    });
});