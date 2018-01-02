
//  Controller usando function

export default (ngModule) => {
  ngModule.controller('main', ['$rootScope', '$scope', '$mdSidenav', '$location', '$mdDialog', main]);
}
class main{
  constructor($rootScope, $scope, $mdSidenav, $location, $mdDialog){
    this.nombre = "Click aquí para cambiar estado";

      //FUNCIONES GENERALES DE LA APP
    this.app = {
      abrirMenuUser: function($mdOpenMenu, ev){
    			$mdOpenMenu(ev);
    		},
        abrirMenu: function(){
          $mdSidenav('left').toggle();
        },
        isLoginScreen: function(){
    			return !($location.path() === '/');
    		},
        navActive: function(a){
    			return ($location.path() === a);
    		},
        logout: function(){
    			delete localStorage.token;
    			$location.url('/');
    		},
        passChange: function(ev) {
			    $mdDialog.show({
			      controller: passChange,
			      controllerAs: 'pc',
			      templateUrl: 'views/templates/passchange.html',
			      parent: angular.element(document.body),
			      targetEvent: ev,
			      clickOutsideToClose:true,
			      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
			    });
			  },
        redirection: function(){
          window.open('http://www.redmontego.com.ar/RedMontegoManual.pdf', '_blank');
        }
    }

    $rootScope.tools = {
        alerta: function (titulo, msg, callbk){
  				$mdDialog.show(
  			      $mdDialog.alert()
  			        .parent(angular.element(document.querySelector('body')))
  			        .clickOutsideToClose(true)
  			        .title(titulo)
  			        .textContent(msg)
  			        .ariaLabel(titulo)
  			        .ok('Aceptar')
  			  	);
  			  	if(typeof callbk === 'function'){
  			  		callbk();
  			  	}
  			},
        checkResponse: function(res, data, callbk){
          //{res: es el objeto response de angular}
          //data = {btnText: [texto de botones], title: titulo del form}
          //{callbk: es la función que devuelve el objeto result de lo que se debe hacer}
          var result = {};
          result.res = {};
          try{
            if(res.status >= 200 & res.status < 400){
              result.btn = data.btnText[0];
            }else if(res.status >= 400 & res.status < 500){
              if(!res.data.message){
                res.data.message = 'Hubo problemas para agregar el reevendedor';
              }
              result.btn = data.btnText[1];
            }else{
              result.btn = data.btnText[2];
              if(!res.data.message){
                result.res.message = 'Hubo problemas con el servidor';
              }
            }
            result.title = data.title;
            result.message = res.data.message;
            return callbk(result);
          }
          catch(err){
            result.title = 'Error';
            result.message = err.message;
            return callbk(result);
          }
        },
        spinner: function(){
          return{
            on: function(){
              var spinner = $('.spinnerGral');
        			spinner.fadeIn(300);
            },
            off: function(){
              var spinner = $('.spinnerGral');
        			spinner.fadeOut(300);
            }
          };
        }
      };

      //FIN FUNCIONES GENERALES DE LA APP
      var vm = this;
      $rootScope.$on('updateSidenav', function(e, menu){
        vm.listaMenu = menu;
      });

    function passChange($rootScope, $mdDialog, usuariosService){
      		var ctrl = this;
      		ctrl.password = {};
      		ctrl.btnPassChange = 'ENVIAR';
      		ctrl.enviar = function(){
      			var boton = document.getElementById('btnPassChange');
      			ctrl.btnPassChange = "ENVIANDO...";
      			usuariosService.passChange($rootScope.usuario.id, ctrl.password, function(res){
              if(res.status >= 200 & res.status < 400){
                ctrl.btnPassChange = "ENVIADO";
      					boton.ngDisabled = 'true';
      					boton.classList.remove('md-warn');
      					$rootScope.tools.alerta(res.data.title, res.data.message);
              }else if(res.status >= 400 & res.status < 500){
                ctrl.btnPassChange = "REENVIAR";
      					boton.classList.add('md-warn');
      					$rootScope.tools.alerta(res.data.title,'No se pudo actualizar.', vm.app.passChange);
              }else{
                ctrl.btnPassChange = "REENVIAR";
      					boton.classList.add('md-warn');
      					$rootScope.tools.alerta(res.data.title, 'Error en el servidor.', vm.app.passChange);
              }
      				/*if(res.data.validation){
      					ctrl.btnPassChange = "ENVIADO";
      					boton.ngDisabled = 'true';
      					boton.classList.remove('md-warn');
      					$rootScope.tools.alerta(res.data.title, res.data.message);
      				}else{
      					ctrl.btnPassChange = "REENVIAR";
      					boton.classList.add('md-warn');
      					$rootScope.tools.alerta(res.data.title, res.data.message, vm.app.passChange);
      				}*/
      			});
      		};

      		ctrl.cancel = function(){
      			var boton = document.getElementById('btnPassChange');
      			boton.ngDisabled = 'false';
      			boton.classList.remove('md-warn');
      			$mdDialog.cancel();
      		};
      	}
  }
  //  Fin Constructor

  changeName(){
    this.nombre = "Como puedes ver, el estado cambió ;)"
  }

}

//export {main};

//-----------------------------

/* Controller usando class
export default class main{
constructor($rootScope, $scope){
this.nombre = "Click aquí para cambiar estado";
}
changeName(){
this.nombre = "Como puedes ver, el estado cambió ;)"
}

}*/
