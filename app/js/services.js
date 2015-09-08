var gesturesServices = angular.module('gesturesServices', []);

gesturesServices.service('Gestures', [
	function($rootScope){
		return {
			all: function(callback){
				Tabletop.init({
		          key: '13qwCqlQBfqEpu3MZuqjIBHxhSMFI5-L5aVop1nxmIgU',
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