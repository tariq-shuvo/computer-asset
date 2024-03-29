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
            url: baseURL+"operations/hw/"+type_value,
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
           url: baseURL+"operations/hw/all",
           type: "POST",
           data:{
               category_title:category_title,
               category_value:category_value,
           },
           success: function(data) {
               $(data).each(function (i) {
                   table+="<tr>";
                   table+="<td>"+data[i]['computer_name']+"</td>";
                   table+="<td>"+data[i]['logical_cores']+"</td>";
                   table+="<td>"+data[i]['manufacturer']+"</td>";
                   table+="<td>"+data[i]['memory']+"</td>";
                   table+="<td>"+data[i]['model']+"</td>";
                   table+="<td>"+data[i]['physical_core']+"</td>";
                   table+="<td>"+data[i]['processor']+"</td>";
                   table+="<td>"+data[i]['system_type']+"</td>";
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

   if(category_value!=='*' && category_value!==''){
       $.ajax({
           contentType: 'application/x-www-form-urlencoded',
           dataType: 'json',
           url: baseURL+"operations/hw/",
           type: "POST",
           data:{
               category_title:category_title,
               category_value:category_value,
           },
           success: function(data) {
               $(data).each(function (i) {
                   table+="<tr>";
                   table+="<td>"+data[i]['computer_name']+"</td>";
                   table+="<td>"+data[i]['logical_cores']+"</td>";
                   table+="<td>"+data[i]['manufacturer']+"</td>";
                   table+="<td>"+data[i]['memory']+"</td>";
                   table+="<td>"+data[i]['model']+"</td>";
                   table+="<td>"+data[i]['physical_core']+"</td>";
                   table+="<td>"+data[i]['processor']+"</td>";
                   table+="<td>"+data[i]['system_type']+"</td>";
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