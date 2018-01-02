export default ngModule => {
  ngModule
    .service('usuariosService', ['$http', '$rootScope', 'HOST', usuariosService])
}

function usuariosService($http, $rootScope, HOST){
  let url = HOST.url();
  let timeout = 10000;

  this.login = function(datosUsuario){
    $http.post('http://www.fibraconsultores.com:8010/authenticate', datosUsuario, {timeout: timeout})
  }
}
