(function() {
  'use strict';


  describe('Service: ListService', function() {

    // load the controller's module
    beforeEach(function() {
      module('ui.bootstrap');
      module('contactList.commons');
      //  angular.module('weatherApp.commons',[]);
      module(function($provide) {
        $provide.factory('UtilsService', function() {
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
        });
      });

    });

    // beforeEach(inject(function(WeatherService, WeatherDataService) {
    //
    // }));

    var listService, utilsService, scope;

    // Initialize the services
    beforeEach(inject(function(ListService, $q, UtilsService, $rootScope) {
      scope = $rootScope.$new();
      listService = ListService;
      utilsService = UtilsService;

    }));

    it('should prompt user to enter all fields', function() {
      var res= '';
      listService.addContact()
        .then(function(result) {
        }, function(error){
          res = error;
        });
      scope.$digest();

      expect(res).toBeDefined();
      expect(res).toEqual('Please fill all the fields.');
    });

    it('should return a list of contacts of length one ', function() {
      var res= '';
      var contactList = [];
      listService.addContact('sree', '3455', 'thorncliffe')
        .then(function(list) {
          contactList = list;
        }, function(error){
          res = error;
        });
      scope.$digest();

      expect(contactList).toBeDefined();
      expect(contactList.length).toBe(1);
      expect(contactList[0].name).toEqual('sree');
    });

    it('should prompt user that id is not present if trying to edit non-existent data', function() {
      var res= '';
      var contactList = [];
      listService.addContact('sree', '3455', 'thorncliffe')
        .then(function(list) {
          contactList = list;
        }, function(error){
          res = error;
        });
      scope.$digest();

      var contact = {'id':1};

      listService.editContact(contact)
      .then(function(){

      }, function (error){
          res = error;
      });

      scope.$digest();
      expect(contactList).toBeDefined();
      expect(res).toEqual('The contact with the id is not present');

    });

    it('should return the list with the edited data if id is proper', function() {
      var res= '';
      var contactList = [];
      listService.addContact('sree', '3455', 'thorncliffe')
        .then(function(list) {
          contactList = list;
        }, function(error){
          res = error;
        });
      scope.$digest();

      var contact = {'id':0,'name':'Sree1', 'phone':'5533', 'address':'thorncliffe'};

      listService.editContact(contact)
      .then(function(list){
        contactList = list;
      }, function (error){
          res = error;
      });

      scope.$digest();
      expect(contactList).toBeDefined();
      expect(contactList.length).toEqual(1);
      expect(contactList[0].name).toEqual('Sree1');
      expect(contactList[0].phone).toEqual('5533');

    });

  });

})();
