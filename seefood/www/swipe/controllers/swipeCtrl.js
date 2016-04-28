'use strict';

var app = angular.module('seeFoodApp');

app.controller('swipeCtrl', function($scope, HomeService, RestaurantService, $state) {
  $scope.$parent.state = $state.current.name;
  console.log('state: ', $state.current.name);

	$scope.$watch(function() {
		return RestaurantService.restaurants;
	}, function(newVal, oldVal) {
		$scope.restaurant = newVal[0];
	});

	var myElement = document.getElementById('pic');
	var mc = new Hammer(myElement);

	mc.on("swipeleft", function(ev) {
		$scope.rejected();
		$scope.$apply();
	});

	mc.on("swiperight", function(ev) {
		$scope.sheSaidYes();
		$scope.$apply();
	});

	$scope.rejected = function() {
		RestaurantService.swipeRestaurant();
		$scope.restaurant = RestaurantService.grabRestaurant();
	}

	$scope.sheSaidYes = function() {
		RestaurantService.addLike();
		RestaurantService.swipeRestaurant();
		$scope.restaurant = RestaurantService.grabRestaurant();
	}

})
