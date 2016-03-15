'use strict';

var app = angular.module('appNames', ['ui.router']).config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $stateProvider
        .state('home', {
            url: '/',
            views: {
                'main':{
                    templateUrl: '/directives/indexAppNames/templates/indexAppNames.html',
                    controller:'IndexAppNamesCtrl',
                    resolve: {
                    postPromise: ['posts', function(posts){
                        return posts.getAll();
                        }]
                    }
                }
            }
        });
        $urlRouterProvider.otherwise('/');
    }
]);

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

