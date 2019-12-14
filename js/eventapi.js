$( document ).ready(function() {
            $('#searchbtn').click(function() {
              event.preventDefault();
                var citySearch = document.getElementById("zipsearch").value;
                console.log(citySearch);
                var queryURL = "https://api.seatgeek.com/2/venues?city="+citySearch+"&per_page=10&client_id=MjUwMTk3MnwxNTc1NjA5MTQ3LjEz";
                    $.ajax({
                        url: queryURL,
                        method: "GET"
                    }).then(function(response) {
                          console.log(response);
    
    
                        $("#resultdiv").empty();
                          $("#resultdiv").append("<div id='events-result' class='uk-width-1-2'>")
                          $("#resultdiv").append("<div id='eats-result' class='uk-width-1-2'>")        
                          $("#events-result").html("<h2 id='eventstitle'>Events</h2>");
                          $("#eats-result").html("<h2 id='eatstitle'>Eats</h2>");
                          for(var i = 1; i < 11; i++) {
                            var newDiv = $("<div id='eventDivs'>");
                            var title = response.venues[i].name;
                            console.log(title);
                            var newTitle = $("<h2 id='resultstitle'>").text(title);
                            $(newDiv).append(newTitle);
    
                            var venueAddress = response.venues[i].address;
                            var extAddress = response.venues[i].extended_address;
                            console.log(venueAddress);
                            var newAddress = $("<p class='eventaddress'>").text(venueAddress + " " + extAddress);
                            $(newDiv).append(newAddress);
    
                            var tickets = response.venues[i].url;
                            console.log(tickets);
                            var newTickets = $("<p id='ticketlink'>").html("<a href="+tickets+"target='_blank'>Purchase Tickets</a>");
                            $(newDiv).append(newTickets);
    
                            $("#events-result").append(newDiv);
                          }
                        });
            });
            });
            
