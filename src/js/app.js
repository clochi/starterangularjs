//const angular = require('angular');
import {main} from './main.js'

angular
  .module('webpackStarter', [])
  .controller('main', ['$rootScope', '$scope', main]);
