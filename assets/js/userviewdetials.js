document.addEventListener('DOMContentLoaded', () => {
	// Get the user ID from the query parameter
	const urlParams = new URLSearchParams(window.location.search);
	const userId = urlParams.get('userId');

	if (userId) {
		// Now you can use the userId to fetch and display the user details on the page
		console.log('User ID:', userId);

		// You may fetch additional details using the userId if needed
		fetch(`/api/users/${userId}`)
			.then(response => response.json())
			.then(userDetails => {
				// Display user details on the page
				console.log('User Details:', userDetails);
			})
			.catch(error => console.error('Error fetching user details:', error));
	} else {
		console.error('User ID not found in the query parameter');
	}
});
//--------------------------------------------------------------------------------------------------------------------//

// Function to get URL parameters
function getUrlParameter(name) {
	name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
	var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
	var results = regex.exec(location.search);
	return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Get the user ID from the URL
const userId = getUrlParameter('userId');

// Set the user ID in the HTML content
const useridContainer = document.getElementById('useridContainer');
const useridContainer1 = document.getElementById('useridContainer1');
useridContainer.textContent = userId;
useridContainer1.textContent = userId;
//---------------------------------------------------------------------------------------------------------------//
window.addEventListener('load', function() {
	// Extract the user ID from the URL parameters
	const urlSearchParams = new URLSearchParams(window.location.search);
	const userId = urlSearchParams.get('userId');
	const usernameElement = document.getElementById('username');
	const usernameElement1 = document.getElementById('username1');

	if (userId) {
		// Make an API call to fetch the username based on the user ID
		fetch('/api/users/username?userId=' + userId)
			.then(response => response.text())
			.then(data => {
				// Update the username in the specified container
				usernameElement.textContent = `Hello ${data || 'User'}`; // data is the plain text response
				usernameElement1.textContent = data;
			})
			.catch(error => {
				console.error('Error:', error);
				usernameElement.textContent = 'Username Not Found';
			});
	} else {
		usernameElement.textContent = 'User ID Not Found'; // Display a message if user ID is not found in the URL
	}
});

//-------------------------------------------------------------------------------------------------------------------------//

document.addEventListener('DOMContentLoaded', () => {
	// Extract the user ID from the current URL
	const urlParams = new URLSearchParams(window.location.search);
	const userIdFromUrl = urlParams.get('userId');

	if (userIdFromUrl) {
		// Fetch user details based on the user ID from the URL
		fetch(`/api/users/${userIdFromUrl}`)
			.then(response => response.json())
			.then(user => {
				// Update the input fields with the fetched user details
				document.getElementById('input-username').value = user.username;
				document.getElementById('input-email').value = user.email;
				document.getElementById('input-registrationDtae').value = user.registrationDateTime;
				document.getElementById('input-mobile').value = user.phone;
				document.getElementById('input-accountstatus').value = user.accountStatus;
				document.getElementById('input-transactionamount').value = user.transactionamount;
				document.getElementById('input-transactiondate').value = user.transactiondate;
				document.getElementById('input-transactiontype').value = user.transactiontype;
				document.getElementById('input-reservedgold').value = user.goldgrams;
				document.getElementById('input-wallet').value = user.wallet;
			})
			.catch(error => console.error('Error fetching user details:', error));
	} else {
		console.error('User ID not found in the URL');
	}
});

//--------------------------------------------------------------------------------------------------------------------------//
document.addEventListener('DOMContentLoaded', () => {
	const urlParams = new URLSearchParams(window.location.search);
	const userIdFromUrl = urlParams.get('userId');

	// Fetch transaction details from the backend
	fetch(`/api/transactions/getscreenshot/${userIdFromUrl}`)
		.then(response => response.json())
		.then(transaction => {
			// Assuming the screenshot is stored as a base64-encoded string
			const screenshotData = transaction.screenshot;
			const screenshotImage = document.getElementById('screenshotImage');

			// Set the image source
			screenshotImage.src = `data:image/png;base64,${screenshotData}`;
		})
		.catch(error => console.error('Error fetching transaction details:', error));
});

//----------------------------------------------------------------------------------------------------------------------------------//
