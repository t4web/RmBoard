<?php

$config = require_once 'config.php';

header('Content-type: application/json');

if ($_GET['resource'] == 'get-config') {
    echo json_encode($config);
    exit;
}

$httpMethod = 'GET';

if (isset($_GET['method'])) {
    $httpMethod = strtoupper($_GET['method']);
}

$cookies = '';

if (isset($_COOKIE['auth_token'])) {
    $cookies = "Cookie: _redmine_session=".$_COOKIE['auth_token']."\r\n";
}

$opts = array(
    'http' => array(
        'method' => $httpMethod,
        'header' => $cookies
    )
);

$context = stream_context_create($opts);

// Open the file using the HTTP headers set above
echo file_get_contents($config['domain'] . $_GET['resource'], false, $context);