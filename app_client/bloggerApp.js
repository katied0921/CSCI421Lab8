var app = angular.module('blogApp', ['ngRoute']);

//*** Router Provider ***
app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'HomeController',
            controllerAs: 'vm'
            })

        .when('/list', {
            templateUrl: 'pages/list.html',
            controller : 'ListController',
            controllerAs: 'vm'
            })

        .when('/add', {
            templateUrl: 'pages/add.html',
            controller: 'AddController',
            controllerAs: 'vm'
            })
                
        .when('/edit/:id', {
            templateUrl: 'pages/edit.html',
            controller: 'EditController',
            controllerAs: 'vm'
            })

        .when('/delete/:id', {
            templateUrl: 'pages/delete.html',
            controller: 'DeleteController',
            controllerAs: 'vm'
            })
        
        .when('/login', {
            templateUrl: '/auth/login.html',
            controller:  'LoginController',
            controllerAs: 'vm'
        })
        
        .when('/register', {
            templateUrl: '/auth/register.html',
            controller: 'RegisterController',
            controllerAs: 'vm'
        })

        .otherwise({redirectTo: '/'});
});


//*** Controllers ***
app.controller('HomeController', function HomeController() {
    console.log('in the home controller');
    var vm = this;
    vm.pageHeader = {
        title: 'Katie Dowlin Blog Site'
    };
    vm.message = 'Welcome to my blog site!';
});

app.controller('ListController', function ListController($http, $location, $scope, $interval, authentication) {
    console.log('in the list controller');
    var vm = this;
    vm.pageHeader = {
        title: 'Blog List'
    };
    console.log(vm.pageHeader);
    vm.isLoggedIn = function(){
        return authentication.isLoggedIn();
    };
    vm.currentUser = function(){
        return authentication.currentUser();
    };
    vm.like = function(id){
        console.log("in the like function");
        console.log("id: ", id);
        // Use the id that gets passed in to get the single blog
        $http.get('/api/blogs/' + id)
        .then(function(res){
            vm.blog = res.data;
            console.log('blog: ', vm.blog);
            vm.message = "Blog data found!";
            console.log('vm.message: ', vm.message);
            console.log("vm.blog: ", vm.blog);
            console.log("likes: ", vm.blog.likes);
            var incrementedLikes = vm.blog.likes + 1;
            console.log("incremented likes: ", incrementedLikes);
            var data = vm.blog;
            data.likes = incrementedLikes;
            // Update the number of likes in that blog
            $http.put('/api/blogs/' + id, data, { headers: { Authorization: 'Bearer '+ authentication.getToken() }})
                .then(function(res){
                    console.log("data: ", data);
                    vm.message = "Blog liked!"
                    // Redirect to list page so you don't have to refresh to see number of likes increase.
                    $location.path('/list');
                })
                .catch(function(error){
                    console.error('Could not like blog: ', error);
                });
            })
            .catch(function(error){
                console.error('Could not get blog: ', error);
            });
    };
    vm.love = function(id){
        console.log("in the love function");
        console.log("id: ", id);
        // Use the id that gets passed in to get the single blog
        $http.get('/api/blogs/' + id)
        .then(function(res){
            vm.blog = res.data;
            console.log('blog: ', vm.blog);
            vm.message = "Blog data found!";
            console.log('vm.message: ', vm.message);
            console.log("vm.blog: ", vm.blog);
            console.log("loves: ", vm.blog.loves);
            var incrementedLoves = vm.blog.loves + 1;
            console.log("incremented loves: ", incrementedLoves);
            var data = vm.blog;
            data.loves = incrementedLoves;
            // Update the number of loves in that blog
            $http.put('/api/blogs/' + id, data, { headers: { Authorization: 'Bearer '+ authentication.getToken() }})
                .then(function(res){
                    console.log("data: ", data);
                    vm.message = "Blog loved!"
                    // Redirect to list page so you don't have to refresh to see number of likes increase.
                    $location.path('/list');
                })
                .catch(function(error){
                    console.error('Could not love blog: ', error);
                });
            })
            .catch(function(error){
                console.error('Could not get blog: ', error);
            });
    };
    $http.get('/api/blogs')
      .success(function(data) {
        vm.blogs = data;
        vm.message = "Blog data found!";
        console.log(vm.message);
      })
      .error(function (e) {
        vm.message = "Could not get list of blogs";
      });
      // Refreshes lists of users periodically					  
		$scope.callAtInterval = function() {
			console.log("Interval occurred");
            $http.get('/api/blogs')
                .success(function(data) {
                    vm.blogs = data;
                    vm.message = "Blog data found!";
                    console.log(vm.message);
                })
                .error(function (e) {
                    vm.message = "Could not get list of blogs";
                });							  
		}
		$interval( function(){$scope.callAtInterval();}, 3000, 0, true);
});

app.controller('AddController', function($http, $location, authentication){
    console.log('in the add controller');
    var vm = this;
    vm.pageHeader = {
        title: 'Add Blog'
    };
    console.log(vm.pageHeader);
    vm.currentUser = function(){
        return authentication.currentUser();
    };
    vm.add = function(){
        var blog = {
            blogTitle: vm.blogTitle,
            blogText: vm.blogText,
            postedBy: vm.currentUser().name,
            userEmail: vm.currentUser().email,
            likes: 0,
            dislikes: 0,
            loves: 0
        };
        console.log(blog);
        // Do the post. If it's successful, redirect to list page.
        $http.post('/api/blogs', blog, { headers: { Authorization: 'Bearer '+ authentication.getToken() }})
            .then(function(res) {
                // Redirect to list page.
                $location.path('/list');
            })
            .catch(function(error){
                console.error('Could not add blog: ', error);
            });
    };
});

app.controller('EditController', function($http, $location, $routeParams, authentication){
    console.log('in the edit controller');
    var vm = this;
    // Get id from route params.
    vm.id = $routeParams.id;
    vm.pageHeader = {
        title: 'Edit Blog'
    };
    console.log('page header: ', vm.pageHeader);
    $http.get('/api/blogs/' + vm.id)
        .then(function(res){
            vm.blog = res.data;
            console.log('blog: ', vm.blog);
            vm.message = "Blog data found!";
            console.log('vm.message: ', vm.message);
        })
        .catch(function(error){
            console.error('Could not get blog: ', error);
        });
    console.log('blog: ', vm.blog);
    vm.editPost = function(){
        console.log('in editPost()');
        var data = vm.blog;
        data.blogTitle = vm.blogTitle;
        data.blogText = vm.blogText;
        $http.put('/api/blogs/' + vm.id, data, { headers: { Authorization: 'Bearer '+ authentication.getToken() }})
            .then(function(res){
                console.log("data: ", data);
                vm.message = "Blog updated!"
                // Redirect to list page.
                $location.path('/list');
            })
            .catch(function(error){
                console.error('Could not edit blog: ', error);
            });
    };
});

app.controller('DeleteController', function($http, $location, $routeParams, authentication){
    console.log('in the delete controller');
    var vm = this;
    // Get id from route params.
    vm.id = $routeParams.id;
    vm.pageHeader = {
        title: 'Delete Blog'
    };
    console.log('page header: ', vm.pageHeader);
    $http.get('/api/blogs/' + vm.id)
        .then(function(res){
            vm.blog = res.data;
            console.log('blog: ', vm.blog);
            vm.message = "Blog data found!";
            console.log('vm.message: ', vm.message);
        })
        .catch(function(error){
            console.error('Could not get blog: ', error);
        });
    console.log('blog: ', vm.blog);
    vm.deletePost = function(){
        $http.delete('/api/blogs/' + vm.id, { headers: { Authorization: 'Bearer '+ authentication.getToken() }})
            .then(function(res){
                vm.message = "Blog deleted!"
                // Redirect to list page.
                $location.path('/list');
            })
            .catch(function(error){
                console.error('Could not delete blog: ', error);
            });
    };
});
