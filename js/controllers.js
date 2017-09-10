angular.module('axisApp.controllers', [])
	/*CONTROLLER FOR APP INITTIALIZATION*/
	.controller('initController', function ($scope, $state, utilityFactory, $timeout) {
		console.log("Init State");
		/*function to set up the application*/
		function setupApplication() {
			var users = [];
			/*fetches the users from the URL*/
			utilityFactory.fetchUsers().then(function (usersArray) {
				console.log(usersArray);
				usersArray.forEach(function (user, index) {
					users.push({
						id: user.id,
						user: user.user,
						img: user.img
					});
					localStorage.setItem("_" + user.id + "_dtl", JSON.stringify(user));
					user.messages.forEach(function (message, index) {
						message.created = new Date(message.created);
					})
					localStorage.setItem(user.id, JSON.stringify(user.messages));
				});

				localStorage.setItem("userArray", JSON.stringify(users));
				/*sets the app init-state as true*/
				localStorage.setItem("_app_state", JSON.stringify(true));
				$state.go('app.chat');
			}, function (error) {
				alert(error);
			});
		}
		$timeout(function () {
			if (localStorage.getItem('_app_state')) {
				console.log("App Already Initialised");
				$state.go('app.chat');
			} else {
				setupApplication();
			}
		}, 3000);

	})
	/*CONTROLLER FOR SIDEMENU*/
	.controller('sideMenuController', function ($scope, $ionicModal, $timeout, $ionicFilterBar) {
		/*LOADS THE USERS FROM THE LOCAL STORAGE*/
		function loadUsers() {
			$scope.sideMenuScope.userList.forEach(function (user, index) {
				var messages = JSON.parse(localStorage.getItem(user.id));
				$scope.sideMenuScope.userList[index].last = messages[messages.length - 1];
				$scope.sideMenuScope.userList[index].messages = messages;
				//$scope.userList[index].messages = messages;
			});
		};
		/*CATCHES THE EVENT WHEN A MESSAGE IS SENT FROM CHAT BOX 
		--- UPDATES THE SIDE MENU*/
		$scope.$on('msgSent', function (event) {
			$scope.sideMenuScope.userList = JSON.parse(localStorage.getItem("userArray"));
			loadUsers();
		});

		$scope.sideMenuScope = {
			/*holds the list of the users*/
			userList: JSON.parse(localStorage.getItem("userArray")),
			/*holds the id of the selected user*/
			selectedUser: '',
			/*object to store the sorting parameters*/
			sortData: {
				value: '',
				asc: 0
			},
			/*function to load the chat for a particular user*/
			openChat: function (event, userObj) {
				this.selectedUser = userObj.id;
				$scope.$broadcast('loadChat', userObj);
			},
			/*function to sort the users based on various filters*/
			sortValue: function (value) {
				if (this.sortData.value === value) {
					this.sortData.value = "-" + value;
					this.sortData.asc = false;
				} else {
					this.sortData.value = value;
					this.sortData.asc = true;
				}
			},
			/*function to show the search bar*/
			showFilterBar: function () {
				filterBarInstance = $ionicFilterBar.show({
					items: this.userList,
					update: function (filteredItems) {
						$scope.sideMenuScope.userList = filteredItems;
					},
					filterProperties: 'user'
				});
			},
			/*function to check if a chat is active*/
			checkActiveChat: function (user) {
				if (this.selectedUser === user.id) {
					return 'chat-active';
				} else {
					return "";
				}
			}
		};
		loadUsers();

	})
	/*CONTROLLER FOR CHATS*/
	.controller('chatController', function ($scope, $timeout, $stateParams, $ionicScrollDelegate) {
		/*CATCHES THE LOAD CHAT EVENT FIRED WHEN A USER IS SELECTED ON THE LEFT MENU*/
		$scope.$on('loadChat', function (event, userObj) {
			console.log(userObj);
			$scope.AXCHScopeData.selectedUser = angular.copy(userObj);
			AXCHConfigData.loadUserMessages($scope.AXCHScopeData.selectedUser);
			$scope.AXCHScopeData.state.loaded = true;
			$ionicScrollDelegate.scrollBottom(true);

		});
		/*AXIS CHAT CONFIG OBJECT*/
		var AXCHConfigData = {
			/*fn - loads the messages of the selected user from the local storage*/
			loadUserMessages: function (userObj) {
				var messages = angular.copy(JSON.parse(localStorage.getItem(userObj.id)));
				$scope.AXCHScopeData.selectedUser.messages = angular.copy(messages);
			}
		};
		/*AXIS CHAT SCOPE OBJECT*/
		$scope.AXCHScopeData = {
			/*Object to hold the chat box state. -- when FALSE shows the welcome message. -- When TRUE shows the messages of a User*/
			state: {
				loaded: false,
			},
			/*selected user Object*/
			selectedUser: {},
			/*new message value holder*/
			messageModel: '',
			/*message direction holder*/
			messageDirection: 'out',
			/*fn- sends a new message*/
			sendMessage: function () {
				var messageObj = {
					id: 0,
					text: this.messageModel,
					created: new Date(),
					createdBy: this.messageDirection === 'in' ? this.selectedUser.id : 0
				}
				this.selectedUser.messages.push(messageObj);
				this.messageModel = '';
				localStorage.setItem(this.selectedUser.id, JSON.stringify(this.selectedUser.messages));
				$scope.$emit('msgSent');
				$ionicScrollDelegate.scrollBottom(true);

			},
			/*fn - checks if the send button should be enabled*/
			checkSend: function () {
				var newMessage = this.messageModel.trim();
				if (newMessage.length === 0 || newMessage == "") {
					return true;
				} else {
					return false;
				}
			},
			/*fn- returns the link for the user image*/
			getUserImage: function (userId) {
				try {
					var imgSrc = JSON.parse(localStorage.getItem("_" + userId + "_dtl")).img;
					return imgSrc;
				} catch (Exception) {
					return "img/null-profile.png"
				}
			},
			/*fn - sets the direction of the message based on the toggle position*/
			checkMessageDirection: function (message) {
				console.log(message.createdBy);

				if (this.selectedUser.id === message.createdBy) {
					return "message-in";
				} else {
					return "message-out";
				}
			}
		};
	})
