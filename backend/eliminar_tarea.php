<?php
header("Content-Type: application/json");
include "conexion.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $id_tarea = $_POST["id_tarea"] ?? "";

    if (empty($id_tarea)) {
        echo json_encode([
            "status" => "error",
            "mensaje" => "No se recibió el ID de la tarea"
        ]);
        exit;
    }

    $sql = "DELETE FROM tarea WHERE id_tarea = ?";
    $stmt = $conexion->prepare($sql);

    if (!$stmt) {
        echo json_encode([
            "status" => "error",
            "mensaje" => "Error al preparar la consulta: " . $conexion->error
        ]);
        exit;
    }

    $stmt->bind_param("i", $id_tarea);

    if ($stmt->execute()) {
        echo json_encode([
            "status" => "success",
            "mensaje" => "Tarea eliminada correctamente"
        ]);
    } else {
        echo json_encode([
            "status" => "error",
            "mensaje" => "Error al eliminar la tarea: " . $stmt->error
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