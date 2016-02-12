app.controller('savedCtrl', function($scope, $state, $http){
  $http.get('/user').success(function(currentUser){
    $scope.currentUser = currentUser
    $scope.drinks = $scope.currentUser.savedDrinks
    $scope.myState = true
  })

  $scope.remove = function() {
    console.log(this.$index)
    $scope.currentUser.savedDrinks.splice(this.$index, 1)
    $http.post('/editsaved', $scope.currentUser).success(function(user) {
      $scope.drinks = $scope.currentUser.savedDrinks
    })
  }

})
