<?php
require_once 'BaseProduct.php';

class DVD extends Baseinfo
{
    private $size;

    public function setUniqueAttribute($data)
    {
        $this->size = $data['size'];
    }

    protected function saveType()
    {
        $conn = $this->db->getConnection();
        $stmt = $conn->prepare("INSERT INTO dvds (sku, size) VALUES (?, ?)");
        $stmt->bind_param('ss', $this->sku, $this->size);
        $stmt->execute();
    }
}
