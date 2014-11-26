$(document).ready(function() {
    
    //We enable table sorting
    $('#myTables').tablesorter();
    
    //We want the headers on tables to change color when hovered over if its sortable
    $('.headerClickable').hover(function() {
        $( this ).addClass('success');
        }, function() {
        $( this ).removeClass('success');
        }
    );

    //We want the first tab in the permissions page to be on by default
    $('div#users').show();
    
    //When we select one of the tabs within the permissions page, we want
    //the correct menu to pop up on screen
    $('ul#navigation li').click(
        function() {
            var id = $(this).attr('id');
            window.location.hash = id;
            $('ul#navigation li.active').removeClass('active');
            $(this).addClass('active');
            $('div#permissions_tab_content > div.tabbedMenuContent').hide();
            $('div#'+id).show();
            $('div#access_results').empty();
            $('div#access_results').show();
        }
    );
       
    //Whenever we click the get permissions button, we send an ajax request to
    //get 1) users with permissions to a table 
    //or 2) tables that a user has access to
    //or 3) tables that a group has access to   
	$('.permissions_button').click(
        function(e) {
            
            var id = $(this).attr('id');
            var selected = $('#'+id+'_dd option:selected').attr('id');
            var results = $('div#access_results');
            results.show();
            
            $.ajax({
                type: 'GET',
                url: '/permissions/' + id,
                data: { "value": selected },
                beforeSend:function(){
                    results.html('<br>Loading....<br><br>'); 
                },
                success:function(data) {
                    
                    //Lets parse the json object and remove any old results
                    data = JSON.parse(data);
                    results.empty();
                    
                    //We create our nifty table to hold results
                    var table = document.createElement("table");
                    $(table).addClass("table paginateMe table-bordered table-hover");
                    
                    //We create the column headers first
                    var p_types = ["Delete", "Select", "Insert", "References", "Update"];
                    var new_row = "<tr><td>Value</td>" ;
                    for(var i = 0; i < p_types.length; i++) {
                        new_row = new_row + "<th>" + p_types[i] + "</th>";           
                    }
                    new_row = new_row + "</tr>";
                    $(table).append(new_row);
                    
                    //Now we append the results of our query
                    for(var i = 0; i < data.length; i++) {
                        new_row = "<tr class='active'>";
                        new_row += "<td>" + data[i]["value"] + "</td>";
                        new_row += "<td>" + data[i]["has_delete"] + "</td>";
                        new_row += "<td>" + data[i]["has_select"] + "</td>";
                        new_row += "<td>" + data[i]["has_insert"] + "</td>";
                        new_row += "<td>" + data[i]["has_references"] + "</td>";
                        new_row += "<td>" + data[i]["has_update"] + "</td>";
                        new_row += "</tr>";
                        $(table).append(new_row);
                    }
                    
                    results.append(table);
                    paginate_stuff();  
                }
            });
        return false;
	});
    
    //Want to ensure long tables with the class paginateMe are paginated
    paginate_stuff();
    
});
