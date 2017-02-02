/**
 * Created by GodaiYuusaku on 12/20/16.
 */
angular.module('myApp').component('listItems', {
    templateUrl: 'html/listItems.html',
    controller: ListItemsController,
    controllerAs: "lic",
    bindings: {
        itemName: "@"
    },
    require: {
        itemCrtl: "^basePage"
    }
});

function ListItemsController() {
    var vm = this;
    vm.editingList = false;
    var oldName = "";

    vm.removeItem = function (name) {
        vm.itemCrtl.removeItem(name);
    };

    vm.editItem = function (name) {
        vm.editingList = true;
        oldName = name;
    };

    vm.saveNewItem = function () {
        if(vm.itemName != oldName) {
            var isNew = vm.itemCrtl.saveNewItem(oldName, vm.itemName);
            if (!isNew) {
                vm.itemName = oldName;
            }
        }
        vm.editingList = false;
        oldName = "";
    };

    vm.reset = function () {
        vm.itemName = oldName;
    }
}