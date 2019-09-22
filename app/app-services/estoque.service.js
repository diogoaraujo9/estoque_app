(function () {
    'use strict';

    angular
        .module('app')
        .factory('EstoqueService', Service);

    function Service($http, $q, $window, $location) {
        var apiURL = "http://localhost:9050/api/estoque";
        var service = {};
        service.roupaAtualizacao = null;
        service.pendenteAtualizacao = false;
        
        service.Salvar = Salvar;
        service.Consultar = Consultar;
        service.DeletarRoupa = Deletar;        
        service.Atualizar = Atualizar;        
        
        return service;

        function Salvar(estoque) {
            return $http.post(apiURL + "/salvar", estoque).then(handleSuccess, handleError);
        }   
        
        function Consultar(userId) {
            return $http.get(apiURL + "/consultar/" + userId).then(handleSuccess, handleError);
        }   

        function Deletar(roupa) {
            return $http.delete(apiURL + "/deletar/" + roupa._id).then(handleSuccess, handleError);
        }   

        function Atualizar(roupa) {
            service.pendenteAtualizacao = true;
            service.roupaAtualizacao = roupa;

            $location.path('/estoque');
        }  


        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(res) {
            return $q.reject(res.data);
        }
        
    }

})();
