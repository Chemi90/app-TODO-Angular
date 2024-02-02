<?php
// Cabecera JSON
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *"); // Permitir peticiones de cualquier origen
header("Access-Control-Allow-Methods: PUT"); // Permitir solo métodos PUT
header("Access-Control-Allow-Headers: Content-Type"); // Permitir solo cabeceras de tipo Content-Type

// Respuesta por defecto
$respuesta = [
    'success' => false,
    'data' => null,
    'error' => ''
];

// Conexión a la base de datos con mysqli
$host = 'servidorxemi.mysql.database.azure.com'; 
$username = 'xemita'; 
$password = 'Posnose90'; 
$dbname = 'todo'; 
$port = 3306;

// Crear conexión
$conexionBBDD = new mysqli($host, $username, $password, $dbname, $port);

// Verificar conexión
if ($conexionBBDD->connect_error) {
    $respuesta['error'] = 'No se ha podido conectar con la base de datos: ' . $conexionBBDD->connect_error;
    echo json_encode($respuesta);
    exit;
}

// Comprobar si se recibe el id_tarea como parámetro GET
if (!isset($_GET['id'])) {
    $respuesta['error'] = 'No se ha recibido el id_tarea';
    echo json_encode($respuesta);
    exit;
}

$idTarea = $_GET['id'];

// Recibir los datos por JSON para el estado de completada
$jsonData = file_get_contents('php://input');
$data = json_decode($jsonData, true);

// Comprobar si el estado de completada está presente en los datos JSON
if ($data === null || !isset($data['completada'])) {
    $respuesta['error'] = 'Datos inválidos o faltantes para completada';
    echo json_encode($respuesta);
    exit;
}

$completada = (int)$data['completada']; // Convertir a entero

// Preparar la sentencia SQL para actualizar el estado de la tarea
$sql = "UPDATE tarea SET completada = ? WHERE id_tarea = ?";

// Preparar y ejecutar la sentencia
$stmt = $conexionBBDD->prepare($sql);

if (false === $stmt) {
    $respuesta['error'] = 'Error al preparar la consulta: ' . $conexionBBDD->error;
    echo json_encode($respuesta);
    exit;
}

$success = $stmt->bind_param("ii", $completada, $idTarea);
if (!$success) {
    $respuesta['error'] = 'Error al vincular los parámetros: ' . $stmt->error;
    echo json_encode($respuesta);
    exit;
}

$success = $stmt->execute();
if ($success) {
    $respuesta['success'] = true;
    $respuesta['data'] = "Estado de la tarea actualizado correctamente.";
} else {
    $respuesta['error'] = 'No se ha podido actualizar el estado de la tarea: ' . $stmt->error;
}

$stmt->close();
$conexionBBDD->close();

echo json_encode($respuesta);
?>
