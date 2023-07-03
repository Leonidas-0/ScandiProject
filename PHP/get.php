<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET");
include 'db.php';

$query = "SELECT * FROM dvds INNER JOIN baseinfos ON dvds.sku=baseinfos.sku;";
$query .= "SELECT * FROM furnitures INNER JOIN baseinfos ON furnitures.sku=baseinfos.sku;";
$query .= "SELECT * FROM books INNER JOIN baseinfos ON books.sku=baseinfos.sku;";
$data = [];
if ($conn->multi_query($query)) {
  do {
    if ($result = $conn->store_result()) {
      while ($row = $result->fetch_assoc()) {
        $data[] = $row;
      }
      $result->free_result();
    }
  } while ($conn->next_result());
}
echo json_encode($data);