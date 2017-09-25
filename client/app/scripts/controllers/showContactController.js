'use strict';

var myApp  = angular.module('sbAdminApp')
myApp.controller('ShowContactCtrl', ['$scope' ,'$state','ContactService','$stateParams' , 'DTOptionsBuilder', 'DTColumnDefBuilder' ,'RelationshipService',function ($scope ,$state,ContactService,$stateParams, DTOptionsBuilder, DTColumnDefBuilder,RelationshipService) {

	console.log($stateParams.contactId);

	ContactService.getOne($stateParams.contactId)
	.then(function successCallback(response) {

		$scope.contact = response.data;
		console.log($scope.contact);

	}, function errorCallback(response) {

	});


	//todo applied find on mongoose
	

    $scope.modifyContact = function(contact) {
        $state.go('dashboard.addContact', {contact : contact});
    }






}]);