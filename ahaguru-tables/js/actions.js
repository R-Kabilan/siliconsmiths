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

// use this to get the parametesr from the link
var Ps = getParams(window.location.href);


if(Ps.type == "showdata") {
    generateShowTable(Ps.tablename)
} else if(Ps.type == "editdata") {
    generateEditTable(Ps.tablename)
} else if(Ps.type == "deleterow") {
    generateForDeleteRow(Ps.tablename)
} else if(Ps.type == "deletecolumn") {
    generateForDeleteColumn(Ps.tablename)
} else if(Ps.type == "addcolumn") {
    generateForAddColumn(Ps.tablename)
} else if(Ps.type == "deletecolumn") {
    generateForDeleteColumn(Ps.tablename)
}

function generateShowTable(tablename) {
    var divid= "div1"
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
    var divid= "div1"
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

function generateForDeleteRow(tablename) {
    var primarykey = "id"
    var divid= "div1"
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

function generateForDeleteColumn(tablename) {
    // var primarykey = "id"
    var divid= "div1"
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
            tableheader += '<td><input type="checkbox" id="'+i+'"></input></td>'
        }
        tableheader += '</tr>'

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


