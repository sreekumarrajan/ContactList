(function() {
  'use strict';

  /* Detaild routes if any, are in feature folders */
  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('home', {
      url: '/home',
      templateUrl: 'scripts/components/home/home.html',
      controller: 'HomeController as home'
    });

    $urlRouterProvider
      .otherwise('/home');
  }

  angular
    .module('contactList')
    .config(routerConfig);

})();
