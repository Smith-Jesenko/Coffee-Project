(() => {
	function renderCoffee(coffee) {
		let html = '<div class="coffee">';
		html += '<h3>' + coffee.name + '</h3>';
		html += '<p>' + coffee.roast + '</p>';
		html += '</div>';

		return html;
	}

	function renderCoffees(coffees) {
		let html = '';
		for (let i = 0; i < coffees.length; i++) {
			html += renderCoffee(coffees[i]);
		}
		return html;
	}

	function updateCoffees(e) {
		e.preventDefault(); // don't submit the form, we just want to update the data
		let selectedRoast = roastSelection.value;
		let coffee_name = coffee_selection.value.toLowerCase();
		let filteredCoffees = [];
		coffees.forEach(function (coffee) {
			if ((coffee.roast === selectedRoast || selectedRoast === "all") && coffee.name.toLowerCase().indexOf(coffee_name) === 0) {
				filteredCoffees.push(coffee);
			}
		});
		tbody.innerHTML = renderCoffees(filteredCoffees);
	}

	function addCoffee(e) {
		e.preventDefault();
		let newRoast = document.querySelector("#new-roast").value;
		let newName = document.querySelector("#new-name").value;
		let newCoffee = {
			id: coffees.length + 1,
			name: newName,
			roast: newRoast
		}
		coffees.push(newCoffee);
		updateCoffees(e);

		// Locally stores updated coffee array
		localStorage.setItem('storedCoffees', JSON.stringify(coffees));
	}

// Resets to default menu
	function resetMenu(e) {
		e.preventDefault();
		localStorage.clear();
		while (coffees.length > 14) {
			coffees.pop();
		}
		updateCoffees(e);
	}


// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
	// Assign locally stored list of coffees if available, default menu otherwise
	let coffees = localStorage.getItem('storedCoffees') ? JSON.parse(localStorage.getItem('storedCoffees')) : [
		{id: 1, name: 'Light City', roast: 'light'},
		{id: 2, name: 'Half City', roast: 'light'},
		{id: 3, name: 'Cinnamon', roast: 'light'},
		{id: 4, name: 'City', roast: 'medium'},
		{id: 5, name: 'American', roast: 'medium'},
		{id: 6, name: 'Breakfast', roast: 'medium'},
		{id: 7, name: 'High', roast: 'dark'},
		{id: 8, name: 'Continental', roast: 'dark'},
		{id: 9, name: 'New Orleans', roast: 'dark'},
		{id: 10, name: 'European', roast: 'dark'},
		{id: 11, name: 'Espresso', roast: 'dark'},
		{id: 12, name: 'Viennese', roast: 'dark'},
		{id: 13, name: 'Italian', roast: 'dark'},
		{id: 14, name: 'French', roast: 'dark'},
	];


	let tbody = document.querySelector('#coffees');
	let submitButton = document.querySelector('#submit');
	let roastSelection = document.querySelector('#roast-selection');
	let coffee_selection = document.querySelector("#coffee-name");
	let newSubmit = document.querySelector("#new-submit");

	tbody.innerHTML = renderCoffees(coffees);

	coffee_selection.addEventListener("keyup", updateCoffees);
	roastSelection.addEventListener("change", updateCoffees);
	document.querySelector("#reset-btn").addEventListener("click", resetMenu);
	newSubmit.addEventListener('click', addCoffee);
	submitButton.addEventListener('click', updateCoffees);
})();