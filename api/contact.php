<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(204);
  exit;
}

function respond($success, $message) {
  echo json_encode(['success' => $success, 'message' => $message]);
  exit;
}

$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$message = trim($_POST['message'] ?? '');

if ($name === '' || $email === '' || $message === '') {
  respond(false, 'All fields are required.');
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  respond(false, 'Please provide a valid email.');
}

// Store submissions in a simple file (XAMPP writable path). For production, use DB or mail.
$storageDir = __DIR__ . DIRECTORY_SEPARATOR . 'submissions';
if (!is_dir($storageDir)) {
  mkdir($storageDir, 0755, true);
}
$entry = [
  'time' => date('c'),
  'ip' => $_SERVER['REMOTE_ADDR'] ?? '',
  'name' => $name,
  'email' => $email,
  'message' => $message,
];
$file = $storageDir . DIRECTORY_SEPARATOR . time() . '-' . preg_replace('/[^a-z0-9]+/i', '-', strtolower($name)) . '.json';
file_put_contents($file, json_encode($entry, JSON_PRETTY_PRINT));

respond(true, 'Submitted');


