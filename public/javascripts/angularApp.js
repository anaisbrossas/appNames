'use strict';

var app = angular.module('workCo', ['ui.router']).config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
    url: '/home',
    templateUrl: '/home.html',
    controller: 'MainCtrl',
    resolve: {
        postPromise: ['posts', function(posts){
          return posts.getAll();
        }]
    }
    });
  $urlRouterProvider.otherwise('home');
}]);

app.factory('posts', ['$http', function($http){
  var o = {
    posts: []
  };
    o.getAll = function() {
        return $http.get('/posts').success(function(data){
          angular.copy(data, o.posts);
        });
      };
    o.create = function(post) {
      return $http.post('/posts', post).success(function(data){
        o.posts.push(data);
      });
    };
    o.delete = function(post) {
        var index = o.posts.indexOf(post);
        return $http.delete('/posts/' + post._id).success(function(){
        o.posts.splice(index, 1); 
      });
    };

  return o;
}]);

app.controller('MainCtrl', [
  '$scope',
  'posts',
    // Used when '+' is pressed
	function($scope, posts){
		$scope.posts = posts.posts;
        $scope.namePattern = /^[a-z ,.'-]+$/i;
		$scope.addPost = function(){
            $scope.errorMessage = null;
            
            // Checks if the name is well formed and returns an error message
            if(isBadInputName()){
                return;
            }

            //Adds the new name 
            posts.create({
                name: $scope.name,
            });
            $scope.name = '';
        };
        
        //Deletes the name chosen
        $scope.delete = function(post) {
          posts.delete(post);
        };
        
        //Checks if the name is valid, already exists, has the right size
        function isBadInputName(){
            //Checks if name entered is valid
            if($scope.addNameForm.name.$invalid 
               || $scope.addNameForm.name.$error.pattern || !$scope.name || $scope.name === ''){
                $scope.errorMessage = "Enter a valid name";
                return true;
            }
            
            //Checks maximum size of name
            if($scope.name.length>40){
                $scope.errorMessage = "Enter a smaller name (less than 40 caracters)";
                return true;
            }
            
            //Checks if name entered already exists
            var keepGoing = true;
            $scope.posts.forEach(function(post){
                if(keepGoing){
                    if(post.name === $scope.name){
                    $scope.errorMessage = "This name already exists";
                        keepGoing=false;
                    }
                }
            });
            if($scope.errorMessage != null){
                return true;
            }
            return false;
        };
  }]);