export default ngModule => {
  ngModule
    .service('usuariosService', ['$http', '$rootScope', 'HOST', usuariosService])
}

function usuariosService($http, $rootScope, HOST){
  let url = HOST.url();
  let timeout = 10000;

  this.login = function(datosUsuario){
    return $http.post('http://www.fibraconsultores.com:8010/authenticate', datosUsuario, {timeout: timeout})
  }

  this.getUser = function(idUsuario){
    return $http.get(`${url}usuario/${idUsuario}`, {timeout: timeout})
    //return $http.get(url + 'usuario/' + idUsuario, {timeout: timeout})
  }
}
