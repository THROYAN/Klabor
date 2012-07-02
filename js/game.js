$(function() {

	var playersTables = [
		{
			width: 300,
			height: 100,
			left: 100,
			top: 100,
			angle: 90,
		},
		{
			width: 300,
			height: 100,
			left: 400,
			top: 100,
			angle: 0,
		},
		{
			width: 300,
			height: 100,
			left: 100,
			top: 300,
			angle: 180,
		},
		{
			width: 300,
			height: 100,
			left: 400,
			top: 300,
			angle: 270,
		},
	];
	
	for (var i in playersTables) {
		var $plTable = $('<div id="player' + i + '-table" class="player-table">' +
							'<div class="inner-table content"></div>' +
							'<div class="player-cards">' +
								'КАРТЫ' +
							'</div>' +
							'<div class="player-info">' +
								'АВА' +
							'</div>' +
							'<div id="center' + i + '"></div>' +
						'</div>');
		$('body').append($plTable);
		
		var plTable = playersTables[i];
		$plTable.width( plTable.width )
				.height( plTable.height )
				.offset({
					left: plTable.left,
					top: plTable.top,
				})
				.rotate( plTable.angle )
				;
		
		plTable.timer = setInterval( function($plTable, i) {
			$plTable.rotate(parseFloat($plTable.rotate()) + 3);
			$plTable.qtip('reposition');
			$('#center' + i).css({
				position: 'inherit',
				left: $plTable.width() / 2 - 1,
				top: $plTable.height() / 2 - 1,
				border: 'solid 1px black',
				width: 2,
				height: 2,
			});
		}, 10, $plTable, i);
	}
	
	$('.player-table').each(function(i, e) {
		$(e).qtip({
			id: e.id + '-message',
			content: 'СООБЩЕНЬИЦЕ',
			show: {
				event: false,
				ready: true,
			},
			hide: false,
			style: {
				tip: {
					border: 1,
				},
				widget: true,
			},
			position: {
				at: 'bottom middle',
				my: 'top middle',
				container: $(e),
			},
			events: {
				render: function(event, api) {
					$('.ui-tooltip-content', this).addClass('ui-corner-all');
				},
			},
	   });
	});
	
	$('.corners').addClass('ui-corner-all');
	$('.content').addClass('ui-widget ui-corner-all ui-widget-content');
	$('.general').addClass('ui-widget-content');
});