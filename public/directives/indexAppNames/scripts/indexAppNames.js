'use strict';

app.controller('IndexAppNamesCtrl', [
    '$scope',
    'posts',
    // Used when '+' is pressed
    function($scope, posts){
    $scope.posts = posts.posts;
    $scope.namePattern = /^[a-z ,.'-]+$/i;

    //Creates a new post (name)
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