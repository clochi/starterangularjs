export default ngModule => {
	ngModule
	.factory('interceptor', function($rootScope, $q, $location){
		return {
			request: function(config){
				config.headers = config.headers || {};
				if (localStorage.token){
					config.headers.Authorization = 'Bearer ' + localStorage.token;
				}
				return config;
			},
			response: function(res){
				if (res.status === 401){
					$location.url('/');
				}
				return res || $q.when(res);
			}
		};
	});
}
