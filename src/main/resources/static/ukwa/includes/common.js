//common on load functions

function checkboxSize() {
	$(".form-check-cont").each(function(index, element) {
		$(this).height($(this).find("label").height()+10);
    });	
}

$(document).ready(function(e) {
	
	//bootstrap tooltips
	var isVisible=false;	
	$('[data-toggle="tooltip"]').tooltip({
		placement: 'bottom',
		trigger: 'manual'
	}).click(function(e) { e.stopPropagation(); }).keydown(function(e) { e.preventDefault(); e.stopPropagation(); }) //stopps click/keypress on the "?" button from expanding/collapsing the filters;
	$('[data-toggle="tooltip"]').each(function(index, element) {
        $(this).mouseleave(function(e) {
        	$('[data-toggle="tooltip"]').tooltip('hide');
			isVisible=false;
    	}); 
		$(this).on('click keydown', function (e) {
			if (e.which==1 || e.which==32 || e.which==13) {
				if (isVisible) {
					$('[data-toggle="tooltip"]').tooltip('hide');
					isVisible=false;
				} else {
					$(this).tooltip('show');
					isVisible=true;
				}
			}
    	});		
    });
	
	
	//remove tabindex from radio/check boxes
	$(this).find("input[type=radio], input[type=checkbox]").attr("tabindex", "-1");
		
	//radio and check button keyboard
    $(".form-check-cont").each(function(index, element) {
        $(this).on("keypress", function(e) {
			e.stopImmediatePropagation();
			$(this).find("input[type=radio], input[type=checkbox]").trigger("click");
		});
    });
	
	//main menu
	$(".main-menu-button").click(function(e) {
        $(".main-menu, .main-menu-block").addClass("active");
		$("html").css("overflow", "hidden");
    });
	
	$(".main-menu-close").click(function(e) {
        $(".main-menu, .main-menu-block").removeClass("active");
		$("html").css("overflow", "auto");
    });
	
	//sidebar collapse
	$("#toggle-sidebar").click(function(e) {
		if ($(this).hasClass("open")) {
			$(this).addClass("closed").removeClass("open");
			$(".sidebar-collapse").addClass("open");
		} else {
			$(this).addClass("open").removeClass("closed");
			$(".sidebar-collapse").removeClass("open");
		}
	});
	
	//scroll top
	$(".up-button").on('click keyup', function(e) {
		if(e.which == 13 || e.which == 1) $("html, body").animate({ scrollTop: 0 }, 600);
	});
	
	//replace broken images for collections
	$(".coll-img").each(function(index, element) {
		var elem=$(this);
		$.get(elem.attr('src'))
		.fail(function() { 
			var old_img=elem.attr('src');
			elem.unbind("error").attr("src", "img/collections/collection_default.png");
			console.log(old_img+' replaced with default image.');
		})
    });
	
	
	//add default HTML document type filter
	$("#search_form").submit(function(e) {
        showPleaseWait();
		if ($('checkbox[value="Web page"]').length===0 && $("#reset_filters").val()!=="true") $(this).append('<input type="hidden" name="content_type" value="Web Page" />');
    });
	
	//cookies notice
	if (typeof $.cookie('cookies_accepted') === 'undefined' || $.cookie('cookies_accepted')!=="true") $(".cookies-cont").show();
 
	//close cookie notice
	$("#btn_cookies").click(function(e) {
        $.cookie("cookies_accepted", "true", { expires: 365, path: '/' });
		$(".cookies-cont").hide();
    });
	
	//on load and resize
	$(window).on ("load resize", function(e) {
		checkboxSize(); //expand checkbox size to fit label content
    });
	
	//search highlighting
	if ($(".results-container").length!==0) {
	
		//every text section that needs highlighting has this class .results-for-hightlight
		$(".results-for-highlight").each(function(index, element) {
		
			var restext=$(this).html();
			var query=$(".main-search-field").val();
			var matches=[];
			var uniqueMatches=[];
			var invalid = /[°"§%()\[\]{}=\\?´`'#<>|,;.:~*\\+_-]+/g;
			var operators = ["AND", "NOT", "OR"]
			
			query = query.replace(invalid, " ");
			var terms=query.split(" ");
			
			//match all search terms
			$.each(terms, function(i, term) {
				var rexp = new RegExp(term, 'gi');
				var current_match = restext.match(rexp);
				matches=matches.concat(current_match)
			});
			
			//remove duplicates
			$.each(matches, function(i, el){
				if($.inArray(el, uniqueMatches) === -1 && el!==' ' && el!=='') uniqueMatches.push(el);
			});
			
			//replace with highlight style
			$.each(uniqueMatches, function(i, el){
				var rexp = new RegExp(el, 'g');
				restext=restext.replace(rexp, '<span class="results-highlight">'+el+'</span>');
			});
			
			$(this).html(restext);
		
		});
		
	}
	
	//No collection descript
	$(".collection-description").each(function(index, element) {
		if ($(this).text().trim()=="") $(this).html('<span class="gray">'+$("#no-coll-description").val()+'</span>');
	});
	
	//format results count
	$(".results-count").each(function(index, element) {
        $(this).text($.number($(this).text(),0,".",","));
    });	
	
	//match height for collection headings and descriptions
	$('.collection-heading').matchHeight();	
	$('.img-square-caption').matchHeight();
	
	//hide back button if not needed
	if (history.length<3) $(".back-button").hide();
	
});