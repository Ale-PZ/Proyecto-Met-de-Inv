<?php
$host = "aqui va el host";
$usuario = "aqui usuario";
$password = "password";
$base_datos = "nombre de la base de datos";

$conexion = new mysqli($host, $usuario, $password, $base_datos);

if ($conexion->connect_error) {
    die(json_encode([
        "status" => "error",
        "mensaje" => "Error de conexión: " . $conexion->connect_error
    ]));
}

$conexion->set_charset("utf8");
?>