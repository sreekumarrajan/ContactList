(function() {
  'use strict';

  /** @ngInject */
  function HomeController(ListService, $uibModal) { // esline-disable-line
    var vm = this;
    vm.contactList = [];
    vm.search = {};

    function onContactAdded(contact) {
      return ListService.addContact(contact.name, contact.phone, contact.address)
        .then(function(list) {
          vm.contactList = list;
        }, function(error) {
          var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'scripts/commons/widgets/alert/alert.html',
            resolve: {
              message: function() {
                return error;
              }
            },
            controller: 'AlertController',
            controllerAs: 'vm',
            bindToController: true
          });
        });
    }

    function onContactEdited(contact) {
      return ListService.editContact(contact)
      .then(function(list){
        vm.contactList = list;
      }, function(){

      });
    }

    function onContactDelete(id) {
      return ListService.deleteContact(id)
      .then(function(list){
        vm.contactList = list;
      });
    }

    function onSearchTextChanged(newValue) {
      vm.search.name = newValue;
    }

    vm.onContactAdded = onContactAdded;
    vm.onContactEdited = onContactEdited;
    vm.onContactDelete = onContactDelete;
    vm.onSearchTextChanged = onSearchTextChanged;

  }

  angular
    .module('contactList')
    .controller('HomeController', HomeController);

})();
