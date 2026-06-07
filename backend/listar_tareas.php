<?php
header("Content-Type: application/json");
include "conexion.php";

$sql = "CALL sp_listar_tareas()";
$resultado = $conexion->query($sql);

$tareas = [];

if ($resultado) {
    while ($fila = $resultado->fetch_assoc()) {
        $tareas[] = $fila;
    }

    echo json_encode([
        "status" => "success",
        "tareas" => $tareas
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "mensaje" => "Error al listar tareas: " . $conexion->error
    ]);
}

$conexion->close();
?>