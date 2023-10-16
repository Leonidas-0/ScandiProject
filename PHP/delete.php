<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: POST");
require_once 'db.php';

class ProductDeleter
{
    private $db;

    public function __construct(Database $db)
    {
        $this->db = $db;
    }

    public function deleteBySKU($sku)
    {
        $conn = $this->db->getConnection();
        $stmt = $conn->prepare('DELETE FROM baseinfos WHERE sku = ?');
        $stmt->bind_param('s', $sku);
        $stmt->execute();
    }
}

$deleter = new ProductDeleter($db);
foreach ($_POST['sku'] as $sku) {
    $deleter->deleteBySKU($sku);
}
