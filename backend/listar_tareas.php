<?php
header("Content-Type: application/json");
include "conexion.php";

$sql = "SELECT 
            tarea.id_tarea,
            tarea.titulo,
            tarea.descripcion,
            tarea.fecha_entrega,
            tarea.estado,
            materia.nombre_materia
        FROM tarea
        INNER JOIN materia 
        ON tarea.id_materia = materia.id_materia
        ORDER BY tarea.id_tarea DESC";
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