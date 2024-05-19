document.addEventListener('DOMContentLoaded', () => {
	// Fetch user data from the backend API
	fetch('/api/users/all')
		.then(response => response.json())
		.then(users => {
			// Exclude the admin user
			const filteredUsers = users.filter(user => user.userId !== 'GOLD000111');

			// Sort users by registration date in descending order
			const sortedUsers = filteredUsers.sort((a, b) => new Date(b.registrationDateTime) - new Date(a.registrationDateTime));

			// Call the function to populate the table with the fetched data
			populateTable(sortedUsers);
		})
		.catch(error => console.error('Error fetching data:', error));
});

//--------------------------------------------------------------------------------------------------------------------------------//

document.addEventListener('DOMContentLoaded', () => {
	populateTable(users);
});

function populateTable(users) {
	const tableBody = document.getElementById('tableBody');

	users.forEach(user => {
		const registrationDate = new Date(user.registrationDateTime);
		const formattedDate = registrationDate.toISOString().split('T')[0];

		const row = document.createElement('tr');
		row.innerHTML = `
                    <td>${user.userId}</td>
                    <td>${user.username}</td>
                    <td>${formattedDate}</td>
                    <td>${user.transactionamount}</td>
                    <td>${user.goldgrams}</td>
                    <td>${user.wallet}</td>
                    <td>${user.accountStatus}</td>
                    <td>
                        <button onclick="viewDetails('${user.userId}')">View Details</button>
                    </td>
                    <td> <button onclick="DeleteUser('${user.userId}')"style="color: white; background-color: red;width:50%">Delete</button></td>
                `;

		tableBody.appendChild(row);
	});
}

//--------------------------------------------------------------------------------------------------------------------------------//

function viewDetails(userId) {
	// Redirect to userviewdetials page with the user ID
	window.location.href = `/userviewdetials.html?userId=${userId}`;
}

//--------------------------------------------------------------------------------------------------------------------------------//

function searchTable() {
	const input = document.getElementById('searchInput');
	const filter = input.value.toUpperCase();
	const table = document.querySelector('table');
	const rows = table.getElementsByTagName('tr');

	for (let i = 0; i < rows.length; i++) {
		const cells = rows[i].getElementsByTagName('td');
		let found = false;

		for (let j = 0; j < cells.length; j++) {
			const cellValue = cells[j].textContent || cells[j].innerText;

			if (cellValue.toUpperCase().indexOf(filter) > -1) {
				found = true;
				break;
			}
		}

		rows[i].style.display = found ? '' : 'none';
	}
}

//--------------------------------------------------------------------------------------------------------------------------------//

function filterByAccountStatusColumn(value) {
	const table = document.querySelector('table');
	const rows = table.getElementsByTagName('tr');

	for (let i = 1; i < rows.length; i++) {
		const cell = rows[i].getElementsByTagName('td')[6]; // Index 6 corresponds to the Account Status column

		if (!value || cell.textContent === value) {
			rows[i].style.display = '';
		} else {
			rows[i].style.display = 'none';
		}
	}
}



//--------------------------------------------------------------------------------------------------------------------------------//

// Get the search input element and search icon element
const searchInput = document.getElementById('searchInput');
const searchIcon = document.getElementById('searchIcon');
const noResultsMessage = document.getElementById('noResultsMessage');

// Add an event listener for the input event to trigger the search
searchInput.addEventListener('input', function() {
	filterTable(this.value);
});

// Add an event listener for the click event on the search icon
searchIcon.addEventListener('click', function() {
	filterTable(searchInput.value);
});

function filterTable(searchTerm) {
	// Convert the searchTerm to lowercase for case-insensitive search
	const term = searchTerm.toLowerCase();

	// Get all rows in the table body
	const rows = document.querySelectorAll('#tableBody tr');

	// Counter for found rows
	let foundRows = 0;

	// Loop through each row and hide/show based on the search term
	rows.forEach(row => {
		const dataCells = row.querySelectorAll('td');
		let found = false;

		// Check each data cell in the row
		dataCells.forEach(cell => {
			if (cell.textContent.toLowerCase().includes(term)) {
				found = true;
				foundRows += 1;
			}
		});

		// Toggle the row's visibility based on the search result
		row.style.display = found ? '' : 'none';
	});

	// Show or hide the "No details found" message based on the number of found rows
	noResultsMessage.style.display = foundRows === 0 ? 'block' : 'none';
}

//-----------------------------------------------------------------------------------------------------------------------------//


function deleteUser(userId) {
	fetch(`/api/users/delete/${userId}`, {
		method: 'DELETE',
	})
		.then(response => {
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			// Check if the response has content (not empty)
			const contentType = response.headers.get('content-type');
			if (contentType && contentType.includes('application/json')) {
				return response.json();
			} else {
				// If the response is empty, return an empty object
				return {};
			}
		})
		.then(data => {
			console.log('User deleted successfully:', data);

			// Optionally, you can remove the deleted user from the UI
			RemoveTableRow(userId);
			location.reload();

		})
		.catch(error => {
			console.error('Error deleting user:', error);

		});
}

function DeleteUser(userId) {
	if (confirm('Are you sure you want to delete this user?')) {
		// Call the function to delete the user
		deleteUser(userId);
	}
}

// Function to remove the deleted user from the UI (optional)
function RemoveTableRow(userId) {
	const row = document.getElementById(userId);
	if (row) {
		row.remove();
	}
}
//--------------------------------------------------------------------------------------------------------------------------------//