<?php 
require_once('config/init.php');
$_SESSION['hash'] = $_GET['hash'];
$hash = morph($_GET['hash']);
$query = $db -> query("SELECT * FROM `blox` WHERE hash = '{$hash}'");
if ($query -> rowCount() == 0) { redirect(_DOMAIN_); } 
?>

<!DOCTYPE HTML>
	<html lang = 'en'>
	<head>
		<meta http-equiv = 'content-type' content = 'text/html; charset=utf-8'>
		<link rel = 'stylesheet' type = 'text/css' href = '<?php echo $_LOCATE['FONT']; ?>'>
		<link rel = 'stylesheet' type = 'text/css' media = 'screen' href = '<?php echo $_LOCATE['CSS']; ?>'>
		<script type = 'text/javascript' src = '<?php echo $_LOCATE['JQUERY']; ?>'></script>
		<script type = 'text/javascript' src = '<?php echo $_LOCATE['JQUERY_UI']; ?>'></script>
		<script type = 'text/javascript' src = '<?php echo $_LOCATE['JS']; ?>' async></script>
		<title>Blox</title>
	</head>
	<body>
		<article id='blox'>
			<?php while ($bloc = $query -> fetch(PDO::FETCH_ASSOC)) { ?>
			
				<section class = 'content_bloc <?php echo $bloc['color']; ?>' id = '<?php echo $bloc['id']; ?>'>
						<input type = 'text' maxlength = '9' value = '<?php echo demorph($bloc['label']); ?>' disabled = 'disabled'></input>
						<textarea><?php echo demorph($bloc['text']); ?></textarea>
						<span><?php echo $bloc['color']; ?></span>		
				</section>
				
			<?php } ?>
			<section class = 'add_bloc'><h1>&roplus;</h1></section>
			<section class = 'alters'>
				<div id = 'drop'>&times;</div>
				<ul id = 'color'>
					<li class = 'red'></li>
					<li class = 'blue'></li>
					<li class = 'green'></li>
					<li class = 'yellow'></li>
					<li class = 'orange'></li>
					<li class = 'purple'></li>
					<li class = 'brown'></li>
					<li class = 'grey'></li>
				</ul>
			</section>
		</article>
	</body>
</html>