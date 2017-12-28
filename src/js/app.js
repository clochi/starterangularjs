//const angular = require('angular');
import {main} from './main.js'
import '../css/estilo.styl';
angular
  .module('webpackStarter', ['ngRoute', 'ngMaterial'])
  .controller('main', ['$rootScope', '$scope', main]);
