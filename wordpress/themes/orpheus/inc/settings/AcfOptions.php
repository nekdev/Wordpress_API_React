<?php
/**
 * @package Orpheus
 *
 */
/* ======================================================
 * Add a custom options page to associate ACF fields with
 * ======================================================
 */
namespace Inc\settings;

class AcfOptions
{
    function acf_option_page() {
        if ( function_exists( 'acf_add_options_page' ) ) {
            acf_add_options_page( [
                'page_title' => 'Headless Settings',
                'menu_title' => 'Headless',
                'menu_slug'  => 'headless-settings',
                'capability' => 'manage_options',
                'post_id'    => 'headless-settings',
                'redirect'   => false,
            ] );
        }
    }
}