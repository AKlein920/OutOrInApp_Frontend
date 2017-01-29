var app = angular.module("FoodApp", []);


app.controller('foodController', ['$http', function($http) {
  this.recipeGroup = [];

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

    $http({
      method: 'POST',
      url: 'http://localhost:3000/categories',
      data: {
        name: this.searchTerm
      }
    }).then(function(response) {
      console.log(response);
      categoryId = response.data.id;
    }.bind(this));
    // Yelp API call here

    // Food2Fork API call here
    $http({
      method: 'GET',
      url: 'http://food2fork.com/api/search?key=' + this.key + '&q=' + this.searchTerm
    }).then(function(response) {
      // console.log(response.data);
      // console.log(response.data.recipes);
      this.recipeGroup = response.data.recipes.map(function (recipeObj) {
        var rObj = {};
        rObj['name'] = recipeObj.title;
        rObj['img_url'] = recipeObj.image_url;
        rObj['url'] = recipeObj.source_url;
        rObj['category_id'] = categoryId;
        return rObj;
      });
      console.log(this.recipeGroup);
      // this returns a maximum of 30 recipes; could put in a shuffle function to shuffle the array and display in random order instead of same order every time?
    }.bind(this));
  };

  // Function to add a recipe to the db:
  this.addRecipe = function(index) {

    $http({
      method: 'POST',
      url: 'http://localhost:3000/recipes',
      data: { recipe: this.recipeGroup[index] }
    }).then(function(response) {
      console.log('adding recipe');
      console.log(response);
    }.bind(this));
  }

}]); // end app controller
