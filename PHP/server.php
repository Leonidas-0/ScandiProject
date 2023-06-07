<?php
  header('Access-Control-Allow-Origin: http://localhost:3000');
$servername = "localhost";
$username = "root";
$password = "";
$conn = new mysqli($servername, $username, $password, 'commerce');

// Create connection
// Check connection
// if ($conn->connect_error) {
//   die("Connection failed: " . $conn->connect_error);
// }
// echo "Connected successfully";
class Product {
  public $con;  
  // Properties
  public $sku;
  public $name;
  public $price;

  // Methods
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

class DVD extends Product {
  public $size;
  function set_size($size) {
    $this->size = $size;
  }
  function get_size() {
    return $this->size;
  }
}
class Book extends Product {
  public $weight;
  function set_weight($weight) {
    $this->weight = $weight;
  }
  function get_weight() {
    return $this->weight;
  }
} 
class Furniture extends Product {
  public $Dimensions;
  function set_Dimensions($Dimensions) {
    $this->Dimensions = $Dimensions;
  }
  function get_Dimensions() {
    return $this->Dimensions;
  }
}
$product = new Product();
$product->set_sku('1235r');
$product->set_name('prod1');
$product->set_price(4);
// $product->set_Dimensions('2X2X2');
$myJSON = json_encode($product);
$SKU=$product->get_sku();
$Name=$product->get_name();
$Price=$product->get_price();
echo $myJSON;

$stmt = $conn -> prepare("INSERT INTO baseinfo (SKU,Name,Price) VALUES (?, ?, ?)");
$stmt -> bind_param("sss", $SKU,  $Name,  $Price);
$stmt->execute();
if ($stmt === TRUE) {
  echo "New record created successfully";
} else {
  
}

?>
