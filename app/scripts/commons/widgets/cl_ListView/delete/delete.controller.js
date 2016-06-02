(function() {
  'use strict';

  /** @ngInject */
  function DeleteController($uibModalInstance, message) { // esline-disable-line
    var vm = this;
    vm.message = message;
    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }

    function deleteContact() {
      $uibModalInstance.close();
    }

    vm.cancel = cancel;
    vm.ok = deleteContact;

  }

  angular
    .module('contactList.commons')
    .controller('DeleteController', DeleteController);

})();
