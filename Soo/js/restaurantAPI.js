var isNotFirst = 0;
$(document).ready(function() 
    {
        
        $('#searchbtn').on("click",function(event){
        event.preventDefault()
    
        isNotFirst++;
        if(isNotFirst>1)
            {
                $('#eats-result').empty();
               
    
            }
        //--- search for city---//
        var cityVal = $("#zipsearch").val(); // change to pull data from searchbar 

        //--- API settings for City Search

        var settings = 
            {
                "async": true,
                "crossDomain": true,
                "url": "https://developers.zomato.com/api/v2.1/cities?q="+ cityVal,
                "method": "GET",
                "headers":
                   {
                       "user-key": "d710754ce67200fb6fb9b5e26139f50e",
                        'Content-Type': 'application/json'
                    }
            };

        
//--------------------- API request Call for City----------------------------- 
        $.getJSON(settings, function(data){}).done(function(data)
            {
                cityID = data.location_suggestions[0].id; 
                var settings = 
                    {
                        "async": true,
                        "crossDomain": true,
                        "url": "https://developers.zomato.com/api/v2.1/search?"+"entity_id="+ cityID + "&entity_type=city",
                        "method": "GET",
                        "headers":
                            {
                                "user-key": "d710754ce67200fb6fb9b5e26139f50e",
                                'Content-Type': 'application/json'
                            }
                    };
                    



//-------------------- API for local Restaurants -------------------- 
                $.getJSON(settings, function(data)
                    {
                        data = data.restaurants;
                        console.log(data);
                        // for every restaurant object,
                        $.each(data, function(index,arg)
                            {
                                // for every restaurant 
                                var restaurantListed = data[index];
                                $.each(restaurantListed,function(index,arg)
                                    {
                                        // info per restaurant
                                        var restaurantName = restaurantListed.restaurant.name; // type  string; 
                                        var restaurantRating = restaurantListed.restaurant.user_rating.aggregate_rating;  // type object; used for getting the rating
                                        var ratingObj = '#'+restaurantListed.restaurant.user_rating.rating_color;
                                        var imgObj = restaurantListed.restaurant.thumb;
                                        var restaurantAddr = restaurantListed.restaurant.location.address; // type string; used for address

                                        var restaurantObj = $("<div class='restaurant-object'>").appendTo($('#eats-result'));
                                        restaurantObj
                                        .html("<h2 class='restaurant-names'>" + restaurantName + "</h2>" + "<img src='"+ imgObj+"'>"
                                    
                                                + "<div class='restaurant-address'>" + restaurantAddr +"</div>" + "<div class='restaurant-ratings'>"+ restaurantRating + "</div>" )
                                        // to be edited 
                                        
                                        restaurantObj.css({padding:"25px", fontWeight:"bold",textAlign:"center",border:"1px solid black"});
                                        var ratingsObj = $('.restaurant-ratings');
                                        ratingsObj.css({height:"25px", textAlign:"center", marginLeft:"45%", color:"white",width:"50px",background:ratingObj});
                                    

                                    }); 
                            });   
                
                    }); 
            });
        });
            
    });