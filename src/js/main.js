
//  Controller usando class
class main{
  constructor($rootScope, $scope){
    this.nombre = "Mi nombre es Claudio";
    debugger
  }
  changeName(){
    this.nombre = "Cambióooooo!!!!!"
  }

}

//-----------------------------

//  Controller usando function

/*function main($rootScope, $scope){
  var vm = this;
  vm.nombre = "Mi nombre es Claudio";
}*/

export {main};
