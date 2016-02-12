app.controller('mainCtrl', function($scope, $state, $http){
  $scope.message = "hello"
  $http.get('/user').success(function(currentUser){
    $scope.theseDrinks = []
    currentUser.savedDrinks.forEach(function(e) {
      $scope.theseDrinks.push(e.strDrink)
    })
    $scope.currentUser = currentUser

    $scope.myState = false
  })
  var $modal = $('#loginModal');

  $scope.save = function(drink) {
    $scope.drinks[this.$index].savedAlready = true;
    $http.post('/save', drink).success(function(user) {
      $scope.currentUser = user;
    })
  }
  $scope.showMine = function() {
    console.log($scope.currentUser.savedDrinks)
    $scope.drinks = $scope.currentUser.savedDrinks
    $scope.myState = true;
  }
  $scope.search = function(drinkName) {
    searchResult = {}
    $scope.myState = false;
    searchResult.drinkName = drinkName
    $http.post('/drink', searchResult ).success(function(drink) {
      if(drink.length > 0) {
        console.log(drink)
        if($scope.currentUser) {
          drink.forEach(function(e) {
            console.log(e.strDrink)
            if($scope.theseDrinks.indexOf(e.strDrink) > -1) {
              e.savedAlready = true
            }
            else {
              e.savedAlready = false
            }
          })
          $scope.drinks = drink
        }
        else {
          $scope.drinks = drink
        }
      }
      else {
        alert("No Results Found")
      }
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
      $scope.theseDrinks = []
      user.savedDrinks.forEach(function(e) {
        $scope.theseDrinks.push(e.strDrink)
      })
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
