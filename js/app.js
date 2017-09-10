// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('axisApp', ['ionic', 'axisApp.controllers', 'axisApp.services'])

	.run(function ($ionicPlatform, utilityFactory) {
		$ionicPlatform.ready(function () {
			// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
			// for form inputs)
			var users = [];
			utilityFactory.getUserList().forEach(function (user, index) {
				users.push({
					id: user.id,
					user: user.user,
					img: user.img
				});
				localStorage.setItem(user.id, JSON.stringify(user.messages));
			});

			localStorage.setItem("userArray", JSON.stringify(users));

			if (window.cordova && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
				cordova.plugins.Keyboard.disableScroll(true);

			}
			if (window.StatusBar) {
				// org.apache.cordova.statusbar required
				StatusBar.styleDefault();
			}
		});
	})

	.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

		$stateProvider

			.state('app', {
				url: '/app',
				abstract: true,
				templateUrl: 'templates/menu.html',
				controller: 'AppCtrl'
			})

			.state('app.chat', {
				url: '/chat/:userId',
				views: {
					'menuContent': {
						templateUrl: 'templates/search.html',
						controller: 'chatController',
					}
				}
			})
		// if none of the above states are matched, use this as the fallback
		$urlRouterProvider.otherwise('/app/chat/');
	});
