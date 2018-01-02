
export default ngModule => {
  require('./main').default(ngModule);
  require('./login').default(ngModule);
};
