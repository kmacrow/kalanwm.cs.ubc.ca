
(function($)
{

	'use strict';

	var api_base = 'https://api.instagram.com/v1/';

	$.fn.instagram = function(options) {
		
		var $this = this;

		var settings = {
			   'userid': null,
				  'tag': null,
			'client_id': null,
				'proxy': null,
			  'display': 10
		};

		for(var key in settings) {
			if(options.hasOwnProperty(key)
				&& typeof options[key] != 'undefined') {
				settings[key] = options[key];
			}
		}

		// check settings...

		$.ajax({
			'url': settings.proxy,
			'type': 'GET',
			'data': {'url': api_base + 'tags/' + settings.tag 
							+ '/media/recent/?client_id=' + settings.client_id},
			'success': function(data, status, xhr)
			{
				var hits = data.data;
				var images = [];

				for(var i = 0; i < hits.length; i++) {
					var hit = hits[i];

					images.push({
						'thumb': hit.images.thumbnail.url,
						'full': hit.images.standard_resolution.url,
						'text': hit.caption.text,
						'created': parseInt(hit.created_time),
						'filter': hit.filter,
						'likes': hit.likes.count,
						'name': hit.user.full_name 
					});
				}

				images.sort(function(a, b){
					return b.created - a.created;
				});

				images = images.slice(0, settings.display);

				console.log(images);

				for(var i = 0; i < images.length; i++) {
					var image = images[i];
					$this.append('<img src="' + image.thumb 
						+ '" class="img img-polaroid" />');
				}

			},
			'error': function()
			{
				console.error('instagram: failed to load.');
			}
		})

	}

})(jQuery);