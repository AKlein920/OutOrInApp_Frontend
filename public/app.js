var app = angular.module("FoodApp", []);

app.controller('foodController', ['$http', function($http) {

// app URL(local at this time - must change to Heroku)
this.url = 'https://out-or-in-app--api.herokuapp.com/';
this.user = {};
this.newRecipeData = {};
this.editRecipeData = {};
this.myRecipes = [];

  ///// Function to Sign Up:
  this.signUpData = {};
  this.signedUp = false;
  this.signUp = function() {
    $http({
      method: 'POST',
      url: this.url + '/users',
      data: {user: {username: this.signUpData.username, password: this.signUpData.password}}
    }).then(function(response) {
      console.log('signing up');
      console.log(response.data);
      this.signUpData = {};
      this.signedUp = true;
    }.bind(this));
  }

  ///// Function to Log In:
  this.loggedIn = false;
  this.signIn = {};
  this.login = function() {
    $http({
      method: 'POST',
      url: this.url + '/users/login',
      data: {user: {username: this.signIn.username, password: this.signIn.password}}
    }).then(function(response) {
      console.log(response);
      this.user = response.data.user;
      localStorage.setItem('token', JSON.stringify(response.data.token))
      console.log(this.user.id);
      this.signIn = {};
      this.loggedIn = true;
    }.bind(this));
  }

  ///// Function to Log Out:
  this.logout = function() {
    localStorage.removeItem('token')
    this.loggedIn = false;
    this.user = null;
  }

  // Function to see user's recipes:
    this.show = false;
    this.showAllRecipes = function() {
      this.show = true;
      $http({
        method: 'GET',
        url: this.url + '/users/' + this.user.id + '/recipes',
        headers: {
          'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))
        }
      }).then(function(response) {
        console.log(response.data);
        this.myRecipes = response.data;
      }.bind(this));
    };

    // Function to add a new recipe to a user's collection:
    this.addRecipe = function() {
      $http({
        method: 'POST',
        url: this.url + '/users/' + this.user.id + '/recipes',
        headers: {
          'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))
        },
        data: {
          name: this.newRecipeData.name,
          url: this.newRecipeData.url,
          img_url: this.newRecipeData.img_url,
          user_id: this.user.id,
          ingredients: this.newRecipeData.ingredients,
          directions: this.newRecipeData.directions,
          difficulty: this.newRecipeData.difficulty,
          meal: this.newRecipeData.meal,
          serving_size: this.newRecipeData.serving_size,
          cuisine: this.newRecipeData.cuisine,
          time_to_make: this.newRecipeData.time_to_make
        }
      }).then(function(response) {
        console.log(response.data);
      });
    };

    // Function to edit a recipe:
    this.editRecipe = function(id) {
      $http({
        method: 'PUT',
        url: this.url + '/users/' + this.user.id + '/recipes/' + id,
        headers: {
          'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))
        },
        data: {
          name: this.editRecipeData.name,
          url: this.editRecipeData.url,
          img_url: this.editRecipeData.img_url,
          ingredients: this.editRecipeData.ingredients,
          directions: this.editRecipeData.directions,
          difficulty: this.editRecipeData.difficulty,
          meal: this.editRecipeData.meal,
          serving_size: this.editRecipeData.serving_size,
          cuisine: this.editRecipeData.cuisine,
          time_to_make: this.editRecipeData.time_to_make
        }
      }).then(function(response) {
        console.log(response.data);
      });
    };

    // Function to delete a recipe:
    this.areYouSure = false;
    this.IAmSure = function() {
      this.areYouSure = true;
    }
    this.deleteRecipe = function(id) {
      $http({
        method: 'DELETE',
        url: this.url + '/users/' + this.user.id + '/recipes/' + id,
        headers: {
          'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))
        }
      }).then(function(response) {
        console.log(response);
      })
    }

  // Function to add a recipe to the db:
  // this.addRecipe = function(index) {
  //   $http({
  //     method: 'POST',
  //     url: 'http://localhost:3000/categories/' + this.recipeGroup[index].category_id + '/recipes',
  //     data: { recipe: this.recipeGroup[index] }
  //   }).then(function(response) {
  //     console.log('adding recipe');
  //     console.log(response);
  //   }.bind(this));
  // }

  // Function to delete recipe:
  // this.deleteRecipe = function(index) {
  //   $http({
  //     method: 'DELETE',
  //     url: 'http://localhost:3000/categories/' + this.categoryRecipes[index].category_id + '/recipes/' + this.categoryRecipes[index].id
  //   }).then(function(response) {
  //     console.log('deleting recipe');
  //   }.bind(this));
  // }

  // Function to edit a category:
  // this.editCategory = function(index) {
  //   $http({
  //     method: 'PUT',
  //     url: 'http://localhost:3000/categories/' + this.categories[index].id,
  //     data: {
  //       name: this.editCategoryData.name,
  //       description: this.editCategoryData.description
  //     }
  //   }).then(function(response) {
  //     console.log('editing category');
  //     console.log(response.data);
  //   }.bind(this));
  // }

}]); // end app controller
