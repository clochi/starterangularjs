
export default ngModule => {
  ngModule
    .config(configRoutes)
}

function configRoutes($routeProvider){
  $routeProvider
    .when('/', {
      controller: 'login',
      controllerAs: 'vm',
      template: require('../../views/login/login.html')
      //templateUrl: 'views/login/login.html'
    })
    .when('/home', {
      controller: 'home',
      controllerAs: 'home',
      templateUrl: 'views/app/home.html',
      resolve: {auth: function(AUTH){
        return AUTH.check();
      }}
    })
    .otherwise({redirectTo: '/'});
}

//export { configRoutes };
