<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: POST");
include 'db.php';
include 'BaseProduct.php';
include 'dvd.php';
include 'book.php';
include 'furniture.php';

$productClass = $_POST['type'];
$product = new $productClass($db);

$product->setSku($_POST['sku']);
$product->setName($_POST['name']);
$product->setPrice($_POST['price']);
$product->setUniqueAttribute($_POST);

$product->save();
