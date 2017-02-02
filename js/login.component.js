/**
 * Created by Godai Yuusaku on 1/27/2017.
 */
(function () {
    angular.module("myApp")
        .component("loginPage", {
            templateUrl: "html/login.page.html",
            controller: LoginRegisterController,
            controllerAs: "vm"
        });

    function LoginRegisterController(BasePageService, $mdDialog) {
        var vm = this;

    }
})();