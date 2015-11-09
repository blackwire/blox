$(document).ready(function() {
	
	//--------------------------------------------------------------------------------------
	//--- globals
	//--------------------------------------------------------------------------------------
	
	var slide_duration = 200;
	var fade_duration = 500;
	var auto_save_interval = null;
	
	//--------------------------------------------------------------------------------------
	//--- functions
	//--------------------------------------------------------------------------------------
	
	function auto_save(param_bloc) {
		
		var bloc = $(param_bloc);
		var bloc_id = bloc.attr('id');
		var bloc_label = $('input', bloc).val();
		var bloc_text = $('textarea', bloc).val();
		var bloc_color = $('span', bloc).text();
		
		$.ajax({
			url: 'post/auto_save.php',
			method: 'POST',
			async: true,
			data: {
				'id': bloc_id,
				'label': bloc_label,
				'text': bloc_text,
				'color': bloc_color
			}
		});
		
	}
	
	function minimize(param_bloc, bloc_swapping) {
		
		var bloc = $(param_bloc);
		
		$('input, textarea', bloc).hide();
		$('.alters').hide();
		bloc.removeClass('max', slide_duration, 'easeInCirc', function() {
			$('input', bloc).prop('disabled', true).fadeIn();
		});
		
		clearInterval(auto_save_interval);
	}
	
	function maximize(param_bloc) {
		
		var bloc = $(param_bloc);
		
		$('input, textarea', bloc).hide();
		bloc.addClass('max', slide_duration, 'easeOutCirc', function() {
			$('input', bloc).prop('disabled', false).fadeIn();
			$('textarea', bloc).fadeIn();
			$('.alters').fadeIn();
		});
		
		auto_save_interval = setInterval(function() { auto_save(bloc); }, 1000);
			
	}
	
	//--------------------------------------------------------------------------------------
	//--- click events
	//--------------------------------------------------------------------------------------
	
	$('#blox').on('click', '[class*="bloc"]', function(event) {
		
		var bloc = $(this);
		var max_bloc = $('[class*="bloc"].max');
		var first_bloc = $('[class*="bloc"]').first();
		
		if (!bloc.hasClass('max')) {
			
			if (max_bloc.length) { 
				
				minimize(max_bloc, true);
				setTimeout(function() { 
					max_bloc.css('opacity', 0);
					bloc.css('opacity', 0);
					max_bloc.insertAfter(bloc);
					bloc.insertBefore($('[class*="bloc"]').first()); 
					max_bloc.animate({'opacity': 1}, fade_duration, 'linear');
					bloc.animate({'opacity': 1}, fade_duration, 'linear');
					setTimeout(function(){ maximize(bloc); }, fade_duration);
				}, fade_duration);
				
			} else if (!bloc.is('[class*="bloc"]:first')) { 
				
				first_bloc.css('opacity', 0);
				bloc.css('opacity', 0);
				first_bloc.insertAfter(bloc);
				bloc.insertBefore($('[class*="bloc"]').first());
				first_bloc.animate({'opacity': 1}, fade_duration, 'linear');
				bloc.animate({'opacity': 1}, fade_duration, 'linear');
				setTimeout(function(){ maximize(bloc); }, fade_duration);
				
			} else { maximize(bloc); }
				
		}
		
		return false;
		
	});
	
	$(document).click(function() { $('[class*="bloc"].max').each(function() { minimize(this, false); }); });
	
	$('#hash_gen').click(function() {
		
		var hash = (Math.random().toString(36) + Math.random().toString(36)).replace(/0\./g, '').substr(0, 17);
		console.log(hash);
		
	});
	
	//-- add new bloc
	
	$('.add_bloc').click(function() {
		
		$.ajax({
			url: 'post/bloc_com.php',
			method: 'POST',
			async: true,
			data: {
				'com_type': 'add',
				'label': 'label',
				'color': 'grey'
			},
			success: function(response) {
				var bloc_data = JSON.parse(response);
				var bloc_id = bloc_data['id'];
				var bloc_html = $('' +
				'<section style = \'display: none;\' class = \'content_bloc grey\' id = \'' + bloc_id + '\'>' +
						'<input type = \'text\' maxlength = \'9\' value = \'label\' disabled = \'disabled\'></input>' +
						'<textarea>...</textarea>' + 
						'<span>grey</span>' +	
				'</section>');
				bloc_html.insertBefore($('[class*="bloc"]').first());
				$('#' + bloc_id).fadeIn();
			}
		});
		
		return false;
		
	});
	
	//-- delete bloc
	
	$('.alters #drop').click(function() {
		
		var cancelled = !confirm('OK to drop ( delete / remove / magic-away ) this bloc?');
		if (cancelled) { return false; }
		
		var bloc_id = $('[class*="bloc"].max').attr('id');
		
		$.ajax({
			url: 'post/bloc_com.php',
			method: 'POST',
			async: true,
			data: {
				'com_type': 'drop',
				'id': bloc_id
			},
			success: function() {
				$('#' + bloc_id).fadeOut().remove();
			}
			
		});
		
	});
	
	//--- change bloc color
	
	$('.alters #color li').click(function (){
	
		var bloc_color = $(this).attr('class');
		var bloc_id = $('[class*="bloc"].max').attr('id');
		var bloc = $('#' + bloc_id);
		var old_color = $('span', bloc).html();
		bloc.removeClass(old_color).addClass(bloc_color);
		$('span', bloc).html(bloc_color);
		
		return false;
		
	});
	
	//--------------------------------------------------------------------------------------
	//--- textual extras
	//--------------------------------------------------------------------------------------
	
	var prev_key = null;
	
	$('.content_bloc textarea').keyup(function(key) {
		
		var textarea = $(this);
		var key_code = key.which;
		var key_val = String.fromCharCode(key_code);
		var prev_key_code, prev_key_val;
		if (prev_key) { 
			prev_key_code = prev_key.which;
			prev_key_val = String.fromCharCode(prev_key_code);
		 }
		 
		 var backspace = key_code == 8;
		 var enter = key_code == 13;
		 var prev_enter = prev_key_code == 13;
		
		if (enter || backspace) {
			
			var text_lines = textarea.val().split('\n');
			var last_line = text_lines[text_lines.length - 2];
			
			if (last_line) {
			
				var number_icon = last_line.match(/^(\d+)(\s*)([\.\)\]\-\:\;])/);
				if (prev_enter) {
					
					if (backspace && number_icon) { textarea.val(text_lines.slice(0, text_lines.length - 1).join('\n') + '\n'); }
					else if (enter) { textarea.val(text_lines.slice(0, text_lines.length - 2).join('\n') + '\n\n'); }
					
				} else if (enter && number_icon) { 
					textarea.val(
						textarea.val() +
						(parseInt(number_icon[1]) + 1).toString() + number_icon[2] + number_icon[3] + ' '
					); 
				}
				
			}
		}
		
		prev_key = key;
		
	});
	
});