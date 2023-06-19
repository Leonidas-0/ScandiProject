<?php
  header('Access-Control-Allow-Origin: http://localhost:3000');
$servername = "localhost";
$username = "root";
$password = "";
$conn = new mysqli($servername, $username, $password, 'commerce');
class Product {
  // Properties
  public $sku;
  public $name;
  public $price;

  // Methods
  function __construct($sku, $name, $price) {
    $this->sku = $sku;
    $this->name = $name;
    $this->price = $price;
}
  function get_sku() {
    return $this->sku;
  }
  function get_name() {
    return $this->name;
  }
  function get_price() {
    return $this->price;
  }
}

class DVD extends Product {
  public $size;
  function set_size($size) {
    $this->size = $size;
  }
  function __construct($size, $sku, $name, $price) {
    parent::__construct($sku, $name, $price);
    $this->size = $size;
}
  function get_size() {
    return $this->size;
  }
}
class Book extends Product {
  public $weight;
  function __construct($weight, $sku, $name, $price) {
    parent::__construct($sku, $name, $price);
    $this->weight = $weight;
}
  function get_weight() {
    return $this->weight;
  }
} 
class Furniture extends Product {
  public $height;
  public $width;
  public $length;
  function __construct($sku, $name, $price, $height, $width, $length) {
    parent::__construct($sku, $name, $price);
    $this->height = $height;
    $this->width = $width;
    $this->length = $length;
}
  function get_height() {
    return $this->height;
  }
  function get_width() {
    return $this->width;
  }
  function get_length() {
    return $this->length;
  }
}
$product = new Furniture('1235r', 'cupboard', 25, 64, 64, 64);
$method=$_SERVER['REQUEST_METHOD'];
$sku=$product->get_sku();
$name=$product->get_name();
$price=$product->get_price();
$height=$product->get_height();
$width=$product->get_width();
$length=$product->get_length();
// function console_log($output, $with_script_tags = true)
// {
//     $js_code = 'console.log(' . json_encode($output, JSON_HEX_TAG) . ');';
//     if ($with_script_tags)
//     {
//         $js_code = '<script>' . $js_code . '</script>';
//     }
//     echo $js_code;
// }
switch($method) {
  case "GET":
  $result = $conn->query("SELECT * FROM baseinfos WHERE SKU='$sku'");
  $data = [];
  while($row = $result->fetch_assoc()) {
    $data[] = $row;
}
echo json_encode($data);
    break;
  case "POST": 
    $insertbase= $conn -> prepare("INSERT INTO baseinfos (sku,name,price) VALUES ('$sku', '$name', '$price')");
    $insertbase->execute();
    $inserttype = $conn -> prepare("INSERT INTO furnitures (baseinfo, height, width, length) values((SELECT sku FROM baseinfos WHERE sku='$sku'), '$height', '$width', '$length');");
    $inserttype->execute();
    break;
}

?>
