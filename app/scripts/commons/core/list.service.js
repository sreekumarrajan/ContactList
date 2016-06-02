(function() {
  'use strict';

  /** @ngInject */
  function ListService($q, UtilsService) { //eslint-disable-line
    var service = {}; //eslint-disable-line

    var Contact = function(name, phone, address) {
      var contactInfo = {};

      contactInfo.name = name;
      contactInfo.phone = phone;
      contactInfo.address = address;
      contactInfo.id = UtilsService.getNewId();

      return contactInfo;
    }

    var contactList = [];

    //private functions

    function contactExists(name, phone) {
      var exists = false;

      angular.forEach(contactList, function(item) {
        if (item.name === name && item.phone === phone) {
          exists = true;
        }
      });
      return exists;
    }

    function addContact(name, phone, address) {
      var deferred = $q.defer();
      if (name !== undefined || phone !== undefined || address !== undefined) {
        if (contactExists(name, phone)) {
          deferred.reject('The contact "' + name + '" with number -' + phone + 'already exists');
        } else {
          contactList.push(new Contact(name, phone, address));
          deferred.resolve(contactList);
        }
      } else {
        deferred.reject('Please fill all the fields.');
      }
      return deferred.promise;
    }

    function editContact(contact) {
      var deferred = $q.defer();
      var contactToEdit = UtilsService.getItemById(contactList, 'id', contact.id);
      if (contactToEdit) {
        if (contactToEdit.name !== contact.name) {
          contactToEdit.name = contact.name;
        }

        if (contactToEdit.phone !== contact.phone) {
          contactToEdit.phone = contact.phone;
        }

        if (contactToEdit.address !== contact.address) {
          contactToEdit.address = contact.address;
        }

        deferred.resolve(contactList);
      }
      else {
        deferred.reject('The contact with the id is not present');
      }

      return deferred.promise;
    }

    function deleteContact(id) {
      var deferred = $q.defer();
      UtilsService.deleteItemById(contactList, 'id', id);
      deferred.resolve(contactList);
      return deferred.promise;
    }

    //setting up the interface
    service.addContact = addContact;
    service.editContact = editContact;
    service.deleteContact = deleteContact;

    return service;
  }

  angular
    .module('contactList.commons')
    .factory('ListService', ListService);

})();
