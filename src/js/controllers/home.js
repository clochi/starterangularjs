export default ngModule => {
  ngModule
    .controller('home', ['$rootScope', '$scope', 'usuariosService', home])
}

function home($rootScope, $scope, usuariosService){
  var vm = this;
}
