import '../../img/home-icono.svg';
export default (ngModule) => {
  ngModule
    .controller('login', ['$rootScope', '$scope', '$location', 'usuariosService', '$mdDialog', login])
}

function login($rootScope, $scope, $location, usuariosService, $mdDialog){ //, usuariosService

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
      vm.login = {};
      vm.logear = function(){
        var spinner = $('.spinnerGral');
  			spinner.fadeIn(300);

        usuariosService.login(vm.login)
          .then(function(res){
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
            spinner.fadeOut(300);
          }, function(res){
            if(res.status >= 500){
              $rootScope.tools.alerta('Error del servidor', res.data.message);
            }else{
              $rootScope.tools.alerta('Error en base de datos', res.data.message);
            }
            spinner.fadeOut(300);
          })

      };

      vm.passRecovery = function(ev){
			$mdDialog.show({
			      controller: function(){
			      	var sc = this;
			      	sc.datos = {};
			      	sc.btnGuardar = "ENVIAR";
			      	sc.enviar = function(){
			      		var enviar = document.getElementById('btnSegConsulta');
			      		sc.btnGuardar = "ENVIANDO...";
			      		usuariosService.passRecovery(sc.datos)
                  .then(function(res){
                    $rootScope.tools.alerta("Recuperación de Contraseña", res.data.message);
                  }, function(res){
                    $rootScope.tools.alerta("Recuperación de Contraseña", res.data.message);
                  })
			      	};
			      	sc.cancel = function(){
								var boton = document.getElementById('btnSegConsulta');
								boton.ngDisabled = 'false';
								$mdDialog.cancel();
					};
			      },
			      controllerAs: 'sc',
			      template: require('../../views/templates/olvide_password.html'),
			      parent: angular.element(document.body),
			      targetEvent: ev,
			      clickOutsideToClose:true,
			      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
			    });
		}

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
          usuariosService.getUser(usuario.id)
            .then(function(res){
              resolve({status: 200});
            }, function(res){
              res.status >= 500 ? reject({status: 500}) : reject({status: 400});
            })
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
