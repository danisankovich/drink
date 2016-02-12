app.controller('mainCtrl', function($scope, $state, $http){
  console.log("hello")
  $scope.message = "hello"

  $scope.login = function(user) {
    $http.post('/users/login', user).success(function(user){
      $scope.currentUser = user;
      $('#loginModal').foundation('reveal', 'close');
    }).error(function(err) {
      $scope.loginMessage = "Incorrect Username/Password Combination"
    })
  }
  $scope.register = function(newUser) {
    console.log(newUser)
    $scope.newUser = newUser;
    $http.post('/users/register', $scope.newUser).success(function(err, data) {
      if(err.hasOwnProperty('name') === true) {
        alert(err.message)
        return;
      }
      else if(err.hasOwnProperty('errmsg')) {
        alert('email exists alrady')
        return;
      }
      else {
        $scope.currentUser = err;
        $('#loginModal').foundation('reveal', 'close');
      }
    });
  };

})
