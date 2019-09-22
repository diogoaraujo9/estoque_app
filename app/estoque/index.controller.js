(function () {
    'use strict';

    angular
        .module('app')
        .controller('Estoque.IndexController', Controller);

    function Controller($window, UserService, EstoqueService, FlashService) {
        var vm = this;

        vm.user = null;
        vm.roupa = {
            _id: null,
            codigo: null,
            data: null, 
            tipo: null,
            marca: null,
            caracteristicas: null,
            tamanho: null,
            cor: null,
            valorEtiqueta: null,
            valorCompra: null,
            valorMargem: null,
            precoSugerido: null,
            userId: null
        };
        vm.atualizando = false;
        vm.salvarRoupa = salvarRoupa;
        vm.cancelar = cancelar;
        
        if (EstoqueService.pendenteAtualizacao)
        {
            vm.roupa = EstoqueService.roupaAtualizacao;
            vm.atualizando = true;
            EstoqueService.pendenteAtualizacao = false;
        }

        function cancelar()
        {
            vm.roupa = {
                codigo: null,
                data: null, 
                tipo: null,
                marca: null,
                caracteristicas: null,
                tamanho: null,
                cor: null,
                valorEtiqueta: null,
                valorCompra: null,
                valorMargem: null,
                precoSugerido: null,
                userId: null
            };

            vm.atualizando = false;
        }

        initUser();

        function initUser() {
            // get current user data in the API
            UserService.GetUserId().then(function (userId) {
                UserService.GetCurrent(userId).then(function (user) {
                        vm.user = user;
                    });
            });
            
        }

        function salvarRoupa() {
            if (!validaRoupa())
                return;

            vm.roupa.userId = vm.user._id;
            vm.roupa.valorMargem = vm.roupa.valorCompra * 2;
            EstoqueService.Salvar(vm.roupa)
                .then(function () {
                    FlashService.Success('A roupa foi salva com sucesso.');
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }

        function validaRoupa()
        {
            if (!vm.roupa) return false;

            var errors = "";

            if (!vm.roupa.codigo)
            {
                errors += "Codigo não pode estar vazio. \n";
            }

            if (!vm.roupa.valorEtiqueta || vm.roupa.valorEtiqueta < 0)
            {
                errors += "Etiqueta com campo vazio ou menor que 0. \n";
            }

            if (!vm.roupa.precoSugerido || vm.roupa.precoSugerido < 0)
            {
                errors += "Preco sugerido com campo vazio ou menor que 0. \n";
            }

            if (!vm.roupa.valorCompra || vm.roupa.valorCompra < 0)
            {
                errors += "Valor compra com campo vazio ou menor que 0. \n";
            }
            
            if (errors)
            {
                FlashService.Error(errors);
                return false;
            }

            return true;
        }
    }

})();