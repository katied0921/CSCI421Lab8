var app = angular.module('bloggerApp', ['ngRoute']);

//*** Router Provider ***
app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'HomeController',
            controllerAs: 'vm'
            })
  
        // .when('/list', {
        //     templateUrl: 'pages/bloglist.html',
        //     controller : 'ListController',
        //     controllerAs: 'vm'
        //     })
  
        // .when('/add', {
        //     templateUrl: 'pages/blogadd.html',
        //     controller: 'AddController',
        //     controllerAs: 'vm'
        //     })
            
        // .when('/edit/:id', {
        //     templateUrl: 'pages/blogedit.html',
        //     controller: 'EditController',
        //     controllerAs: 'vm'
        //     })
          
        // .when('/delete/:id', {
        //     templateUrl: 'pages/blogdelete.html',
        //     controller: 'DeleteController',
        //     controllerAs: 'vm'
        //     })

        // .otherwise({redirectTo: '/'});
});

//*** Controllers ***
app.controller('HomeController', function() {
    var vm = this;
    vm.pageHeader = {
        title: "Katie Dowlin Blog Site"
    };
    vm.message = "Welcome to my blog site!";
});