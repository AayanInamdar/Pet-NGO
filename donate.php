<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Database connection
$conn = new mysqli("localhost", "root", "", "petin");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get and sanitize form data
$name = isset($_POST['name']) ? htmlspecialchars($_POST['name']) : '';
$petname = isset($_POST['petname']) ? htmlspecialchars($_POST['petname']) : '';
$petbreed = isset($_POST['petbread']) ? htmlspecialchars($_POST['petbread']) : '';
$quantity = isset($_POST['quantity']) ? intval($_POST['quantity']) : 1;
$countryCode = isset($_POST['countryCode']) ? htmlspecialchars($_POST['countryCode']) : '';
$phone = isset($_POST['phone']) ? htmlspecialchars($_POST['phone']) : '';
$email = isset($_POST['email']) ? htmlspecialchars($_POST['email']) : '';
$gender = isset($_POST['gender']) ? htmlspecialchars($_POST['gender']) : '';

// Ensure status is an array before using implode
$status = isset($_POST['status']) ? (is_array($_POST['status']) ? implode(", ", $_POST['status']) : $_POST['status']) : '';

$fullPhone = $countryCode . $phone;

// Prepare SQL statement to prevent SQL injection
$stmt = $conn->prepare("INSERT INTO donations (name, pet_name, pet_breed, quantity, phone, email, gender, pet_status) 
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("sssissss", $name, $petname, $petbreed, $quantity, $fullPhone, $email, $gender, $status);

if ($stmt->execute()) {
    echo json_encode(["message" => "Donation submitted successfully"]);
} else {
    echo json_encode(["error" => "Error: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
