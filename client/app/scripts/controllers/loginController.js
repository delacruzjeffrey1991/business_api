'use strict';

var myApp  = angular.module('sbAdminApp')

myApp.controller('LoginCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'LoginService', '$state', function($rootScope, $scope, $location, $localStorage, LoginService , $state) {

        $scope.signin = function(user) {

            LoginService.signin(user).then(function successCallback(res) {
                if(res.data && res.data.token){
                    $localStorage.token = res.data.token;
                    $state.go('dashboard.home') 
                }
            
            }, function errorCallback(response) {
                $rootScope.error = 'Failed to signin';

            })
        };
 
        // $scope.signup = function() {
        //     var formData = {
        //         email: $scope.email,
        //         password: $scope.password
        //     }
 
        //     Login.save(formData, function(res) {
        //         if (res.type == false) {
        //             alert(res.data)
        //         } else {
        //             $localStorage.token = res.data.token;
        //             window.location = "/"   
        //         }
        //     }, function() {
        //         $rootScope.error = 'Failed to signup';
        //     })
        // };
 
        // $scope.me = function() {
        //     Login.me(function(res) {
        //         $scope.myDetails = res;
        //     }, function() {
        //         $rootScope.error = 'Failed to fetch details';
        //     })
        // };
 
        $scope.logout = function() {
            Login.logout(function() {
                window.location = "/"
            }, function() {
                alert("Failed to logout!");
            });
        };
        $scope.token = $localStorage.token;
    }])
