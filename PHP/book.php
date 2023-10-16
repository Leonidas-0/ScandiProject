<?php
require_once 'BaseProduct.php';

class Book extends Baseinfo
{
    private $weight;

    public function setUniqueAttribute($data)
    {
        $this->weight = $data['weight'];
    }

    protected function saveType()
    {
        $conn = $this->db->getConnection();
        $stmt = $conn->prepare("INSERT INTO books (sku, weight) VALUES (?, ?)");
        $stmt->bind_param('ss', $this->sku, $this->weight);
        $stmt->execute();
    }
}
