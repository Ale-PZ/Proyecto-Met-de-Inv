<?php
header("Content-Type: application/json");
include "conexion.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $id_materia = $_POST["id_materia"] ?? "";
    $nombre_materia = $_POST["nombre_materia"] ?? "";
    $profesor = $_POST["profesor"] ?? "";
    $grupo = $_POST["grupo"] ?? "";

    if (empty($id_materia) || empty($nombre_materia) || empty($profesor) || empty($grupo)) {
        echo json_encode([
            "status" => "error",
            "mensaje" => "Todos los campos son obligatorios"
        ]);
        exit;
    }

    $sql = "UPDATE materia 
            SET nombre_materia = ?, profesor = ?, grupo = ?
            WHERE id_materia = ?";

    $stmt = $conexion->prepare($sql);

    if (!$stmt) {
        echo json_encode([
            "status" => "error",
            "mensaje" => "Error al preparar la consulta: " . $conexion->error
        ]);
        exit;
    }

    $stmt->bind_param("sssi", $nombre_materia, $profesor, $grupo, $id_materia);

    if ($stmt->execute()) {
        echo json_encode([
            "status" => "success",
            "mensaje" => "Materia actualizada correctamente"
        ]);
    } else {
        echo json_encode([
            "status" => "error",
            "mensaje" => "Error al actualizar la materia: " . $stmt->error
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