
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


	// Private function to calculate totals
	var calculateTotal = function(type){
		var sum = 0;

		data.allItems[type].forEach(function(curr){
			sum += curr.value;
		});

		data.totals[type] = sum;

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
		},
		budget: 0,
		percentage: -1
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


		calculateBudget: function(){

			// Calculate income and expense
			calculateTotal('exp');
			calculateTotal('inc');

			// Calculate budget: Income - Expenses
			data.budget = data.totals.inc - data.totals.exp;


			if (data.totals.inc > 0){
				// Calculate percentage of income
				data.percentage = Math.round((data.totals.exp/data.totals.inc) * 100);
			} else {
				data.percentage = -1;
			};
		},


		getBudget: function(){
			return{
				budget: data.budget,
				totalInc: data.totals.inc,
				totalExp: data.totals.exp,
				totalsPercentage: data.percentage
			}
		},


		testing: function(){
			console.log(data);
		}
	};

})();










// UI CONTROLLER

var UIController = (function(){

	var DOMstrings = {
		inputType: '.add__type',
		inputDescription: '.add__description',
		inputValue: '.add__value',
		inputButton: '.add__btn',
		incomeContainer: '.income__list',
		expensesContainer: '.expenses__list'
	}

	return{
		// Read data from input
		getinput: function(){
			return{
				type: document.querySelector(DOMstrings.inputType).value,
				description: document.querySelector(DOMstrings.inputDescription).value,
				value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
			};
		},


		addListItem: function(obj, type){

			var html, newHtml, element;

			// HTML string with placeholder text
			if(type === 'inc'){
				element = DOMstrings.incomeContainer;
		           html = '<div class="item clearfix" id="income-%id&"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button></div></div></div>';	
		       } else if (type === 'exp'){
		       	element = DOMstrings.expensesContainer;
		           html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
		       };

			// Replace placeholder text
			newHtml = html.replace('%id%', obj.id);
			newHtml = newHtml.replace('%description%', obj.description);
			newHtml = newHtml.replace('%value%', obj.value);

			// Insert HTML into DOM
			document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

		},


		clearFields: function(){
			var fields, fieldsArr;

			// Selects fields to clear. Comma joins separate vars. Returns a list
			fields = document.querySelectorAll(DOMstrings.inputDescription + ',' +  DOMstrings.inputValue);

			// Slice is an array method, so we need to access it through Array prototype. Passing list into method to turn into an array and then slice
			fieldsArr = Array.prototype.slice.call(fields);

			// Loops through each of the arguments passed into the function
			fieldsArr.forEach(function(current, index, array){
				current.value = "";
			});

			fieldsArr[0].focus();

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


	var updateBudget = function(){

		// Calculate new budget
		budgetCtrl.calculateBudget();

		// Return budget
		var budget = budgetCtrl.getBudget();


		// Display budget in UI
		console.log(budget);
	};


	var ctrlAddItem = function(){

		var input, newItem;

		// Get input data
		input = UICtrl.getinput();


		if(input.description !== "" && !isNaN(input.value) && input.value > 0){
			// Add item to budget controller
			newItem = budgetCtrl.addItem(input.type, input.description, input.value);


			// Add to UI
			UICtrl.addListItem(newItem, input.type);


			// Clear fields
			UICtrl.clearFields();


			// Calculate and update budget
			updateBudget();

		};


	};

	return{
		init: function(){
			console.log("app started");
			setupEventListeners();
		}	
	};

})(budgetController, UIController);

controller.init();











