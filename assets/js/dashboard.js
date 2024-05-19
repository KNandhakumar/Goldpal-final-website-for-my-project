const userId = localStorage.getItem("userId");
document.getElementById("userIdDisplay").textContent = userId;
// Fetch the username after the page loads
window.addEventListener('load', function() {
	// Retrieve the user ID from local storage
	const userId = localStorage.getItem('userId');
	//const welcomeMessage = document.getElementById('welcome-message');
	const dashboardUsername = document.getElementById('dashboard-username');

	if (userId) {
		// Make an API call to fetch the username based on the user ID
		fetch('/api/users/username?userId=' + userId)
			.then(response => response.text())
			.then(data => {
				// Update the "Welcome username" message and the username
				//welcomeMessage.textContent = '@ Welcome! Glad to meet you again  ';
				dashboardUsername.textContent = data; // data is the plain text response

			})
			.catch(error => {
				console.error('Error:', error);
				dashboardUsername.textContent = 'Username Not Found';
			});
	} else {
		welcomeMessage.textContent = 'Welcome Guest';
		dashboardUsername.textContent = 'User ID Not Found'; // Display a message if user ID is not found
	}


});
document.addEventListener('DOMContentLoaded', function() {
	const userId = localStorage.getItem('userId'); // Retrieve the user's ID

	fetch(`/api/transactions/investment-amount?userId=${userId}`)
		.then(response => response.json())
		.then(data => {
			const investmentAmountElement = document.getElementById('investment-amount-value');
			investmentAmountElement.textContent = data;
		})
		.catch(error => {
			console.error('Error:', error);
			const investmentAmountElement = document.getElementById('investment-amount-value');
			investmentAmountElement.textContent = '0';
		});
	fetch(`/api/transactions/goldgrams?userId=${userId}`)
		.then(response => response.text())
		.then(data1 => {
			const goldgramsElement = document.getElementById('goldgrams-display');
			goldgramsElement.textContent = `${data1 || '0'}`; // Use '0' if data is falsy
		})
		.catch(error => {
			console.error('Error:', error);
			const goldgramsElement = document.getElementById('goldgrams-display');
			goldgramsElement.textContent = '0';
		});
	fetch(`/api/transactions/calculate-wallet-balance?userId=${userId}`)
		.then(response => response.json())
		.then(data2 => {
			// Update the UI with the wallet balance
			const walletElement = document.getElementById('wallet-balance');
			walletElement.textContent = data2;
		})
		.catch(error => {
			console.error('Error:', error);
			walletElement.textContent = `0`;
		});
});
/*this script for fetch live gold rate*/

const url = 'https://www.goodreturns.in/gold-rates/';

fetch(url)
	.then(response => response.text())
	.then(html => {
		const parser = new DOMParser();
		const doc = parser.parseFromString(html, 'text/html');

		const goldRateElement = doc.querySelector('#current-price strong#el');
		const goldRate = goldRateElement ? goldRateElement.textContent.trim() : 'Not found';

		// Update the content of the metal-prices div
		const metalPricesDiv = document.getElementById('metal-prices');
		metalPricesDiv.textContent = `${goldRate}`;

		// Store goldRate in local storage
		localStorage.setItem('goldRate', goldRate);

	})
	.catch(error => {
		console.error('Error fetching data:', error);
		// Display an error message if needed
		const metalPricesDiv = document.getElementById('metal-prices');
		metalPricesDiv.textContent = '-';
	});
document.getElementById('logoutButton').addEventListener('click', function(event) {
	event.preventDefault();

	// Remove items from local storage
	localStorage.removeItem('userId');
	localStorage.removeItem('userRole');

	// Redirect to the login page
	window.location.href = '/LOGIN.html';
});
document.getElementById('logoutButton1').addEventListener('click', function(event) {
	event.preventDefault();

	// Remove items from local storage
	localStorage.removeItem('userId');
	localStorage.removeItem('userRole');

	// Redirect to the login page
	window.location.href = '/index.html';
});

let inactivityTimeout;

// Function to reset the inactivity timeout
function resetInactivityTimeout() {
	clearTimeout(inactivityTimeout);
	inactivityTimeout = setTimeout(logout, 1200000); // Set timeout to 30 seconds (adjust as needed)
}

// Function to handle user activity
function handleUserActivity() {
	resetInactivityTimeout();
	// Additional logic for handling user activity if needed
}

// Function to perform logout
function logout() {
	// Your logout logic here
	alert('Logging out due to inactivity');
	localStorage.removeItem('userId');
	localStorage.removeItem('userRole');
	window.location.href = '/LOGIN.html';
}

// Add event listeners for user activity
document.addEventListener('mousemove', handleUserActivity);
document.addEventListener('keypress', handleUserActivity);

// Initial setup of the inactivity timeout
resetInactivityTimeout();

document.addEventListener('DOMContentLoaded', function() {
	const userId = localStorage.getItem('userId'); // Get user ID from local storage

	document.getElementById('buyForm').addEventListener('submit', function(event) {
		event.preventDefault();

		const transactionType = document.getElementById('readonlyInput').value;
		const transactionAmount = document.getElementById('investmentAmount').value;
		if (isNaN(transactionAmount) || transactionAmount < 50) {

			alert('Transaction amount must be Rs.50 or above.');
			return;
		}

		const goldGrams = document.getElementById('goldgrams').textContent; // Use textContent to get the content of the span
		const paymentProofScreenshot = document.getElementById('paymentProofScreenshot').files[0];

		const formData = new FormData();
		formData.append('userId', userId);
		formData.append('transactionType', transactionType);
		formData.append('transactionAmount', transactionAmount);
		formData.append('goldGrams', goldGrams);
		formData.append('screenshot', paymentProofScreenshot);

		fetch('/api/transactions/buy', {
			method: 'POST',
			body: formData
		})
			.then(response => {
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
				return response.text(); // Read response as text
			})
			.then(data => {
				if (data.includes("You cannot make this transaction")) {
					console.error(data);
					alert(data);
				} else {
					console.log("Transaction details updated successfully");
					alert('Success');
				}
			})
			.catch(error => {
				console.error('Error:', error);
				alert('Failed or You cannot make this transaction');
			});
	});
});





