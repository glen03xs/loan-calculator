// Listen for Submit
document.getElementById('loan-form').addEventListener('submit', function() {
	// Hide Result
	document.querySelector('#results').style.display = 'none';
	// Show Loader
	document.querySelector('#loading').style.display = 'block';

	setTimeout(calculateResults, 2000);
	event.preventDefault();
});

// CalculateResults
function calculateResults(event) {
	console.log('Calculating');
	// UI Variables
	const amount = document.getElementById('amount');
	const interest = document.getElementById('interest');
	const years = document.getElementById('years');
	const monthlyPayment = document.getElementById('monthly-payment');
	const totalPayment = document.getElementById('total-payment');
	const totalInterest = document.getElementById('total-interest');

	const principal = parseFloat(amount.value);
	const calculatedInterest = parseFloat(interest.value) / 100 / 12;
	const calulatedPayments = parseFloat(years.value) * 12;

	// Compute Monthly Payment
	const x = Math.pow(1 + calculatedInterest, calulatedPayments);
	const monthly = (principal * x * calculatedInterest) / (x - 1);

	if (isFinite(monthly)) {
		monthlyPayment.value = monthly.toFixed(2);
		totalPayment.value = (monthly * calulatedPayments).toFixed(2);
		totalInterest.value = ((monthly * calulatedPayments) - principal).toFixed(2);

		//Show Results
		document.querySelector('#results').style.display = 'block';
		// Hide loading
		document.querySelector('#loading').style.display = 'none';
	} else {
		//Show Results
		document.querySelector('#results').style.display = 'none';
		// Hide loading
		document.querySelector('#loading').style.display = 'none';

		showError('Please Check Your Numbers');
	}
}

function showError(message) {
	// Create a Div
	const errorDiv = document.createElement('div');

	// Get Element
	const card = document.querySelector('.card');
	const heading = document.querySelector('.heading');

	// Add Class
	errorDiv.className = 'alert alert-danger';

	// Create text node and append to div
	errorDiv.appendChild(document.createTextNode(message));

	// Insert Error Above Heading
	card.insertBefore(errorDiv, heading);

	// Clear Error after 3 Seconds
	setTimeout(clearError, 3000);
}

// Clear Error
function clearError() {
	document.querySelector('.alert').remove();
}