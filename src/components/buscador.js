export default ngModel => {
	ngModel
	.component('mfSearch', {
		template: require('./buscador.html'),
		controller: buscar,
		bindings: {
			data: '=',
			fields: '='
		}
	})
	.filter('beautify', beautify);
}

		function beautify(){

			return function(str){
				var nombre = str.match(/^[a-z]*/)[0];
				nombre = nombre.replace(nombre[0], nombre[0].toUpperCase());
				return nombre;
			}
		}
    function buscar(){
      var vm = this;
			vm.filtros = vm.fields;
			vm.categorias = [];
			var reg = new RegExp(/nombre[C,H]\w+|nombre$/, "g");
			var regApe = new RegExp(/apellido[C,H]\w+|apellido$/, "g");
			vm.search = function(e){
				vm.categorias = [];
				if(!Array.isArray(vm.data)) return false;
				if(vm._data == undefined) vm._data = Object.assign([] ,vm.data);

				if(e.currentTarget.value.length > 2){
					vm.data = vm._data.filter(function(item){
						for(var key = 0; key < vm.filtros.length; key++){
							if(vm.filtros[key].search(reg) == -1){
								if(parser(item[vm.filtros[key]]).search(parser(e.currentTarget.value)) != -1){
									if(vm.categorias.indexOf(vm.filtros[key]) == -1) vm.categorias.push(vm.filtros[key]);
									return true;
								}
							}else{
								if(parser(item[vm.filtros.find(function(item){return item.match(reg)})]
								 	+ ' ' +
									item[vm.filtros.find(function(item){return item.match(regApe)})])
									.search(parser(e.currentTarget.value)) != -1){
									if(vm.categorias.indexOf(vm.filtros[key]) == -1) vm.categorias.push(vm.filtros[key]);
									return true;
								}
							}

						}
						return false;
					})
				}else{
					vm.data = Object.assign([], vm._data);
				}

			}
    }

		function parser(word){
			if(word == null) return "js20a3k4jsjas2asdwf";
			var fecha;
			var fechaReturn = '';
			if(typeof word != 'number'){
				if(word.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/) != null){
					fecha = word.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/);
					return fecha[0].split('-').reverse().join('-');
				}
			}
			var src = ['á', 'é', 'í', 'ó', 'ú'];
      var dest = ['a', 'e', 'i', 'o', 'u'];
			if(typeof word != 'number'){
				for(var i = 0; i < src.length; i++){
					word = word.toLowerCase().replace(src[i], dest[i])
					word = word.replace('/', '-');
				}
			}
			return word.toString();
		}
