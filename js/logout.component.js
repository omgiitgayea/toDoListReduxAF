/**
 * Created by GodaiYuusaku on 2/3/17.
 */
(function () {
    angular.module("myApp")
        .component("logoutPage", {
            templateUrl: "html/logout.page.html",
            controller: LogoutController,
            controllerAs: "vm"
        });

    function LogoutController(BasePageService, $mdDialog) {
        var vm = this;
        vm.loginEmail = "";
        vm.loginPassword = "";

        vm.cancel = function () {
            $mdDialog.cancel();
        };

        vm.logout = function(agree) {
            console.log(agree);
            if (agree) {
                BasePageService.setLoginStatus();
            }
            $mdDialog.hide();
        }

    }
})();