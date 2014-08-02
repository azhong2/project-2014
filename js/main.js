// Init Skrollr
var s = skrollr.init();

jQuery(document).ready(function ($) {

	var fbFollow = $('iframe#fb-follow');

	$('.some-carousel').slick({
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		autoplay: true,
  		autoplaySpeed: 3000,
	});

	$('.video-carousel').slick({
	  centerMode: true,
	  centerPadding: '0px',
	  slidesToShow: 3
	});

  var modal = $('.modal-dialog');
  var modalHeight = modal.find('iframe.modal-body').height();
  modal.css('margin-top', ($(window).height() - modalHeight) / 2);

  $('#submitContactForm').click(function(event) {
  	event.preventDefault();

  	var formArray = $('form#contactForm').serializeArray();
  	var formData = {};

  	formArray.forEach(function(field){
  		formData[field.name] = field.value;
  	});

  	var apiUrl = 'https://mandrillapp.com/api/1.0/';
  	var apiKey = 'OdndqsuLdHSoFNKIsbvs8A';
  	var toEmail = 'andrewzhongproject2014@hotmail.com';

  	var name = formData.firstName + ' ' + formData.lastName;

  	var request = {
	    "key": apiKey,
	    "message": {
	        "html": formData.comment,
	        "subject": name + ' has contacted you',
	        "from_email": formData.email,
	        "from_name": name,
	        "to": [
	            {
	                "email": toEmail,
	                "name": name,
	                "type": "to"
	            }
	        ],
	    }
	}

  	$.ajax({
		type: "POST",
		url: apiUrl + 'messages/send.json',
		data: request
	}).done(function( msg ) {
		if ( msg[0].status == 'sent' )
		{
			window.location = "thank-you.html";
		}
	});

  });

});
	