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
                .catch(function(error) {
                    console.error("Error: ", error);
                });

            vm.newList = "";
        };

        vm.getList = function (listName) {
            BasePageService.getList(listName);
            vm.currentList = BasePageService.currentList;
        };

        vm.removeList = function (list) {
            BasePageService.removeList(list).then(function() {
                vm.currentList = BasePageService.currentList;
            });

        };

        vm.deleteLists = function () {
            BasePageService.deleteLists();
            vm.listArray = [];
            vm.currentList = null;
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
//todo
//         vm.clearCompleted = function () {
//             vm.selected = BasePageService.clearCompleted(vm.selected);
//             vm.updateDB();
//         };

        vm.sendSelected = function () {
            BasePageService.setSelected(vm.selected);
        };


// todo
        // vm.saveNewItem = function (oldName, newName) {
        //     vm.dupItemError = false;
        //     if (!BasePageService.saveNewItem(oldName, newName)) {
        //         vm.dupItemError = true;
        //     }
        //     return BasePageService.saveNewItem(oldName, newName);
        // };
        //
        // vm.editList = function (oldName) {
        //     BasePageService.editList(oldName);
        // };
        //
        // vm.saveNewName = function (newListName) {
        //     vm.dupListError = false;
        //     if (!BasePageService.saveNewName(newListName)) {
        //         vm.dupListError = true;
        //     }
        //     return BasePageService.saveNewName(newListName);
        // };
    }
})();