<?php

function redirect($location) {
	header("location: " . $location);
	exit();
}

function morph($text, $style = '') {
	$text = htmlspecialchars($text, ENT_QUOTES);
	if (style == 'upper') { $text = strtoupper($text); }
	return $text;
}

function demorph($text) {
	$text = htmlspecialchars_decode($text, ENT_QUOTES);
	return $text;
}

	
?>