
//  Controller usando class
class main{
  constructor($rootScope, $scope){
    this.nombre = "Click aquí para cambiar estado";
  }
  changeName(){
    this.nombre = "Como puedes ver, el estado cambió ;)"
  }

}

//-----------------------------

//  Controller usando function

/*function main($rootScope, $scope){
  var vm = this;
  vm.nombre = "Mi nombre es Claudio";
}*/

export {main};
