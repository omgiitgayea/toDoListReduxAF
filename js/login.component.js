/**
 * Created by Godai Yuusaku on 1/27/2017.
 */
(function () {
    angular.module("myApp")
        .component("loginPage", {
            templateUrl: "html/login.page.html",
            controller: LoginController,
            controllerAs: "vm"
        });

    function LoginController(BasePageService, $mdDialog) {
        var vm = this;
        vm.loginEmail = "";
        vm.loginPassword = "";

        vm.cancel = function () {
            $mdDialog.cancel();
        };

        vm.login = function() {
            if (vm.loginEmail && vm.loginPassword) {
                $mdDialog.hide();
                BasePageService.setLoginStatus();
            }

        }

    }
})();