$(document).on('change','#select_type',function (e) {
    e.preventDefault();
    var type_value = $("#select_type option:selected").val();
    var type_title = $("#select_type option:selected").text();

    if(type_value==="name" || type_value==="publisher")
    {
        $("#select_category").hide();
        $("#search_bar_category").attr('data-id', type_value).attr('placeholder', "Search By "+type_title).show();
    }else if(type_value!==""){
        $("#select_category").show();
        $("#search_bar_category").hide();

        $("search_bar_category").attr('data-id', '');
        $("search_bar_category").attr('placeholder', "");

        var options = "<option value='' data-id=''>Select "+type_title+"</option>";
        $.ajax({
            contentType: 'application/x-www-form-urlencoded',
            dataType: 'json',
            url: baseURL+"operations/sw/"+type_value,
            type: "GET",
            success: function(data) {
                $(data).each(function (i) {
                    options += "<option value='"+data[i]+"' data-id='"+type_value+"'>"+data[i]+"</option>";
                });

                $("#select_category").html(options);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log(errorThrown);
                console.log(textStatus);
            }
        });
    }else{
        var options = "<option value=''>Select Your Components</option>";
        $("#select_category").html(options);
    }

});

$(document).on('submit','#search_form',function (e) {
    e.preventDefault();
    var category_value = $("#select_category option:selected").val();
    var category_title = $("#select_category option:selected").data('id');

    var search_bar_category_value=$("#search_bar_category").val();
    var search_bar_category_column=$("#search_bar_category").data('id');

    var hidden_select = $("#select_category").is(":hidden");


    var table="";

    if(hidden_select===false && category_value!=='')
    {
        $.ajax({
            contentType: 'application/x-www-form-urlencoded',
            dataType: 'json',
            url: baseURL+"operations/sw/",
            type: "POST",
            data:{
                category_title:$.trim(category_title),
                category_value:$.trim(category_value)
            },
            success: function(data) {
                $(data).each(function (i) {
                    table+="<tr>";
                    table+="<td>"+data[i]['computer_name']+"</td>";
                    table+="<td>"+data[i]['name']+"</td>";
                    table+="<td>"+data[i]['version']+"</td>";
                    table+="<td>"+data[i]['install_date']+"</td>";
                    table+="<td>"+data[i]['publisher']+"</td>";
                    table+="<td>"+data[i]['uninstall']+"</td>";
                    table+="<td>"+data[i]['size']+"</td>";
                    table+="</tr>";
                });

                $(".dataBody").html(table);

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
    if(hidden_select===true && search_bar_category_value!==''){
        $.ajax({
            contentType: 'application/x-www-form-urlencoded',
            dataType: 'json',
            url: baseURL+"operations/sw/like",
            type: "POST",
            data:{
                category_title:$.trim(search_bar_category_column),
                category_value:$.trim(search_bar_category_value)
            },
            success: function(data) {
                $(data).each(function (i) {
                    table+="<tr>";
                    table+="<td>"+data[i]['computer_name']+"</td>";
                    table+="<td>"+data[i]['name']+"</td>";
                    table+="<td>"+data[i]['version']+"</td>";
                    table+="<td>"+data[i]['install_date']+"</td>";
                    table+="<td>"+data[i]['publisher']+"</td>";
                    table+="<td>"+data[i]['uninstall']+"</td>";
                    table+="<td>"+data[i]['size']+"</td>";
                    table+="</tr>";
                });

                $(".dataBody").html(table);

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