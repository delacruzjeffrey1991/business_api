'use strict';

angular
  .module('sbAdminApp', [
    'oc.lazyLoad',
    'ui.router',
    'ui.bootstrap',
    'angular-loading-bar',
    'datatables',
    'ngResource',
    'ngStorage'
  ])
  .config(['$stateProvider','$urlRouterProvider','$ocLazyLoadProvider','$httpProvider',function ($stateProvider,$urlRouterProvider,$ocLazyLoadProvider,$httpProvider) {
    
    $ocLazyLoadProvider.config({
      debug:false,
      events:true,
    });

    $urlRouterProvider.otherwise('/login');

    $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function($q, $location, $localStorage) {
            return {
                'request': function (config) {
                    config.headers = config.headers || {};
                    if ($localStorage.token) {
                        config.headers['x-access-token'] =  $localStorage.token;
                    }
                    return config;
                },
                'responseError': function(response) {
                    if(response.status === 401 || response.status === 403) {
                        $location.path('/login');
                    }
                    return $q.reject(response);
                }
            };
        }]);

    $stateProvider
      .state('dashboard', {
        url:'/dashboard',
        templateUrl: 'views/dashboard/main.html',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'sbAdminApp',
                    files:[
                    'scripts/directives/header/header.js',
                    'scripts/directives/header/header-notification/header-notification.js',
                    'scripts/directives/sidebar/sidebar.js',
                    'scripts/directives/sidebar/sidebar-search/sidebar-search.js'
                    ]
                }),
                $ocLazyLoad.load(
                {
                   name:'toggle-switch',
                   files:["bower_components/angular-toggle-switch/angular-toggle-switch.min.js",
                          "bower_components/angular-toggle-switch/angular-toggle-switch.css"
                      ]
                }),
                $ocLazyLoad.load(
                {
                  name:'ngAnimate',
                  files:['bower_components/angular-animate/angular-animate.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngCookies',
                  files:['bower_components/angular-cookies/angular-cookies.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngResource',
                  files:['bower_components/angular-resource/angular-resource.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngSanitize',
                  files:['bower_components/angular-sanitize/angular-sanitize.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngTouch',
                  files:['bower_components/angular-touch/angular-touch.js']
                })
            }
        }
    })
            .state('dashboard.home',{
        url:'/home',
        controller: 'MainCtrl',
        templateUrl:'views/dashboard/home.html',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
              'scripts/controllers/main.js'
              ]
            })
          }
        }
      })


      .state('login',{
        url:'/login',
        controller: 'LoginCtrl',
        templateUrl:'views/login.html',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
              'scripts/controllers/loginController.js',
              'scripts/services/service.js'
              ]
            })
          }
        }
      })

    .state('dashboard.interactions',{
        templateUrl:'views/interactions.html',
        url:'/interactions',        
        controller:'InteractionsCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name:'sbAdminApp',
                files:['scripts/controllers/interactionsController.js',
                'scripts/services/service.js']
            })
          }
        }
    })
    .state('dashboard.addInteractions',{
        templateUrl:'views/addInteractions.html',
        url:'/addInteractions',
        params: {
            interactions: null
         },
        controller : 'AddInteractionsCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name:'sbAdminApp',
                files:['scripts/controllers/interactionsController.js',
                'scripts/services/service.js']
            })
          }
        }
    })  
    
    .state('dashboard.client',{
        templateUrl:'views/client.html',
        url:'/client',        
        controller:'ClientCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name:'sbAdminApp',
                files:['scripts/controllers/clientController.js',
                'scripts/services/service.js']
            })
          }
        }
    })
    .state('dashboard.addClient',{
        templateUrl:'views/addClient.html',
        url:'/addClient',
        params: {
            client: null
         },
        controller : 'AddClientCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name:'sbAdminApp',
                files:['scripts/controllers/clientController.js',
                'scripts/services/service.js']
            })
          }
        }
    })
    .state('dashboard.addProduct',{
        templateUrl:'views/addProduct.html',
        url:'/addProduct',
        controller:'ProductCtrl',
        params: {
            product: null
         },
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name:'sbAdminApp',
                files:['scripts/controllers/productController.js',
                'scripts/services/service.js']
            })
          }
        }
    })
    .state('dashboard.grade',{
        templateUrl:'views/grade.html',
        url:'/grade',        
        controller:'GradeCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name:'sbAdminApp',
                files:['scripts/controllers/gradeController.js',
                'scripts/services/service.js']
            })
          }
        }
    })
    .state('dashboard.addGrade',{
        templateUrl:'views/addGrade.html',
        url:'/addGrade',
        params: {
            grade: null
         },
         controller : 'AddGradeCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name:'sbAdminApp',
                files:['scripts/controllers/gradeController.js',
                'scripts/services/service.js']
            })
          }
        }
    })

    .state('dashboard.qaProfile',{
        templateUrl:'views/qaProfile.html',
        url:'/qaProfile',        
        controller:'QaProfileCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name:'sbAdminApp',
                files:['scripts/controllers/qaProfileController.js',
                'scripts/services/service.js']
            })
          }
        }
    })
    .state('dashboard.addQaProfile',{
        templateUrl:'views/addQaProfile.html',
        url:'/addQaProfile',
        params: {
            qaProfile: null
         },
         controller : 'AddQaProfileCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name:'sbAdminApp',
                files:['scripts/controllers/qaProfileController.js',
                'scripts/services/service.js']
            })
          }
        }
    })
    .state('dashboard.campaign',{
        templateUrl:'views/campaign.html',
        url:'/campaign',        
        controller:'CampaignCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name:'sbAdminApp',
                files:['scripts/controllers/CampaignController.js',
                'scripts/services/service.js']
            })
          }
        }
    })
    .state('dashboard.addCampaign',{
        templateUrl:'views/addCampaign.html',
        url:'/addCampaign',
        params: {
            campaign: null
         },
         controller : 'AddCampaignCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name:'sbAdminApp',
                files:['scripts/controllers/CampaignController.js',
                'scripts/services/service.js']
            })
          }
        }
    })

  .state('dashboard.administration',{
        templateUrl:'views/administration.html',
        url:'/administration'
    })
    .state('dashboard.workbench',{
        templateUrl:'views/workbench.html',
        url:'/workbench',
        controller : 'WorkbenchCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name:'sbAdminApp',
                files:['scripts/controllers/workbenchController.js',
                'scripts/services/service.js']
            })
          }
        }
    })

    .state('dashboard.uploadCall',{
        templateUrl:'views/uploadCall.html',
        url:'/uploadCall',
        controller : 'uploadCallCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name:'sbAdminApp',
                files:['scripts/controllers/uploadCallController.js',
                'scripts/services/service.js']
            })
          }
        }
    })

  }]);

    
