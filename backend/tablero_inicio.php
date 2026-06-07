<?php
header("Content-Type: application/json");
include "conexion.php";

$sqlTotal = "SELECT COUNT(*) AS total FROM tarea";
$resultTotal = $conexion->query($sqlTotal);
$total = $resultTotal->fetch_assoc()["total"];

$sqlActivas = "SELECT COUNT(*) AS activas FROM tarea WHERE estado = 'Activa'";
$resultActivas = $conexion->query($sqlActivas);
$activas = $resultActivas->fetch_assoc()["activas"];

$sqlAtrasadas = "SELECT COUNT(*) AS atrasadas FROM tarea WHERE estado = 'Atrasada'";
$resultAtrasadas = $conexion->query($sqlAtrasadas);
$atrasadas = $resultAtrasadas->fetch_assoc()["atrasadas"];

$sqlProximas = "SELECT 
                    tarea.titulo,
                    tarea.fecha_entrega,
                    materia.nombre_materia
                FROM tarea
                INNER JOIN materia 
                ON tarea.id_materia = materia.id_materia
                WHERE tarea.estado != 'Terminada'
                ORDER BY tarea.fecha_entrega ASC
                LIMIT 2";

$resultProximas = $conexion->query($sqlProximas);

$proximas = [];

if ($resultProximas) {
    while ($fila = $resultProximas->fetch_assoc()) {
        $proximas[] = $fila;
    }
}

echo json_encode([
    "status" => "success",
    "total" => $total,
    "activas" => $activas,
    "atrasadas" => $atrasadas,
    "proximas" => $proximas
]);

$conexion->close();
?>