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
class ThemeSettings
{
    /**
     *
     * @TODO Determine the headless client's URL based on the current environment.
     *
     * @return str Frontend origin URL, i.e., http://localhost:3000.
     */
    function get_theme_settings() {
        $my_theme = wp_get_theme();
        $theme = esc_html( $my_theme->get( 'TextDomain' ) );
        echo '<h1> '.$theme.' General Options</h1>';
        echo settings_errors();
        echo '<div class="admin-content">
            <div class="admin-form">
                <form class="general-form" action="options.php" method="post">
                    '.settings_fields( 'orpheus-settings-group' ).'
                    '.do_settings_sections( 'orpheus' ).'
                    '.submit_button( 'Save changes', 'primary', 'btnSubmit' ).'
                </form>
            </div>
        </div>';

    }

}



