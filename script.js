var worksheet;
var rows;
var categories;
var paginationAllowed = true;
var tableID = "tableID";
var nbPagination = 5;

var public_spreadsheet_key = 'https://docs.google.com/spreadsheets/u/1/d/13qwCqlQBfqEpu3MZuqjIBHxhSMFI5-L5aVop1nxmIgU/pubhtml';


function init() {
    worksheet = Tabletop.init( { key: public_spreadsheet_key, 
        callback: showInfo, 
        simpleSheet: true,
        debug: true } );
}

// uti
function capitaliseFirstLetter(string) {
    
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

// helper for filtersContainer
function inArray(uniqueTypes, datai) {
    
    var exist = false;

    for(var i = 0; i < uniqueTypes.length; i++) {
        //if(uniqueTypes[i].toLowerCase() === datai.toLowerCase()) {
        if(datai.toLowerCase().indexOf(uniqueTypes[i].toLowerCase()) > -1) {
            exist = true;
        }
    }

    return exist;
}

// helper for filtersContainer
function listFilters(movies, colName) { // where data (rows) is an array of strings
    /*for(var i = 0; i < movies.length; i++) {
        console.log(movies[i][colName]);
    }*/
    var uniqueTypes = new Array();
    var next = 0;

    if(movies.length >= 0) {
        for(var i = 0; i < movies.length; i++) {
            if(movies[i][colName] != "-" && movies[i][colName] != "") {
                //console.log(movies[i][colName]);
                if(!inArray(uniqueTypes, movies[i][colName])) {
                    uniqueTypes[next] = capitaliseFirstLetter(movies[i][colName]);
                    //console.log(uniqueTypes[next]);
                    next++;
                }
            }
        }
    }
    return uniqueTypes;
}

function filtersContainer(rows, tabletop) {

    var tableCategories = tabletop.sheets("Main Worksheet").column_names;
    //categories =  tabletop.sheets("Main Worksheet").column_names;
    var div = document.getElementById('filtersContainer');
    var html = "<table align=\"left\" class=\"table\"><tr>";
    var arrayFilters = new Array();
    categories = tabletop.sheets("Main Worksheet").column_names;

    // 6 is the first valid filter column
    for(i = 6; i < tableCategories.length; i++) {


        //console.log('categories: ', categories);
        arrayFilters = listFilters(rows, tableCategories[i]);
        arrayFilters = arrayFilters.sort();

        display = "block;"
        if(tableCategories[i] == 'youtubeid'){
            display = "none";
        }

        html += "<td style=\"display:" + display +  " \" valign=\"top\" width=\"25%\"><div class=\"scrollbar\" id=\"style-3\" style=\"overflow: auto; height: 200px;\"><b>" + capitaliseFirstLetter(tableCategories[i]) + "</b><form>";

        for(var j = 0; j < arrayFilters.length; j++) {
            html += "<input id=\"" + tableCategories[i] + arrayFilters[j] + "\" type=\"checkbox\" name=\"domain\" value=\"X\">"+ arrayFilters[j] + "<br>";
        }        

        html += "</form></div></td>";
    }

    //console.log('log: ', tabletop.sheets("Main Worksheet").all());
    html += "</tr></table>";
    div.innerHTML = div.innerHTML + html;

    document.getElementById('buttonRefresh').innerHTML = "<button type=\"button\" class=\"btn btn-default\" style=\"position: relative; float: right;\" onclick=\"refreshMovies()\">Refresh</button></br>";
}

function refreshMovies() {

    var arrayFilters;
    var tempRows = rows.slice();
    var indexsLeft = new Array();
    var videosPerPage = 6;
    //console.log(tempRows[0]['title']);

    /* 
        Applying filters choice
    */
    for(i = 6; i < categories.length; i++) {
        var selectedArrayFilters = new Array();

        arrayFilters = listFilters(rows, categories[i]);
        for(var j = 0; j < arrayFilters.length; j++) {
            //console.log(arrayFilters[j]);
            if(document.getElementById(categories[i]+arrayFilters[j]).checked) {
                selectedArrayFilters[selectedArrayFilters.length] = arrayFilters[j];
                //console.log(selectedArrayFilters[selectedArrayFilters.length-1]);
            }
        }        

        for(var k = 0; k < tempRows.length; k++) {
            if(tempRows[k]) {
                //console.log(tempRows[k][categories[i]]);
                if(selectedArrayFilters.length != 0) {
                    var found = false;        
                    for(var j = 0; j < selectedArrayFilters.length && !found; j++) {   

                        if(tempRows[k][categories[i]].toLowerCase() == selectedArrayFilters[j].toLowerCase()) {
                            found = true;
                            break;
                        }
                    }
                    if(!found) {
                        delete tempRows[k];
                        //console.log(tempRows[k]);
                    }
                }
            }
        }
    }

    // -----------------------------------------------------------------------------------

    /* 
        Filling the table with the data of selected scenes 
    */

    var html="<table class=\"table table-hover\" align=\"left\" style=\"margin:20px;\">";
    html += "<tr><th><b> Index</th></b>";
    for(var k = 0; k < categories.length; k++) {
        if(k != 0 && k != 4 && k != 5 && categories[k].toLowerCase() != "youtubeid") {
           html += "<th><b>"+capitaliseFirstLetter(categories[k].toLowerCase())+"</b></th>";
        }
    }
    html += "</tr>";

// html += "<td valign=\"top\" width=\"25%\"><div id=\"filters1\" style=\"overflow: auto; height: 200px;\"><b>" + capitaliseFirstLetter(tableCategories[i]) + "</b><form>";


    var count = 1;
    for(var j = 0; j < tempRows.length; j++) {
        if(tempRows[j]) {
            //console.log(tempRows[j]['title']);
            indexsLeft[indexsLeft.length] = j;
            html += "<tr><td>" + (count++) + "</td>";
            for(var k = 0; k < categories.length; k++) {
                if(k != 0 && k != 4 && k != 5 && categories[k].toLowerCase() != "youtubeid") {
                   html += "<td><div class=\"scrollbar\" id=\"style-3\" style=\"overflow: auto; height: 100px; width: auto;\">"+tempRows[j][categories[k]]+"</div></td>";
                }

            }
            html += "</tr>";
        }
    }
    html += "</table>";
    document.getElementById('tableContainer').innerHTML = html;

    // -----------------------------------------------------------------------------------

    /*
        Showing the selected scenes videos
    */


    // ------------------------------------------------------------------------------------

    var currData = []
    for(x in tempRows){
        currData.push(tempRows[x]);
    }

    loadVideos(currData);

    numberOfPages = indexsLeft.length / videosPerPage + 1;
    paginationAllowed = true;
    pagination(numberOfPages);

    $('#scenesContainer table').css("display", "none");
    $('#scenesContainer table:first-child').css("display", "block");
}

function loadVideos(currData){

    var rows = currData;
    var scenesHTML = document.getElementById('scenesContainer').innerHTML;

    for(var j = 0; j < rows.length/6; ++j) 
    {

        scenesHTML += "<table style=\"width:100%\">";

        for(var i = 0; i < 6; ++i)
        {
            //start table
            if(i % 3 == 0)
            {
                scenesHTML += "<tr>";
            }

            if(j*6 + i < rows.length) {
                
                var indexH = j*6 + i + 1;

             var youtubeID = rows[j*6 + i]['youtubeid'];

             scenesHTML += '<td> <div class="yt-video" id="div-' + youtubeID +'">' +
                '<img src="http://i.ytimg.com/vi/'+youtubeID+'/hqdefault.jpg" class="thumb">' +
                '<a href="#" data-yid="' + youtubeID + '"></a>' +
              '</div> </td>'
                
            }

            if(i % 3 == 2)
            {
                scenesHTML += "</tr>";
            }       

        }
        scenesHTML += "</table>";
    }

    document.getElementById('scenesContainer').innerHTML = scenesHTML;

    $('.yt-video a').click(function(){
                id = $(this).data('yid');
                $("#div-"+id).html('<iframe id="ytplayer" type="text/html" width="360" height="200" src="http://www.youtube.com/embed/'+id+'?autoplay=1" frameborder="0"/>');
                return false;
            })
    
}


function showInfo(data, tabletop) {
    rows = data;
    var videosPerPage = 6;
    var numberOfPages; // MAX NUMBER OF PAGES DISPLAYED
    
    var categories = tabletop.sheets("Main Worksheet").column_names;    

    numberOfPages = rows.length / videosPerPage + 1;
    pagination(numberOfPages);
    filtersContainer(rows, tabletop);

    refreshMovies();
}



function changePaginationContent(numberOfPages) {
    var div = document.getElementById('pagination');

    var html = "<ul class=\"pagination-content\"><li><a href=\"#\">Prev</a></li>";  

    for(i = 0; i < numberOfPages; i++) {
        html = html + "<li "+ "id=\""+"\"" + " ><a href=\"#\" style=\"color: gray\">" + i + "</a></li>";
    }

    html = html + "<li><a href=\"#\">Next</a></li>";
    div.innerHTML = html;
}

function pagination(numberOfPages) {

	changePaginationContent(numberOfPages);

    while(paginationAllowed) {
		
		YUI({filter:'raw'}).use(
		    'aui-pagination',
		    function(Y) {
		        var pages = Y.all('.content table'); // array[37]

		        new Y.Pagination({
		            contentBox: '#pagination .pagination-content',
		            circular: false,
		            page: 1,
                    total: numberOfPages,
                    maxPageLinks: 5,
		            after: {
            			changeRequest: function(event) {
		                    console.log(
		                        'page:', event.state.page,
		                        'getOffsetPageNumber:', this.getOffsetPageNumber());
	                	}
	            	},
                    strings: {
                      next: '»',
                      prev: '«'
                    },
		            on: {
		                changeRequest: function(event) {
		                    var instance = this,
		                        state = event.state,
		                        lastState = event.lastState;
		                          
		                    if(lastState) {
		                        pages.item(lastState.page - 1).setStyle('display','none');
		                    }
		                    pages.item(state.page - 1).setStyle('display', 'block');

                            $('ul.pagination-content li a').each(function(index, element){
                                var content = parseInt($(element).html());

                                if((content < state.page && numberOfPages - content >= nbPagination) || content >= state.page + nbPagination)
                                    $(element).parent().hide();
                                else
                                    $(element).parent().show();
                                });
		                }
		            }
		        }).render();
		    }
		);
		paginationAllowed = false;
	}
}