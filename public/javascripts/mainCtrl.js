app.controller('mainCtrl', function($scope, $state, $http){
  console.log("hello")
  $scope.message = "hello"
  $http.get('/user').success(function(currentUser){
    $scope.currentUser = currentUser
  })
  var $modal = $('#loginModal');


  $scope.search = function(drinkName) {
    searchResult = {}
    searchResult.drinkName = drinkName
    $http.post('/drink', searchResult ).success(function(drink) {
      console.log(drink)
      $scope.drinks = drink
    })
  }
  $scope.closeModal = function() {
    $.ajax('/')
      .done(function(resp){
        $modal.html(resp.html).foundation('close');
    });
  }

  $scope.login = function(user) {
    $http.post('/users/login', user).success(function(user){
      $scope.currentUser = user;
      $.ajax('/')
        .done(function(resp){
          $modal.html(resp.html).foundation('close');
      });
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
        $.ajax('/')
          .done(function(resp){
            $modal.html(resp.html).foundation('close');
        });
      }
    });
  };

})
