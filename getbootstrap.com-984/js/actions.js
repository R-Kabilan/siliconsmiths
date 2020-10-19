var getParams = function (url) {
	var params = {};
	var parser = document.createElement('a');
	parser.href = url;
	var query = parser.search.substring(1);
	var vars = query.split('&');
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=');
		params[pair[0]] = decodeURIComponent(pair[1]);
	}
	return params;
};

var deletejsonobject;


// $(document).ready(function () {
// });

// use this to get the parametesr from the link
var Ps = getParams(window.location.href);

var deletedropdownurl = 'https://x7qb7jzwqj.execute-api.ap-south-1.amazonaws.com/Prod/table/dropdown/'

if(Ps.type == "showdata") {
    document.getElementById("heading").innerHTML = "Show Data: " + Ps.tablename;
    generateShowTable(Ps.tablename)
} else if(Ps.type == "editdata") {
    document.getElementById("heading").innerHTML = "Edit Data: " + Ps.tablename;
    generateEditTable(Ps.tablename)
} else if(Ps.type == "deleterow") {
    var value = "rows"
    document.getElementById("heading").innerHTML = "Delete Row: " + Ps.tablename;
    generateDropdownForDelete(deletedropdownurl, value, Ps.tablename)
} else if(Ps.type == "deletecolumn") {
    var value = "columns"
    document.getElementById("heading").innerHTML = "Delete Column: " + Ps.tablename;
    generateDropdownForDelete(deletedropdownurl, value, Ps.tablename)
} else if(Ps.type == "addrow") {
    document.getElementById("heading").innerHTML = "Add Row: " + Ps.tablename;
    generateForAddRow(Ps.tablename)
} else if(Ps.type == "addcolumn") {
    document.getElementById("heading").innerHTML = "Add Column: " + Ps.tablename;
    generateForAddColumn(Ps.tablename)
}

function generateShowTable(tablename) {
    var divid= "div2"
    $('#'+divid).empty();
    url = 'https://x7qb7jzwqj.execute-api.ap-south-1.amazonaws.com/Prod/table/' + tablename
    var fulltable = '<table class="table table-bordered table-hover" style="width:100%" id="'+divid+'Table"><thead class="thead-dark" id="'+divid+'TableHeader"></thead><tbody id="'+divid+'TableBody"></tbody><tfoot id="'+divid+'TableFooter"></tfoot></table>'
    $('#'+divid).append(fulltable);
    $.ajax({
        url : url,
        type : 'GET',
        async: false,
        headers: { Authorization: 'Bearer bb' },
        contentType : 'application/json; charset=utf-8',
        success : function(msg) {
        
        var tableheader='<tr>'
        var tablebody = ''

        for (i in msg[0]) {
            tableheader += '<th>'+i+'</th>'
        }
        tableheader += '</tr>'
        // $("#templateTable").DataTable().destroy();
		$('#'+divid+'TableBody').empty();
        $('#'+divid+'TableHeader').append(tableheader);
        for(var i=0; i<msg.length; i++) {
            tablebody += '<tr>'
            for (j in msg[i]) {
                tablebody += '<td>'+msg[i][j]+'</td>'
            }
            tablebody += '</tr>'
        }
        $('#'+divid+'TableBody').append(tablebody);
        $('#'+divid+'Table').DataTable({
            dom: 'lfrtip',
            "paging": true,
            "pageLength": 10,
            buttons: [
                   {
                       extend: 'excelHtml5',
                       title: 'Data export'
                   },
                   {
                       extend: 'pdfHtml5',
                       title: 'Data export'
                   }, 
                   {
                       extend: 'csvHtml5',
                       title: 'Data export'
                   },
        ],
        "order": [[0, "asc"]],
        });
    }
    });
}


function generateEditTable(tablename) {    
    var primarykey = "id"
    var divid= "div2"
    $('#'+divid).empty();
    url = 'https://x7qb7jzwqj.execute-api.ap-south-1.amazonaws.com/Prod/table/' + tablename
    var fulltable = '<table class="table table-bordered table-hover" style="width:100%" id="'+divid+'Table"><thead class="thead-dark" id="'+divid+'TableHeader"></thead><tbody id="'+divid+'TableBody"></tbody><tfoot id="'+divid+'TableFooter"></tfoot></table>'
    $('#'+divid).append(fulltable);
    $.ajax({
        url : url,
        type : 'GET',
        async: false,
        headers: { Authorization: 'Bearer bb' },
        contentType : 'application/json; charset=utf-8',
        success : function(msg) {    
        var tableheader='<tr><th>'+"Select"+'</th>'
        var tablebody = ''

        for (i in msg[0]) {
            tableheader += '<th>'+i+'</th>'
        }
        tableheader += '</tr>'
        // $("#templateTable").DataTable().destroy();
		$('#'+divid+'TableBody').empty();
        $('#'+divid+'TableHeader').append(tableheader);
        for(var i=0; i<msg.length; i++) {
            tablebody += '<tr><td>'+'<input type="checkbox"  id="'+msg[i][primarykey]+'"></input>'+'</td>'
            for (j in msg[i]) {
                if(j == "id") {
                    tablebody += '<td id="'+ j + msg[i]["id"] +'">'+msg[i][j]+'</td>'
                } else {
                    tablebody += '<td id="'+ j + msg[i]["id"] +'" contenteditable='+true+'>'+msg[i][j]+'</td>'
                }
            }
            tablebody += '</tr>'
        }
        $('#'+divid+'TableBody').append(tablebody);
        $('#'+divid+'Table').DataTable({
            dom: 'lfrtip',
            "paging": true,
            "pageLength": 10,
            buttons: [
                   {
                       extend: 'excelHtml5',
                       title: 'Data export'
                   },
                   {
                       extend: 'pdfHtml5',
                       title: 'Data export'
                   }, 
                   {
                       extend: 'csvHtml5',
                       title: 'Data export'
                   },
        ],
        "order": [[0, "asc"]],
        });
    }
    });
}

function generateDropdownForDelete(url, value, tablename) {
    var primarykey = "id"
    var divid= "div1"
    $('#'+divid).empty();
    var selectdiv = '<div id="selectdiv"><label for="formIds">Select Row: </label><select  multiple="multiple" class="multiselect-dropdown form-control" name="selectrow" id="formIds"></select></div></br>'
    $('#'+divid).append(selectdiv);
    $.ajax({
        url : url + value + '/' + tablename,
        type : 'GET',
        async: false,
        headers: { Authorization: 'Bearer bb' },
        contentType : 'application/json; charset=utf-8',
        success : function(msg) {
            for(var i = 0; i < msg.length; i++) {
				var option = document.createElement("option");
				option.text = msg[i];
				option.value = msg[i];
				var select = document.getElementById("formIds");
				select.appendChild(option);
            }
            var url2 = 'https://x7qb7jzwqj.execute-api.ap-south-1.amazonaws.com/Prod/table/load/'
            var submitbutton ='<center><button class="btn btn-sm btn-outline-secondary" id="showdatabutton" onclick="generateDeleteTableData(\''+url2+'\', \''+value+'\', \''+tablename+'\')">Show data for selected '+value+'</button></center></br>'
            $('#'+divid).append(submitbutton);
    }
    });
}

function generateDeleteTableData(url, value, tablename) {
    var divid= "div2"
    $('#'+divid).empty();
    var data = (selectedValues = $('#formIds').val());
    $.ajax({
        url : url + value +'/' + tablename,
        type : 'POST',
        async: false,
        dataType: 'json',
        data: JSON.stringify(data),
        headers: { Authorization: 'Bearer bb' },
        contentType : 'application/json; charset=utf-8',
        success : function(msg) {
            deletejsonobject= msg    
            generateTableFromJson(divid, msg, value, tablename);
        }
    });
}

function generateTableFromJson(divid, msg, value, tablename) {
    var primarykey = "id"
    var fulltable = '<table class="table table-bordered table-hover" style="width:100%" id="'+divid+'Table"><thead class="thead-dark" id="'+divid+'TableHeader"></thead><tbody id="'+divid+'TableBody"></tbody><tfoot id="'+divid+'TableFooter"></tfoot></table>'
    $('#'+divid).append(fulltable);
    var tableheader='<tr>'
    var tablebody = ''

    for (i in msg[0]) {
        tableheader += '<th>'+i+'</th>'
    }
    tableheader += '</tr>'
    // $("#templateTable").DataTable().destroy();
    $('#'+divid+'TableBody').empty();
    $('#'+divid+'TableHeader').append(tableheader);
    for(var i=0; i<msg.length; i++) {
        tablebody += '<tr>'
        for (j in msg[i]) {
            tablebody += '<td>'+msg[i][j]+'</td>'
        }
        tablebody += '</tr>'
    }
    $('#'+divid+'TableBody').append(tablebody);
    $('#'+divid+'Table').DataTable({
        dom: 'lfrtip',
        "paging": true,
        "pageLength": 10,
        buttons: [
               {
                   extend: 'excelHtml5',
                   title: 'Data export'
               },
               {
                   extend: 'pdfHtml5',
                   title: 'Data export'
               }, 
               {
                   extend: 'csvHtml5',
                   title: 'Data export'
               },
    ],
    "order": [[0, "asc"]],
    });
    var functionstring = 'deleteRowsOrColumns(\''+ value +'\',\''+ tablename +'\',\''+ divid +'\')'
    var submitbutton ='<center><button class="btn btn-sm btn-outline-secondary" id="deleterowsorcolumnsbutton" onclick="'+functionstring+'">Delete</button></center></br>'
    $('#'+divid).append(submitbutton);
}

function deleteRowsOrColumns(value, tablename, divid) {
    var url = 'https://x7qb7jzwqj.execute-api.ap-south-1.amazonaws.com/Prod/' + value + '/' + tablename
    $.ajax({
        url : url,
        type : 'DELETE',
        async: false,
        dataType: 'json',
        data: JSON.stringify(deletejsonobject),
        headers: { Authorization: 'Bearer bb' },
        contentType : 'application/json; charset=utf-8',
        success : function(msg) {
            $('#'+divid).empty();
            generateDropdownForDelete(deletedropdownurl, value, tablename);
        }
    });
}


