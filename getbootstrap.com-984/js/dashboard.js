$(document).ready(function () {
    generateTablesTable("https://x7qb7jzwqj.execute-api.ap-south-1.amazonaws.com/Prod/tables", "div1", "name")
});

function generateTablesTable(url, divid, primarykey) {
    $('#'+divid).empty();
    var fulltable = '<table class="table table-striped table-sm" style="width:100%" id="'+divid+'Table"><thead class="thead-dark" id="'+divid+'TableHeader"></thead><tbody id="'+divid+'TableBody"></tbody><tfoot id="'+divid+'TableFooter"></tfoot></table>'
    $('#'+divid).append(fulltable);
    $.ajax({
        url : url,
        type : 'GET',
        async: false,
        headers: { Authorization: 'Bearer bb' },
        contentType : 'application/json; charset=utf-8',
        success : function(msg) {
        console.log(msg)
        var tableheader='<tr><th>'+"Select"+'</th>'
        var tablebody = ''

        for (i in msg[0]) {
            // console.log(i)
            tableheader += '<th>'+i+'</th>'
        }
        tableheader += '</tr>'
        // $("#templateTable").DataTable().destroy();
		$('#'+divid+'TableBody').empty();
        $('#'+divid+'TableHeader').append(tableheader);
        for(var i=0; i<msg.length; i++) {
            tablebody += '<tr><td>'+'<input onclick="setButtonId(\''+msg[i][primarykey]+'\')" type="radio" name="'+divid+'radio" id="'+msg[i][primarykey]+'"></input>'+'</td>'
            for (j in msg[i]) {
                // console.log(msg["data"][i][j])
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
        "order": [[1, "asc"]],
        });
    }
    });
    generateButtons(divid, primarykey)
} 

function generateButtons(divid, primarykey) {
    var buttondiv = '<center>';
    buttondiv += '<div id="action-buttons">'
    buttondiv += '<button id="addcolumn" class="btn btn-sm btn-outline-secondary" name="" type="button" onclick="addColumn()">Add Column</button> '
    buttondiv += '<button id="addrow" class="btn btn-sm btn-outline-secondary" name="" type="button" onclick="addRow()">Add Row</button> '
    buttondiv += '<button id="deletecolumn" class="btn btn-sm btn-outline-secondary" name="" type="button" onclick="deleteColumn()">Delete Column</button> '
    buttondiv += '<button id="deleterow" class="btn btn-sm btn-outline-secondary" name="" type="button" onclick="deleteRow()">Delete Row</button> '
    buttondiv += '<button id="editdata" class="btn btn-sm btn-outline-secondary" name="" type="button" onclick="editData()">Edit Data</button> '
    buttondiv += '<button id="showdata" class="btn btn-sm btn-outline-secondary" name="" type="button" onclick="showData()">Show Data</button> '
    buttondiv += '</div><center></br>'
    $('#'+divid).append(buttondiv);
}

function setButtonId(tablename) {
    document.getElementById("showdata").name = tablename;
    document.getElementById("editdata").name = tablename;
    document.getElementById("deleterow").name = tablename;
    document.getElementById("deletecolumn").name = tablename;
    document.getElementById("addrow").name = tablename;
    document.getElementById("addcolumn").name = tablename;
}

function showData() {
    window.location.href = "/actions.html?type=showdata&tablename="+document.getElementById("showdata").name
}

function editData() {
    window.location.href = "/actions.html?type=editdata&tablename="+document.getElementById("editdata").name
}

function deleteRow() {
    window.location.href = "/actions.html?type=deleterow&tablename="+document.getElementById("deleterow").name
}

function deleteColumn() {
    window.location.href = "/actions.html?type=deletecolumn&tablename="+document.getElementById("deletecolumn").name
}

function addRow() {
    window.location.href = "/actions.html?type=addrow&tablename="+document.getElementById("deletecolumn").name
}

function addColumn() {
    
}

function createTable() {
    window.location.href = "/actions.html?type=createtable"
}
