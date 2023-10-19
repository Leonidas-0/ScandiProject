<?php
class Database
{
    private $connection;

    public function __construct($servername, $username, $password, $database)
    {
        $this->connection = new mysqli($servername, $username, $password, $database);
    }

    public function getConnection()
    {
        return $this->connection;
    }
}

$db = new Database("localhost", "id20992612_levan", "Levanscandi_51", "id20992612_scandiback");
// $db = new Database("localhost", "Levan", "", "commerce");
