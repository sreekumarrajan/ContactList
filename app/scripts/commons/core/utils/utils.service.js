(function() {
  'use strict';

  /** @ngInject */
  function UtilsService() { //eslint-disable-line
    var service = {}; //eslint-disable-line

    var id = 0;

    function getNewId() {
      var newId = id;
      id++;
      return newId;
    }

    function getItemById(list, keyName, keyValue) {
      var item = null;
      if (list && list !== undefined) {
        angular.forEach(list, function(entry) {
          if (entry[keyName] === keyValue) {
            item = entry;
          }
        });

        return item;
      }
    }

    function deleteItemById(list, keyName, keyValue) {

      var removeIndex = list.map(function(item) {
          return item[keyName];
        })
        .indexOf(keyValue);
      if (removeIndex !== -1) {
        list.splice(removeIndex, 1);
      }
    }

    //setting up the interface
    service.getNewId = getNewId;
    service.getItemById = getItemById;
    service.deleteItemById = deleteItemById;

    return service;
  }

  angular
    .module('contactList.commons')
    .factory('UtilsService', UtilsService);

})();
