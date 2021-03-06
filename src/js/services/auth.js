export default ngModel => {
  ngModel
    .factory('AUTH', ['$rootScope', 'usuariosService', '$location', auth]);
}

function auth($rootScope, usuariosService, $location){

  if(!$rootScope.cz){
      $rootScope.cz = {};
      $rootScope.cz.base64Decode = base64Decode;
      $rootScope.cz.tokenVerify = {
        tokenCheck: tokenCheck,
        isAuthorized: isAuthorized
      };
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

    return{
      check: function(){
        var spinner = $('.spinnerGral');
  			//spinner.fadeIn(300);
        return $rootScope.cz.tokenVerify.tokenCheck()
          .then(function(res){
            if(!$rootScope.usuario){
              $rootScope.usuario = {
                id: res.id,
      					idCategoria: res.idCategoria,
                nombre: res.nombre
              };
            }
            var listaMenu = [];
            switch (res.idCategoria){
              case 1:
                listaMenu = [
                  {
                    seccion: 'Inicio',
                    icono: 'home',
                    link: '/home',
                    childs: [],
                    id: ''
                  },
                  {
                    seccion: 'Configuración',
                    icono: 'settings',
                    link: $location.path().slice(1) + '#',
                    childs: [
                      {
                        seccion: 'Opción 1',
                        icono: 'assignment_ind',
                        link: '/ruta'
                      },
                      {
                        seccion: 'Opción 2',
                        icono: 'domain',
                        link: '/opcion2'
                      }
                    ],
                    id: 'keyboard_arrow_down'
                  },
                  {
                    seccion: 'Item',
                    icono: 'people',
                    link: '/items'
                  },
                  {
                    seccion: 'Item 2',
                    icono: 'add_shopping_cart',
                    link: '/items2'
                  },
                  {
                    seccion: 'Item 3',
                    icono: 'motorcycle',
                    link: '/item3'
                  },
                  /*{
                    seccion: 'Emitir Pago',
                    icono: 'attach_money',
                    link: '/pagos'
                  },*/
                  {
                    link: '/pedidos/imprimir'
                  }/*,
                  {
                    seccion: 'Estadistica',
                    icono: 'insert_chart',
                    link: '/estadistica'
                  }*/
                ]
                break;

              case 2:
                listaMenu = [
                    {
                      seccion: 'Inicio',
                      icono: 'home',
                      link: '/clientes/home'
                    },
                    {
                      seccion: 'Pedidos',
                      icono: 'restaurant_menu',
                      link: '/clientes/pedidos'
                    },
                    {
                      seccion: 'Productos',
                      icono: 'add_shopping_cart',
                      link: '/clientes/productos'
                    }
                  ]
                break;
            }

            if(!$rootScope.init){
                $rootScope.$emit('updateSidenav', listaMenu);
                $rootScope.init = true;
              }

            //spinner.fadeOut(300);
            var isRouteRight = listaMenu.find(function(item){
              if($location.path() == item.link){
                return true;
              }else{
              return item.childs.find(function(child){
                  return $location.path() == child.link;
                })
              }
            });
            if(isRouteRight == undefined){
              url.path(listaMenu[0].link);
              return;
            }
            $rootScope.cz.tokenVerify.isAuthorized($rootScope.usuario)
              .then(function(res){
                return;
              })
              .catch(function(res){
                if(res.status === 500){
                    $rootScope.tools.alerta('Problemas con el servidor', 'Hay un problema interno con el servidor.');
                }else{
                  $rootScope.tools.alerta('Token invalido', 'Tu token expiró o hay algún problema con el mismo.');
                  delete localStorage.token;
                  $location.url('/');
                }
              });
          })
          .catch(function(res){
            spinner.fadeOut(300);
            $location.url('/');
          });
      }
    };

}
