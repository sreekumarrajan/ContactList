(function() {
  'use strict';

  function CLOptionsController($uibModal, $scope) {
    var vm = this;

    function addContact() {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'scripts/commons/widgets/cl_Options/addContact.html',
        controller: 'AddContactController',
        controllerAs: 'vm',
        bindToController: true
      });

      modalInstance.result.then(function(contact) {
        return vm.onContactAdded({'contact':contact});
      }, function() {
      });
    };
    vm.addContact = addContact;

    $scope.$watch('vm.searchText', function(newValue){
      vm.onSearchTextChanged({'newValue':newValue});
    });
  }

  /** @ngInject */
  function clOptions() {
    var directive = {
      restrict: 'E',
      templateUrl: 'scripts/commons/widgets/cl_Options/clOptions.html',
      scope: {
        onContactAdded: '&',
        onSearchTextChanged:'&'
      },
      controller: CLOptionsController,
      controllerAs: 'vm',
      bindToController: true
    };
    return directive;

  }
  angular
    .module('contactList.commons')
    .directive('clOptions', clOptions);



})();
