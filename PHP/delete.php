<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: POST");
include 'db.php';

$stmt = $conn->prepare('DELETE FROM baseinfos WHERE sku = ?');
$stmt->bind_param('s', $sku);
foreach ($_POST['sku'] as $sku) {
    $stmt->execute();
}