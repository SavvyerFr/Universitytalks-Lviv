/* Запускаем когда страница готова | trigger when page is ready */
$(document).ready(function(){

	// Добавляйте Ваши функции сюда | your functions go here
	
	$('.form-wrap input[type=text]').focus(function(){
		$('.form-wrap .form-input').each(function(){
			$(this).removeClass('focus');
		})
		$(this).parent('.form-input').addClass('focus');
	})
	
	$('.photo-slider').slick({
		appendArrows: '.arrows-wrap-about',
		prevArrow: '<a href="#" class="slider-arrow arrow-prev"></a>',
		nextArrow: '<a href="#" class="slider-arrow arrow-next"></a>',
	})
	
	$('.best-models-arrow a').click(function(){
		$('.best-models-arrow a').each(function(){
			$(this).removeClass('disabled');
		})
		if($(this).hasClass('arrow-prev')) {
			
			$('.best-models-wrap.active').fadeOut(200).removeClass('active').prev().fadeIn(200).addClass('active');
			if($('.best-models-wrap.active').is(':first-child')){
				$(this).addClass('disabled')
			}

		}else{
			$('.best-models-wrap.active').fadeOut(200).removeClass('active').next('.best-models-wrap').fadeIn(200).addClass('active');
			if($('.best-models-wrap.active').is(':last-child')){
				$(this).addClass('disabled')
			}
		}
	})
	$('.catalog-arrow a').click(function(){
		$('.catalog-arrow a').each(function(){
			$(this).removeClass('disabled');
		})
		if($(this).hasClass('arrow-prev')) {
			
			$('.catalog-wrap.active').fadeOut(200).removeClass('active').prev().fadeIn(200).addClass('active');
			if($('.catalog-wrap.active').is(':first-child')){
				$(this).addClass('disabled')
			}

		}else{
			$('.catalog-wrap.active').fadeOut(200).removeClass('active').next().fadeIn(200).addClass('active');
			if($('.catalog-wrap.active').is(':last-child')){
				$(this).addClass('disabled')
			}
		}
	})
	
	$('.category-image').click(function(){
		var cat = $(this).data('cat');
		$('.'+cat).css('visibility', 'visible');
	})
	/*$('a.popup-gallery').click(function(e){
		e.preventDefault();
		
		html = '<div class="popup-bg"></div>' + 
				'<div class="popup-wrapper">';
		$('a.popup-gallery').each(function(){
			var img = $(this).attr('href');
			html += '<div><img src="' + img + '" alt="" /></div>';
			//console.log(img);
		})
		html += '</div>';

		$(this).closest('.fixed-wrapper').append(html);
		
		$('.popup-wrapper').slick({
			variableWidth: true,
			slideToshow: 1,
		});
	})*/
	
	$(".mobile .vertical-nav a[href^=#]").click(function (event) {
        event.preventDefault();
		
		$(".mobile .vertical-nav a[href^=#]").each(function(){
			$(this).removeClass('active');
		})
		$(this).addClass('active');
        var id  = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 1500);
    });
	
	$('.btn-call-modal').click(function(){
		$('.modal-wrap, .modal-bg').fadeIn(200);
	})
	$('.modal-bg').click(function(){
		$('.modal-wrap, .modal-bg').fadeOut(200);
	})
	
	$('a[href=#]').click(function(e){ e.preventDefault(); });

});


function callback(obj){
	
	var form = $(obj).closest('form');
	
    var x = true;
		
    form.find('.form-input').removeClass('error');
		
    form.find('input[type=text]').each(function() {
        if ($(this).val() === '') {
            $(this).parent().addClass('error');
            $(this).focus();
            x = false;
            return false;
        }
    });
    if (x) {
        form.find('.form-input').removeClass('error');
		$.ajax({
			url: "sender.php",
			type: "POST",
			data: form.serialize(),
			dataType: 'json',
			beforeSend: function(){
				//$(obj).closest('.form-wrap').html('<div class="form-loader"></div>')
			},
			success: function(json) {
				if(json['success']){
					$(obj).closest('.form-wrap').addClass('form-success').html('<div class="form-title">СПАСИБО</div><div class="text-success">' + json['success'] + '</div>');
				}
			},
			error: function(xhr, ajaxOptions, thrownError){
				console.log(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
			}
		});
    }
    return false;
    
}
