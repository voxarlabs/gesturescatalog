function getUniqueOptions(data, column){
	var seen = {};
	var options = []
	for(x in data){
		if(!seen.hasOwnProperty(data[x][column])){
			options.push(data[x][column]);
			seen[data[x][column]] = true;
		}
	}
	return options;
}

function parseFilters(data){
	var filterRow = data[0];
	data = data.slice(1);
	var filters = {};
	for(col in filterRow){
		if(filterRow[col] && filterRow[col].length > 0)
			var filter = parseFilter(col, filterRow[col], data);
			if(filter.filterable) filters[col] = filter;
	}
	return filters;
}

function parseFilter(name, str, data){
	var split = str.split(';');
	var filter = {field:name, name: name, placeholder:name, type: 'text', filterable: false, input: 'text-field'};

	for(i in split){
		
		var s = split[i];

		if(s.indexOf("Type") > -1){
			filter['type'] = s.substring(s.indexOf("(")+1, s.lastIndexOf(")")).toLowerCase();
		}

		if(s.indexOf("Filterable") > -1){
			filter['filterable'] = true;
			filter['input'] = s.substring(s.indexOf("(")+1, s.lastIndexOf(")"));
			if(filter['input'] == 'select'){
				filter['options'] = getUniqueOptions(data, name);
			}
		}

		if(s.indexOf("Name") > -1){
			filter['name'] = s.substring(s.indexOf("(")+1, s.lastIndexOf(")"));
		}

		if(s.indexOf("Placeholder") > -1){
			filter['placeholder'] = s.substring(s.indexOf("(")+1, s.lastIndexOf(")"));
		}

	}
	return filter;
}