function getUniqueOptions(data, column){
	var seen = {};
	var options = []
	for(var x in data){
		if(!seen.hasOwnProperty(data[x][column])){
			options.push(data[x][column]);
			seen[data[x][column]] = true;
		}
	}
	return options;
}

function toList(dict){
	var list  = [];
	for (var i in dict){
		list.push(dict[i]);
	}
	return list;
}

function parseFilters(filterRow, data){
	var filters = {};
	for(var col in filterRow){
		if(filterRow[col] && filterRow[col].length > 0){
			var filter = parseFilter(col, filterRow[col], data);
			filters[col] = filter;
		}
	}
	return filters;
}

function parseFilter(name, str, data){
	var split = str.split(';');
	var filter = {
		field:name, 
		name: name, 
		placeholder:name, 
		type: 'text', 
		filterable: false, 
		input: 'text-field',
		visibility: true
	};

	for(var i in split){
		
		var s = split[i];

		if(s.indexOf("Type") > -1){
			filter['type'] = s.substring(s.indexOf("(")+1, s.lastIndexOf(")")).toLowerCase();
		}

		if(s.indexOf("Filterable") > -1){
			filter['filterable'] = true;
			filter['input'] = s.substring(s.indexOf("(")+1, s.lastIndexOf(")"));
			if(filter['input'] == 'select' || filter['input'] == 'checkbox'){
				filter['options'] = getUniqueOptions(data, name);
			}
		}

		if(s.indexOf("Name") > -1){
			filter['name'] = s.substring(s.indexOf("(")+1, s.lastIndexOf(")"));
		}

		if(s.indexOf("Placeholder") > -1){
			filter['placeholder'] = s.substring(s.indexOf("(")+1, s.lastIndexOf(")"));
		}

		if(s.indexOf("Hidden") > -1){
			filter['visibility'] = false;
		}

	}
	return filter;
}