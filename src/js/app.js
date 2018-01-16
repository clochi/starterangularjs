const angular = require('angular');
const angularAnimate = require('angular-animate');
const angularAria = require('angular-aria');
const angularMaterial = require('angular-material');
const angularRoute = require('angular-route');
const moment = require('moment');
const fullCalendar = require('fullcalendar');
require('angular-material-data-table/dist/md-data-table.min.css')
require('angular-material-data-table');
require('./fullcalendar-es/es');
require('angular-material/angular-material.min.css');
require('fullcalendar/dist/fullcalendar.min.css');
require('../css/estilo.styl');

angular.module('webpackStarter', ['ngRoute', 'ngMaterial', 'md.data.table']);

const ngModule = angular.module('webpackStarter')
require('./config').default(ngModule);
require('./services').default(ngModule);
require('./controllers').default(ngModule);
require('../components').default(ngModule);
