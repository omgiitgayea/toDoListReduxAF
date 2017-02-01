/**
 * Created by GodaiYuusaku on 12/20/16.
 */
(function () {
    angular
        .module("myApp")
        .service("BasePageService", function ($localStorage, $mdToast) {
            var vm = this;
            vm.currentList;
            vm.listArray = [];
            vm.dupListError = false;
            vm.dupItemError = false;

            vm.selected = null;
            vm.oldName = "";

            vm.myToast = $mdToast.simple().position("top").hideDelay(2000);

            vm.addList = function (newList) {
                vm.dupListError = false;
                if (newList) {
                    var inList = false;
                    for (var i = 0; i < vm.listArray.length; i++) {
                        if (newList === vm.listArray[i].name) {
                            inList = true;
                            vm.dupListError = true;
                            break;
                        }
                    }
                    if (!inList) {
                        vm.listArray.push({name: newList, items: []});
                        vm.currentList = vm.listArray[vm.listArray.length - 1];
                        $mdToast.show(vm.myToast.textContent("You added the " + newList + " list!"));
                    }
                    else {
                        $mdToast.show(vm.myToast.textContent("Duplicate Lists are not allowed"));
                    }
                }
            };

            vm.getList = function (listName) {
                for (var i = 0; i < vm.listArray.length; i++) {
                    if (listName === vm.listArray[i].name) {
                        vm.currentList = vm.listArray[i];
                        break;
                    }
                }
                $mdToast.show(vm.myToast.textContent("Hey you just changed to the " + listName + " list!"));
            };

            vm.clear = function () {
                vm.currentList.items = [];
                $mdToast.show(vm.myToast
                    .textContent("Whelp, you just deleted all the items from your list..."));
            };

            vm.addItem = function (newItem) {
                vm.dupItemError = true;
                if (newItem && (vm.currentList.items.indexOf(newItem) === -1)) {
                    vm.currentList.items.push(newItem);
                    vm.dupItemError = false;
                    $mdToast.show(vm.myToast.textContent("You added the " + newItem + " item!"));
                }
                else {
                    $mdToast.show(vm.myToast.textContent("Duplicate Items are not allowed"))
                }
            };

            vm.removeItem = function (item) {
                vm.currentList.items.splice(vm.currentList.items.indexOf(item), 1);
                $mdToast.show(vm.myToast.textContent("Goodbye " + item + "!"));
            };

            vm.clearCompleted = function (selected) {
                for (var key in selected) {
                    if (vm.currentList.items.indexOf(key) != -1 && selected[key]) {
                        vm.currentList.items.splice(vm.currentList.items.indexOf(key), 1);
                        delete selected[key];
                    }
                }

                if (Object.keys(selected).length === 0) {
                    selected = null;
                }
                $mdToast.show(vm.myToast.textContent("Yay! You accomplished something!"));
                return selected;
            };

            vm.setSelected = function (selected) {
                vm.selected = selected;
            };

            vm.deleteLists = function () {
                vm.listArray = [];
                vm.currentList = null;
                // vm.database.ref().remove();
                $mdToast.show(vm.myToast.textContent("Congratulations on embracing your inner procrastinator!"));
            };

            vm.saveNewItem = function (oldItem, newItem) {
                if (oldItem === newItem) {
                    return true;
                }
                if (vm.currentList.items.indexOf(newItem) === -1) {
                    vm.currentList.items.splice(vm.currentList.items.indexOf(oldItem), 1, newItem);
                    return true;
                }
                else {
                    return false;
                }

            };

            vm.saveNewName = function (newListName) {
                for (var i = 0; i < vm.listArray.length; i++) {
                    if (vm.listArray[i].name === newListName) {
                        return false;
                    }
                }
                for (var i = 0; i < vm.listArray.length; i++) {
                    if (vm.listArray[i].name === vm.oldName) {
                        vm.listArray[i].name = newListName;
                        return true;
                    }
                }
            };

            vm.editList = function (oldName) {
                vm.oldName = oldName;
            };

            vm.removeList = function (list) {
                for (var i = 0; i < vm.listArray.length; i++) {
                    if (vm.listArray[i].name === list) {
                        vm.listArray.splice(i, 1);
                        break;
                    }
                }
                $mdToast.show(vm.myToast.textContent("I guess you don't have to do " + list + "..."));
            };
        });
})();