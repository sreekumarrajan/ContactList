(function() {
  'use strict';

  /** @ngInject */
  function AlertController($uibModalInstance, message) { // esline-disable-line
    var vm = this;
    vm.message = message;
    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }

    vm.cancel = cancel;

  }

  angular
    .module('contactList.commons')
    .controller('AlertController', AlertController);

})();
