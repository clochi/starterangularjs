
//  Controller usando function

export default (ngModule) => {
  ngModule.controller('main', ['$rootScope', '$scope', main]);
}
function main($rootScope, $scope){
  var vm = this;
  vm.nombre = "Mi nombre es Claudio";
  vm.changeName = function(){
    vm.nombre = 'Acabo de cambiar el nombre!!!'
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
