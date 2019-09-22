(function () {
    'use strict';

    angular
        .module('app')
        .controller('ConsultaEstoque.IndexController', Controller);

    function Controller($window, UserService, EstoqueService, FlashService) {
        var vm = this;

        vm.user = null;
        vm.roupas = [];

        vm.deletarRoupa = deletarRoupa;
        vm.consultar = consultar;
        vm.atualizar = atualizar;

        initUser();

        function initUser() {
            // get current user data in the API
            UserService.GetUserId().then(function (userId) {
                UserService.GetCurrent(userId).then(function (user) {
                    vm.user = user;
                    consultar();
                });
            });            
        }

        function consultar() {
            EstoqueService.Consultar(vm.user._id).then(function (roupas) {
                vm.roupas = roupas;
            });            
        }

        function atualizar(roupa) {
            EstoqueService.Atualizar(roupa);
        }

        function deletarRoupa(roupa) {
            EstoqueService.DeletarRoupa(roupa)
                .then(function () {
                    FlashService.Success('A roupa foi deletada com sucesso.');
                    consultar();
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }
    }

})();