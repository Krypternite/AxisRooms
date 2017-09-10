angular.module('axisApp.controllers', [])

	.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {
		$scope.userList = JSON.parse(localStorage.getItem("userArray"));

		$scope.userList.forEach(function (user, index) {

			var messages = JSON.parse(localStorage.getItem(user.id));
			messages.forEach(function (message, index) {
				message.created = new Date(message.created);
			});
			$scope.userList[index].messages = messages;
		});
		$scope.chatList = (function () {});
		$scope.openChat = function (event, userObj) {
			$scope.$broadcast('loadChat', userObj);
		}
	})
	.controller('chatController', function ($scope, $timeout, $stateParams) {
		$scope.$on('loadChat', function (event, userObj) {
			console.log(userObj);
			$scope.AXCHScopeData.selectedUser = angular.copy(userObj);
			AXCHConfigData.loadUserMessages($scope.AXCHScopeData.selectedUser);
			$scope.AXCHScopeData.state.loaded = true;

		});
		var AXCHConfigData = {
			processNewMessage: function () {},
			loadUserMessages: function (userObj) {
				var messages = angular.copy(JSON.parse(localStorage.getItem(userObj.id)));
				$scope.AXCHScopeData.selectedUser.messages = angular.copy(messages);
			}
		};
		$scope.AXCHScopeData = {
			state: {
				loaded: false,
			},
			selectedUser: {},
			messageModel: '',
			sendMessage: function () {

				var messageObj = {
					id: 0,
					text: this.messageModel,
					created: new Date(),
					createdBy: this.selectedUser.id
				}
				this.selectedUser.messages.push(messageObj);
				this.messageModel = '';
				localStorage.setItem(this.selectedUser.id, JSON.stringify(this.selectedUser.messages))
			},
			checkSend: function () {
				var newMessage = this.messageModel.trim();
				if (newMessage.length === 0 || newMessage == "") {
					return true;
				} else {
					return false;
				}
			},
			checkMessageDirection: function (message) {
				console.log(message.createdBy);

				if (this.selectedUser.id === message.createdBy) {
					return "message-out";
				} else {
					return "message-in";
				}
			}
		};
	})
