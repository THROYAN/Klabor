$(function() { // при загрузке страницы

	var playersTables = [ // настройки столов
		{
			width: 300,
			height: 100,
			left: 100,
			top: 100,
			angle: 0,
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
			angle: 0,
		},
		{
			width: 300,
			height: 100,
			left: 400,
			top: 300,
			angle: 0,
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
						'</div>'); // если в $ передать html тэги, то он их типа создаст. если ты напишешь $('div'), он вернёт все div'ы
		$('#tables-container').append($plTable); // вот здесь он тулит на саму страничку, точнее внутрь #tables-container 
		
		var plTable = playersTables[i];
		$plTable.width( plTable.width ) // устанавливаем всякие настройки
				.height( plTable.height )
				.offset({
					left: plTable.left,
					top: plTable.top,
				})
				.rotate( plTable.angle ) // даже крутим
				;
		
		plTable.timer = setInterval( function($plTable, i) { // setInterval - это такой таймер специальный. на http://javascript.ru/setInterval
			$plTable.rotate(parseFloat($plTable.rotate()) + 3); // тут мы крутим столы
			$plTable.qtip('reposition'); // qtip - плагин для тултипчиков (подсказок, облачков)
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
	
	$('.player-table').each(function(i, e) { // each - это как цикл по элементам (типа foreach). i - индекс, e - элемент. еще можно this использовать, это тоже элемент 
		$(e).qtip({ // тут всякие настройки. и да, если в $ передать объект HTML (DOM), то он вернёт JQuery объект с ним
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
	
	$('.corners').addClass('ui-corner-all'); // селекторы с '#' в начале - это селекторы по id элементам 
	$('.content').addClass('ui-widget ui-corner-all ui-widget-content'); // а с '.' - по классам
	$('.general').addClass('ui-widget-content'); // такие вот css селекторы [http://api.jquery.com/category/selectors/]
});