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

    $sql = "CALL sp_eliminar_materia(?)";
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