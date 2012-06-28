$(function() {

	$('.player-message').tipTip({ content: 'HELLO TIPWORLD!' });
	$('.player-info').tipsy({ fallback: 'HELLO TIPWORLD!', trigger: 'manual' });
	$('.player-info').tipsy('show');
});