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
use Inc\adminPages\ThemeSettings;
use Inc\adminPages\CPT;


class MenuOptions
{
    //private $adm;
    function __construct(){
        $this   ->  settings            =   new Settings;
        $this   ->  themeSettings       =   new ThemeSettings;
        $this   ->  cpt                 =   new CPT;
        $this   ->  theme               =   get_template_directory();
    }
    //Create Theme Page and Subpages
    public function admin_menu_option()
    {
        add_menu_page('Orpheus Options', 'Orpheus', 'manage_options', 'orpheus', array($this->themeSettings,'get_theme_settings'), 'data:image/svg+xml;base64,' . base64_encode('<svg style="enable-background:new 0 0 20 20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" version="1.1" y="0px" x="0px">
        <style type="text/css">.st0{fill:#164D9D;}
           .st1{fill:#FFFFFF;}
           .st2{fill:none;stroke:#FFFFFF;stroke-width:0.1079;stroke-miterlimit:10;}
           .st3{fill:none;stroke:#FFFFFF;stroke-width:0.1082;stroke-miterlimit:10;}</style>
        <rect stroke-width="1.052" class="st0" width="21.949" y="-.084746" x="-28.475" height="20.169" fill="#164d9d"/>
        <g fill="#fff" transform="matrix(1.0975 0 0 1.0975 -1.05 -.86613)">
         <path class="st1" d="m5.2 10v0.3c0 0.1-0.1 0.2-0.1 0.3s-0.1 0.2-0.2 0.2-0.1 0.1-0.2 0.2c-0.1 0-0.2 0.1-0.3 0.1h-0.3-0.3c-0.1-0.1-0.1-0.1-0.2-0.1s-0.2-0.1-0.2-0.2l-0.2-0.2c0-0.1-0.1-0.2-0.1-0.3v-0.3-0.3c0-0.1 0.1-0.2 0.1-0.3s0.1-0.2 0.2-0.2c0-0.1 0.1-0.1 0.2-0.2 0.1 0 0.2-0.1 0.3-0.1h0.3 0.3s0.1 0.1 0.2 0.1 0.2 0.1 0.2 0.2l0.2 0.2c0 0.1 0.1 0.2 0.1 0.3v0.3zm-0.4 0c0-0.1 0-0.2-0.1-0.3 0-0.1-0.1-0.2-0.1-0.2 0-0.1-0.1-0.1-0.2-0.1s-0.2-0.1-0.3-0.1-0.2 0-0.3 0.1c-0.1 0-0.2 0.1-0.2 0.1 0 0.1-0.1 0.1-0.1 0.2s-0.1 0.2-0.1 0.3 0 0.2 0.1 0.3c0 0.1 0.1 0.2 0.1 0.2 0.1 0.1 0.1 0.1 0.2 0.1s0.2 0.1 0.3 0.1 0.2 0 0.3-0.1c0.1 0 0.2-0.1 0.2-0.1 0.1-0.1 0.1-0.1 0.1-0.2 0.1-0.1 0.1-0.2 0.1-0.3z"/>
         <path class="st1" d="m6 11.1h-0.5v-2.2h0.9 0.2c0.1 0.1 0.2 0.1 0.2 0.1 0.1 0 0.1 0.1 0.2 0.1 0 0.1 0.1 0.2 0.1 0.2 0 0.1 0.1 0.1 0.1 0.2v0.2 0.2c0 0.1 0 0.1-0.1 0.2 0 0.1-0.1 0.1-0.1 0.2-0.1 0.1-0.1 0.1-0.2 0.1l0.2 0.6h-0.4l-0.2-0.4h-0.5v0.5zm0-1.8v0.9h0.4 0.2c0.1 0 0.1-0.1 0.1-0.1l0.1-0.1v-0.2-0.2c0-0.1-0.1-0.1-0.1-0.1l-0.1-0.1h-0.2-0.4z"/>
         <path class="st1" d="m8 11.1h-0.5v-2.2h0.9 0.2c0.1 0.1 0.2 0.1 0.2 0.1 0.1 0 0.1 0.1 0.2 0.1 0.1 0.1 0.1 0.1 0.1 0.2s0.1 0.1 0.1 0.2v0.2c0 0.1 0 0.2-0.1 0.3 0 0.1-0.1 0.2-0.2 0.3s-0.2 0.1-0.3 0.2-0.2 0.1-0.3 0.1h-0.3zm0-1.8v0.9h0.4 0.2c0.1 0 0.1-0.1 0.1-0.1l0.1-0.1v-0.2-0.2c0-0.1-0.1-0.1-0.1-0.1l-0.1-0.1h-0.2-0.4z"/>
         <path class="st1" d="m9.9 11.1h-0.4v-2.2h0.4v0.9h0.9v-0.9h0.4v2.2h-0.4v-0.9h-0.9z"/>
         <path class="st1" d="m13.1 11.1h-1.5v-2.2h1.5v0.4h-1v0.4h0.7v0.4h-0.7v0.4h1z"/>
         <path class="st1" d="m15.1 10.2c0 0.1 0 0.2-0.1 0.3 0 0.1-0.1 0.2-0.2 0.3s-0.2 0.1-0.3 0.2c-0.1 0-0.2 0.1-0.3 0.1s-0.2 0-0.3-0.1c-0.1 0-0.2-0.1-0.3-0.2s-0.1-0.2-0.2-0.3c0-0.1-0.1-0.2-0.1-0.3v-1.3h0.4v1.3 0.2c0 0.1 0.1 0.1 0.1 0.1l0.1 0.1h0.2 0.2c0.1 0 0.1-0.1 0.1-0.1l0.1-0.1v-0.2-1.3h0.4v1.3z"/>
         <path class="st1" d="m15.3 9.6c0-0.1 0-0.2 0.1-0.3 0-0.1 0.1-0.1 0.1-0.2s0.2-0.1 0.2-0.1c0.1 0 0.2-0.1 0.3-0.1h1v0.4h-1-0.1-0.1v0.1 0.1 0.1 0.1h0.1 0.1 0.4c0.1 0 0.2 0 0.3 0.1 0.1 0 0.1 0.1 0.2 0.1 0.1 0.1 0.1 0.1 0.1 0.2s0.1 0.2 0.1 0.3 0 0.2-0.1 0.3c0 0.1-0.1 0.1-0.1 0.2-0.1 0.1-0.1 0.1-0.2 0.1s-0.2 0.1-0.3 0.1h-1v-0.4h1 0.1 0.1v-0.1-0.1-0.1-0.1h-0.1-0.1-0.4c-0.1 0-0.2 0-0.3-0.1-0.1 0-0.1-0.1-0.2-0.1-0.1-0.1-0.1-0.1-0.1-0.2 0-0.2-0.1-0.3-0.1-0.3z"/>
        </g>
        <g transform="matrix(1.0975 0 0 1.0975 -1.05 -.86613)">
         <path fill="#fff" class="st1" d="m12.1 4.7c-0.4 0-0.8-0.1-1.2-0.2s-0.7-0.3-1-0.6c-0.2 0.2-0.5 0.4-0.9 0.6-0.4 0.1-0.8 0.2-1.2 0.2h-1.4c-0.4 0-0.7 0.1-0.9 0.4-0.3 0.2-0.4 0.6-0.4 0.9h-2.2c0-0.5 0.1-0.9 0.3-1.4 0.2-0.4 0.4-0.7 0.8-1 0.3-0.4 0.6-0.6 1.1-0.8 0.4-0.2 0.9-0.3 1.3-0.3h1.4c0.3 0 0.5-0.1 0.7-0.3 0.3-0.2 0.4-0.5 0.4-0.8v-0.3h2.2v0.3c0 0.3 0.1 0.6 0.3 0.8s0.5 0.3 0.8 0.3h1.3c0.5 0 0.9 0.1 1.4 0.3 0.4 0.2 0.7 0.4 1.1 0.8 0.3 0.3 0.6 0.7 0.8 1.1 0.1 0.4 0.2 0.8 0.2 1.3h-2.2c0-0.2 0-0.3-0.1-0.5s-0.2-0.3-0.3-0.4-0.2-0.2-0.4-0.3-0.3-0.1-0.5-0.1z"/>
         <g stroke="#fff" stroke-width=".1079" stroke-miterlimit="10" fill="none">
          <line y2="8.5" x2="5.8" y1="3.6" x1="5.8" class="st2"/>
          <line y2="8.5" x2="7.2" y1="3.6" x1="7.2" class="st2"/>
          <line y2="8.5" x2="8.5" y1="3.6" x1="8.5" class="st2"/>
          <line y2="8.5" x2="9.8" y1="3.6" x1="9.8" class="st2"/>
          <line y2="8.5" x2="11.2" y1="3.6" x1="11.2" class="st2"/>
          <line y2="8.5" x2="12.5" y1="3.6" x1="12.5" class="st2"/>
          <line y2="8.5" x2="13.8" y1="3.6" x1="13.8" class="st2"/>
         </g>
        </g>
        <g transform="matrix(1.0975 0 0 1.0975 -1.05 -.86613)">
         <path fill="#fff" class="st1" d="m7.8 15.3c0.4 0 0.8 0.1 1.2 0.2s0.7 0.3 1 0.6c0.3-0.2 0.6-0.4 1-0.6 0.4-0.1 0.8-0.2 1.2-0.2h1.4c0.4 0 0.7-0.1 0.9-0.4 0.3-0.3 0.4-0.6 0.4-0.9h2.1c0 0.5-0.1 0.9-0.3 1.4-0.2 0.4-0.4 0.8-0.8 1.1-0.3 0.3-0.7 0.6-1.1 0.8s-0.9 0.3-1.4 0.3h-1.4c-0.3 0-0.5 0.1-0.7 0.3s-0.3 0.5-0.3 0.8v0.3h-2.1v-0.3c0-0.3-0.1-0.6-0.3-0.8s-0.5-0.3-0.8-0.3h-1.3c-0.5 0-0.9-0.1-1.4-0.3-0.4-0.3-0.8-0.5-1.1-0.9-0.3-0.3-0.6-0.7-0.8-1.1s-0.3-0.8-0.3-1.3h2.2c0 0.2 0 0.3 0.1 0.5s0.2 0.3 0.3 0.4 0.3 0.2 0.4 0.3c0.2 0.1 0.3 0.1 0.5 0.1z"/>
         <g stroke="#fff" stroke-width=".1082" stroke-miterlimit="10" fill="none">
          <line y2="16.4" x2="5.8" y1="11.5" x1="5.8" class="st3"/>
          <line y2="16.4" x2="7.2" y1="11.5" x1="7.2" class="st3"/>
          <line y2="16.4" x2="8.5" y1="11.5" x1="8.5" class="st3"/>
          <line y2="16.4" x2="9.8" y1="11.5" x1="9.8" class="st3"/>
          <line y2="16.4" x2="11.2" y1="11.5" x1="11.2" class="st3"/>
          <line y2="16.4" x2="12.5" y1="11.5" x1="12.5" class="st3"/>
          <line y2="16.4" x2="13.8" y1="11.5" x1="13.8" class="st3"/>
         </g>
        </g>
       </svg>'), 200);
    //    add_submenu_page($parent_slug, $page_title, $menu_title, $capability, $menu_slug, $function)
        add_submenu_page('orpheus', 'Theme Options', 'Settings', 'manage_options', 'orpheus', array($this,'themeSettings'));
        add_submenu_page('orpheus', 'cpt', 'CPT', 'manage_options', 'edit.php?post_type=cpt'); //,array($this->settings,'blog_cpt'));
        add_submenu_page( 'orpheus', 'Contact Options', 'Contact', 'manage_options', 'orpheus_contact', array($this, 'contactSettings'));
        add_submenu_page( 'orpheus', 'Sidebar Options', 'Sidebar', 'manage_options', 'orpheus_sidebar', array($this, 'sidebarSettings'));
        add_submenu_page( 'orpheus', 'Slider Options', 'Slider', 'manage_options', 'orpheus_slider', array($this, 'sliderSettings'));
        add_submenu_page('orpheus', 'Css Options', 'Custom Css', 'manage_options', 'orpheus_css', array($this,'cssSettings'));
        add_action( 'admin_init', array($this->settings, 'settings'));
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
