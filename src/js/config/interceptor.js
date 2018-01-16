export default ngModule => {
  ngModule
  .config(function($httpProvider){
    $httpProvider.interceptors.push('interceptor');
  });
}
