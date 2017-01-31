var app = angular.module("FoodApp", []);

app.controller('foodController', ['$http', function($http) {

// app URL(local at this time - must change to Heroku)
this.url = 'http://localhost:3000';
this.user = {};
this.newRecipeData = {};
this.editRecipeData = {};
this.myRecipes = [];
this.prompt = false;
this.myName = localStorage.username;
this.wrongPassword = false;

if (localStorage.length) {
  this.loggedIn = true;
}

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
  // this.loggedIn = false;
  this.signIn = {};
  this.login = function() {
    $http({
      method: 'POST',
      url: this.url + '/users/login',
      data: {user: {username: this.signIn.username, password: this.signIn.password}}
    }).then(function(response) {
      console.log(response.data);
      if (response.data.status === 401) {
        this.wrongPassword = true;
        this.message = 'Incorrect username or password';
      } else {
        this.user = response.data.user;
        localStorage.setItem('token', JSON.stringify(response.data.token));
        localStorage.setItem('userId', JSON.stringify(response.data.user.id));
        localStorage.setItem('username', JSON.stringify(response.data.user.username))
        this.myName = localStorage.username;
        this.signIn = {};
        this.loggedIn = true;
        this.wrongPassword = false;
      }
    }.bind(this));
  }

  ///// Function to Log Out:
  this.logout = function() {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('username')
    this.loggedIn = false;
    this.show = false;
    this.user = null;
  }

  // Function to see user's recipes:
    this.show = false;
    this.showAllRecipes = function() {
      this.show = true;
      $http({
        method: 'GET',
        url: this.url + '/users/' + localStorage.userId + '/recipes',
        headers: {
          'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))
        }
      }).then(function(response) {
        console.log(response.data);
        this.myRecipes = response.data;
        if (this.myRecipes.length == 0) {
          this.prompt = true;
        }
      }.bind(this));
    };

    // Function to add a new recipe to a user's collection:
    this.addRecipe = function() {
      $http({
        method: 'POST',
        url: this.url + '/users/' + localStorage.userId + '/recipes',
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
        this.prompt = false;
      }.bind(this));
    };

    // Function to edit a recipe:
    this.editRecipe = function(id) {
      $http({
        method: 'PUT',
        url: this.url + '/users/' + localStorage.userId + '/recipes/' + id,
        headers: {
          'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
          'Access-Control-Allow-Credentials': true
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
      },
      function(response) {
        console.log(response);
      }
    );
    };

    // Function to delete a recipe:
    this.areYouSure = false;
    this.IAmSure = function() {
      this.areYouSure = true;
    }
    this.deleteRecipe = function(id) {
      $http({
        method: 'DELETE',
        url: this.url + '/users/' + localStorage.userId + '/recipes/' + id,
        headers: {
          'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))
        }
      }).then(function(response) {
        console.log(response);
      })
    }

  // Function to delete user account:
  this.deleteMyAccount = function() {
    $http({
      method: 'DELETE',
      url: this.url + '/users/' + localStorage.userId,
      headers: {
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))
      }
    }).then(function(response) {
      console.log(response);
      this.logout();
    }.bind(this));
  };

}]); // end app controller
