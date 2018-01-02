const jQuery = require('jquery');
const angular = require('angular');
const angularAnimate = require('angular-animate');
const angularAria = require('angular-aria');
const angularMaterial = require('angular-material');
const angularRoute = require('angular-route');

angular.module('webpackStarter', ['ngRoute', 'ngMaterial']);

const ngModule = angular.module('webpackStarter')
require('./controllers').default(ngModule);

require('angular-material/angular-material.min.css')
require('../css/estilo.styl');
