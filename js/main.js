// Объект типа. как структура, только здесь всё такое "резиновое"
var _globalOptions = {
	gameOptions: { // и вот его поле тоже объект
		minScores: 500, // а тут нет
		maxScores: 5000,
		scoresStep: 500,
	},
	userOptions: { // тут опять да
		minScores: 500,
		maxScores: 500,
	},
};

// описываем функцию opt с какими-то аргументами (скажу сразу, тут не всё такое типизированное, как в C#)
// тут можно передать что хочешь и сколько хочешь, остаётся всё проверять вручную =)
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
	
	for ( var i in obj ) { // цикл (как foreach) по свойствам (полям) объекта, т.е. в i будем имя свойства
		var f = _findOpt( opt, obj[ i ] ); // и чтобы к нему обратится нужно сделать obj[ i ]
		if ( f != null ) {
			return f;
		}
	}
	
	return null; // не то, чтобы обязательно было что-то возвращать, это не C#, результат и без этого будет null, но я для себя пишу, так понятнее
}

/*
	О-о-о, тут всё сложнее. Хотя можно попробовать по-проще объяснить...
представь, что $ - это f, или o, или func, короче имя функции, суть в том, что в именах функций можно использовать доллары.
а одни очень известные типочки использовали доллар в своей библиотеке везде просто. И вот получается, что $ - это функция и тут
мы её вызываем, при чём первым параметром мы передаём функцию (анонимную, так вот называется, у неё же имени нет =)).
	В общем эта библиотека называется JQuery. А эта функция может делать разное, например, если ты передашь в неё функцию, как сейчас,
то получится что-то вроде document.onload = function(){...}; Типа эта функция вызовется при полной загрузке страницы. Это нужно потому что
скрипт начнёт выполняться сразу при загрузке это файла, а он подключается где-то вверху страницы, а нужно работать со всеми элементами страницы
и нужно дождаться, чтобы они загрузились. вот
*/
$(function(){
	
	/*
		Опять эта зловещая функция $. Тут она используется как селектор элементов, теперь мы в неё передаём строку, в которой указываем
		к каким элементам применить функцию click, которая установить колбэк (callback) - обработчик события нажатия на них.
	*/
	// buttons
	$('#one-deal, #one-match, #start-game-button').click(function() {
		window.location.href = 'game.html'; // это переход куда-то
	});
	
	/*
		accordion - это мега JQuery-функция, которая устанавливает элементам вид аккордиона - это типа плагин для интерфейса.
		Если ты нажмёшь на кнопку "Быстрая игра" и "Фильтр", то поймёшь в чём её суть.
	*/
	// main menu (accordion)
	$('#menu').accordion({ // и в неё передаётся объект с настройками аккордиона (см. документацию JQuery(UI))
		collapsible: true,
		header: "h3",
		autoHeight: false,
		navigation: true,
		change: function() { // а это что-то вроде метода.
			if ($('#menu').accordion('option', 'active') == 1) {
				$('#game-mode').buttonsetv().change();
			}
		},
	}).accordion('option', 'active', false); // функция accordion вернёт тот же набор элементов, что и $('#menu'), поэтому я могу еще раз так сделать.
											// тут устанавливаются свойства аккордиона, которые нельзя при создании поставить, кажется
	
	// custom game options
	
	/*
		buttonsetv - то же плагинчик, но не стандартный, я его скачивал отдельно. Он просто делает вертикальный набор кнопок (в данном случае чекбоксов)
	*/
	// game mode
	$('#game-mode').buttonsetv().change(function() { // событие изменения состояния набора кнокок, типа нажатие и отжатие чекбоксов
		var count = $('input:checkbox', this).filter(function(i, e){
			return e.checked;
		}).length;
		
		if (count == 0) {
			$('#start-game-button').button('disable'); // и тут мы выключаем
		} else {
			$('#start-game-button').button('enable'); // или включаем кнопку "Начать игру"
		}
	}).change(); // а если в эту функцию ничего не передать, то это просто вызовет (с имитирует) само событие. Так я выключаю в самом начале кнопку "Начать игру"
	
	/*
		Вот так делает слайдер "Лимит партии"
	*/
	// game scores limit
	$( "#scores-limit" ).slider({
		range: true,
		min: 0,
		max: 9,
		values: [ 0, 9 ],
		// событие слайда слайдера)
		slide: function( event, ui ) { // в event обычно приходит херня как в C# в событиях объект e. Там типа инфа о событии. ui - у кого сработало событие.
			values = []; // Привет, я массив
			values[ 0 ] = (ui.values[ 0 ] + 1) * 500;
			values[ 1 ] = (ui.values[ 1 ] + 1) * 500;
			if ( values[ 0 ] == values[ 1 ] ) {
				$( "#scores-limit-label" ).html( values[ 0 ] + ' очков' ); // функция html устанавливает или возвращает содержимое элементов.
			} else {
				$( "#scores-limit-label" ).html( values[ 0 ] + " - " + values[ 1 ] + ' очков' ); // возвращает, если ничего не передать
			}
		},
	});
	
	$('button, #options-button, #user-avatar').button(); // превращаю невзрачную хуйню в кнопки
	//$('#main-window, #logo-img, #header, #footer, #user-avatar, #options img').addClass('ui-widget ui-widget-content ui-corner-all');
	
	$('.corners').addClass('ui-corner-all'); // добавляю классы к элементам
	$('.content').addClass('ui-widget ui-corner-all ui-widget-content'); // обрати внимание, что все эти функции применяются к наборам, полученным из $
	$('.general').addClass('ui-widget-content'); // а доллар возвращает специальные JQuery объекты, потому все эти функции применяются к ним и искать их надо на jquery.com
});