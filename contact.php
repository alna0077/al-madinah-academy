<?php
declare(strict_types=1);

const RECIPIENT_EMAIL = 'ALMADINAHACADEMY.CA@GMAIL.COM';
const SUCCESS_MESSAGE = 'Thank you. Your request has been sent and we will follow up soon, in shaa Allah.';
const GENERIC_ERROR = 'We could not send your request right now. Please try again shortly.';

function wants_json_response(): bool
{
    $accept = $_SERVER['HTTP_ACCEPT'] ?? '';
    $requestedWith = $_SERVER['HTTP_X_REQUESTED_WITH'] ?? '';

    return stripos($accept, 'application/json') !== false || strtolower($requestedWith) === 'xmlhttprequest';
}

function h(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
}

function respond(int $statusCode, bool $success, string $message): void
{
    http_response_code($statusCode);

    if (wants_json_response()) {
        header('Content-Type: application/json; charset=UTF-8');
        echo json_encode(
            $success ? ['success' => true, 'message' => $message] : ['success' => false, 'error' => $message],
            JSON_UNESCAPED_SLASHES
        );
        return;
    }

    $statusClass = $success ? 'success' : 'error';
    $title = $success ? 'Request Sent' : 'Request Not Sent';

    header('Content-Type: text/html; charset=UTF-8');
    echo '<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>' . h($title) . ' | Al-Madinah Quran and Sunnah Academy</title>
  <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
  <main class="section">
    <div class="container narrow-content">
      <div class="form-card">
        <p class="eyebrow">Enrollment</p>
        <h1>' . h($title) . '</h1>
        <div class="form-status ' . h($statusClass) . '" role="status">' . h($message) . '</div>
        <div class="button-row"><a class="btn btn-primary" href="contact.html">Return to Contact</a></div>
      </div>
    </div>
  </main>
</body>
</html>';
}

function clean_text_field(string $key, int $maxLength = 160): string
{
    $value = $_POST[$key] ?? '';
    if (is_array($value)) {
        return '';
    }

    $value = trim(strip_tags((string) $value));
    $value = preg_replace('/[\r\n\t]+/', ' ', $value);
    $value = preg_replace('/ {2,}/', ' ', $value);

    return substr($value ?? '', 0, $maxLength);
}

function clean_message_field(string $key, int $maxLength = 4000): string
{
    $value = $_POST[$key] ?? '';
    if (is_array($value)) {
        return '';
    }

    $value = trim(strip_tags((string) $value));
    $value = preg_replace("/\r\n|\r/", "\n", $value);
    $value = preg_replace("/\n{3,}/", "\n\n", $value);

    return substr($value ?? '', 0, $maxLength);
}

function safe_server_from_email(): string
{
    $serverName = $_SERVER['SERVER_NAME'] ?? '';
    $serverName = preg_replace('/[^a-zA-Z0-9.-]/', '', $serverName);
    $fromEmail = $serverName ? 'no-reply@' . $serverName : RECIPIENT_EMAIL;

    return filter_var($fromEmail, FILTER_VALIDATE_EMAIL) ? $fromEmail : RECIPIENT_EMAIL;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, false, 'Please submit the contact form from the contact page.');
    exit;
}

$honeypot = clean_text_field('bot-field', 100);
if ($honeypot !== '') {
    respond(200, true, SUCCESS_MESSAGE);
    exit;
}

$name = clean_text_field('name', 120);
$email = filter_var(clean_text_field('email', 254), FILTER_SANITIZE_EMAIL);
$phone = clean_text_field('phone', 80);
$age = clean_text_field('age', 80);
$program = clean_text_field('program', 120);
$level = clean_text_field('level', 120);
$preference = clean_text_field('preference', 120);
$message = clean_message_field('message', 4000);

if ($name === '') {
    respond(422, false, 'Please enter a name.');
    exit;
}

if (!$email || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(422, false, 'Please enter a valid email address.');
    exit;
}

if (strlen($message) < 10) {
    respond(422, false, 'Please include at least 10 characters in your message.');
    exit;
}

$submittedAt = date('Y-m-d H:i:s T');
$subject = 'New enrollment request - Al-Madinah Academy';
$bodyLines = [
    'New enrollment request from the Al-Madinah Academy website.',
    '',
    'Submitted: ' . $submittedAt,
    'Name: ' . $name,
    'Email: ' . $email,
    'Phone / WhatsApp: ' . ($phone !== '' ? $phone : 'Not provided'),
    'Student age: ' . ($age !== '' ? $age : 'Not provided'),
    'Program interest: ' . ($program !== '' ? $program : 'Not provided'),
    'Current level: ' . ($level !== '' ? $level : 'Not provided'),
    'Schedule preference: ' . ($preference !== '' ? $preference : 'Not provided'),
    '',
    'Message:',
    $message,
];

$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'From: Al-Madinah Website <' . safe_server_from_email() . '>',
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . phpversion(),
];

$sent = mail(RECIPIENT_EMAIL, $subject, implode("\n", $bodyLines), implode("\r\n", $headers));

if (!$sent) {
    error_log('Al-Madinah contact form mail() failed.');
    respond(500, false, GENERIC_ERROR);
    exit;
}

respond(200, true, SUCCESS_MESSAGE);
