var Init = {
	defaults : function(){
		var bodyHeight = 0;
		var bodyWidth = 0;
		var breakpoint;
		this.resize();
		window.addEventListener("resize", this.resize);
	},
	resize : function(){
		Init.getBrowserSize();
		Init.drawBreakPoint();

		Init.breakpoint = window.matchMedia('(min-width:992px)').matches;
		if(!Init.breakpoint){
			$('html').removeClass('is-desktop');
			$('html').addClass('is-mobile');
		}else{
			$('html').removeClass('is-mobile');
			$('html').addClass('is-desktop');
		}
	},
	getBrowserSize : function(){
		this.bodyHeight = Math.max(
			document.body.scrollHeight,
			document.body.offsetHeight,
			document.documentElement.clientHeight,
			document.documentElement.scrollHeight,
			document.documentElement.offsetHeight
		);
		this.bodyWidth = Math.max(
			document.body.scrollWidth,
			document.body.offsetWidth,
			document.documentElement.clientWidth,
			document.documentElement.scrollWidth,
			document.documentElement.offsetWidth
		);
	},
	drawBreakPoint : function(){
		$('html').attr('data-width',this.bodyWidth);
		$('html').attr('data-height',this.bodyHeight);
	},
};

var Main = {
	init : function(){

	}
};

var Header = {
	init : function(){
		this.scrolling();
		this.gnb();
		this.sitemap();
		window.addEventListener('mousewheel', Header.scrolling);
		window.addEventListener('touchmove', Header.scrolling);
		$(window).scroll(function(){
			Header.scrolling();
		});
	},
	scrolling : function(e){
		var scrollTop = $(window).scrollTop();
		var headerTop = $('#header').height();
		headerTop = Number(headerTop);

		if(scrollTop > 0){
			$('html').addClass('is-scrolled');
		}else{
			$('html').removeClass('is-scrolled');
		}

		if(scrollTop > headerTop){
			$('html').addClass('hide-header');
		}else{
			$('html').removeClass('hide-header');
		}
	},
	gnb : function(){
		var $ingDep2 = $('.gnb-dep1 > li.active');
		$('.gnb-dep1 > li').on('mouseenter',function(){
			$(this).siblings().removeClass('hover');
			//$(this).siblings().removeClass('active');
			$(this).addClass('hover');
			$('html').addClass('open-gnb-dep2');
		});
		$('#gnb').on('mouseleave',function(){
			$('html').removeClass('open-gnb-dep2');
			$('.gnb-dep1 li').removeClass('hover');
			$ingDep2.addClass('active');
		});

		//모바일
		$('.gnb-dep1 > .active').addClass('open');
		$('.gnb-dep1 > .active .gnb-dep2').css('display','block');
		$('.btn-hamburger').on('click',function(e){
			e.preventDefault();
			$('html').toggleClass('open-sitemap');
			$('html').toggleClass('open-mobile-gnb');
		});

		$('.gnb-dep1 > li > a').on('click',function(e){
			if($('html').hasClass('is-mobile')){
				if($(this).parent('li').hasClass('has-dep2')){
					e.preventDefault();
					if(!$(this).parent('li').hasClass('open')){
						$(this).parent('li').siblings().removeClass('open');
						$(this).parent('li').siblings().find('.gnb-dep2').slideUp(250);
						$(this).parent('li').addClass('open');
						$(this).parent('li').find('.gnb-dep2').slideDown(250);
					}else{
						$(this).parent('li').removeClass('open');
						$(this).parent('li').find('.gnb-dep2').slideUp(250);
					}
				}
			}
		});
	},
	sitemap : function(){
		$('#gnb .gnb-dim').clone().appendTo('#sitemap');
		$('#gnb .container').clone().appendTo('#sitemap');

		$('#sitemap .gnb-dim').on('click',function(){
			$('html').removeClass('open-sitemap');
		});
	}
};

var Common = {
	init : function(){
		this.common();
	},
	common : function(){
		//$('[data-event="datepicker"]').datepicker();

		//max length
		$('textarea, input').on("input", function () {
			if ($(this).attr('maxlength') !== "") {
				var maxlength = $(this).attr("maxlength");
				var content = $(this).val();

				$($(this).attr('data-byte-target')).html(content.length);

				if (content.length > maxlength) {
					$(this).val(content.substring(0, maxlength));
					$($(this).attr('data-byte-target')).html();
				}
			}
		});
	}
};

//썸네일 채우기
function setDirection(element) {
	if (element.naturalWidth / element.naturalHeight / element.parentNode.offsetWidth * element.parentNode.offsetHeight > 1) {
		element.classList.add('horizontal');
	} else {
		element.classList.add('vertical');
	}
}

$(function() {
	Init.defaults();
	Main.init();
	Common.init();
	Header.init();
});