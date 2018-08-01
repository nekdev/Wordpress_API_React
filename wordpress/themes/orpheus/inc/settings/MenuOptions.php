<?php
/**
 * @package Orpheus
 *
 */

 namespace Inc\settings;

/* ========================
 * Admin Menu Options
 * ========================
 */
use Inc\settings\Settings;


class MenuOptions
{
    //private $adm;
    function __construct(){
        $this   ->  settings            =   new Settings;
        $this   ->  theme               =   get_template_directory();
    }
    //Create Theme Page and Subpages
    public function admin_menu_option()
    {
        add_menu_page('Orpheus Options', 'Orpheus', 'manage_options', 'orpheus', array($this,'themeSettings'), '
        dashicons-share-alt', 200);
        add_submenu_page('orpheus', 'Theme Options', 'Settings', 'manage_options', 'orpheus', array($this,'themeSettings'));
        add_submenu_page( 'orpheus', 'Contact Options', 'Contact', 'manage_options', 'orpheus_contact', array($this, 'contactSettings'));
        add_submenu_page( 'orpheus', 'Sidebar Options', 'Sidebar', 'manage_options', 'orpheus_sidebar', array($this, 'sidebarSettings'));
        add_submenu_page( 'orpheus', 'Slider Options', 'Slider', 'manage_options', 'orpheus_slider', array($this, 'sliderSettings'));
        add_submenu_page('orpheus', 'Css Options', 'Custom Css', 'manage_options', 'orpheus_css', array($this,'cssSettings'));
        add_action( 'admin_init', array($this->settings, 'settings'));
    }



    function themeSettings()
    {
        require_once $this->theme . '/inc/adminPages/ThemeSettings.php';
    }

    function contactSettings()
    {
        require_once $this->theme . '/inc/adminPages/ContactSettings.php';
    }

    function sidebarSettings()
    {
        require_once $this->theme . '/inc/adminPages/SidebarSettings.php';
    }

    function sliderSettings()
    {
        require_once $this->theme . '/inc/adminPages/SliderSettings.php';
    }

    function cssSettings()
    {
        require_once $this->theme . '/inc/adminPages/CssSettings.php';
    }

}
