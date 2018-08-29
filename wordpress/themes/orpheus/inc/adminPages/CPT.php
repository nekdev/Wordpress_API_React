<?php
/**
 * @package Orpheus
 *
 */

 namespace Inc\adminPages;

/* ========================
 * Settings Page
 * ========================
 */
class CPT
{
    /**
     *
     * @TODO Determine the headless client's URL based on the current environment.
     *
     * @return str Frontend origin URL, i.e., http://localhost:3000.
     */
    function get_cpt() {
        $my_theme = wp_get_theme();
        $theme = esc_html( $my_theme->get( 'TextDomain' ) );
        settings_fields( 'orpheus-cpt-group' );
        do_settings_sections( 'orpheus_cpt' );


        echo '<h1> Create Custom Post Type for '.$theme.' Theme</h1>';
        echo settings_errors();
        echo '<div class="admin-content">
            hello
        </div>';


    }

}



