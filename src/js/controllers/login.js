
export default (ngModule) => {
  ngModule
    .controller('login', ['$rootScope', '$scope', '$location', 'usuariosService', login])
}

function login($rootScope, $scope, $location, usuariosService){ //, usuariosService

      $rootScope.cz = {};
      $rootScope.cz.base64Decode = base64Decode;
      $rootScope.cz.tokenVerify = {
        tokenCheck: tokenCheck,
        isAuthorized: isAuthorized
      };
      $rootScope.cz.tokenVerify.tokenCheck()
        .then(function(res){
          $rootScope.usuario = {
            id: res.id,
            idCategoria: res.idCategoria,
            nombre: res.nombre
          };
          if($rootScope.usuario.idCategoria === 1){
            $location.url('/home');
          }else{
            $location.url('/clientes/home');
          }
        })
        .catch(function(res){
          $location.url('/');
        });

      var vm = this;
      vm.datosLogin = {};
      vm.login = function(){
        var spinner = $('.spinnerGral');
  			spinner.fadeIn(300);
  			usuariosService.login(vm.datosLogin, function(res){
          if(res.status >= 200 & res.status < 400){
            if(res.data.validation){
              localStorage.token = res.data.token;
    					var token = localStorage.token.split('.')[1];
    					var infoT = base64Decode(token);
              $rootScope.usuario = {};
    					$rootScope.usuario.id = infoT.id;
    					$rootScope.usuario.idCategoria = infoT.idCategoria;
              $rootScope.usuario.nombre = infoT.nombre;
              if($rootScope.usuario.idCategoria === 1){
                $location.url('/home');
              }else{
                $location.url('/clientes/home');
              }
            }else{
              $rootScope.tools.alerta('Usuario inexistente', res.data.message);
            }
          }else if(res.status >= 500){
            $rootScope.tools.alerta('Error del servidor', res.data.message);
          }else{
            $rootScope.tools.alerta('Error en base de datos', res.data.message);
          }
  				spinner.fadeOut(300);
  			});
      };

      function tokenCheck(){
        return new Promise(function(resolve, reject){
          var infoT;
          if(localStorage.token){
            var token = localStorage.token.split('.')[1];
            infoT = $rootScope.cz.base64Decode(token);
            if (!infoT.idCategoria | !infoT.id | !infoT.nombre){
              delete localStorage.token;
              reject(false);
            }else{
              resolve(infoT);
            }
          }else{
            reject(false);
          }
        });
      }

      function isAuthorized(usuario){
        return new Promise(function(resolve, reject){
          usuariosService.getOne(usuario.id, function(res){
            if(res.status >= 200 & res.status < 400){
              resolve({status: 200});
            }else if(res.status >= 500){
              reject({status: 500});
            }else{
              reject({status: 400});
            }
          });
        });
      }

    }

//export { login };

    function base64Decode(str) {
          var output = str.replace('-', '+').replace('_', '/');
          switch (output.length % 4) {
              case 0:
                  break;
              case 2:
                  output += '==';
                  break;
              case 3:
                  output += '=';
                  break;
              default:
                  throw 'Illegal base64url string!';
          }
          return JSON.parse(window.atob(output));
      }
