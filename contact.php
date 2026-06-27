<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Invalid request method.'
    ]);
    exit;
}

/*
|--------------------------------------------------------------------------
| Servexa contact settings
|--------------------------------------------------------------------------
| Keep this email synced with assets/js/config.js:
| contact.formRecipient / contact.email
|--------------------------------------------------------------------------
*/

$recipientEmail = 'hello@servexa.com';
$siteName = 'Servexa';
$subjectPrefix = 'New Servexa Appliance Request';

function respond(bool $success, string $message, int $statusCode = 200): void
{
    http_response_code($statusCode);
    echo json_encode([
        'success' => $success,
        'message' => $message
    ]);
    exit;
}

function clean_input(?string $value, int $maxLength = 2000): string
{
    $value = trim((string) $value);
    $value = strip_tags($value);
    $value = preg_replace('/[\x00-\x1F\x7F]/u', '', $value) ?? '';
    $value = mb_substr($value, 0, $maxLength, 'UTF-8');

    return $value;
}

function has_header_injection(string $value): bool
{
    return (bool) preg_match('/[\r\n]/', $value);
}

$honeypot = clean_input($_POST['website'] ?? '', 200);

if ($honeypot !== '') {
    respond(true, 'Thank you. Your request has been received.');
}

$formStartedAt = clean_input($_POST['formStartedAt'] ?? '', 30);

if ($formStartedAt !== '' && ctype_digit($formStartedAt)) {
    $elapsedSeconds = (time() * 1000 - (int) $formStartedAt) / 1000;

    if ($elapsedSeconds < 2) {
        respond(false, 'Please check the required fields and try again.', 400);
    }
}

$fullName = clean_input($_POST['fullName'] ?? '', 120);
$email = clean_input($_POST['email'] ?? '', 180);
$phone = clean_input($_POST['phone'] ?? '', 80);
$service = clean_input($_POST['service'] ?? '', 160);
$message = clean_input($_POST['message'] ?? '', 3000);
$sourcePage = clean_input($_POST['sourcePage'] ?? 'Unknown page', 160);
$privacyConsent = clean_input($_POST['privacyConsent'] ?? '', 20);

if (
    $fullName === '' ||
    $email === '' ||
    $phone === '' ||
    $service === '' ||
    $message === '' ||
    $privacyConsent !== 'yes'
) {
    respond(false, 'Please complete all required fields and try again.', 400);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(false, 'Please enter a valid email address.', 400);
}

if (
    has_header_injection($fullName) ||
    has_header_injection($email) ||
    has_header_injection($phone) ||
    has_header_injection($service)
) {
    respond(false, 'Please check the required fields and try again.', 400);
}

$allowedServices = [
    'Refrigerator Repair',
    'Washer Repair',
    'Dryer Repair',
    'Dishwasher Repair',
    'Oven & Range Repair',
    'Appliance Diagnostics'
];

if (!in_array($service, $allowedServices, true)) {
    respond(false, 'Please choose a valid service category.', 400);
}

$submittedAt = date('Y-m-d H:i:s');
$userIp = $_SERVER['REMOTE_ADDR'] ?? 'Unknown';
$userAgent = $_SERVER['HTTP_USER_AGENT'] ?? 'Unknown';

$emailSubject = $subjectPrefix . ' - ' . $service;

$emailBody = <<<EOT
New appliance provider-matching request submitted through {$siteName}.

Request Details
---------------
Full name: {$fullName}
Email: {$email}
Phone: {$phone}
Service category: {$service}
Source page: {$sourcePage}
Submitted at: {$submittedAt}

Message
-------
{$message}

Platform Notice
---------------
Servexa is an independent appliance repair provider-matching platform.
Servexa does not perform appliance repair work directly.
Final pricing, availability, scheduling, warranties, and service terms are provided by participating providers.
Users choose whether to continue with a provider.

Technical Details
-----------------
IP address: {$userIp}
User agent: {$userAgent}
EOT;

$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'From: Servexa Website <no-reply@' . ($_SERVER['HTTP_HOST'] ?? 'servexa.com') . '>',
    'Reply-To: ' . $fullName . ' <' . $email . '>',
    'X-Mailer: PHP/' . phpversion()
];

$sent = false;

try {
    $sent = mail(
        $recipientEmail,
        $emailSubject,
        $emailBody,
        implode("\r\n", $headers)
    );
} catch (Throwable $error) {
    $sent = false;
}

if (!$sent) {
    respond(
        false,
        'The form could not be sent right now. Please try again or contact Servexa by email.',
        500
    );
}

respond(true, 'Thank you. Your request has been received.');
