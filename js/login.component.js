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

    function LoginController(BasePageService, $mdDialog, $mdToast) {
        var vm = this;
        vm.loginEmail = "";
        vm.loginPassword = "";
        vm.noEmail = false;
        vm.noPassword = false;
        vm.myToast = $mdToast.simple().position("top").hideDelay(2000);

        vm.cancel = function () {
            $mdDialog.cancel();
        };

        vm.login = function(event) {
            if (event.type === "click" || (event.type === "keyup" && event.keyCode === 13)) {
                if (vm.loginEmail) {
                    vm.noEmail = false;
                }
                else {
                    vm.noEmail = true;
                }

                if (vm.loginPassword) {
                    vm.noPassword = false;
                }
                else {
                    vm.noPassword = true;
                }

                if (!vm.noEmail && !vm.noPassword) {
                    firebase.auth().signInWithEmailAndPassword(vm.loginEmail, vm.loginPassword)
                        .then(function () {
                            $mdToast.show(vm.myToast.textContent("Login successful"));
                            BasePageService.setLoginStatus(true);
                        })
                        .catch(function () {
                            $mdToast.show(vm.myToast.textContent("Login failed"));
                        });
                    $mdDialog.hide();
                }
            }
        }

    }
})();