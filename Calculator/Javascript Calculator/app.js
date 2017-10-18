
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
        allitem: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
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
                Description: document.querySelector(domStrings.inputDescription).value,
                Value: document.querySelector(domStrings.inputValue).value
            };
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

        //Get all file input
        var input = UIController.getInput();

        //Add the item to the budget controller

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