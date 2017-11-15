
//budget Controller
var budgetController = (function () {

    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    Expense.prototype.calcPercentage = function (totalIncome) {
        if (totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100);
        } else {
            this.percentage = -1;
        }
    };

    Expense.prototype.getPercetage = function () {
        return this.percentage;
    }

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var calculateTotal = function (type) {
        var sum = 0;
        data.allItem[type].forEach(function (cur) {
            sum += cur.value;
        });
        data.totals[type] = sum;
    };

    var data = {
        allItem: {
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
        addItem: function (type, des, val) {

            var newItem;

            // Create A New ID
            if (data.allItem[type].length > 0) {

                ID = data.allItem[type][data.allItem[type].length - 1].id + 1;
            } else {
                ID = 0;
            }


            //Create new item based on  'inc' or 'exp' type
            if (type === 'exp') {
                newItem = new Expense(ID, des, val)
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val)
            }

            data.allItem[type].push(newItem)
            return newItem;
        },

        deleteItem: function (type, id) {
            var ids, index;

            ids = data.allItem[type].map(function (current) {
                return current.id;
            });

            index = ids.indexOf(id);

            if (index !== -1) {
                data.allItem[type].splice(index, 1);
            }

        },

        calculateBudget: function() {

            // calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');

            // Calculate the budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;

            // calculate the percentage of income that we spent
            if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }            

            // Expense = 100 and income 300, spent 33.333% = 100/300 = 0.3333 * 100
        },

        //Update Percentage
        calculatePercentages: function(){
            
            data.allItem.exp.forEach(function (cur) {
                cur.calcPercentage(data.totals.inc);
            });
        },

        getPercetages: function() {
            var allPerc = data.allItem.exp.map(function (cur) {
                return cur.getPercetage();
            });
            return allPerc;
        },

        getBudget: function() {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            }
        }, 

        testing: function () {
            console.log(data)
        }

    };
})();


var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
};


//UI Controller
var UIController = (function () {

    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercLabel: '.item__percentage'

    }


    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };
        },

        addListItem: function(obj, type) {
            var html, newHtml, element;
            // Create HTML string with placeholder text

            if (type === 'inc') {
                element = DOMstrings.incomeContainer;

                html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp') {
                element = DOMstrings.expensesContainer;

                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            // Replace the placeholder text with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value );

            // Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },
         
        deleteListItem: function (selectorID) {
            var el = document.getElementById(selectorID);

            el.parentNode.removeChild(el)
        },

        //Clear fields 
        clearFields: function() {
            var fields, fieldsArr;
            
            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
            
            fieldsArr = Array.prototype.slice.call(fields);
            
            fieldsArr.forEach(function(current, index, array) {
                current.value = "";
            });
            
            fieldsArr[0].focus();
        },

        displayBudget: function(obj) {
            document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
            document.querySelector(DOMstrings.expensesLabel).textContent = obj.totalExp;
            document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage;

            if (obj.percentage > 0) {
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent = '---';
            }
        },

        displayPercentages: function(percentages) {
            
            var fields = document.querySelectorAll(DOMstrings.expensesPercLabel);

            var nodeListForEach = function (list, callback) {
                for (var i = 0; i < list.length; i++) {
                    callback(list[i], i);
                }
            };

            nodeListForEach(fields, function (current, index) {

                // Do stuff
                if (percentages[index] > 0) {
                    current.textContent = percentages[index] + '%';
                } else {
                    current.textContent = '---';
                }

            });
        },

        formatNumber: function(num, type) {
        
            var numSplit, int, dec;

            num = Math.abs(num);
            num = num.toFixed(2);

            numSplit = num.split('.')

            int = numSplit[0];

            if (int.length > 3) {
                int = int.substring(0, int.length - 3) + ',' + int.substring(1, 3);
            }


            dec = numSplit[1];

        },

        getDOMstrings: function () {
            return DOMstrings
        }
    };  

})();

//Global App Controller
var controller = (function (budgetCtrl, UICtrl) {

    var setupEventListeners = function () {

        var DOM = UICtrl.getDOMstrings();


        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function (event) {

            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });

        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

    };

        var updateBudget = function() {

            //// 1. Calculate the budget
            budgetCtrl.calculateBudget();

            //// 2. Return the budget
            var budget = budgetCtrl.getBudget();

            //// 3. Display the budget on the UI
            UICtrl.displayBudget(budget)
        };

        var updatePercentages = function () {
            
            //Calculate Percentages
            budgetCtrl.calculatePercentages();

            // Read percentages from the budget controller
            var percentages = budgetCtrl.getPercetages();

            // Update the UI with new percentage
            UICtrl.displayPercentages(percentages);

        };

        var ctrlAddItem = function () {

            var input, newItem;

            //Get all file input
            input = UIController.getInput();

            if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
                //Add the item to the budget controller
                newItem = budgetCtrl.addItem(input.type, input.description, input.value);

                //Add the item to the UI
                UICtrl.addListItem(newItem, input.type);

                //Clear the fields
                UICtrl.clearFields();

                //Calculate and update budget
                updateBudget();

                // Update Percentages
                updatePercentages();
            }
        };
        
    //Delete Item 
        var ctrlDeleteItem = function (event) {
            var itemID, splitID, type, ID;

            itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

            if (itemID) {
                splitID = itemID.split('-');
                type = splitID[0];
                ID = parseInt(splitID[1]);


                // 1. delete the item from the data structure
                budgetCtrl.deleteItem(type, ID);

                // 2. Delete the item from the UI
                UICtrl.deleteListItem(itemID);
  
                // 3. Update and show the new budget
                updateBudget();


            }
        };

    return {
        init: function () {
            console.log('Application');
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: 0
            })
            setupEventListeners();
        }
    }



})(budgetController, UIController);

controller.init();




















//Javascript Closure
//var budgetController = (function () {

//    var x = 23;

//    var add = function (a) {
//        return x + a;
//    };

//    return {
//        publicTest: function (b) {
//            return add(b)
//        }
//    }

//})();

//var UIController = (function () {



//})();


//var controller = (function (budgetCtrl, UICtrl) {

//    var z = budgetCtrl.publicTest(10);

//    return {
//        anotherPublic: function() {
//            console.log(z)
//        }
//    }


//})(budgetController, UIController);