var myApp = angular.module('sbAdminApp');
var host = "http://localhost:3000";
//var host = "";



myApp.factory('ClientService', ['$http',function($http) { 
  var clientUrl =  host + '/client';
  var service = {
                  get : function() {
                    return $http.get(clientUrl);
                },
                  getOne : function(id) {
                    return $http.get(clientUrl + '/' + id);
                },
                  create : function(client){
                    return $http.post(clientUrl, client);
                  },
                  delete : function(id){
                    return $http.delete(clientUrl + '/' + id);
                  },
                  edit :  function (client) {
                        return $http.put(clientUrl + '/' + client._id, client);
                    }
  };
  return service;
}]);

myApp.factory('ProductService', ['$http',function($http) { 
  var productUrl =  host + '/product';
  var service = {
                  get : function() {
                    return $http.get(productUrl);
                },
                  create : function(product){
                    return $http.post(productUrl, product);
                  },
                  delete : function(id){
                    return $http.delete(productUrl + '/' + id);
                  },
                  edit :  function (product) {
                        return $http.put(productUrl + '/' + product._id, product);
                    }
  };
  return service;
}]);

myApp.factory('GradeService', ['$http',function($http) { 
  var gradeUrl =  host + '/grade';
  var service = {
                  get : function() {
                    return $http.get(gradeUrl);
                },
                  create : function(grade){
                    return $http.post(gradeUrl, grade);
                  },
                  delete : function(id){
                    return $http.delete(gradeUrl + '/' + id);
                  },
                  edit :  function (grade) {
                        return $http.put(gradeUrl + '/' + grade._id, grade);
                    }
  };
  return service;
}]);

myApp.factory('InteractionsService', ['$http',function($http) { 
  var interactionsUrl =  host + '/interactions';
  var service = {
                  get : function() {
                    return $http.get(interactionsUrl);
                },
                  create : function(interactions){
                    return $http.post(interactionsUrl, interactions);
                  },
                  delete : function(id){
                    return $http.delete(interactionsUrl + '/' + id);
                  },
                  edit :  function (interactions) {
                        return $http.put(interactionsUrl + '/' + interactions._id, interactions);
                    }
  };
  return service;
}]);


myApp.factory('QaProfileService', ['$http',function($http) { 
  var qaProfileUrl =  host + '/qaProfile';
  var service = {
                  get : function() {
                    return $http.get(qaProfileUrl);
                },
                  create : function(qaProfile){
                    return $http.post(qaProfileUrl, qaProfile);
                  },
                  delete : function(id){
                    return $http.delete(qaProfileUrl + '/' + id);
                  },
                  edit :  function (qaProfile) {
                        return $http.put(qaProfileUrl + '/' + qaProfile._id, qaProfile);
                    }
  };
  return service;
}]);

myApp.factory('CampaignService', ['$http',function($http) { 
  var campaignUrl =  host + '/campaign';
  var service = {
                  get : function() {
                    return $http.get(campaignUrl);
                },
                  create : function(campaign){
                    return $http.post(campaignUrl, campaign);
                  },
                  delete : function(id){
                    return $http.delete(campaignUrl + '/' + id);
                  },
                  edit :  function (campaign) {
                        return $http.put(campaignUrl + '/' + campaign._id, campaign);
                    }
  };
  return service;
}]);

// myApp.factory('Login', ['$http', '$localStorage', function($http, $localStorage){
//         var baseUrl = host ;
//         function changeUser(user) {
//             angular.extend(currentUser, user);
//         }
 
//         function urlBase64Decode(str) {
//             var output = str.replace('-', '+').replace('_', '/');
//             switch (output.length % 4) {
//                 case 0:
//                     break;
//                 case 2:
//                     output += '==';
//                     break;
//                 case 3:
//                     output += '=';
//                     break;
//                 default:
//                     throw 'Illegal base64url string!';
//             }
//             return window.atob(output);
//         }
 
//         function getUserFromToken() {
//             var token = $localStorage.token;
//             var user = {};
//             if (typeof token !== 'undefined') {
//                 var encoded = token.split('.')[1];
//                 user = JSON.parse(urlBase64Decode(encoded));
//             }
//             return user;
//         }
 
//         var currentUser = getUserFromToken();
 
//         return {
//             save: function(data, success, error) {
//                 $http.post(baseUrl + '/signin', data).success(success).error(error)
//             },
//             signin: function(data) {
//                 console.log(data);
//                 $http.post(baseUrl + '/authenticate', data);
//             },
//             me: function(success, error) {
//                 $http.get(baseUrl + '/me').success(success).error(error)
//             },
//             logout: function(success) {
//                 changeUser({});
//                 delete $localStorage.token;
//                 success();
//             }
//         };
//   return service;
// }]);

myApp.factory('LoginService', ['$http',function($http) { 
  var authUrl =  host + '/authenticate';
  var service = {
                  signin : function(data) {
                    return $http.post(authUrl , data);
                },
  };
  return service;
}]);

myApp.factory('UploadCallService', ['$http',function($http) { 
  var uploadCallUrl =  host + '/call';
  var service = {
                  get : function() {
                    return $http.get(uploadCallUrl);
                },
                  create : function(call){
                    return $http.post(uploadCallUrl, call);
                  },
                  delete : function(id){
                    return $http.delete(uploadCallUrl + '/' + id);
                  },
                  edit :  function (call) {
                        return $http.put(uploadCallUrl + '/' + call._id, call);
                    }
  };
  return service;
}]);

myApp.factory('GroupsService', ['$http',function($http) { 
  var uploadCallUrl =  host + '/groups';
  var service = {
                  get : function() {
                    return $http.get(uploadCallUrl);
                },
                   getOne : function(id) {
                    return $http.get(uploadCallUrl + '/' + id);
                },
                  create : function(call){
                    return $http.post(uploadCallUrl, call);
                  },
                  delete : function(id){
                    return $http.delete(uploadCallUrl + '/' + id);
                  },
                  edit :  function (call) {
                        return $http.put(uploadCallUrl + '/' + call._id, call);
                    }
  };
  return service;
}]);
