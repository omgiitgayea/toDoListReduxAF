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

    function LogoutController(BasePageService, $mdDialog, $mdToast) {
        var vm = this;
        vm.loginEmail = "";
        vm.loginPassword = "";
        vm.myToast = $mdToast.simple().position("top").hideDelay(2000);

        vm.cancel = function () {
            $mdDialog.cancel();
        };

        vm.logout = function(agree) {
            if (agree) {
                firebase.auth().signOut().then(function(){
                    BasePageService.setLoginStatus();
                    $mdToast.show(vm.myToast.textContent("Logout successful"));
                }, function(error) {
                    console.error("Error: ", error);
                })

            }
            $mdDialog.hide();
        }

    }
})();