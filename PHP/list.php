<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
$servername = "localhost";
$username = "root";
$password = "";
$conn = new mysqli($servername, $username, $password, 'commerce');
class Product
{
  private $sku;
  private $name;
  private $price;

  // function __construct($sku, $name, $price)
  // {
  //   $this->sku = $sku;
  //   $this->name = $name;
  //   $this->price = $price;
  // }
  function set_sku($sku) {
    $this->sku = $sku;
  }
  function get_sku() {
    return $this->sku;
  }
  function set_name($name) {
    $this->name = $name;
  }
  function get_name() {
    return $this->name;
  }
  function set_price($price) {
    $this->price = $price;
  }
  function get_price() {
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
  function set_weight($weight) {
    $this->weight = $weight;
  }
  function get_weight()
  {
    return $this->weight;
  }
}
class Furniture extends Product
{
  private $height;
  private $width;
  private $length;
  function set_height($height) {
    $this->height = $height;
  }
  function get_height()
  {
    return $this->height;
  }
  function set_width($width) {
    $this->width = $width;
  }
  function get_width()
  {
    return $this->width;
  }
  function set_length($length) {
    $this->length = $length;
  }
  function get_length()
  {
    return $this->length;
  }
}

switch ($method) {
  case "GET":
    $result = $conn->query("SELECT * FROM baseinfos");
    $data = [];
    while ($row = $result->fetch_assoc()) {
      $data[] = $row;
    }
    echo json_encode($data);
    break;
  case "POST":
    $typevalidator = [
      'dvd' =>  ['size'],
      'book' => ['weight'],
      'furniture' => ['height', 'width', 'length']
    ];
    $fieldvalues = array();
    $fieldnames = array();
    $type = $_POST['type'];
    foreach ($typevalidator[$type] as $field) {
      $product->set_. '' .$field($_POST[$field]);
      $fieldname = $product->get_. '' .$field;
      array_push($fieldvalues, $field);
      array_push($fieldnames, $fieldname);
    }
    $fieldvalues = implode(',', $fieldvalues);
    $fieldnames = implode(',', $fieldnames);
    $sku = $product->get_sku();
    $name = $product->get_name();
    $price = $product->get_price();
    $insertbase = $conn->prepare("INSERT INTO baseinfos (sku,name,price) VALUES ('$sku', '$name', '$price')");
    $insertbase->execute();
    $inserttype = $conn->prepare("INSERT INTO {$type}s (baseinfo, $fieldnames) values((SELECT sku FROM baseinfos WHERE sku='$sku'), $fieldvalues);");
    $inserttype->execute();
    break;
}
