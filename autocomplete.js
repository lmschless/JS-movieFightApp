// will pass in a config object from index.js
// this object will specify how the autocomplete function should work
// where we put references to movies and how they should behave when clicked
const createAutoComplete = ({ root, renderOption, onOptionSelect, inputValue, fetchData }) => {
	root.innerHTML = `
  <label><b>Search</b></label>
  <input class="input" />
  <div class="dropdown">
    <div class="dropdown-menu">
      <div class="dropdown-content results"></div>
    </div>
  </div>
`;

	// store DOM elements as variables to refence later inside of having
	// to type the class each time.
	const input = root.querySelector('input');
	const dropdown = root.querySelector('.dropdown');
	const resultsWrapper = root.querySelector('.results');

	const onInput = async (event) => {
		const items = await fetchData(event.target.value);

		if (!items.length) {
			dropdown.classList.remove('is-active');
		}

		if (!items.length) {
			dropdown.classList.remove('is-active');
			return;
		}

		// set innerHTML blank before the next API request fills in
		resultsWrapper.innerHTML = '';
		dropdown.classList.add('is-active');
		// iterate through the list of items(movies) and create a new
		// a element for each one.
		for (let item of items) {
			const option = document.createElement('a');

			option.classList.add('dropdown-item');
			option.innerHTML = renderOption(item);
			// listen for a click outside of the input box, remove is-active
			// on the element so the box is not longer highlighted.
			option.addEventListener('click', () => {
				dropdown.classList.remove('is-active');
				input.value = inputValue(item);
				// use .value to access what goes inside the input box
				// use movie.Title to grab the exact Title from the API.
				onOptionSelect(item);
			});

			resultsWrapper.appendChild(option);
		}
	};
	// listen for user input on input element, call debouncer function
	// and pass in the onInput function, with a 500ms delay.
	input.addEventListener('input', debounce(onInput, 500));

	// listen for click outside of root element on page. remove
	// active class to deselect the input and clear the inner HTML.
	document.addEventListener('click', (event) => {
		if (!root.contains(event.target)) {
			dropdown.classList.remove('is-active');
		}
	});
};
