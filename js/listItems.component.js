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
    this.editingList = false;
    this.oldName = "";

    this.removeItem = function (name) {
        this.itemCrtl.removeItem(name);
    };

    this.editItem = function (name) {
        this.editingList = true;
        this.oldName = name;
    };

    this.saveNewItem = function () {
        var isNew = this.itemCrtl.saveNewItem(this.oldName, this.itemName);
        if (!isNew) {
            this.itemName = this.oldName;
        }
        this.itemCrtl.updateDB();
        this.editingList = false;
        this.oldName = "";
    };

    this.reset = function () {

        this.itemName = this.oldName;
    }
}