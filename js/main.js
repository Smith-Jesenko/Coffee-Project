const coffees = localStorage.getItem('storedCoffees') ? JSON.parse(localStorage.getItem('storedCoffees')) : [
	{id: 1, name: 'Air Roast 1', roast: 'light'},
	{id: 2, name: 'Venti Vans', roast: 'light'},
	{id: 3, name: 'Puma Mocha', roast: 'light'},
	{id: 4, name: 'Sneak-a-Latte', roast: 'medium'},
	{id: 5, name: 'Converse Cappuccino', roast: 'medium'},
	{id: 6, name: 'Lace-Up Latte', roast: 'medium'},
	{id: 7, name: 'High-Top Brew', roast: 'dark'},
	{id: 8, name: 'Mocha Midsole', roast: 'dark'},
	{id: 9, name: 'Kickstart Blend', roast: 'dark'},
	{id: 10, name: 'Jumpman Java', roast: 'dark'},
	{id: 11, name: 'High Top Honey Cappuccino', roast: 'dark'},
	{id: 12, name: 'Air Mochaccino', roast: 'dark'},
	{id: 13, name: 'Air Max Mocha', roast: 'dark'},
	{id: 14, name: 'Sneakerhead Smores Latte', roast: 'dark'},
];

const submitButton = document.querySelector('#submit');
const roastSelection = document.querySelector('#roast-selection');
const coffee_selection = document.querySelector("#coffee-name");
const newSubmit = document.querySelector("#new-submit");
const debounce = (fn, delay) => {
	let timeoutId;
	return (...args) => {
		if (timeoutId) {
			clearTimeout(timeoutId);
		}
		timeoutId = setTimeout(() => {
			fn(...args);
		}, delay);
	};
};

const renderCoffee = (coffee) => {
	const { name, roast } = coffee;
	const coffeeElement = document.createElement("div");
	coffeeElement.className = "coffee row";

	let imgSrc;
	switch (roast.toLowerCase()) {
		case 'light':
			imgSrc = './img/Sneak-a-Latte.svg';
			break;
		case 'medium':
			imgSrc = './img/Converse Cappuccino.svg';
			break;
		case 'dark':
			imgSrc = './img/Jumpman Java.svg';
			break;
		default:
			imgSrc = './img/default.svg';
	}

	coffeeElement.innerHTML = `
        <div class="col-md-3 coffee-image"> 
            <img src="${imgSrc}" alt="${roast} Roast Image" class="img-fluid">
        </div>
        <div class="col-md-9 coffee-info"> 
            <h3>${name}</h3>
            <p>${roast}</p>
        </div>
    `;
	return coffeeElement;
};
	const renderCoffees = (coffees) => {
	const coffeeContainer = document.querySelector('#coffees');
	coffeeContainer.innerHTML = "";
	const coffeesFragment = document.createDocumentFragment();
	coffees.forEach((coffee) => {
		const coffeeElement = renderCoffee(coffee);
		coffeesFragment.appendChild(coffeeElement);
	});
	coffeeContainer.appendChild(coffeesFragment);
};

const filterCoffees = () => {
	const selectedRoast = roastSelection.value;
	const coffeeName = coffee_selection.value.toLowerCase();
	return coffees.filter((coffee) =>
		(coffee.roast === selectedRoast || selectedRoast === "all") &&
		coffee.name.toLowerCase().indexOf(coffeeName) === 0
	);
};

const updateCoffees = (e) => {
	e.preventDefault();
	const filteredCoffees = filterCoffees();
	renderCoffees(filteredCoffees);
};

const addCoffee = (e) => {
	e.preventDefault();
	const newRoast = document.querySelector("#new-roast").value;
	const newName = document.querySelector("#new-name").value;
	const newCoffee = {
		id: coffees.length + 1,
		name: newName,
		roast: newRoast
	};
	coffees.push(newCoffee);
	updateCoffees(e);
	localStorage.setItem('storedCoffees', JSON.stringify(coffees));
};

const resetMenu = (e) => {
	e.preventDefault();
	localStorage.clear();
	while (coffees.length > 14) {
		coffees.pop();
	}
	updateCoffees(e);
};


const updateAndHandleFilterEvents = () => {
	renderCoffees(coffees);
	coffee_selection.addEventListener("keyup", debounce(updateCoffees, 500));
	roastSelection.addEventListener("change", updateCoffees);
	document.querySelector("#reset-btn").addEventListener("click", resetMenu);
	newSubmit.addEventListener('click', addCoffee);
	submitButton.addEventListener('click', updateCoffees);
};

// MAIN
(() => {
	updateAndHandleFilterEvents();
})();