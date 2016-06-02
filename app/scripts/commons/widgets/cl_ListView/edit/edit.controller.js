(function() {
  'use strict';

  /** @ngInject */
  function EditContactController($uibModalInstance, data) { // esline-disable-line
    var vm = this;
    vm.data = data;

    function edit() {
        $uibModalInstance.close(vm.data);
    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }

    vm.edit = edit;
    vm.cancel = cancel;

  }

  angular
    .module('contactList.commons')
    .controller('EditContactController', EditContactController);

})();
