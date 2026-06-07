<?php
header("Content-Type: application/json");
include "conexion.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $nombre_materia = $_POST["nombre_materia"] ?? "";
    $profesor = $_POST["profesor"] ?? "";
    $grupo = $_POST["grupo"] ?? "";

    if (empty($nombre_materia) || empty($profesor) || empty($grupo)) {
        echo json_encode([
            "status" => "error",
            "mensaje" => "Todos los campos son obligatorios"
        ]);
        exit;
    }

    $sql = "INSERT INTO materia(nombre_materia, profesor, grupo) VALUES(?, ?, ?)";
    $stmt = $conexion->prepare($sql);

    if (!$stmt) {
        echo json_encode([
            "status" => "error",
            "mensaje" => "Error al preparar la consulta: " . $conexion->error
        ]);
        exit;
    }

    $stmt->bind_param("sss", $nombre_materia, $profesor, $grupo);

    if ($stmt->execute()) {
        echo json_encode([
            "status" => "success",
            "mensaje" => "Materia registrada correctamente"
        ]);
    } else {
        echo json_encode([
            "status" => "error",
            "mensaje" => "Error al registrar la materia: " . $stmt->error
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