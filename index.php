<?php

$config = require_once 'config.php';

header('Content-type: application/json');
echo file_get_contents($config['domain'] . $_GET['resource']);
