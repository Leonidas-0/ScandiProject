<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: POST");
include 'db.php';

class Product
{
  private $sku;
  private $name;
  private $price;

  function set_sku($sku)
  {
    $this->sku = $sku;
  }
  function get_sku()
  {
    return $this->sku;
  }
  function set_name($name)
  {
    $this->name = $name;
  }
  function get_name()
  {
    return $this->name;
  }
  function set_price($price)
  {
    $this->price = $price;
  }
  function get_price()
  {
    return $this->price;
  }
}

class DVD extends Product
{
  private $size;

  function set_size($size)
  {
    $this->size = $size;
  }
  function get_size()
  {
    return $this->size;
  }
}
class Book extends Product
{
  private $weight;

  function set_weight($weight)
  {
    $this->weight = $weight;
  }
  function get_weight()
  {
    return $this->weight;
  }
}
class Furniture extends Product
{
  private $dimensions;

  function set_dimensions($height, $width, $length)
  {
    $this->dimensions = "{$width}X{$height}X{$length}";
  }
  function get_dimensions()
  {
    return $this->dimensions;
  }
}
class TypeValidator
{
  function dvd($dvd)
  {
    $dvd->set_size($_POST['size']);
    return ['size', $dvd->get_size()];
  }
  function book($book)
  {
    $book->set_weight($_POST['weight']);
    return ['weight', $book->get_weight()];
  }
  function furniture($furniture)
  {
    $furniture->set_dimensions($_POST['width'], $_POST['height'], $_POST['length']);
    return ['dimensions', $furniture->get_dimensions()];
  }
}
$validator = new TypeValidator();
$type = $_POST['type'];
$product = new $type();
$field = $validator->$type($product)[0];
$value = $validator->$type($product)[1];
$product->set_sku(strtoupper($_POST['sku']));
$product->set_name($_POST['name']);
$product->set_price($_POST['price']);
$sku = $product->get_sku();
$name = $product->get_name();
$price = $product->get_price();
$insertbase = $conn->prepare("INSERT INTO baseinfos (sku,name,price) VALUES (?, ?, ?)");
$insertbase->bind_param("sss", $sku, $name, $price);
$insertbase->execute();
$inserttype = $conn->prepare("INSERT INTO {$type}s (sku, $field) VALUES ((SELECT sku FROM baseinfos WHERE sku=?), ?);");
$inserttype->bind_param('ss', $sku, $value);
$inserttype->execute();
