var _globalOptions = {
	gameOptions: {
		minScores: 500,
		maxScores: 5000,
		scoresStep: 500,
	},
	userOptions: {
		minScores: 500,
		maxScores: 500,
		
	},
};

function opt( option ) {
	/*if ( globalOptions[ opt ] != null ) {
		return globalOptions[ opt ];
	}
	var cur = globalOptions;
	for ( var i in cur ) {
		if ( cur[i][opt] != null ) {
		
		}
	}
	
	return null;*/
	return _findOpt( option, _globalOptions );
}

function _findOpt( opt, obj ) {
	if ( obj[ opt ] != null ) {
		return obj[ opt ];
	}
	
	for ( var i in obj ) {
		var f = _findOpt( opt, obj[ i ] );
		if ( f != null ) {
			return f;
		}
	}
	
	return null;
}

$(function(){
	
	// buttons
	$('#one-deal, #one-match, #start-game-button').click(function() {
		window.location.href = 'game.html';
	});
	
	// main menu (accordion)
	$('#menu').accordion({
		collapsible: true,
		header: "h3",
		autoHeight: false,
		navigation: true,
		change: function() {
			if ($('#menu').accordion('option', 'active') == 1) {
				$('#game-mode').buttonsetv().change();
			}
		},
	}).accordion('option', 'active', false);
	
	// custom game options
	
	// game mode
	$('#game-mode').buttonsetv().change(function() {
		var count = $('input:checkbox', this).filter(function(i, e){
			return e.checked;
		}).length;
		
		if (count == 0) {
			$('#start-game-button').button('disable');
		} else {
			$('#start-game-button').button('enable');
		}
	}).change();
	
	// game scores limit
	$( "#scores-limit" ).slider({
		range: true,
		min: 0,
		max: 9,
		values: [ 0, 9 ],
		slide: function( event, ui ) {
			values = [];
			values[ 0 ] = (ui.values[ 0 ] + 1) * 500;
			values[ 1 ] = (ui.values[ 1 ] + 1) * 500;
			if ( values[ 0 ] == values[ 1 ] ) {
				$( "#scores-limit-label" ).html( values[ 0 ] + ' очков' );
			} else {
				$( "#scores-limit-label" ).html( values[ 0 ] + " - " + values[ 1 ] + ' очков' );
			}
		},
	});
	
	$('button, #options-button, #user-avatar').button();
	//$('#main-window, #logo-img, #header, #footer, #user-avatar, #options img').addClass('ui-widget ui-widget-content ui-corner-all');
	
	$('.corners').addClass('ui-corner-all');
	$('.content').addClass('ui-widget ui-corner-all ui-widget-content');
	$('.general').addClass('ui-widget-content');
});