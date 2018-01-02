export default ngModule => {
  ngModule
    .factory('HOST', HOST);

  function HOST(){
    let url = 'http://www.fibraconsultores.com:8010/api/';
    let HOST = {
      url: function(){
        return url;
      }
    };
    return HOST;
  }
}
