export default ngModule => {
  ngModule
    .directive('imprimir', ['$compile', '$filter', 'Excel', imprimir]);
}

  function imprimir($compile, $filter, Excel){
    //  dataset.list en el html figura data-list="nombreDeLista"
    var tbody;
    var css = document.getElementsByTagName('link')[0].href;
    return{
      restrict: 'A',
      link: function(scope, elem, attr){

        function separar(field, spl){
          //  Separa un string tipo nombreHomenajeado en Nombre Homenajeado
          //  @field = string, @spl = bol, export(attr) = sirve para indicar que es para exportar a excel y no imprimir
          //  si spl = true, devuelve un array ['nombre', 'homenajeado']
          var reg = new RegExp("[a-z][A-Z]");
          var res = field.match(reg);
          if(res != null){
            var index = res.index;
            var arr = [];
            if(!spl){
              return field.slice(0, index + 1).replace(field[0], field[0].toUpperCase()) + " " + field.slice(index + 1);
            }else{
              arr.push(field.slice(0, index + 1));
              arr.push(field.slice(index + 1).replace(field.slice(index + 1)[0], field.slice(index + 1)[0].toLowerCase()));
              return arr;
            }
          }
          return field.replace(field[0], field[0].toUpperCase());
        }

        elem[0].addEventListener('click', function print(event){
          var data = JSON.parse(attr.list);
          var fields = JSON.parse(attr.fields);
          var cabecera = '';
          var filas = '';

          for(var prop in fields){
            cabecera += '<th md-column>' + separar(prop) + '</th>';
          }

          for(var i = 0; i < data.length; i++){
            filas += '<tr md-row md-select class="eventos-invitados-row">';
            for(var prop in fields){
              if(Array.isArray(fields[prop])){
                filas += '<td md-cell>' + data[i][fields[prop][0]] + " " + data[i][fields[prop][1]] + '</td>'
              }else{
                switch (fields[prop]){
                  case 'fecha_reserva':
                  case 'fechaNacimiento':
                    filas += '<td md-cell>' + $filter('date')(data[i][fields[prop]], 'shortDate') + '</td>'
                    break;
                  case 'precio':
                    filas += '<td md-cell>' + $filter('currency')(data[i][fields[prop]]) + '</td>'
                    break;
                  case 'monto':
                    filas += '<td md-cell>' + $filter('currency')(data[i][fields[prop]]) + '</td>'
                    break;
                  case 'senia':
                    filas += '<td md-cell>' + $filter('currency')(data[i][fields[prop]]) + '</td>'
                    break;
                  default:
                    filas += '<td md-cell>' + data[i][fields[prop]] + '</td>'
                }

              }
            }
            filas += '</tr>';
          }
          var content = '<md-toolbar class="md-table-toolbar md-default">'+
            '<div class="md-toolbar-tools">'+
              '<span>'+attr.imprimir+'<span class="mf-badge">'+data.length+'</span></span>'+
            '</div>'+
          '</md-toolbar>'+
          '<md-table-container>'+
            '<table md-table md-row-select multiple>'+
              '<thead md-head md-order="orden">'+
                '<tr md-row>'+
                  cabecera +//<th md-column md-order-by="nombre">Homenajeado</th> //este sería la cabecera
                '</tr>'+
              '</thead>'+
              '<tbody md-body>'+
                //'<tr md-row md-select class="eventos-invitados-row">'+
                  filas+//<td md-cell>{{item.nombreHomenajeado}} {{item.apellidoHomenajeado}}</td> //este seria las filas
                //'</tr>'+
              '</tbody>'+
            '</table>'+
          '</md-table-container>';

          var contentCompiled = $compile(content)(scope);

          if(attr.export != undefined){
            var div = document.createElement('div');
            div.id = 'exportExcel';
            div.appendChild(contentCompiled[0]);
            div.appendChild(contentCompiled[1]);
            var contenedor = document.createElement('div');
            contenedor.appendChild(div);
            var popupWin = window.open('', '_blank', 'width=600,height=600');

            popupWin.document.open();
            popupWin.document.write('<html><head><link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"><link rel="stylesheet" type="text/css" href="'+ css +'"></head><body>' + contenedor.innerHTML + '</body></html>');
            popupWin.document.close();
            //var exportHref=Excel.tableToExcel('exportExcel','WireWorkbenchDataExport', popupWin.document);
            var exportHref=Excel.tableToExcel('exportExcel', attr.export, popupWin.document);
            location.href=exportHref;
            popupWin.close();
          }else{
            var popupWin = window.open('', '_blank', 'width=600,height=600');
            popupWin.document.open();
            popupWin.document.write('<html><head><link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"><link rel="stylesheet" type="text/css" href="'+ css +'"></head><body onload="window.print()">' + contentCompiled[0].innerHTML + contentCompiled[1].innerHTML + '</body></html>');
            popupWin.document.close();
          }

        })

      }
    }
  }
