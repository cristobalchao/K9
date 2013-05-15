/**
* K9 v0.9
*
*
* Copyright (c) 2013 Cristobal Chao
* MIT License
**/
(function( window, $, undefined ){

	/*** META FOR MEDIA-SCREEN ***/
	var viewPortTag=document.createElement('meta');
	viewPortTag.id="viewport";
	viewPortTag.name = "viewport";
	viewPortTag.content = "width=device-width, initial-scale=1, maximum-scale=1";
	document.getElementsByTagName('head')[0].appendChild(viewPortTag);

	/*** TRANSITIONS ***/
	var k9_transition = styleSupport( "transition" ),
		k9_duration = k9_transition+'-duration',
		k9_timing = k9_transition+'-timing-function';

	function styleSupport( prop ) {
		var vendorProp, supportedProp,
		capProp = prop.charAt(0).toUpperCase() + prop.slice(1),
		prefixes = [ "Moz", "Webkit", "O", "ms" ],
		newprefixes = [ "-moz-", "-webkit-", "-o-", "-ms-" ],
		div = document.createElement( "div" );

		if ( prop in div.style ) {
			supportedProp = prop;
		} else {
			for ( var i = 0; i < prefixes.length; i++ ) {
				vendorProp = prefixes[i] + capProp;
				if ( vendorProp in div.style ) {
					supportedProp = newprefixes[i]+prop;
					break;
				}
			}
		}

		div = null;
		$.support[ prop ] = supportedProp;
		return supportedProp;
	}

    $.fn.setDuration = function(time) { //Set duration (ms)
    	this.css(k9_duration,time+'ms');
    }

    $.fn.getDuration = function(){ //Get duration (ms)
    	return this.css(k9_duration);
    }

 	$.fn.setTiming = function(timing) { //Set Timing
 		this.css(k9_timing,timing);
 	}

	$.fn.getTiming = function(){ //Get Timing
		return this.css(k9_timing);
	}
	/*** END TRANSITIONS ***/


	/*** MAIN K9 FUNCTIONS ***/
	function setElements(type){

		switch(type){

			case 'smartphone':
			var numberElements = $k9.smartphoneElements;
			break;

			case 'landSmartphone':
			var numberElements = $k9.landSmartphoneElements;
			break;

			case 'ipad':
			var numberElements = $k9.ipadElements;
			break;

			case 'normal':
			var numberElements = $k9.normalElements;
			break;

			default:
			var numberElements = 1;
			break;
		}

		var smartWidth = 100/numberElements,
			smartHMargin = ($k9.marginH * 100/$k9.container.width());

		if ( smartWidth !== 100 ){
			smartWidth -= smartHMargin;
		}else{
			smartHMargin = 0;
		}

		$('.'+$k9.containerItem).css({'width': smartWidth+'%', 'margin-right':smartHMargin+'%','margin-top':$k9.marginV+'px'});

		$('.'+$k9.containerItem+':lt('+numberElements+')').css('margin-top',0);

		$('.'+$k9.containerItem+':nth-child('+numberElements+'n)').css('margin-right',0);
	}

	function responsive(){
		var win_w = $(window).width();

		switch(true) {
            case ( win_w <= 320  ): //Smartphone
            	setElements('smartphone');
            	break;
            
            case ( win_w > 320 && win_w < 768 ): //Smartphone landscape
                setElements('landSmartphone');
                break;
            
            case ( win_w >= 768 && win_w < 1024 ): //Ipad
                setElements('ipad');
                break;

            case ( win_w >= 1024 ):
                setElements('normal');
                break;
        }

    }

	function init(){
		$("<style type='text/css'> ."+ $k9.containerItem +"{ display: inline-block;margin: 0px;padding: 0px;position:relative; margin-top:"+ $k9.containerItem.marginV +"px; vertical-align:top} </style>").appendTo("head");

		$k9.container.css({'font-size': '0px','letter-spacing': '0px','word-spacing': '0px;'});

		$k9.container.children().each(function(){
			$(this).wrap('<div class="'+ $k9.containerItem +'" />');
		});

		$('.'+$k9.containerItem).setDuration($k9.duration);
		$('.'+$k9.containerItem).setTiming($k9.timing);

		$('.'+$k9.containerItem).children().css({'width': '100%'});

		responsive();
	}

	$(window).on('resize', function(){
		responsive();
	});
	///*** END MAIN FUNCTIONS ***/

	// *** K9 START ***
	$.fn.k9 = function(args) {
		var $this = this,
			_item = '#' + $this.attr('id') + ' > ' + $this.children(),
			_smartphone = (!!args.numSmartphone) && args.numSmartphone || 1,
			_landSmartphone = (!!args.numlandSmartphone) && args.numlandSmartphone || 2,
			_ipad = (!!args.numIpad) && args.numIpad || 3,
			_normal = (!!args.numNormal) && args.numNormal || 4,
			_marginH = (!!args.marginHorizontal) && parseFloat(args.marginHorizontal) || 0,
			_marginV = (!!args.marginVertical) && parseFloat(args.marginVertical) || 0,
			_timing = (!!args.timing) && args.timing || 'ease-in-out',
			_duration = (!!args.duration) && args.duration || 800;

		$k9 = {
			container: $this,
			containerItem: 'k9-container-item',
			item: _item,
			smartphoneElements: _smartphone,
			landSmartphoneElements: _landSmartphone,
			ipadElements: _ipad,
			normalElements: _normal,
			marginH: _marginH,
			marginV: _marginV,
			timing: _timing,
			duration: _duration,
		}

		init();

		return true;

	}

})( window, jQuery );