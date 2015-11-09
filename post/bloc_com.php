<?php 
require_once('../config/init.php');

if ($_SERVER['REQUEST_METHOD'] != 'POST') {
	redirect(_DOMAIN_);
}

$blox_hash = morph($_SESSION['hash']);

switch ($_POST['com_type']) {

	case 'add':
	
		$bloc_label = morph($_POST['label'], 'upper');
		$bloc_text = '...';
		$bloc_color = morph($_POST['color']);
		$bloc_id = intval($db -> query('SELECT `id` FROM `blox` ORDER BY `id` DESC LIMIT 1') -> fetch(PDO::FETCH_COLUMN)) + 1;
	
		$insert = $db -> prepare('INSERT INTO `blox`(`id`,`hash`,`label`,`text`,`color`) VALUES(:id,:hash,:label,:text,:color)');
		$insert -> bindValue(':id', $bloc_id);
		$insert -> bindValue(':hash', $blox_hash);
		$insert -> bindValue(':label', $bloc_label);
		$insert -> bindValue(':text', $bloc_text);
		$insert -> bindValue(':color', $bloc_color);
		$insert -> execute();
		
		$bloc_data = array();
		$bloc_data['id'] = $bloc_id;
		echo json_encode($bloc_data);
		
	break;
	case 'drop':
	
		$bloc_id = morph($_POST['id']);
	
		$delete = $db -> prepare('DELETE FROM `blox` WHERE `id` = :id AND `hash` = :hash LIMIT 1');
		$delete -> bindValue(':id', $bloc_id);
		$delete -> bindValue(':hash', $blox_hash);
		$delete -> execute();
		
	break;
	
}

?>