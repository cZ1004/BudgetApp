
// BUDGET CONTROLLER

var budgetController = (function(){

	// Constructors
	var Expense = function(id, description, value){
		this.id = id;
		this.description = description;
		this.value = value;
	};

	var Income = function(id, description, value){
		this.id = id;
		this.description = description;
		this.value = value;
	};


	// Data structure to store income/expenses
	var data = {
		allItems: {
			exp: [],
			inc: []
		},
		totals: {
			exp: 0,
			inc: 0
		}
	};


	return {
		addItem: function(type, des, val){
			var newItem;

			// Create new ID
			if (data.allItems[type][data.allItems[type].length > 0]){
				ID = data.allItems[type][data.allItems[type].length - 1].id + 1;	
			} else {
				ID = 0;
			}



			// Create new item
			if (type === 'exp'){
				newItem = new Expense(ID, des, val);	
			} else if(type === 'inc'){
				newItem = new Income(ID, des, val);
			};


			//Push into data structure
			data.allItems[type].push(newItem);
			return newItem;

		},

		testing: function(){
			console.log(data);
			console.logt("Martan was here");
		}
	};

})();










// UI CONTROLLER

var UIController = (function(){

	var DOMstrings = {
		inputType: '.add__type',
		inputDescription: '.add__description',
		inputValue: '.add__value',
		inputButton: '.add__btn'
	}

	return{
		// Read data from input
		getinput: function(){
			return{
				type: document.querySelector(DOMstrings.inputType).value,
				description: document.querySelector(DOMstrings.inputDescription).value,
				value: document.querySelector(DOMstrings.inputValue).value	
			};
		},

		getDOMstrings: function(){
			return DOMstrings;
		}
	};

})();










// APP CONTROLLER

var controller = (function(budgetCtrl, UICtrl){

	var setupEventListeners = function(){
		var DOM = UICtrl.getDOMstrings();

		document.querySelector(DOM.inputButton).addEventListener('click', ctrlAddItem);

		document.addEventListener('keypress', function(event){
			if (event.key === 13 || event.which === 13) {
				ctrlAddItem();
			};
		});
	};




	var ctrlAddItem = function(){

		var input, newItem;

		// Get input data
		input = UICtrl.getinput();


		// Add item to budget controller
		newItem = budgetCtrl.addItem(input.type, input.description, input.value);



		// Add to UI

		// Calculate new budget


	};

	return{
		init: function(){
			console.log("app started");
			setupEventListeners();
		}	
	};

})(budgetController, UIController);

controller.init();











