const jQuery = require('jquery');
const angular = require('angular');
const angularAnimate = require('angular-animate');
const angularAria = require('angular-aria');
const angularMaterial = require('angular-material');
const angularRoute = require('angular-route');
require('angular-material/angular-material.min.css')
require('../css/estilo.styl');

angular.module('webpackStarter', ['ngRoute', 'ngMaterial']);

const ngModule = angular.module('webpackStarter')
require('./config/routes').default(ngModule);
require('./services').default(ngModule);
require('./controllers').default(ngModule);
