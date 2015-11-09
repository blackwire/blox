<?php 
session_start();

define('_DOCUMENT_', $_SERVER['DOCUMENT_ROOT']);
define('_DOMAIN_', 'http://' . $_SERVER['SERVER_NAME']);
define('_CURRENT_', $_SERVER['REQUEST_URI']);

// Include configuration files
foreach(glob(_DOCUMENT_ . '/../keys/database/*.php') as $file){ require_once $file; }
require_once 'utils.php';

$_LOCATE = array(
	'INDEX' 	=> _DOMAIN_ . '/blox',
	'JQUERY' 	=> 'https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js',
	'JQUERY_UI' => 'https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js',
	'FONT' 		=> 'http://fonts.googleapis.com/css?family=Open+Sans:400italic,400,700',
	'CSS'		=> 'css/style.css',
	'JS'		=> 'js/logic.js'
);

?>