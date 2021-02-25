window.onload = () => {
	// Get URL Params
	const params = new URLSearchParams(window.location.search);
	const email = params.get('email');
	fetchData(email);
};

const fetchData = (email) => {
	fetch(`https://ltv-data-api.herokuapp.com/api/v1/records.json?email=${email}`)
		.then((response) => response.json())
		.then((data) => {
			assignValues(data);
		})
		.catch((err) => {
			console.log('The following error has ocurred: ', err);
		});
};

const assignValues = (data) => {
	// elements to show the results
	const loadingSpinner = document.querySelector('.spinner-container');
	const noResultsContainer = document.querySelector('.no-results-container');
	const searchContainer = document.querySelector('.search-container');
	const resultsContainer = document.querySelector('.results-container');

	// if there is data on the response
	if (data != '') {
		// destructuring the values
		const {
			email,
			first_name,
			last_name,
			description,
			address,
			phone_numbers,
			relatives,
		} = data;

		// card elements
		const cardName = document.querySelector('.card__name');
		const cardDescription = document.querySelector('.card__description');
		const cardAddress = document.querySelector('.card__address');
		const cardEmail = document.querySelector('.card__email');
		const cardPhoneContainer = document.querySelector('.card__phone-container');
		const cardRelativesContainer = document.querySelector(
			'.card__relatives-container'
		);

		// cleaning some values of the card
		while (cardPhoneContainer.firstChild) {
			cardPhoneContainer.firstChild.remove();
		}
		while (cardRelativesContainer.firstChild) {
			cardRelativesContainer.firstChild.remove();
		}

		// adding the values to the card
		cardName.textContent = `${first_name} ${last_name}`;
		cardDescription.textContent = description;
		cardAddress.textContent = address;
		cardEmail.textContent = email;
		// set a new element for each phone number
		phone_numbers.forEach((key) => {
			let phoneNumberElement = document.createElement('span');
			const classes = ['card__text', 'card__phone', 'd-block'];
			phoneNumberElement.classList.add(...classes);
			phoneNumberElement.textContent = key;
			cardPhoneContainer.appendChild(phoneNumberElement);
		});
		// set a new element for each relative
		relatives.forEach((key) => {
			let relativesElement = document.createElement('span');
			const classes = ['card__text', 'card__relative', 'd-block'];
			relativesElement.classList.add(...classes);
			relativesElement.textContent = key;
			cardRelativesContainer.appendChild(relativesElement);
		});

		// showing the values
		loadingSpinner.classList.add('d-none');
		resultsContainer.classList.remove('d-none');
		searchContainer.classList.remove('d-none');
	}
	// if there is no data show 0 results
	else {
		loadingSpinner.classList.add('d-none');
		searchContainer.classList.remove('d-none');
		noResultsContainer.classList.remove('d-none');
	}
};
