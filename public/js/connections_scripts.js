$(document).on('change','#select_type',function (e) {
    e.preventDefault();
    var type_value = $("#select_type option:selected").val();
    var type_title = $("#select_type option:selected").text();


    if(type_value!=="" && type_value!=="*")
    {
        var options = "<option value='' data-id=''>Select "+type_title+"</option>";
        $.ajax({
            contentType: 'application/x-www-form-urlencoded',
            dataType: 'json',
            url: baseURL+"operations/connection/"+type_value,
            type: "GET",
            success: function(data) {
                $(data).each(function (i) {
                    options += "<option value='"+data[i][type_value]+"' data-id='"+type_value+"'>"+data[i][type_value]+"</option>";
                });

                $("#select_category").html(options);

            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log(errorThrown);
                console.log(textStatus);
            }
        });
    }else if(type_value!=="" && type_value==="*"){
        var options = "<option value='*' data-id=''>Category All Selected</option>";
        $("#select_category").html(options);
    }else{
        var options = "<option value=''>Select Your Components</option>";
        $("#select_category").html(options);

    }

});

$(document).on('submit','#search_form',function (e) {
    e.preventDefault();
    var category_value = $("#select_category option:selected").val();
    var category_title = $("#select_category option:selected").data('id');

    var table="";

    if(category_value==='*' && category_value!=='')
    {


        $.ajax({
            contentType: 'application/x-www-form-urlencoded',
            dataType: 'json',
            url: baseURL+"operations/connection/all",
            type: "POST",
            data:{
                category_title:category_title,
                category_value:category_value,
            },
            success: function(data) {
                $(data).each(function (i) {
                    table+="<tr>";
                    table+="<td>"+data[i]['date']+"</td>";
                    table+="<td>"+data[i]['time']+"</td>";
                    table+="<td>"+data[i]['computer_name']+"</td>";
                    table+="<td>"+data[i]['ip']+"</td>";
                    table+="<td>"+data[i]['protocol']+"</td>";
                    table+="<td>"+data[i]['source_ip']+"</td>";
                    table+="<td>"+data[i]['destination_ip']+"</td>";
                    table+="<td>"+data[i]['source_port']+"</td>";
                    table+="<td>"+data[i]['destination_port']+"</td>";
                    table+="</tr>";
                });

                $(".dataBody").html(table);

                $("#mynetwork").css('display','none');

                $.getScript( "https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js", function( data, textStatus, jqxhr ) {
                    $.getScript( baseURL+"js/jquery.basictable.min.js", function( data, textStatus, jqxhr ) {
                        $('#table').basictable({
                            breakpoint: 1024
                        });
                    });
                });
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log(errorThrown);
                console.log(textStatus);
            }
        });
    }

    if(category_value!=='*' && category_value!==''){

        var nodes_data=[{id: 1, label: category_value}],edges_data=[];


        $.ajax({
            contentType: 'application/x-www-form-urlencoded',
            dataType: 'json',
            url: baseURL+"operations/connection/",
            type: "POST",
            data:{
                category_title:category_title,
                category_value:category_value,
            },
            success: function(data) {
                var count=2;
                $(data).each(function (i) {
                    table+="<tr>";
                    table+="<td>"+data[i]['date']+"</td>";
                    table+="<td>"+data[i]['time']+"</td>";
                    table+="<td>"+data[i]['computer_name']+"</td>";
                    table+="<td>"+data[i]['ip']+"</td>";
                    table+="<td>"+data[i]['protocol']+"</td>";
                    table+="<td>"+data[i]['source_ip']+"</td>";
                    table+="<td>"+data[i]['destination_ip']+"</td>";
                    table+="<td>"+data[i]['source_port']+"</td>";
                    table+="<td>"+data[i]['destination_port']+"</td>";
                    table+="</tr>";
                    if(data[i]['source_ip']==data[i]['destination_ip'])
                    {
                        nodes_data.push({id: count, label: data[i]['ip']+"\n"+data[i]['destination_port']+"\n"+data[i]['protocol']+"\n"+data[i]['tcp_win']});
                        edges_data.push({from: 1, to: count});
                        count++;
                    }

                });

                $(".dataBody").html(table);

                $("#mynetwork").css('display','block');

                // create an array with nodes
                var nodes = new vis.DataSet(nodes_data);

                // create an array with edges
                var edges = new vis.DataSet(edges_data);

                // create a network
                var container = document.getElementById('mynetwork');
                var data = {
                    nodes: nodes,
                    edges: edges
                };
                var options = {
                    dragNodes:false
                };
                var network = new vis.Network(container, data, options);

                $.getScript( "https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js", function( data, textStatus, jqxhr ) {
                    $.getScript( baseURL+"js/jquery.basictable.min.js", function( data, textStatus, jqxhr ) {
                        $('#table').basictable({
                            breakpoint: 1024
                        });
                    });
                });
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log(errorThrown);
                console.log(textStatus);
            }
        });
    }

});