export default ngModule => {
  require('./routes').default(ngModule);
  require('./interceptor').default(ngModule);
}
