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

function parseSchemas(schemasRow, data){
	var schemas = {};
	for(var col in schemasRow){
		if(col != 'rowNumber')
			schemas[col] = parseSchema(col, schemasRow[col], data);;
	}
	return schemas;
}

function parseSchema(name, str, data){

	var schema = {
		field:name, 
		name: name,  
		type: 'text',
		visibility: true,
		shown: true,
		filterable: false, 
		sortable: false,
		title: false,
		video: false,
		filter: {
			placeholder: name,
			input: 'text-field',
			options: []
		} 
	};

	if(!str || str.length == 0) return schema;

	var split = str.split(';');
	
	for(var i in split){
		
		var s = split[i];

		if(s.indexOf("Type") > -1){
			schema['type'] = s.substring(s.indexOf("(")+1, s.lastIndexOf(")")).toLowerCase();
			continue;
		}

		if(s.indexOf("Name") > -1){
			schema['name'] = s.substring(s.indexOf("(")+1, s.lastIndexOf(")"));
			continue;
		}

		if(s.indexOf("Placeholder") > -1){
			schema['filter']['placeholder'] = s.substring(s.indexOf("(")+1, s.lastIndexOf(")"));
			continue;
		}

		if(s.indexOf("Filterable") > -1){
			schema['filterable'] = true;
			schema['filter']['input'] = s.substring(s.indexOf("(")+1, s.lastIndexOf(")"));
			if(schema['filter']['input'] == 'select' || schema['filter']['input'] == 'checkbox' || schema['filter']['input'] == 'tag'){
				schema['filter']['options'] = getUniqueOptions(data, name);
			}
			continue;
		}

		if(s.indexOf("Video") > -1){
			schema['video'] = true;
			continue;
		}

		if(s.indexOf("Title") > -1){
			schema['title'] = true;
			continue;
		}

		if(s.indexOf("Hidden") > -1){
			schema['visibility'] = false;
			schema['shown'] = false;
			continue;
		}

		if(s.indexOf("Sortable") > -1){
			schema['sortable'] = true;
			continue;
		}

	}
	return schema;
}