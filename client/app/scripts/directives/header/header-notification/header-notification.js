'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('sbAdminApp')
	.directive('headerNotification',function(){
		return {
        templateUrl:'scripts/directives/header/header-notification/header-notification.html',
        restrict: 'E',
        replace: true,
    	}
	});

// angular.module('sbAdminApp').controller('LogoutCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'LoginService', '$state', function($rootScope, $scope, $location, $localStorage, LoginService , $state) {
// 		$scope.logout = function(){
// 			delete $localStorage.token;
// 			console.log('jepjep')
// 		};
//   		// 
//     }])





