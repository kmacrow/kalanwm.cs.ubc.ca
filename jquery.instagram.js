
(function($)
{

	'use strict';

	var api_base = 'https://api.instagram.com/v1/';

	$.fn.instagram = function(options) {
		
		var $this = this;

		var settings = {
			   'userid': null,
				  'tag': null,
			'client_id': null
		};

		for(var key in settings) {
			if(options.hasOwnProperty(key)
				&& typeof options[key] != 'undefined') {
				settings[key] = options[key];
			}
		}

		// check settings...

		$.ajax({
			'url': api_base + 'tags/' + settings.tag + '/media/recent/',
			'type': 'GET',
			'data': {'client_id': settings.client_id},
			'success': function(data, status, xhr)
			{
				console.log('instagram:', data);
			},
			'error': function()
			{
				console.error('instagram: failed to load.');
			}
		})

	}

})(jQuery);