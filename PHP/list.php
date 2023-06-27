<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
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
  private $height;
  private $width;
  private $length;
  function set_height($height)
  {
    $this->height = $height;
  }
  function get_height()
  {
    return $this->height;
  }
  function set_width($width)
  {
    $this->width = $width;
  }
  function get_width()
  {
    return $this->width;
  }
  function set_length($length)
  {
    $this->length = $length;
  }
  function get_length()
  {
    return $this->length;
  }
}

class TypeValidator
{
  public $dvd;
  public $book;
  public $furniture;
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
  case "GET":
    $query = "SELECT sku FROM baseinfos INNER JOIN dvds ON baseinfos.sku=dvds.baseinfo 
    UNION SELECT sku FROM baseinfos INNER JOIN furnitures ON baseinfos.sku=furnitures.baseinfo
    UNION SELECT sku FROM baseinfos INNER JOIN books ON baseinfos.sku=books.baseinfo ORDER BY sku;";
    $data = [];
    $result = $conn->query($query);
    while ($row = $result->fetch_assoc()) {
      $data[] = $row;
    }
    echo json_encode($data);
    break;
  case "POST":
    $type = $_POST['type'];
    $product = new $type();
    $typevalidator= new TypeValidator();
    $typevalidator->dvd = ['size'];
    $typevalidator->book = ['weight'];
    $typevalidator->furniture = ['height', 'width', 'length'];
    $chosen_property = $typevalidator->$type;
    $property_values = array();
    $property_names = array();
    foreach ($chosen_property as $property_name => $value) {
      $setter = "set_$value";
      $getter = "get_$value";
      $product->$setter($_POST[$value]);
      $property_getter = $product->$getter();
      array_push($property_values, $property_getter);
      array_push($property_names, $value);
    }
    $property_values = implode(',', $property_values);
    $property_names = implode(',', $property_names);
    $product->set_sku($_POST['sku']);
    $product->set_name($_POST['name']);
    $product->set_price($_POST['price']);
    $sku = $product->get_sku();
    $name = $product->get_name();
    $price = $product->get_price();
    $insertbase = $conn->prepare("INSERT INTO baseinfos (sku,name,price) VALUES ('$sku', '$name', '$price')");
    $insertbase->execute();
    $inserttype = $conn->prepare("INSERT INTO {$type}s (baseinfo, $property_names) values((SELECT sku FROM baseinfos WHERE sku='$sku'), $property_values);");
    $inserttype->execute();
    break;
}
