<?php
abstract class Product
{
    protected $sku;
    protected $name;
    protected $price;
    protected $db;

    public function __construct(Database $db)
    {
        $this->db = $db;
    }

    public function setSku($sku)
    {
        $this->sku = strtoupper($sku);
    }

    public function setName($name)
    {
        $this->name = $name;
    }

    public function setPrice($price)
    {
        $this->price = $price;
    }
    public function save()
    {
        $conn = $this->db->getConnection();
        $stmt = $conn->prepare("INSERT INTO baseinfos (sku, name, price) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $this->sku, $this->name, $this->price);
        $stmt->execute();

        $this->saveType();
    }

    abstract protected function saveType();
}
