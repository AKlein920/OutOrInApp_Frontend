var app = angular.module('FoodApp', []);

app.controller('foodController', ['$http', function($http) {
  this.key = '4674c93fb8691a3cc6c841773dc368e4';
  this.searchTerm = '';
  this.location = '';

  this.query = function() {
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

  this.placeQuery = function() {
    $http({
      method: 'GET',
      url: "https://api.yelp.com/v3/businesses/search?term=" + this.searchTerm + "&location=" + this.location +  "&categories=restaurants&sort_by=distance",
      headers: {
        'authorization': 'Bearer kxeNhjKVOho4QTBNr0mSGwdtCKGZTmW-PgvVQpjMkrNIucjw3uN63VJWg8GxX6j4DsI4Xn1oaWKQO-HzJBFQJzu0-XUzIeNZqv8ghhER5m_IQFCs3NjWF3ST6QWOWHYx',
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Headers' : '*',
        'Access-Control-Allow-Methods' : 'OPTIONS'
      },
      xsrfHeaderName : ""
    }).then(function(response) {
      console.log(response.data);
      console.log(response.data.places);
      this.placeData = response.data.places;
    }.bind(this));
  };

}]); // end app controller
