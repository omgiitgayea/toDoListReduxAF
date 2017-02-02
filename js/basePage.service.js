/**
 * Created by GodaiYuusaku on 12/20/16.
 */
(function () {
    angular
        .module("myApp")
        .service("BasePageService", function ($localStorage, $mdToast, $firebaseArray, $q) {
            var vm = this;
            vm.currentList = null;
            vm.selected = null;
            // vm.oldName = "";

            vm.myToast = $mdToast.simple().position("top").hideDelay(2000);

            var ref = firebase.database().ref("names");
            vm.listArray = $firebaseArray(ref);

            //sets the current list to the first item in the list array after it has loaded and then returns it to the component via a promise
            vm.sendCurrentList = function() {
                var deferred = $q.defer();
                vm.listArray.$loaded()
                    .then(function () {
                        if (vm.listArray[0])
                            vm.currentList = vm.listArray[0];
                        deferred.resolve(vm.currentList);
                    })
                    .catch(function (error) {
                        console.error("Error:", error);
                    });
                return deferred.promise;
            };

            vm.addList = function (newList) {
                var deferred = $q.defer();
                var inList = false;
                for (var i = 0; i < vm.listArray.length; i++) {
                    if (newList === vm.listArray[i].name) {
                        inList = true;
                        break;
                    }
                }
                if (!inList) {
                    vm.listArray.$add({name: newList, items: "empty"}).then(function () {
                        vm.currentList = vm.listArray[vm.listArray.length - 1];
                        deferred.resolve(vm.currentList);
                    })
                        .catch(function (error) {
                            console.error("Error: ", error);
                            deferred.reject("Couldn't add stuff")
                        });
                    $mdToast.show(vm.myToast.textContent("You added the " + newList + " list!"));
                }
                else {
                    $mdToast.show(vm.myToast.textContent("Duplicate Lists are not allowed"));
                    deferred.reject("Duplicate List...")
                }
                return deferred.promise;
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

            vm.removeList = function (list) {
                var deferred = $q.defer();
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
                    deferred.resolve(vm.currentList);
                });
                return deferred.promise;
                $mdToast.show(vm.myToast.textContent("I guess you don't have to do " + list + "..."));
            };

            vm.deleteLists = function () {
                for (var i = 0; i < vm.listArray.length; i++) {
                    vm.listArray.$remove(i)
                }
                vm.currentList = null;
                $mdToast.show(vm.myToast.textContent("Congratulations on embracing your inner procrastinator!"));
            };

            vm.saveNewName = function (oldListName, newListName) {
                for (var i = 0; i < vm.listArray.length; i++) {
                    if (vm.listArray[i].name === newListName) {
                        $mdToast.show(vm.myToast.textContent("Duplicate Lists are not allowed"));
                        return false;
                    }
                }
                for (var i = 0; i < vm.listArray.length; i++) {
                    if (vm.listArray[i].name === oldListName) {
                        vm.listArray[i].name = newListName;
                        vm.listArray.$save(i);
                        $mdToast.show(vm.myToast.textContent("I guess " + newListName + " is better than " + oldListName + ". Fascinating..."));
                        return true;
                    }
                }
            };

            vm.clear = function () {
                var currIndex = getDBIndex();
                vm.listArray[currIndex].items = "empty";
                vm.listArray.$save(currIndex);
                $mdToast.show(vm.myToast
                    .textContent("Whelp, you just deleted all the items from your list..."));
            };

            vm.addItem = function (newItem) {
                var currIndex = getDBIndex();
                if (vm.currentList.items === "empty") {
                    vm.currentList.items = [newItem];
                }
                else {
                    if (newItem && (vm.currentList.items.indexOf(newItem) === -1)) {
                        vm.currentList.items.push(newItem);
                        $mdToast.show(vm.myToast.textContent("You added the " + newItem + " item!"));
                    }
                    else {
                        $mdToast.show(vm.myToast.textContent("Duplicate Items are not allowed"))
                        return;
                    }
                }
                vm.listArray[currIndex].items = vm.currentList.items;
                vm.listArray.$save(currIndex);
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
                $mdToast.show(vm.myToast.textContent("Goodbye " + item + "!"));
            };


// to change
            vm.clearCompleted = function (selected) {
                var currIndex = getDBIndex();
                for (var key in selected) {
                    if (vm.currentList.items.indexOf(key) != -1 && selected[key]) {
                        vm.currentList.items.splice(vm.currentList.items.indexOf(key), 1);
                        delete selected[key];
                    }
                }

                vm.listArray[currIndex].items = vm.currentList.items;
                vm.listArray.$save(currIndex);

                if (Object.keys(selected).length === 0) {
                    selected = null;
                }
                $mdToast.show(vm.myToast.textContent("Yay! You accomplished something!"));
                return selected;
            };

            vm.setSelected = function (selected) {
                vm.selected = selected;
            };


            vm.saveNewItem = function (oldItem, newItem) {
                var currIndex = getDBIndex();
                if (vm.currentList.items.indexOf(newItem) === -1) {
                    vm.currentList.items.splice(vm.currentList.items.indexOf(oldItem), 1, newItem);
                    vm.listArray[currIndex].items = vm.currentList.items;
                    vm.listArray.$save(currIndex);
                    $mdToast.show(vm.myToast.textContent("You changed " + oldItem + " to " + newItem + "! Amazing!"));
                    return true;
                }
                else {
                    $mdToast.show(vm.myToast.textContent("Duplicate Items are not allowed"))
                    return false;
                }

            };

            function getDBIndex() {
                for (var i = 0; i < vm.listArray.length; i++) {
                    if (vm.listArray[i] === vm.currentList) {
                        return i;
                    }
                }
            }
        });
})();