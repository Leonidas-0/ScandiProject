<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
$servername = "127.0.0.1";
$username = "root";
$password = "";
$conn = new mysqli($servername, $username, $password, 'commerce');
class Product
{
  private $sku;
  private $name;
  private $price;
  function __construct($sku, $name, $price) {
    $this->sku = $sku;
    $this->name = $name;
    $this->price = $price;
  }

  function sku()
  {
    return $this->sku;
  }

  function name()
  {
    return $this->name;
  }

  function price()
  {
    return $this->price;
  }
}

class DVD extends Product
{
  private $size;
  public function __construct($sku, $name, $price, $size)
	{
		parent::__construct($sku, $name, $price);
    $this->size = $size;
	}

  function size()
  {
    return $this->size;
  }
}
class Book extends Product
{
  private $weight;
  public function __construct($sku, $name, $price, $weight)
	{
		parent::__construct($sku, $name, $price);
    $this->weight = $weight;
	}

  function weight()
  {
    return $this->weight;
  }
}
class Furniture extends Product
{
	public function __construct($sku, $name, $price, $width, $height, $length)
	{
		parent::__construct($sku, $name, $price,);
		$this->width = $width;
    $this->height = $height;
    $this->length = $length;
	}
  private $height;
  private $width;
  private $length;

  function height()
  {
    return $this->height;
  }
  function width()
  {
    return $this->width;
  }
  function length()
  {
    return $this->length;
  }
}



$method = $_SERVER['REQUEST_METHOD'];
function console_log($data)
{
  $output = $data;
  if (is_array($output))
    $output = implode(',', $output);
  echo "<script>console.log('Debug Objects: " . $output . "' );</script>";
}
function parseInput()
{
  $data = file_get_contents("php://input");
  parse_str($data, $result);
  return $result;
}
class TypeValidator {
public $dvd=['size']; 
public $book=['weight'];
public $furniture=['width', 'height', 'length'];
}
function repeat($value, $proplength)
{ 
  $array=array(str_repeat("$value", count($proplength)));
  return implode(",", $array);
}
switch ($method) {
  case "GET":
    $query = "SELECT * FROM dvds INNER JOIN baseinfos ON dvds.baseinfo=baseinfos.sku;";
    $query .= "SELECT * FROM furnitures INNER JOIN baseinfos ON furnitures.baseinfo=baseinfos.sku;";
    $query .= "SELECT * FROM books INNER JOIN baseinfos ON books.baseinfo=baseinfos.sku;";
    $data = [];
    if ($conn->multi_query($query)) {
      do {
        if ($result = $conn->store_result()) {
          while ($row = $result->fetch_assoc()) {
            $data[] = $row;
          }
          $result->free_result();
        }
      } while ($conn->next_result());
    }
    echo json_encode($data);
    break;
  case "DELETE":
    $values = json_decode(file_get_contents('php://input'), true);
    foreach ($values as $value) {
      $stmt = $conn->prepare("DELETE FROM baseinfos WHERE sku = '$value'");
      $stmt->execute();
    }
    break;
  case "POST":
    $type = $_POST['type'];
    $validator=new TypeValidator();
    $typefields=[];
    $typevalues=[];
    foreach($validator->$type as $field) {
      array_push($typevalues,  $_POST[$field]);
      array_push($typefields, $field);
    }
    $chosen_fields = implode(',', $typefields);
    $chosen_values = implode(',', $typevalues);
    $product=new $type($_POST['sku'], $_POST['name'], $_POST['price'], $chosen_values);
    $sku = $product->sku();
    $name = $product->name();
    $price = $product->price();
    $insertbase = $conn->prepare("INSERT INTO baseinfos (sku,name,price) VALUES (?, ?, ?)");
    $insertbase->bind_param("sss", $sku, $name, $price);
    $insertbase->execute();
    $questionmarks = repeat('?', $typefields);
    $inserttype = $conn->prepare("INSERT INTO {$type}s (baseinfo, $chosen_fields) VALUES ((SELECT sku FROM baseinfos WHERE sku='$sku'), ($questionmarks));");
    $inserttype->bind_param('s', $sku);
    $inserttype->bind_param(repeat('s', $typefields), $chosen_values);
    $inserttype->execute();
    break;
}
