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
                    options += "<option value='"+data[i]+"' data-id='computer_name'>"+data[i]+"</option>";
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

                $("#mynetwork_source").css('display','none');
                $("#mynetwork_destination").css('display','none');

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

        var nodes_data_source=[{id: 1, label: category_value}],edges_data_source=[];
        var nodes_data_destination=[{id: 1, label: category_value}],edges_data_destination=[];


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
                var count_source=2;
                var count_destination=2;
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
                    if(data[i]['ip']==data[i]['source_ip'])
                    {
                        nodes_data_source.push({id: count_source, label: data[i]['source_ip']+"\n"+data[i]['destination_ip']+"\n"+data[i]['destination_port']+"\n"+data[i]['protocol']+"\n"+data[i]['tcp_win']});
                        edges_data_source.push({from: 1, to: count_source});
                        count_source++;
                    }

                    if(data[i]['ip']==data[i]['destination_ip'])
                    {
                        nodes_data_destination.push({id: count_destination, label: data[i]['source_ip']+"\n"+data[i]['destination_ip']+"\n"+data[i]['destination_port']+"\n"+data[i]['protocol']+"\n"+data[i]['tcp_win']});
                        edges_data_destination.push({from: 1, to: count_destination});
                        count_destination++;
                    }

                });

                $(".dataBody").html(table);

                $("#mynetwork_source").css('display','block');
                $("#mynetwork_destination").css('display','block');

                // create an array with nodes
                var nodes_source = new vis.DataSet(nodes_data_source);
                var nodes_destination = new vis.DataSet(nodes_data_destination);

                // create an array with edges
                var edges_source = new vis.DataSet(edges_data_source);
                var edges_destination = new vis.DataSet(edges_data_destination);

                // create a network
                var container_source = document.getElementById('mynetwork_source');
                var container_destination = document.getElementById('mynetwork_destination');
                var data_source = {
                    nodes: nodes_source,
                    edges: edges_source
                };
                var data_destination = {
                    nodes: nodes_destination,
                    edges: edges_destination
                };

                var options = {
                    dragNodes:false
                };
                var network_source = new vis.Network(container_source, data_source, options);
                var network_destination = new vis.Network(container_destination, data_destination, options);

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