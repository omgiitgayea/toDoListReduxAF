/**
 * Created by GodaiYuusaku on 12/20/16.
 */
angular.module('myApp').component('editableField', {
    templateUrl: 'html/listNames.html',
    controller: EditableFieldController,
    controllerAs: "ef",
    bindings: {
        listName: "@"
    },
    require: {
        listCtrl: "^basePage"
    }
});

function EditableFieldController() {
    var vm = this;
    vm.editingList = false;
    var oldName = "";

    vm.getList = function(name)
    {
        vm.listCtrl.getList(name);
    };

    vm.removeList = function(name)
    {
        vm.listCtrl.removeList(name);
    };

    vm.editList = function(name)
    {
        vm.editingList = true;
        oldName = name;
        // vm.listCtrl.editList(name);
    };

    vm.saveNewName = function() {
        if(vm.listName != oldName) {
            var isNew = vm.listCtrl.saveNewName(oldName, vm.listName);
            if (!isNew) {
                vm.listName = oldName
            }
        }
        vm.editingList = false;
        oldName = "";
    };

    vm.reset = function() {
        vm.listName = oldName;
    }
}