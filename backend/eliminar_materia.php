<?php
header("Content-Type: application/json");
include "conexion.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $id_materia = $_POST["id_materia"] ?? "";

    if (empty($id_materia)) {
        echo json_encode([
            "status" => "error",
            "mensaje" => "No se recibió el ID de la materia"
        ]);
        exit;
    }
    $sql_verificar = "SELECT COUNT(*) AS total FROM tarea WHERE id_materia = ?";
    $stmt_verificar = $conexion->prepare($sql_verificar);
    $stmt_verificar->bind_param("i", $id_materia);
    $stmt_verificar->execute();
    $resultado = $stmt_verificar->get_result();
    $fila = $resultado->fetch_assoc();

    if ($fila["total"] > 0) {
        echo json_encode([
            "status" => "error",
            "mensaje" => "No se puede borrar la materia porque aún hay tareas en proceso"
        ]);
        exit;
    }

    $sql = "DELETE FROM materia WHERE id_materia = ?";
    $stmt = $conexion->prepare($sql);
    
    if (!$stmt) {
        echo json_encode([
            "status" => "error",
            "mensaje" => "Error al preparar la consulta: " . $conexion->error
        ]);
        exit;
    }

    $stmt->bind_param("i", $id_materia);

    if ($stmt->execute()) {
        echo json_encode([
            "status" => "success",
            "mensaje" => "Materia eliminada correctamente"
        ]);
    } else {
        echo json_encode([
            "status" => "error",
            "mensaje" => $stmt->error
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