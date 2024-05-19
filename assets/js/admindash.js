const userId = localStorage.getItem("userId");
document.getElementById("userIdDisplay").textContent = userId;
// Fetch the username after the page loads
window.addEventListener('load', function() {
	// Retrieve the user ID from local storage
	const userId = localStorage.getItem('userId');


	if (userId) {
		// Make an API call to fetch the username based on the user ID
		fetch('/api/users/username?userId=' + userId)
			.then(response => response.text())
			.then(data => {
				// Update the "Welcome username" message and the username

				dashboardUsername.textContent = data; // data is the plain text response

			})
			.catch(error => {
				console.error('Error:', error);
				dashboardUsername.textContent = 'Username Not Found';
			});
	} else {

		dashboardUsername.textContent = 'User ID Not Found'; // Display a message if user ID is not found
	}


});

document.getElementById('logoutButton').addEventListener('click', function(event) {
	event.preventDefault();

	// Remove items from local storage
	localStorage.removeItem('userId');
	localStorage.removeItem('userRole');

	// Redirect to the login page
	window.location.href = '/LOGIN.html';
});

// Fetch user data from the backend
fetch('/api/users/all')
    .then(response => response.json())
    .then(users => {
        // Filter out the admin user
        const filteredUsers = users.filter(user => user.userId !== 'GOLD000111');

        // Get the current date and time
        const currentDate = new Date();

        // Filter users based on registration date and time within the current date
        const latestUsers = filteredUsers.filter(user => {
            const registrationDate = new Date(user.registrationDateTime);
            return registrationDate.toDateString() === currentDate.toDateString();
        });

        // Sort the latest users by registration time in descending order
        const sortedLatestUsers = latestUsers.sort((a, b) => new Date(b.registrationDateTime) - new Date(a.registrationDateTime));

        // Get the table body element
        const tableBody = document.querySelector('.table-card tbody');

        // Select the first 5 users
        const displayUsers = sortedLatestUsers.slice(0, 5);

        // Iterate over each user and create a table row
        displayUsers.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.userId}</td>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${user.phone}</td>
                <td>${user.registrationDateTime}</td>
                <td>${user.accountStatus}</td> `;

            // Append the row to the table body
            tableBody.appendChild(row);
        });
    })
    .catch(error => console.error('Error:', error));



fetch('/api/users/all')
	.then(response => response.json())
	.then(users => {
		// Specify the desired role for filtering (e.g., 'user')
		const desiredRole = 'USER';

		// Filter users based on the desired role
		const filteredUsers = users.filter(user => user.role === desiredRole);

		// Get the total count of filtered users
		const totalUsersCount = filteredUsers.length;

		// Update the total users count in the UI
		const totalUsersElement = document.querySelector('.right-side .number');
		totalUsersElement.textContent = totalUsersCount;

		// Optional: Display an indicator based on the count
		const indicatorElement = document.querySelector('.right-side .indicator');
		if (totalUsersCount > 0) {
			indicatorElement.innerHTML = `
                <i class='bx bx-up-arrow-alt'></i>
                <span class="text">Up from yesterday</span>
            `;
		} else {
			// You can customize the indicator for no users or handle it as needed
			indicatorElement.innerHTML = `
                <i class='bx bx-info-circle'></i>
                <span class="text">No users found</span>
            `;
		}
	})
	.catch(error => console.error('Error:', error));


// Fetch user data from the backend
fetch('/api/users/all')
	.then(response => response.json())
	.then(users => {
		 

		// Specify the desired role and account status for filtering
		 
		const desiredStatus = 'Active';

		// Filter users based on the desired role and account status
		const filteredActiveUsers = users.filter(user =>user.accountStatus === desiredStatus);

		// Get the total count of filtered active users
		const totalActiveUsersCount = filteredActiveUsers.length;

		// Update the total active users count in the UI
		const activeUsersElement = document.getElementById('ActiveUsers');
		activeUsersElement.textContent = totalActiveUsersCount;

		// Optional: Display an indicator based on the count
		const activeUsersIndicatorElement = document.querySelector('.active-users .indicator');
		if (totalActiveUsersCount > 0) {
			activeUsersIndicatorElement.innerHTML = `
                <i class='bx bx-up-arrow-alt'></i>
                <span class="text">Up from yesterday</span>
            `;
		} else {
			// You can customize the indicator for no active users or handle it as needed
			activeUsersIndicatorElement.innerHTML = `
                <i class='bx bx-info-circle'></i>
                <span class="text">No active users found</span>
            `;
		}
	})
	.catch(error => console.error('Error:', error));


const url = 'https://www.goodreturns.in/gold-rates/';

fetch(url)
    .then(response => response.text())
    .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        const goldRateElement = doc.querySelector('#current-price strong#el');
        const goldRate = goldRateElement ? goldRateElement.textContent.trim() : 'Not found';

        // Update the content of the LiveRate div
        const liveRateElement = document.getElementById('LiveRate');
        liveRateElement.textContent = `${goldRate}`;

        // Determine whether the rate is up or down and set the corresponding indicator
        const indicatorElement = document.querySelector('.box .indicator');
        const arrowIcon = goldRateElement ? (parseFloat(goldRate) >= 0 ? 'bx-up-arrow-alt' : 'bx-down-arrow-alt') : 'bx-info-circle';

        indicatorElement.innerHTML = `
            <i class='bx ${arrowIcon}'></i>
            <span class="text">${parseFloat(goldRate) >= 0 ? 'Up' : 'Down'} From Today</span>
        `;
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        // Display an error message if needed
        const liveRateElement = document.getElementById('LiveRate');
        liveRateElement.textContent = 'Inr. N/A';

        // You can handle the indicator accordingly for the error case
        const indicatorElement = document.querySelector('.box .indicator');
        indicatorElement.innerHTML = `
            <i class='bx bx-info-circle'></i>
            <span class="text">Data Unavailable</span>
        `;
    });



