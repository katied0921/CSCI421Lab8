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

        .when('/likepost/:id', {
            templateUrl: 'pages/likepost.html',
            controller: 'LikeController',
            controllerAs: 'vm'
        })

        .when('/lovepost/:id', {
            templateUrl: 'pages/lovepost.html',
            controller: 'LoveController',
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

app.controller('ListController', function ListController($http, authentication) {
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
    $http.get('/api/blogs')
      .success(function(data) {
        vm.blogs = data;
        vm.message = "Blog data found!";
        console.log(vm.message);
      })
      .error(function (e) {
        vm.message = "Could not get list of blogs";
      });
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

app.controller('LikeController', function($http, $location, $routeParams){
    console.log('in the like controller');
    var vm = this;
    // Get id from route params.
    vm.id = $routeParams.id;
    vm.pageHeader = {
        title: 'Like Blog'
    };
    console.log('page header: ', vm.pageHeader);
    $http.get('/api/blog/' + vm.id)
        .then(function(res){
            vm.blog = res.data;
            // Looks like vm.blog is getting set to the whole index.hmtl file
            console.log('blog: ', vm.blog);
            vm.message = "Blog data found!";
            console.log('vm.message: ', vm.message);
        })
        .catch(function(error){
            console.error('Could not get blog: ', error);
        });
    console.log('blog: ', vm.blog);
    vm.likePost = function(){
        console.log('in likePost()');
        var data = vm.blog;
        data.likes = vm.blog.likes + 1;
        // console.log("Likes: ", vm.blog.likes);
        // console.log("Likes Data Type: ", typeof vm.blog.likes);
        // console.log("1 Data Type: ", typeof 1);
        // var incrementedLikes = vm.blog.likes + 1;
        // console.log("Updated Likes: ", incrementedLikes);
        $http.put('/api/like/' + vm.id, data)
            .then(function(res){
                console.log("likes: ", data.likes);
                vm.message = "Blog liked!"
                // Redirect to list page.
                $location.path('/list');
            })
            .catch(function(error){
                console.error('Could not like blog: ', error);
            });
    };
});

app.controller('LoveController', function($http, $location, $routeParams, authentication){
    console.log('in the love controller');
    var vm = this;
    // Get id from route params.
    vm.id = $routeParams.id;
    vm.pageHeader = {
        title: 'Love Blog'
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
    vm.lovePost = function(){
        console.log('in lovePost()');
        var data = vm.blog;
        data.loves = 1;
        $http.put('/api/blogs/' + vm.id, data, { headers: { Authorization: 'Bearer '+ authentication.getToken() }})
            .then(function(res){
                console.log("data: ", data);
                vm.message = "Blog loved!"
                // Redirect to list page.
                $location.path('/list');
            })
            .catch(function(error){
                console.error('Could not love blog: ', error);
            });
    };
});