<?php

header('Content-type: application/json');
echo file_get_contents("http://tracker.totemcompany.net" . $_GET['resource']);
