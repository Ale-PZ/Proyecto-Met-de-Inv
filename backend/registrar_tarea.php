<?php
header("Content-Type: application/json");
include "conexion.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $titulo = $_POST["titulo"] ?? "";
    $descripcion = $_POST["descripcion"] ?? "";
    $fecha_entrega = $_POST["fecha_entrega"] ?? "";
    $estado = $_POST["estado"] ?? "";
    $id_materia = $_POST["id_materia"] ?? "";

    if (empty($titulo) || empty($fecha_entrega) || empty($estado) || empty($id_materia)) {
        echo json_encode([
            "status" => "error",
            "mensaje" => "Los campos título, fecha, estado y materia son obligatorios"
        ]);
        exit;
    }

    $sql = "INSERT INTO tarea(titulo, descripcion, fecha_entrega, estado, id_materia)
            VALUES (?, ?, ?, ?, ?)";
    $stmt = $conexion->prepare($sql);

    if (!$stmt) {
        echo json_encode([
            "status" => "error",
            "mensaje" => "Error al preparar la consulta: " . $conexion->error
        ]);
        exit;
    }

    $stmt->bind_param("ssssi", $titulo, $descripcion, $fecha_entrega, $estado, $id_materia);

    if ($stmt->execute()) {
        echo json_encode([
            "status" => "success",
            "mensaje" => "Tarea registrada correctamente"
        ]);
    } else {
        echo json_encode([
            "status" => "error",
            "mensaje" => "Error al registrar la tarea: " . $stmt->error
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