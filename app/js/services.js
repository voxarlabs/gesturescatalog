var gesturesServices = angular.module('gesturesServices', []);

gesturesServices.service('Gestures', [
	function($rootScope){
		return {
			all: function(callback){
				Tabletop.init({
		          key: '1yI2LJC3sp5XNQz1Pmnt-stC73R1-AT0erWJ6iSeQZ7c',
		          simpleSheet: true,
		          debug: true,
		          prettyColumnNames: false,
		          callback: function(data, tabletop) {
		          	console.log("[GesturesService] " + data.length + " gestures loaded.");
			        callback(data, tabletop);
		          }
		        });
			}
		}
	}
]);