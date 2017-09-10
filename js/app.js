// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('axisApp', ['ionic', 'jett.ionic.filter.bar', 'axisApp.controllers', 'axisApp.services'])

	.run(function ($ionicPlatform, utilityFactory) {
		$ionicPlatform.ready(function () {});
	})

	.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
		ionic.Platform.setPlatform('ios');
		$stateProvider

			.state('app', {
				url: '/app',
				abstract: true,
				templateUrl: 'templates/menu.html',
				controller: 'sideMenuController'
			})

			.state('init', {
				url: '/init/',
				cache: false,
				templateUrl: 'templates/welcome.html',
				controller: 'initController'
			})

			.state('app.chat', {
				url: '/chat/:userId',
				views: {
					'menuContent': {
						templateUrl: 'templates/chats.html',
						controller: 'chatController',
					}
				}
			})
		// if none of the above states are matched, use this as the fallback
		$urlRouterProvider.otherwise('/init/');
	});
