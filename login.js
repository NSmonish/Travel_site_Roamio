document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Fetch CSV data from GitHub  URL
    fetch('https://raw.githubusercontent.com/yourusername/yourrepository/main/users.csv')
        .then(response => response.text())
        .then(data => {

            const rows = data.trim().split('\n');


            let isAuthenticated = false;
            for (let i = 0; i < rows.length; i++) {
                const [storedUsername, storedEmail, storedPassword] = rows[i].split(',').map(field => field.trim());
                if (storedUsername === username && storedPassword === password) {
                    isAuthenticated = true;
                    break;
                }
            }

            if (isAuthenticated) {
                // Store logged-in state in localStorage
                localStorage.setItem('loggedIn', 'true');
                localStorage.setItem('username', username);


                window.location.replace('/dashboard.html');
            } else {
                document.getElementById('loginMessage').textContent = 'Invalid username or password. Please try again.';
            }
        })
        .catch(error => {
            console.error('Error fetching CSV data:', error);
            document.getElementById('loginMessage').textContent = 'Failed to load user data. Please try again later.';
        });
});