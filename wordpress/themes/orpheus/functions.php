<?php
/**
 * @package Orpheus
 */
require_once 'inc/Admin.php';
require_once 'inc/class-acf-commands.php';
function my_acf_init() {
	
	acf_update_setting('google_api_key', '####');
}

add_action('acf/init', 'my_acf_init');
