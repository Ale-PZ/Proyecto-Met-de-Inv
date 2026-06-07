<?php
header("Content-Type: application/json");
include "conexion.php";

$sql = "SELECT id_materia, nombre_materia, profesor, grupo 
        FROM materia 
        ORDER BY id_materia DESC";
$resultado = $conexion->query($sql);

$materias = [];

if ($resultado) {
    while ($fila = $resultado->fetch_assoc()) {
        $materias[] = $fila;
    }

    echo json_encode([
        "status" => "success",
        "materias" => $materias
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "mensaje" => "Error al listar materias: " . $conexion->error
    ]);
}

$conexion->close();
?>