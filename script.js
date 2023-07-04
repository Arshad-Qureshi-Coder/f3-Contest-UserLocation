// const getdata = document.querySelector('#getData');

// document.getElementById("getData").addEventListener("click", function() {
//     // Redirect to another page
//     location.href = "userLocation.html";
//   });
// get Info of User IP

$(document).ready(function() {
    $.getJSON("https://api.ipify.org?format=json", function(data) {
      var ipAddress = data.ip;
      $("#ipAddress").text(ipAddress);
  
      $.getJSON(`https://ipinfo.io/${ipAddress}/geo?token=f247b1125490d4`, function(geoData) {
        // console.log(JSON.stringify(geoData));
  
        var lat = geoData.loc.split(',')[0];
        var long = geoData.loc.split(',')[1];
        var city = geoData.city;
        var region = geoData.region;
        var organisation = geoData.org;
        var hostname = geoData.hostname;
        var timeZone = geoData.timezone;
        var dateTime = new Date().toLocaleString();
        var pincode = geoData.postal;
        var message = geoData.postal.length;
  
        $("#lat").val(lat);
        $("#long").val(long);
        $("#city").val(city);
        $("#region").val(region);
        $("#organisation").val(organisation);
        $("#hostname").val(hostname);
        $("#timeZone").val(timeZone);
        $("#dateTine").val(dateTime);
        $("#pincode").val(pincode);
        $("#msg").val(message);

        getPostOfficeList(pincode);
        locationMap(lat, long);
        
      });
    });

    $(".input-search").on("input", function() {
        var filterValue = $(this).val().toLowerCase();
        filterPostOffices(filterValue);
      });
  });


  function locationMap(lat, long) {
    const divMap = document.querySelector(".map-container");
    divMap.classList.add("map-container");
    const mapURL = `<iframe src="https://maps.google.com/maps?q=${lat}, ${long}&output=embed" width="96%" height="450px"></iframe>`;
    divMap.innerHTML = mapURL;
  }

// find postOffices bu using pincode
  function getPostOfficeList(pincode) {
    $.getJSON(`https://api.postalpincode.in/pincode/${pincode}`, function(postOfficeData) {
      var postOfficeList = postOfficeData[0].PostOffice;
      console.log(postOfficeList);

    var postOfficeHTML = '';
    for (var i = 0; i < postOfficeList.length; i++) {
      var postOffice = postOfficeList[i];
      postOfficeHTML += '<div class="postofficeInfor">';
      postOfficeHTML += '<p>Name: ' + postOffice.Name + '</p>';
      postOfficeHTML += '<p>Branch Type: ' + postOffice.BranchType + '</p>';
      postOfficeHTML += '<p>Delivery Status: ' + postOffice.DeliveryStatus
      + '</p>';
      postOfficeHTML += '<p>District: ' + postOffice.District + '</p>';
      postOfficeHTML += '<p>Division: ' + postOffice.Division + '</p>';
      postOfficeHTML += '</div>';
    }
    $(".postofficeInfo").html(postOfficeHTML);

    })
  }


// filter function for filter the postOffices by name and Branch office
function filterPostOffices(filterValue) {
    var postOffices = $(".postofficeInfo");
  
    postOffices.each(function() {
      var postOffice = $(this);
      var name = postOffice.find("p:nth-child(1)").text().toLowerCase();
      var branchType = postOffice.find("p:nth-child(2)").text().toLowerCase();
  
      if (name.includes(filterValue) || branchType.includes(filterValue)) {
        postOffice.show();
      } else {
        postOffice.hide();
      }
    });
  }




  
  
  




