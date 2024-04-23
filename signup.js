document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;


    if (!username || !email || !password || !confirmPassword) {
        document.getElementById('signupMessage').textContent = 'All fields are required.';
        return;
    }

    if (password !== confirmPassword) {
        document.getElementById('signupMessage').textContent = 'Passwords do not match.';
        return;
    }

    // Fetch CSV data from GitHub URL
    fetch('https://raw.githubusercontent.com/yourusername/yourrepository/main/users.csv')
        .then(response => response.text())
        .then(data => {

            const rows = data.trim().split('\n');


            const usernames = rows.map(row => row.split(',')[0].trim());
            if (usernames.includes(username)) {
                document.getElementById('signupMessage').textContent = 'Username already exists.';
                return;
            }


            const newUserRow = `${username},${email},${password}`;
            const updatedData = data + '\n' + newUserRow;

            // Update CSV file **may not work**
            console.log('Updated CSV data:', updatedData);

            window.location.replace('/login.html');
        })
        .catch(error => {
            console.error('Error fetching CSV data:', error);
            document.getElementById('signupMessage').textContent = 'Failed to load user data. Please try again later.';
        });
});