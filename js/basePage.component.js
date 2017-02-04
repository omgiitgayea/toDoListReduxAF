/**
 * Created by GodaiYuusaku on 12/15/16.
 */
(function () {
    angular
        .module("myApp")
        .component("basePage", {
            templateUrl: "html/basePage.html",
            controller: basePageController,
            controllerAs: "vm"
        });

    function basePageController(BasePageService, $translate) {
        var vm = this;
        vm.listArray = BasePageService.listArray;
        vm.currentList = BasePageService.currentList;
        vm.selected = BasePageService.selected;
        vm.greeting = "Good ";
        vm.date = new Date();
        vm.newList = "";
        vm.newItem = "";
        vm.loggedIn = false;

        firebase.auth().onAuthStateChanged(function (user) {
            if(user) {
                vm.listArray = BasePageService.listArray;
                getCurrentList();
                vm.loggedIn = true;
            }
            else {
                vm.loggedIn = false;
                vm.listArray = [];
                vm.currentList = null;
            }
        });

        // makes the greeting time of day specific
        if (vm.date.getHours() < 12) {
            vm.greeting += "Morning, Dave";
        }
        else if (vm.date.getHours() < 18) {
            vm.greeting += "Afternoon, Dave";
        }
        else {
            vm.greeting += "Evening, Dave";
        }

        // need to set the current list after all the DB stuff is done, hence the then
        vm.addList = function () {
            BasePageService.addList(this.newList).then(function () {
                vm.currentList = BasePageService.currentList;
                vm.listArray = BasePageService.listArray;
            })
                .catch(function (error) {
                    console.error("Error: ", error);
                });

            vm.newList = "";
        };

        vm.getList = function (listName) {
            BasePageService.getList(listName);
            vm.currentList = BasePageService.currentList;
        };

        vm.removeList = function (list) {
            BasePageService.removeList(list).then(function () {
                vm.currentList = BasePageService.currentList;
            });

        };

        vm.deleteLists = function () {
            BasePageService.deleteLists();
            vm.listArray = [];
            vm.currentList = null;
        };

        vm.saveNewName = function (oldListName, newListName) {
            return BasePageService.saveNewName(oldListName, newListName);
        };

        vm.clear = function () {
            BasePageService.clear();
            vm.selected = null;
        };

        vm.addItem = function () {
            BasePageService.addItem(vm.newItem);
            vm.currentList = BasePageService.currentList;
            vm.listArray = BasePageService.listArray;
            vm.newItem = "";
        };

        vm.removeItem = function (item) {
            BasePageService.removeItem(item);
        };

        vm.saveNewItem = function (oldName, newName) {
            return BasePageService.saveNewItem(oldName, newName);
        };

        vm.clearCompleted = function () {
            vm.selected = BasePageService.clearCompleted(vm.selected);
        };

        // sends the array of checkbox values to the service
        vm.sendSelected = function () {
            BasePageService.setSelected(vm.selected);
        };

        // gets the proper current list from the service async-ly
        function getCurrentList() {
            BasePageService.sendCurrentList().then(function () {
                vm.currentList = BasePageService.currentList;
            })
        }
    }
})();