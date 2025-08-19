// JavaScript Document

//selects all elements in the HTML document that have a class of "tabset", and stores them in the "tabsets" variable as a NodeList.
const tabsets = document.querySelectorAll(".tabset");

//loops through each of the tabset elements in the "tabsets" NodeList, and sets the current tabset element to the "tabset" variable.
for (let i = 0; i < tabsets.length; i++) {
	const tabset = tabsets[i];

	//selects all elements within the current tabset element that have a class of "tabset-nav-item", and stores them in the "tabs" variable as a NodeList.
	const tabs = tabset.querySelectorAll(".tabset-nav-item");

	// loops through each of the tab elements in the "tabs" NodeList, sets the current tab element to the "tab" variable and sets the "tabindex" attribute of all tabs to a value of -1.
	for (let j = 0; j < tabs.length; j++) {
		const tab = tabs[j];
		tab.tabIndex = -1;

		//selects the element with a class matching the value of the "data-tabset-target" attribute of the current tab element, and stores it in the "tabPanel" variable.
		const tabPanel = document.querySelector(tab.getAttribute("data-tabset-target"));

		//sets the "tabindex" attribute of all tabpanel elements to a value of 0.
		tabPanel.tabIndex = 0;

		//adds a click event listener to the current tab element, which will execute the code in the following block when the tab is clicked.
		tab.addEventListener("click", function() {

			//loops through each of the tab elements and tabset-panel elements within the current tabset and removes the "active" class from their class lists. This ensures that only the currently selected tab and its corresponding panel will have their attributes and class set to "true" and "active", respectively.
			for (let k = 0; k < tabs.length; k++) {
				tabs[k].classList.remove("active");
				}
			for (let k = 0; k < tabset.querySelectorAll(".tabset-panel").length; k++) {
				tabset.querySelectorAll(".tabset-panel")[k].classList.remove("active");
			}
			tab.classList.add("active");
			tabPanel.classList.add("active");
		});

		//adds an event listener to the current tab element for the "keydown" event, which fires when a key is pressed.
		tab.addEventListener("keydown", function(event) {

			// assigns the keyCode of the key that was pressed to the "keyCode" variable. The keyCode is used to identify which key was pressed, and it is obtained either from the "keyCode" property of the event object or the "which" property, depending on the browser.
			const keyCode = event.keyCode || event.which;

			//checks if the key that was pressed is either the "Enter" key (13) or the "Space" key (32) and prevent the default action of the key press event
			if (keyCode === 13 || keyCode === 32) {
				event.preventDefault();

				// loops through each of the tab elements within the current tabset, sets their "aria-selected" attribute to "false", sets their "tabindex" attribute to a value of -1 and removes the "active" class from their class list.
				for (let k = 0; k < tabs.length; k++) {
					tabs[k].setAttribute("aria-selected", "false");
					tabs[k].tabIndex = -1;
					tabs[k].classList.remove("active");
				}
				//loops through each of the tabset-panel elements within the current tabset, and sets their "aria-hidden" attribute to "true" and removes the "active" class from their class list.
				for (let k = 0; k < tabset.querySelectorAll(".tabset-panel").length; k++) {
					tabset.querySelectorAll(".tabset-panel")[k].setAttribute("aria-hidden", "true");
					tabset.querySelectorAll(".tabset-panel")[k].classList.remove("active");
				}
				//sets the "aria-selected" attribute of the current tab element to "true", sets the "tabindex" attribute to a value of 0, and adds the "active" class to its class list.
				tab.setAttribute("aria-selected", "true");
				tab.tabIndex = 0;
				tab.classList.add("active");

				//sets the "aria-hidden" attribute of the corresponding tabset-panel element to "false", adds the "active" class to its class list, and sets focus on the tabPanel element.
				tabPanel.setAttribute("aria-hidden", "false");
				tabPanel.classList.add("active");
				tabPanel.focus();

			// checks if the key that was pressed is either the left arrow (37) and prevents the default action after key press event.
			} else if (keyCode === 37) {
				event.preventDefault();

				//assigns the previous tab element to the "previousTab" variable, or if there is no previous tab, it assigns the last tab in the tabset to the variable. Then it sets focus on the previous tab element.
				const previousTab = tab.previousElementSibling || tabs[tabs.length - 1];
				previousTab.focus();

			//checks if the key that was pressed is either the right arrow (39) and prevents the default action after key press event.
			} else if (keyCode === 39) {
				event.preventDefault();

				//creates a reference to the next tab in the tabset. If the current tab is the last tab in the set, the nextElementSibling property will be null, so the || operator provides a fallback value of the first tab in the set (tabs[0]).
				const nextTab = tab.nextElementSibling || tabs[0];

				//focuses on the next tab in the set, so that the user can navigate through the tabs using the arrow keys.
				nextTab.focus();
			//checks if the key that was pressed is the home key (36) and prevents the default action after key press event.
			} else if (keyCode === 36) {
				event.preventDefault();

				//creates a reference to the first tab in the tabset and sets the keyboard focus to this tab.
				const firstTab = tabs[0];
				firstTab.focus();

			//checks if the key that was pressed is the end key (35) and prevents the default action after key press event.
			} else if (keyCode === 35) {
				event.preventDefault();

				//creates a reference to the last tab in the tabset and sets the keyboard focus to this tab.
				const lastTab = tabs[tabs.length -1];
				lastTab.focus();
			}
		});

		//checks if the current 'tab' is the first one in the 'tabset'
		if (j === 0) {
			//sets the tab and tabPanel to be active by adding the 'active' class to the tab and tabPanel elements, setting the "aria-selected" attribute of the tab element to true and the aria-hidden attribute of the tabPanel element to false. This ensures that the first tab and tabPanel are selected and displayed by default. Also sets the "tabindex" attribute of the current tab to a value of 0.
			tab.classList.add("active");
			tab.setAttribute("aria-selected", "true");
			tab.tabIndex = 0;
			tabPanel.classList.add("active");
			tabPanel.setAttribute("aria-hidden", "false");

		//removes the active class from the tabPanel element and sets its aria-hidden attribute to true, effectively hiding it from view until the user selects its corresponding tab.
		} else {
			tabPanel.classList.remove("active");
			tabPanel.setAttribute("aria-hidden", "true");
		}
	}
}

