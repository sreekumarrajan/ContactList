(function() {
  'use strict';

  function CLListView($uibModal, $scope) {
    var vm = this;

    $scope.search = vm.search;

    function view(contactItem) {
      $scope.dataItem = contactItem;
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'scripts/commons/widgets/cl_ListView/view.html',
        scope:$scope,
      });
    }

    function edit(contactItem) {
      var tempItem = angular.copy(contactItem);

      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'scripts/commons/widgets/cl_ListView/edit/edit.html',
        resolve:{
          data:function() {
            return tempItem;
          }
        },
        controller: 'EditContactController',
        controllerAs: 'vm',
        bindToController: true
      });

      modalInstance.result.then(function(contact) {
        return vm.onContactEdited({'contact':contact});
      }, function() {
      });
    }

    function deleteContact(id) {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'scripts/commons/widgets/cl_ListView/delete/delete.html',
        resolve:{
          message:function() {
             return 'Are you sure you want to delete this contact?'
          }
        },
        controller: 'DeleteController',
        controllerAs: 'vm',
        bindToController: true
      });

      modalInstance.result.then(function() {
        return vm.onContactDelete({'id':id});
      }, function() {
      });
    }

    vm.view = view;
    vm.edit = edit;
    vm.delete = deleteContact;
  }
  /** @ngInject */
  function clListView() {
    var directive = {
      restrict: 'E',
      templateUrl: 'scripts/commons/widgets/cl_ListView/clListView.html',
      scope: {
        data: '=',
        onContactEdited: '&',
        onContactDelete:'&',
        search:'='
      },
      controller: CLListView,
      controllerAs: 'vm',
      bindToController: true
    };
    return directive;

  }
  angular
    .module('contactList.commons')
    .directive('clListView', clListView);



})();
