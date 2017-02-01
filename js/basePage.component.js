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

    function basePageController(BasePageService, $translate, $firebaseArray) {
        var vm = this;
        vm.selected = BasePageService.selected;
        vm.greeting = "Good ";
        vm.date = new Date();
        vm.newList = "";
        vm.newItem = "";
        vm.dupItemError = false;
        vm.dupListError = false;

        var ref = firebase.database().ref("names");
        vm.listArray = $firebaseArray(ref);

        // sets the current list to the first item in the list array after it has loaded, using vm.currentList = vm.listArray[0] seemed to mess things up
        vm.listArray.$loaded(function () {
            vm.currentList = {name: vm.listArray[0].name, items: vm.listArray[0].items};
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
            vm.listArray.$add({name: vm.newList, items: "empty"}).then(function () {
                vm.currentList = vm.listArray[vm.listArray.length - 1];
            });
            vm.newList = "";
        };

        vm.getList = function (listName) {
            for (var i = 0; i < vm.listArray.length; i++) {
                if (vm.listArray[i].name === listName) {
                    vm.currentList = vm.listArray[i];
                    break;
                }
            }
        };

        vm.removeList = function (list) {
            var listIndex;
            for (var i = 0; i < vm.listArray.length; i++) {
                if (vm.listArray[i].name === list) {
                    listIndex = i;
                    break;
                }
            }
            vm.listArray.$remove(listIndex).then(function () {
                if (vm.currentList.name === list) {
                    vm.currentList = vm.listArray[0];
                }
            })
        };

        vm.deleteLists = function () {
            for (var i = 0; i < vm.listArray.length; i++)
            {
                vm.listArray.$remove(i)
            }
            vm.currentList = null;
        };

        vm.clear = function () {
            var currIndex = getDBIndex();
            vm.listArray[currIndex].items = "empty";
            vm.listArray.$save(currIndex);
            vm.selected = null;
        };

        vm.addItem = function () {
            var currIndex = getDBIndex();
            if (vm.currentList.items === "empty") {
                vm.currentList.items = [vm.newItem];
            }
            else {
                vm.currentList.items.push(vm.newItem);
            }
            vm.listArray[currIndex].items = vm.currentList.items;
            vm.listArray.$save(currIndex);
            vm.newItem = "";
        };

        vm.removeItem = function (item) {
            var currIndex = getDBIndex();
            vm.currentList.items.splice(vm.currentList.items.indexOf(item), 1);
            if (vm.currentList.items.length === 0) {
                vm.listArray[currIndex].items = "empty"
            }
            else {
                vm.listArray[currIndex].items = vm.currentList.items;
            }
            vm.listArray.$save(currIndex);
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

        function getDBIndex() {
            for (var i = 0; i < vm.listArray.length; i++) {
                if (vm.listArray[i] === vm.currentList) {
                    return i;
                }
            }
        }

    }
})();