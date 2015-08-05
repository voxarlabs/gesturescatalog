gesturesApp.filter('inArray', function($filter){

    return function(list, available, field){
        if(available){
            return $filter("filter")(list, function(item){
                return available.indexOf(item[field]) != -1;
            })
        }else{
            return list;
        }
    }

});

gesturesApp.filter('inArrayTag', function($filter){

    return function(list, available, field){
        if(available){
            return $filter("filter")(list, function(item){
            	for(var i in available){
            		if(item[field].indexOf(available[i]) != -1) return true;
            	}
                return false;
            })
        }else{
            return list;
        }
    }

});