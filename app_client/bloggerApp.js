var app = angular.module('bloggerApp', ['ngRoute']);

//*** Router Provider ***
app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'HomeController',
            controllerAs: 'vm'
            })

        .otherwise({redirectTo: '/'});
});

//*** Controllers ***
app.controller('HomeController', function HomeController() {
    var vm = this;
    vm.pageHeader = {
        title: 'Katie Dowlin Blog Site'
    };
    vm.message = 'Welcome to my blog site!';
});