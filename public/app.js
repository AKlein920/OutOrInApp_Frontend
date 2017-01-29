var app = angular.module("FoodApp", []);


app.controller('foodController', ['$http', function($http) {

  // function to pull all categories from rails API
  this.getCategories = function() {
    $http({
      method: 'GET',
      url: 'http://localhost:3000/categories'
    }).then(function(response) {
      console.log(response);
      console.log(response.data);
      this.categories = response.data;
    }.bind(this));
  }

  this.key = '4674c93fb8691a3cc6c841773dc368e4';
  this.searchTerm = '';

  // Function to populate results from 2 APIs
  this.query = function() {

    // Yelp API call here

    // Food2Fork API call here
    $http({
      method: 'GET',
      url: 'http://food2fork.com/api/search?key=' + this.key + '&q=' + this.searchTerm
    }).then(function(response) {
      console.log(response.data);
      console.log(response.data.recipes);
      this.recipeData = response.data.recipes;
      // this returns a maximum of 30 recipes; could put in a shuffle function to shuffle the array and display in random order instead of same order every time?
    }.bind(this));
  };

}]); // end app controller
