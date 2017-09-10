angular.module('axisApp.services', [])
	.factory('utilityFactory', function ($q, $http) {
		var userList = [
			{
				"id": 12,
				"user": "Ryan Smith",
				"img": "https://randomuser.me/api/portraits/women/16.jpg",
				"messages": [
					{
						"id": 0,
						"text": "Hi, Mamatha. How are you?",
						"created": "Fri, 14 Jul 2017 09:56:37 GMT",
						"createdBy": 0
                },
					{
						"id": 0,
						"text": "Hello, Ryan Smith. I'm Fine",
						"created": "Fri, 15 Jul 2017 09:56:37 GMT",
						"createdBy": 12
                }
            ]
    },
			{
				"id": 2,
				"user": "Bertha Keller",
				"img": "https://randomuser.me/api/portraits/women/73.jpg",
				"messages": [

            ]
    },
			{
				"id": 3,
				"user": "Marian Harris",
				"img": "https://randomuser.me/api/portraits/women/12.jpg",
				"messages": [
            ]
    },
			{
				"id": 4,
				"user": "Chester Dixon",
				"img": "https://randomuser.me/api/portraits/women/66.jpg",
				"messages": [

            ]
    }
    ];
		return {
			getUserList: function () {
				return userList;
			},
			fetchUsers: function () {
				/*this.makeGetRequest("http://demo4842709.mockable.io/users").then(function (data) {
					console.log(data);
				}, function (err) {
					console.log(err);
				})*/

				$http.jsonp("http://demo4842709.mockable.io/users").then(function (data) {
					console.log(data);
				}, function (err) {
					console.log(err);
				});
			},
			makeGetRequest: function (url) {
				var deferred = $q.defer();
				$http({
					method: 'GET',
					headers: {
						"Content-Type": "text/plain; charset=UTF-8"
					},
					url: url
				}).then(function successCallback(response) {
					deferred.resolve(response);
				}, function errorCallback(response) {
					deferred.reject(response);
				});

				return deferred.promise;
			}
		}
	})
