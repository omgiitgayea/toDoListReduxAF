/**
 * Created by Godai Yuusaku on 1/27/2017.
 */
(function () {
    angular.module("myApp")
        .component("loginRegister", {
            controller: LoginRegisterController,
            controllerAs: "vm"
        });

    function LoginRegisterController(BasePageService, $mdDialog) {
        var vm = this;

        vm.startLogin = function () {
            console.log("logging in!");
        };

        vm.signUp = function () {
            console.log("sign me up!");
        };
    }
})();