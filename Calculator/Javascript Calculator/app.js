
//budget Controller
var budgetController = (function () {

    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        allItem: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
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

    var domStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    }


    return {
        getInput: function () {
            return {
                type: document.querySelector(domStrings.inputType).value,
                description: document.querySelector(domStrings.inputDescription).value,
                value: document.querySelector(domStrings.inputValue).value
            };
        },

        addListItem: function(obj, type){
            
        
        },

        getDOMstrings: function (){
            return domStrings
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
        })
    }


    var ctrlAddItem = function () {

        var input, newItem;

        //Get all file input
        input = UIController.getInput();

        //Add the item to the budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);

        //Add the item to the UI

        //Calculate the budget

        //Display the UI

    }

    return {
        init: function () {
            console.log('Application');

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