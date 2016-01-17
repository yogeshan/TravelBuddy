function login_register_current_user(id) {
   /* $.ajax({
        url: "Login",
        type: "POST",
        data: {
            fb_id: id
        },
        success: function (data) {
            console.log(data);
            $('.our-app-status').text(data.msg);
            if (data.status == 's') {
                $('.t-vehicles').hide();
                $('.add-vehicle-section').hide();
                if (data.just_register == 'yes') {
                    //user needs to add car
                    $('.add-vehicle-section').show();
                } else {
                    // fetch a car
                    loadUserVehicles();
                }
            }
        }
    });*/

}
function loadUserVehicles() {
   /* $.ajax({
        url: "LoadVehicles",
        type: "POST",
        success: function (data) {
            if (data.status == 's') {
                if (data.vehicles.length == 0) {
                    $('.add-vehicle-section').show();
                } else {
                    var html = '';
                    for (var i = 0; i < data.vehicles.length; i++) {
                        var vehicle = data.vehicles[i];
                        html += '<tr>';
                        html += '<td><input type="radio" name="radio-vehicles" class="radio-vehicle" data-id="' + vehicle.vehicle_id + '"/></td>';
                        html += '<td>' + vehicle.license + '</td>';
                        html += '<td>' + vehicle.car_number + '</td>';
                        html += '<td>' + vehicle.fuel_type + '</td>';
                        html += '<td>' + vehicle.seating_capacity + '</td>';
                        html += '</tr>';
                    }

                    $('.t-vehicles tbody').html(html);
                    $('.t-vehicles').show();
                }
            } else {
                alert('something went wrong!!!');
            }
        }
    });*/
}

$('.btn-show-add-vehicle-sec').click(function () {
    $('.add-vehicle-section').show();
});
$('.btn-add-vehicle').click(function () {
    var license = $('#txtlicense').val();
    var carnumber = $('#txtcarnumber').val();

    var fuel = $('.radio-fuel:checked').val();

    var seating = $('#txtseating').val();

    $.ajax({
        url: "AddNewVehicle",
        type: "POST",
        data: {
            license: license,
            carnumber: carnumber,
            fuel: fuel,
            seating: seating
        },
        success: function (data) {
            if (data.status == 's') {
                $('.add-vehicle-section').hide();
                loadUserVehicles();
            }
            else {
                alert('something went wrong!');
            }
        }
    });
});



$(function () {
    /*$('.dtp').datetimepicker({
        format: 'DD-MMM-YYYY'
    });
    $('.dtp-time').datetimepicker({
        format: 'hh:mm a'
    });*/
});

$('.chk-return').click(function () {
    if ($('.chk-return:checked').length == 1) {
        $('.blk-return').show();
    } else {
        $('.blk-return').hide();
    }
});


$('.chk-repeat').click(function () {
    if ($('.chk-repeat:checked').length == 1) {
        $('.blk-days').show();
    } else {
        $('.blk-days').hide();
    }
});

$('.btn-publish').click(function () {
    var data = {};
    data.start_date = $('#txtstartdt').val();
    data.start_time = $('#txtstarttime').val();
    data.is_return = $('.chk-return:checked').length;
    data.return_date = $('#txtreturndt').val();
    data.return_time = $('#txtreturntime').val();
    data.is_repeat = $('.chk-repeat:checked').length;

    data.is_mon = $('.chk-mon:checked').length;
    data.is_tue = $('.chk-tue:checked').length;
    data.is_wed = $('.chk-wed:checked').length;
    data.is_thu = $('.chk-thu:checked').length;
    data.is_fri = $('.chk-fri:checked').length;
    data.is_sat = $('.chk-sat:checked').length;
    data.is_sun = $('.chk-sun:checked').length;
    data.vehicle_id = $('.radio-vehicle:checked').data('id');

    
    var journey=[];
    $('#t-data tbody tr').each(function(){
        var tr=$(this);
        var obj={};
        obj.is_first=0;
        obj.is_last=0;
        if(tr.is(':first-child')){
            obj.is_first=1;
        }
        if(tr.is(':last-child')){
            obj.is_last=1;
        }
        obj.start=tr.find('td').eq(0).text();
        obj.start_lat=tr.find('td').eq(1).text();
        obj.start_lng=tr.find('td').eq(2).text();
        
        obj.end=tr.find('td').eq(3).text();
        obj.end_lat=tr.find('td').eq(4).text();
        obj.end_lng=tr.find('td').eq(5).text();
        
        obj.distance_str=tr.find('td').eq(6).text();
        obj.distance=tr.find('td').eq(7).text();
        
        obj.duration_str=tr.find('td').eq(8).text();
        obj.duration=tr.find('td').eq(9).text();
        
        obj.price=tr.find('td').eq(10).text();
        journey.push(obj);
    });

    data.journey=JSON.stringify(journey);
    
    console.log(data);
    
    
    $.ajax({
        url: "PublishJourney",
        type: "POST",
        data: data,
        success: function (data) {
            if (data.status == 's') {
                alert('Successfully published');
            }
            else {
                alert('something went wrong!');
            }
        }
    });

});


