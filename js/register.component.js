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

    function RegisterController(BasePageService, $mdDialog, $mdToast) {
        var vm = this;
        vm.loginEmail = "";
        vm.loginPassword = "";
        vm.confirmPassword = "";
        vm.noEmail = false;
        vm.noPassword = false;
        vm.differentPassword = false;
        vm.regError = "";
        vm.myToast = $mdToast.simple().position("top").hideDelay(2000);

        vm.cancel = function () {
            $mdDialog.cancel();
        };

        vm.register = function () {
            if (!vm.loginEmail) {
                vm.noEmail = true;
            }
            else {
                vm.noEmail = false;
            }

            if (!vm.loginPassword) {
                vm.noPassword = true;
            }
            else {
                vm.noPassword = false;
            }

            if (vm.loginPassword.length < 6) {
                vm.weakPassword = true;
            }
            else {

            }
            if (vm.loginPassword != vm.confirmPassword) {
                vm.differentPassword = true;
            }
            else {
                vm.differentPassword = false;
            }
            if (!vm.noEmail && !vm.noPassword && !vm.differentPassword) {
                firebase.auth().createUserWithEmailAndPassword(vm.loginEmail, vm.loginPassword)
                    .then(function () {
                        $mdDialog.hide();
                        BasePageService.setLoginStatus();
                        $mdToast.show(vm.myToast.textContent("Registration successful"));
                    })
                    .catch(function (error) {
                        console.log(error.code);
                        vm.regError = error.message;
                    });
            }
        }

    }
})();