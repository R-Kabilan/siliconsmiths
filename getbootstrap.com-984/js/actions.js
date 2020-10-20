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

var dropdownurl = 'https://x7qb7jzwqj.execute-api.ap-south-1.amazonaws.com/Prod/table/dropdown/'
var editurl = 'https://x7qb7jzwqj.execute-api.ap-south-1.amazonaws.com/Prod/insert/'

if (Ps.type == "showdata") {
    document.getElementById("heading").innerHTML = "Show Data: " + Ps.tablename;
    generateShowTable(Ps.tablename)
} else if (Ps.type == "editdata") {
    var value = "rows"
    document.getElementById("heading").innerHTML = "Edit Data: " + Ps.tablename;
    generateDropdownForEdit(dropdownurl, value, Ps.tablename)
} else if (Ps.type == "deleterow") {
    var value = "rows"
    document.getElementById("heading").innerHTML = "Delete Row: " + Ps.tablename;
    generateDropdownForDelete(dropdownurl, value, Ps.tablename)
} else if (Ps.type == "deletecolumn") {
    var value = "columns"
    document.getElementById("heading").innerHTML = "Delete Column: " + Ps.tablename;
    generateDropdownForDelete(dropdownurl, value, Ps.tablename)
} else if (Ps.type == "addrow") {
    document.getElementById("heading").innerHTML = "Add Row: " + Ps.tablename;
    generateForAddRow(Ps.tablename)
} else if (Ps.type == "addcolumn") {
    document.getElementById("heading").innerHTML = "Add Column: " + Ps.tablename;
    generateForAddColumn(Ps.tablename)
} else if(Ps.type == "createtable") {
    document.getElementById("heading").innerHTML = "Create New Table";
    createNewTableInputs()
}


function generateShowTable(tablename) {
    var divid = "div2"
    $('#' + divid).empty();
    url = 'https://x7qb7jzwqj.execute-api.ap-south-1.amazonaws.com/Prod/table/' + tablename
    var fulltable = '<table class="table table-bordered table-hover" style="width:100%" id="' + divid + 'Table"><thead class="thead-dark" id="' + divid + 'TableHeader"></thead><tbody id="' + divid + 'TableBody"></tbody><tfoot id="' + divid + 'TableFooter"></tfoot></table>'
    $('#' + divid).append(fulltable);
    $.ajax({
        url: url,
        type: 'GET',
        async: false,
        headers: { Authorization: 'Bearer bb' },
        contentType: 'application/json; charset=utf-8',
        success: function (msg) {

            var tableheader = '<tr>'
            var tablebody = ''

            for (i in msg[0]) {
                tableheader += '<th>' + i + '</th>'
            }
            tableheader += '</tr>'
            // $("#templateTable").DataTable().destroy();
            $('#' + divid + 'TableBody').empty();
            $('#' + divid + 'TableHeader').append(tableheader);
            for (var i = 0; i < msg.length; i++) {
                tablebody += '<tr>'
                for (j in msg[i]) {
                    tablebody += '<td>' + msg[i][j] + '</td>'
                }
                tablebody += '</tr>'
            }
            $('#' + divid + 'TableBody').append(tablebody);
            $('#' + divid + 'Table').DataTable({
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
    var divid = "div1"
    $('#' + divid).empty();
    var selectdiv = '<div id="selectdiv"><label for="formIds">Select Row: </label><select  multiple="multiple" class="multiselect-dropdown form-control" name="selectrow" id="formIds"></select></div></br>'
    $('#' + divid).append(selectdiv);
    $.ajax({
        url: url + value + '/' + tablename,
        type: 'GET',
        async: false,
        headers: { Authorization: 'Bearer bb' },
        contentType: 'application/json; charset=utf-8',
        success: function (msg) {
            for (var i = 0; i < msg.length; i++) {
                var option = document.createElement("option");
                option.text = msg[i];
                option.value = msg[i];
                var select = document.getElementById("formIds");
                select.appendChild(option);
            }
            var url2 = 'https://x7qb7jzwqj.execute-api.ap-south-1.amazonaws.com/Prod/table/load/'
            var submitbutton = '<center><button class="btn btn-sm btn-outline-secondary" id="showdatabutton" onclick="generateDeleteTableData(\'' + url2 + '\', \'' + value + '\', \'' + tablename + '\')">Show data for selected ' + value + '</button></center></br>'
            $('#' + divid).append(submitbutton);
        }
    });
}

function generateDropdownForEdit(url, value, tablename) {
    var primarykey = "id"
    var divid = "div1"
    $('#' + divid).empty();
    var selectdiv = '<div id="selectdiv"><label for="formIds">Select Row: </label><select class="multiselect-dropdown form-control" name="selectrow" id="formIds"></select></div></br>'
    $('#' + divid).append(selectdiv);
    $.ajax({
        url: url + value + '/' + tablename,
        type: 'GET',
        async: false,
        headers: { Authorization: 'Bearer bb' },
        contentType: 'application/json; charset=utf-8',
        success: function (msg) {
            for (var i = 0; i < msg.length; i++) {
                var option = document.createElement("option");
                option.text = msg[i];
                option.value = msg[i];
                var select = document.getElementById("formIds");
                select.appendChild(option);
            }
            var url2 = 'https://x7qb7jzwqj.execute-api.ap-south-1.amazonaws.com/Prod/table/load/'
            var submitbutton = '<center><button class="btn btn-sm btn-outline-secondary" id="showdatabutton" onclick="generateEditTableData(\'' + url2 + '\', \'' + value + '\', \'' + tablename + '\')">Show data for selected ' + value + '</button></center></br>'
            $('#' + divid).append(submitbutton);
        }
    });
}

function generateDeleteTableData(url, value, tablename) {
    var divid = "div2"
    $('#' + divid).empty();
    var data = (selectedValues = $('#formIds').val());
    $.ajax({
        url: url + value + '/' + tablename,
        type: 'POST',
        async: false,
        dataType: 'json',
        data: JSON.stringify(data),
        headers: { Authorization: 'Bearer bb' },
        contentType: 'application/json; charset=utf-8',
        success: function (msg) {
            deletejsonobject = msg
            generateTableFromJson(divid, msg, value, tablename);
        }
    });
}

function generateEditTableData(url, value, tablename) {
    var divid = "div2"
    $('#' + divid).empty();
    var array = []
    var data = (selectedValues = $('#formIds').val());
    array.push(data);
    $.ajax({
        url: url + value + '/' + tablename,
        type: 'POST',
        async: false,
        dataType: 'json',
        data: JSON.stringify(array),
        headers: { Authorization: 'Bearer bb' },
        contentType: 'application/json; charset=utf-8',
        success: function (msg) {
            var edittabledata = '<form id="editform">'
            edittabledata += '<table class="table table-bordered table-hover" style="width:100%" id="' + divid + 'Table"><thead class="thead-dark" id="' + divid + 'TableHeader"></thead><tbody id="' + divid + 'TableBody"></tbody><tfoot id="' + divid + 'TableFooter"></tfoot></table>'
            var tableheader = ''
            var tabledata = ''
            for (i in msg[0]) {
                if (i == "id") {
                    tableheader += '<tr><th>' + i + '</th><th><input type="hidden" value=' + msg[0][i] + ' name=' + i + '></input>' + msg[0][i] + '</th></tr>'
                } else {
                    tabledata += '<tr><td>' + i + '</td><td><input type="text" name="' + i + '" id="' + i + '" value="' + msg[0][i] + '"></tr></td>'
                }
            }
            edittabledata += '</form>'
            $('#' + divid).append(edittabledata);
            $('#' + divid + 'TableHeader').append(tableheader);
            $('#' + divid + 'TableBody').append(tabledata);
            var functionstring = 'editData(\'' + tablename + '\')'
            var submitbutton = '<center><button class="btn btn-sm btn-outline-secondary" id="editbutton" onclick="' + functionstring + '">Edit</button></center></br>'
            $('#' + divid).append(submitbutton);

        }
    });
}

function editData(tablename) {
    var editdata = $('#editform').serializeObject()
    var arraydata = []
    arraydata.push(editdata)
    $.ajax({
        url: editurl + tablename,
        type: 'POST',
        async: false,
        dataType: 'json',
        data: JSON.stringify(arraydata),
        headers: { Authorization: 'Bearer bb' },
        contentType: 'application/json; charset=utf-8',
        success: function (msg) {
            alert("Editted Successfully")
        }
    });
}

function generateTableFromJson(divid, msg, value, tablename) {
    var primarykey = "id"
    var fulltable = '<table class="table table-bordered table-hover" style="width:100%" id="' + divid + 'Table"><thead class="thead-dark" id="' + divid + 'TableHeader"></thead><tbody id="' + divid + 'TableBody"></tbody><tfoot id="' + divid + 'TableFooter"></tfoot></table>'
    $('#' + divid).append(fulltable);
    var tableheader = '<tr>'
    var tablebody = ''

    for (i in msg[0]) {
        tableheader += '<th>' + i + '</th>'
    }
    tableheader += '</tr>'
    // $("#templateTable").DataTable().destroy();
    $('#' + divid + 'TableBody').empty();
    $('#' + divid + 'TableHeader').append(tableheader);
    for (var i = 0; i < msg.length; i++) {
        tablebody += '<tr>'
        for (j in msg[i]) {
            tablebody += '<td>' + msg[i][j] + '</td>'
        }
        tablebody += '</tr>'
    }
    $('#' + divid + 'TableBody').append(tablebody);
    $('#' + divid + 'Table').DataTable({
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
    var functionstring = 'deleteRowsOrColumns(\'' + value + '\',\'' + tablename + '\',\'' + divid + '\')'
    var submitbutton = '<center><button class="btn btn-sm btn-outline-secondary" id="deleterowsorcolumnsbutton" onclick="' + functionstring + '">Delete</button></center></br>'
    $('#' + divid).append(submitbutton);
}

function deleteRowsOrColumns(value, tablename, divid) {
    var url = 'https://x7qb7jzwqj.execute-api.ap-south-1.amazonaws.com/Prod/' + value + '/' + tablename
    $.ajax({
        url: url,
        type: 'DELETE',
        async: false,
        dataType: 'json',
        data: JSON.stringify(deletejsonobject),
        headers: { Authorization: 'Bearer bb' },
        contentType: 'application/json; charset=utf-8',
        success: function (msg) {
            $('#' + divid).empty();
            generateDropdownForDelete(dropdownurl, value, tablename);
        }
    });
}

$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

function createNewTableInputs() {
    var divid = "div1"
    var metadetails = '<form onsubmit="return false" id="metadetails"><div class="settings">'
    metadetails += '<label for="tablename" class="col-form-label">Table Name: </label><input type="text" name="tablename" id="tablename" value=""></input>'
    metadetails += '<label for="tabletype" class="col-form-label">Table Type: </label><select style="width:158px;" onchange="setCourse()"  name="tabletype" id="tabletype"><option disabled selected value=""></option></select>'
    metadetails += '<label id="coursenamediv" style="display: none" for="coursename" class="col-form-label">Course Name: </label><select style="display: none" disabled="true" name="coursename" id="coursename"></select>'
    metadetails += '<label for="columns" class="col-form-label">Columns: </label><input type="text" id="columns" name="columns"></input>'
    metadetails += '<label for="rows" class="col-form-label">Rows: </label><input type="text" id="rows" name="rows"></input></div></form><br>'
    metadetails += '<center><button class="btn btn-sm btn-outline-secondary" onclick="createNewTable()" id="createbutton">Create table and enter data</button></center></br>'
    $('#' + divid).append(metadetails)
    $.ajax({
        url: 'https://x7qb7jzwqj.execute-api.ap-south-1.amazonaws.com/Prod/roles',
        type: 'GET',
        async: false,
        headers: { Authorization: 'Bearer bb' },
        contentType: 'application/json; charset=utf-8',
        success: function (msg) {
            for (var i = 0; i < msg.length; i++) {
                var option = document.createElement("option");
                option.text = msg[i];
                option.value = msg[i];
                var select = document.getElementById("tabletype");
                select.appendChild(option);
            }
        }
    });
    $.ajax({
        url: 'https://x7qb7jzwqj.execute-api.ap-south-1.amazonaws.com/Prod/roles',
        type: 'GET',
        async: false,
        headers: { Authorization: 'Bearer bb' },
        contentType: 'application/json; charset=utf-8',
        success: function (msg) {
            for (var i = 0; i < msg.length; i++) {
                var option = document.createElement("option");
                option.text = msg[i];
                option.value = msg[i];
                var select = document.getElementById("coursename");
                select.appendChild(option);
            }
        }
    });
}

function createNewTable() {
    var divid = "div2"
    var fulltable = '<table class="table table-bordered table-hover" style="width:100%" id="' + divid + 'Table"><thead class="thead-dark" id="' + divid + 'TableHeader"></thead><tbody id="' + divid + 'TableBody"></tbody><tfoot id="' + divid + 'TableFooter"></tfoot></table>'
    $('#' + divid).append(fulltable);
    var tableheader = '<tr>'
    var tablebody = ''
    var metadetails = $('#metadetails').serializeObject()
    if(!validate(metadetails)) {
        alert("Fill Fields Properly")
        return 0
    }
    for (i = 0; i < parseInt(metadetails.columns); i++) {
        if (i == 0) {
            tableheader += '<th>id</th>'
        } else {
            tableheader += '<th contenteditable="true"></th>'
        }
    }
    tableheader += '</tr>'
    for (i = 0; i < parseInt(metadetails.rows); i++) {
        tablebody += '<tr>'
        for (j = 0; j < parseInt(metadetails.columns); j++) {
            tablebody += '<td contenteditable="true"></td>'
        }
        tablebody += '</tr>'
    }
    $('#' + divid).append(metadetails)
    $('#' + divid + 'TableHeader').append(tableheader);
    $('#' + divid + 'TableBody').append(tablebody);
    var button = '<center><button class="btn btn-sm btn-outline-secondary" onclick="generateNewTable()">Genereate</button><center>'
    $('#' + divid).append(button);

}

function generateNewTable() {
    var divid = 'div2'
    var metadetails = $('#metadetails').serializeObject()
    console.log(metadetails)
    console.log(JSON.stringify(tableToJSON($('#' + divid + 'Table'))));
}

function tableToJSON(tblObj) {
    var data = [];
    var $headers = $(tblObj).find("th");
    var $rows = $(tblObj).find("tbody tr").each(function (index) {
        $cells = $(this).find("td");
        data[index] = {};
        $cells.each(function (cellIndex) {
            data[index][$($headers[cellIndex]).html()] = $(this).html();
        });
    });
    return data;
}

function setCourse() {
    if(document.getElementById('tabletype').value == "Student") {
        document.getElementById('coursenamediv').style.display="block"
        document.getElementById('coursename').style.display="block"
        document.getElementById('coursename').disabled=false
    } else {
        document.getElementById('coursenamediv').style.display="none"
        document.getElementById('coursename').style.display="none"
        document.getElementById('coursename').disabled=true
    }
}

function validate(obj) {
    for (i in obj) {
        if(obj[i] == "" || obj[i] == null) {
            return false;
        }
    } 
    return true 
}



