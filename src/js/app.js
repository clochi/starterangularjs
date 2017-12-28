//const angular = require('angular');
import {main} from './main.js'
import '../css/estilo.styl';
angular
  .module('webpackStarter', [])
  .controller('main', ['$rootScope', '$scope', main]);
