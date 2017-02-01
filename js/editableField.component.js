/**
 * Created by GodaiYuusaku on 12/20/16.
 */
angular.module('myApp').component('editableField', {
    templateUrl: 'html/editableField.html',
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
    vm.oldName = "";

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
        vm.oldName = name;
        vm.listCtrl.editList(name);
    };

    vm.saveNewName = function() {
        if(vm.listName != vm.oldName) {
            var isNew = vm.listCtrl.saveNewName(vm.listName);
            if (!isNew) {
                vm.listName = vm.oldName
            }
        }
        else {
            vm.listCtrl.dupListError = false;
        }
        vm.listCtrl.updateDB();
        vm.editingList = false;
        vm.oldName = "";
    };

    vm.reset = function() {
        vm.listName = vm.oldName;
    }
}