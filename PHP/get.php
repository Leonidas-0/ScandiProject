<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET");
require_once 'db.php';

class DataFetcher
{
  private $db;

  public function __construct(Database $db)
  {
    $this->db = $db;
  }

  public function fetchData()
  {
    $conn = $this->db->getConnection();
    $data = [];

    $tables = ['dvds', 'furnitures', 'books'];
    foreach ($tables as $table) {
      $query = "SELECT * FROM $table INNER JOIN baseinfos ON $table.sku=baseinfos.sku;";
      if ($result = $conn->query($query)) {
        while ($row = $result->fetch_assoc()) {
          $data[] = $row;
        }
        $result->free();
      }
    }

    return $data;
  }
}

$fetcher = new DataFetcher($db);
$data = $fetcher->fetchData();
echo json_encode($data);
