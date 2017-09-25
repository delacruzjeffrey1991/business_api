'use strict';

var myApp  = angular.module('sbAdminApp')
myApp.controller('ShowClientCtrl', ['$scope' ,'$state','ClientService','$stateParams' , 'DTOptionsBuilder', 'DTColumnDefBuilder' ,'RelationshipService',function ($scope ,$state,ClientService,$stateParams, DTOptionsBuilder, DTColumnDefBuilder,RelationshipService) {

	console.log($stateParams.clientId);

	ClientService.getOne($stateParams.clientId)
	.then(function successCallback(response) {

		$scope.client = response.data;
		console.log($scope.client);

	}, function errorCallback(response) {

	});


	//todo applied find on mongoose
	

    $scope.modifyClient = function(client) {
        $state.go('dashboard.addClient', {client : client});
    }






}]);

myApp.controller('AddGroupCtrl', ['$scope' ,'$modal', '$log','GroupsService','ClientService' ,function ($scope ,$modal, $log,GroupsService,ClientService) {

	//showing of groups
	GroupsService.get()
	.then(function successCallback(response) {
		$scope.groupss = response.data;
		console.log($scope.groupss)
		for( var j=0; j<$scope.groupss.length; j++){
			var curGroup = $scope.groupss[j];
			for(var i=0; i<curGroup.client_list.length; i++){
				var curClient = curGroup.client_list[i];
				if(curClient._id === $scope.client._id ){
					curGroup.hide = true;
				}
			}		
		}	

	}, function errorCallback(response) {

	})

	$scope.save = function(){
		console.log($scope.groupss);

		var addedGroupArr = [];

		for( var j=0; j<$scope.groupss.length; j++){
			if($scope.groupss[j].checked ){
				console.log($scope.groupss[j]);
				//for client side
				addedGroupArr.push($scope.groupss[j]);
				$scope.groupss[j].hide = true;
				//for group side
				GroupsService.getOne($scope.groupss[j]._id)
				.then(function successCallback(response) {

					$scope.group = response.data;
					$scope.group.client_list.push($scope.client);
					GroupsService.edit($scope.group).then(function successCallback(response) {
						console.log('success on adding client');      
					}, function errorCallback(response) {

					})

				}, function errorCallback(response) {

				});




			}
		}

		$scope.client.group_list = addedGroupArr;


		ClientService.edit($scope.client).then(function successCallback(response) {
			console.log('success edit client')        
		}, function errorCallback(response) {

		})
	}

	$scope.addGroup = function () {
		$scope.message = "Show Form Button Clicked";
		console.log($scope.message);

		var modalInstance = $modal.open({
			templateUrl: 'views/modal/add-group-modal.html',
			controller: ModalInstanceCtrl,
			scope: $scope,
			resolve: {
				userForm: function () {
					return $scope.userForm;
				}
			}
		});

		modalInstance.result.then(function (selectedItem) {
			$scope.selected = selectedItem;
		}, function () {
			$log.info('Modal dismissed at: ' + new Date());
		});
	};

	var ModalInstanceCtrl = function ($scope, $modalInstance, userForm) {
		$scope.form = {}
		$scope.submitForm = function () {
			if ($scope.form.userForm.$valid) {
				console.log('user form is in scope');
				$modalInstance.close('closed');
			} else {
				console.log('userform is not in scope');
			}
		};

		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		};
	};


}]);


myApp.controller('AddContactCtrl', ['$scope' ,'$modal', '$log','GroupsService','ClientService','ContactService' ,function ($scope ,$modal, $log,GroupsService,ClientService,ContactService) {

	ContactService.get()
	.then(function successCallback(response) {
		$scope.contacts = response.data;
		for( var j=0; j<$scope.contacts.length; j++){
			var curContact = $scope.contacts[j];
			
			if(curContact.client && curContact.client._id === $scope.client._id ){
				curContact.show = true;
			}
			
		}	

	}, function errorCallback(response) {

	})

	$scope.save = function(contact){
		console.log(contact);
		contact.client = $scope.client;
		ContactService.create(contact)
		.then(function successCallback(response) {
			console.log( response.data);
			response.data.show = true;
			$scope.contacts.push(response.data);

		}, function errorCallback(response) {
		})
	}

	$scope.addContact = function () {
		$scope.message = "Show Form Button Clicked";
		console.log($scope.message);

		var modalInstance = $modal.open({
			templateUrl: 'views/modal/add-contact-modal.html',
			controller: ModalInstanceCtrl,
			scope: $scope,
			resolve: {
				userForm: function () {
					return $scope.userForm;
				}
			}
		});

		modalInstance.result.then(function (selectedItem) {
			$scope.selected = selectedItem;
		}, function () {
			$log.info('Modal dismissed at: ' + new Date());
		});
	};

	var ModalInstanceCtrl = function ($scope, $modalInstance, userForm) {
		$scope.form = {}
		$scope.submitForm = function () {
			if ($scope.form.userForm.$valid) {
				console.log('user form is in scope');
				$modalInstance.close('closed');
			} else {
				console.log('userform is not in scope');
			}
		};

		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		};
	};


}]);

myApp.controller('AddRelationshipCtrl', ['$scope' ,'$modal', '$log','GroupsService','ClientService','RelationshipService' ,function ($scope ,$modal, $log,GroupsService,ClientService,RelationshipService) {

RelationshipService.get()
	.then(function successCallback(response) {

		$scope.relationships = [];
		console.log($scope.relationships);
		console.log(response.data);

		for(var i=0; i<response.data.length; i++){
			var curRel = response.data[i];
			console.log(curRel);
			if(curRel.client && curRel.client._id === $scope.client._id  ){
				$scope.relationships.push(curRel);
			}

			if(curRel.relatedClient && curRel.relatedClient._id === $scope.client._id ){
				if(curRel.type === "Child Of"){
					curRel.type = "Parent Of";
				}else if(curRel.type === "Parent Of"){
					curRel.type = "Child Of";
				}else{
					curRel.type = curRel.type.replace("Of", "-")
				}


				var temp = curRel.client;
				curRel.client = curRel.relatedClient;
				curRel.relatedClient = temp;

				$scope.relationships.push(curRel);
			}
		}


	}, function errorCallback(response) {

	});

	ClientService.get()
	.then(function successCallback(response) {

		$scope.clients = response.data;
		for(var i=0; i<$scope.clients.length; i++){
			var curClient = $scope.clients[i];
			if(curClient && curClient._id === $scope.client._id ){
				$scope.clients[i].hide = true;
			}
		}

	}, function errorCallback(response) {

	});

	$scope.save = function(relationship){
		console.log(relationship);
		relationship.client = $scope.client;
		RelationshipService.create(relationship)
		.then(function successCallback(response) {
			var rel = response.data;
			ClientService.getOne(response.data.relatedClient)
			.then(function successCallback(response) {

				 
				console.log('client');
				console.log(response.data);
				rel.relatedClient = response.data;
				$scope.relationships.push(rel);

			}, function errorCallback(response) {

			});
		}, function errorCallback(response) {
		})
	
	}

	$scope.addRelationship = function () {
		$scope.message = "Show Form Button Clicked";
		console.log($scope.message);

		var modalInstance = $modal.open({
			templateUrl: 'views/modal/add-relationship-modal.html',
			controller: ModalInstanceCtrl,
			scope: $scope,
			resolve: {
				userForm: function () {
					return $scope.userForm;
				}
			}
		});

		modalInstance.result.then(function (selectedItem) {
			$scope.selected = selectedItem;
		}, function () {
			$log.info('Modal dismissed at: ' + new Date());
		});
	};

	var ModalInstanceCtrl = function ($scope, $modalInstance, userForm) {
		$scope.form = {}
		$scope.submitForm = function () {
			if ($scope.form.userForm.$valid) {
				console.log('user form is in scope');
				$modalInstance.close('closed');
			} else {
				console.log('userform is not in scope');
			}
		};

		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		};
	};


}]);



