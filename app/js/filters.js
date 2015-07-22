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