<?php
require_once 'BaseProduct.php';

class Furniture extends Baseinfo
{
    private $dimensions;

    public function setUniqueAttribute($data)
    {
        $this->dimensions = "{$data['width']}X{$data['height']}X{$data['length']}";
    }

    protected function saveType()
    {
        $conn = $this->db->getConnection();
        $stmt = $conn->prepare("INSERT INTO furnitures (sku, dimensions) VALUES (?, ?)");
        $stmt->bind_param('ss', $this->sku, $this->dimensions);
        $stmt->execute();
    }
}
