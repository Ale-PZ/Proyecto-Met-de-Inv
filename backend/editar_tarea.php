<?php
header("Content-Type: application/json");
include "conexion.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $id_tarea = $_POST["id_tarea"] ?? "";
    $titulo = $_POST["titulo"] ?? "";
    $descripcion = $_POST["descripcion"] ?? "";
    $fecha_entrega = $_POST["fecha_entrega"] ?? "";
    $estado = $_POST["estado"] ?? "";

    if (empty($id_tarea) || empty($titulo) || empty($fecha_entrega) || empty($estado)) {
        echo json_encode([
            "status" => "error",
            "mensaje" => "Los campos título, fecha y estado son obligatorios"
        ]);
        exit;
    }

    $sql = "UPDATE tarea 
            SET titulo = ?, descripcion = ?, fecha_entrega = ?, estado = ?
            WHERE id_tarea = ?";

    $stmt = $conexion->prepare($sql);

    if (!$stmt) {
        echo json_encode([
            "status" => "error",
            "mensaje" => "Error al preparar la consulta: " . $conexion->error
        ]);
        exit;
    }

    $stmt->bind_param("ssssi", $titulo, $descripcion, $fecha_entrega, $estado, $id_tarea);

    if ($stmt->execute()) {
        echo json_encode([
            "status" => "success",
            "mensaje" => "Tarea actualizada correctamente"
        ]);
    } else {
        echo json_encode([
            "status" => "error",
            "mensaje" => "Error al actualizar la tarea: " . $stmt->error
        ]);
    }

    $stmt->close();
    $conexion->close();

} else {
    echo json_encode([
        "status" => "error",
        "mensaje" => "Método no permitido"
    ]);
}
?>