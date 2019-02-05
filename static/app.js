$(function () {
	socket = io.connect('http://' + document.domain + ':' + location.port);
	socket.on ('connect', function() {
		$('#status').text('Connecté');
    	socket.emit('client_connected', {data: 'New client!'});
	});

	socket.on ('disconnect', function() {
		$('#status').text('Déconnecté');
	});

	socket.on ('alert', function (data) {
    	$('#status').text('Connecté');
        $('#RedAlert').attr("hidden", data);
	});

	socket.on ('temperature', function (data) {
    	$('#status').text('Connecté');
        $('#tc').html(data.toString() + " °C");
	});

	socket.on ('lumen', function (data) {
		$('#status').text('Connecté');
		$('#lux').html(data.toString());
		let bright = Math.max(1 - data/250, 0) * 100;
		$('.light-ring').css({
			"background-color": "#ffff00",
			"filter": "brightness(" + bright + "%)"
		});
	});
});