// form elements
const formInputContainer = document.querySelector('.form__input-container');
const formInput = document.querySelector('.form__input');
const btn = document.querySelector('.form__button');

// handling the button click
btn.addEventListener('click', (e) => {
	e.preventDefault();
	const emailInput = formInput.value;
	const isValid = validateForm(emailInput);
	if (isValid) {
		/* passing the email as a query string */
		window.location.href = `results.html?email=${emailInput}`;
	} else {
		addMessageAlert();
	}
	formInput.value = '';
});

function validateForm(email) {
	// validating the email using a regular expression
	const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return regex.test(email);
}

const addMessageAlert = () => {
	formInputContainer.classList.add('form__input--invalid');
	formInput.classList.add('form__input--invalid');
};
