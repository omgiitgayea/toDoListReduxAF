/**
 * Created by GodaiYuusaku on 2/3/17.
 */
(function () {
    angular.module("myApp")
        .component("registerPage", {
            templateUrl: "html/register.page.html",
            controller: RegisterController,
            controllerAs: "vm"
        });

    function RegisterController(BasePageService, $mdDialog) {
        var vm = this;
        vm.loginEmail = "";
        vm.loginPassword = "";
        vm.confirmPassword = "";

        vm.cancel = function () {
            $mdDialog.cancel();
        };

        vm.register = function() {
            if ((vm.loginEmail && vm.loginPassword) && (vm.loginPassword === vm.confirmPassword)) {
                $mdDialog.hide();
                BasePageService.setLoginStatus();
            }
        }

    }
})();