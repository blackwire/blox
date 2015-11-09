<?php 
require_once('../config/init.php');

if ($_SERVER['REQUEST_METHOD'] != 'POST') {
	redirect(_DOMAIN_);
}

$bloc_id = morph($_POST['id']);
$bloc_label = morph($_POST['label'], 'upper');
$bloc_text = morph($_POST['text']);
$bloc_color = morph($_POST['color']);
$blox_hash = morph($_SESSION['hash']);

$update = $db -> prepare('UPDATE `blox` SET `label` = :label, `text` = :text, `color` = :color WHERE `id` = :id AND `hash` = :hash');
$update -> bindValue(':id', $bloc_id);
$update -> bindValue(':hash', $blox_hash);
$update -> bindValue(':label', $bloc_label);
$update -> bindValue(':text', $bloc_text);
$update -> bindValue(':color', $bloc_color);
$update -> execute();

?>