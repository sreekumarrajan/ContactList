(function() {
  'use strict';

  /** @ngInject */
  function AddContactController($uibModalInstance) { // esline-disable-line
    var vm = this;

    function add() {
      var contact = {};

      if(vm.name !== '' && vm.phone !== '' && vm.address !== ''){
        contact.name = vm.name;
        contact.phone = vm.phone;
        contact.address = vm.address;
      }
      $uibModalInstance.close(contact);

    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }

    vm.add = add;
    vm.cancel = cancel;

  }

  angular
    .module('contactList.commons')
    .controller('AddContactController', AddContactController);

})();
