<?php
/**
 * @package Orpheus
 *
 */

 namespace Inc\settings;

/* ========================
 * Settings
 * ========================
 */

use Inc\Globals;

class Settings
{


    function __construct(){

        $this   ->  themeUri            =   get_template_directory_uri();
        $this   ->  theme               =   get_template_directory();
        $this   ->  logo                =   get_option( 'orpheus_logo' );
        $this   ->  logosize            =   get_option( 'orpheus_logosize' );
        $this   ->  slider              =   get_option( 'orpheus_activate_slider' );
        $this   ->  sliderimage         =   get_option( 'orpheus_sliderimage' );
        $this   ->  header_image        =   get_option( 'orpheus_header_image' );
        $this   ->  header_title        =   get_option( 'orpheus_header_title' );
        $this   ->  sticky              =   get_option( 'orpheus_sticky' );
        $this   ->  shade               =   get_option( 'orpheus_shade_menu' );
        $this   ->  sidebar             =   get_option( 'orpheus_activate_sidebar' );
        $this   ->  profile_pic         =   get_option( 'orpheus_profile_picture' );
        $this   ->  title               =   esc_attr( get_option( 'orpheus_title' ) );
        $this   ->  description         =   esc_attr( get_option( 'orpheus_description' ) );
        $this   ->  socials             =   array(
                            'twitter'   => esc_attr( get_option( 'orpheus_twitter' ) ),
                            'facebook'  => esc_attr( get_option( 'orpheus_facebook' ) ),
                            'google'    => esc_attr( get_option( 'orpheus_google' ) ),
                            'instagram' => esc_attr( get_option( 'orpheus_instagram') ),
                            'youtube'   => esc_attr( get_option( 'orpheus_youtube') ),
                            'linkedin'  => esc_attr( get_option( 'orpheus_linkedin') ),
                        );

        $this   ->  contact             =   get_option( 'orpheus_activate_contact' );
        $this   ->  delivery             =   get_option( 'orpheus_activate_delivery' );
        $this   ->  header              =   get_option( 'orpheus_header_type' );

    }
    public function settings() {
        //echo $hook;
        register_setting( 'orpheus-settings-group', 'orpheus_header_type');
        register_setting( 'orpheus-settings-group', 'orpheus_logo');
        register_setting( 'orpheus-settings-group', 'orpheus_logosize', array( $this, 'validate' ));
        register_setting( 'orpheus-settings-group', 'orpheus_sticky');
        register_setting( 'orpheus-settings-group', 'orpheus_shade_menu');
        register_setting( 'orpheus-settings-group', 'orpheus_header_image');
        register_setting( 'orpheus-settings-group', 'orpheus_header_title');

        add_settings_section( 'orpheus_general_settings', '', '', 'orpheus' );


        add_settings_field( 'header_type', 'Select Header', array($this, 'header_type'), 'orpheus', 'orpheus_general_settings' );
        add_settings_field( 'logo-main', 'Add Logo', array($this, 'logo'), 'orpheus', 'orpheus_general_settings' );
        add_settings_field( 'sticky-menu', 'Sticky Menu', array($this, 'sticky'), 'orpheus', 'orpheus_general_settings' );
        add_settings_field( 'shade-menu', 'Light or Dark Menu', array($this, 'shade'), 'orpheus', 'orpheus_general_settings' );
        add_settings_field( 'header-image', 'Global Header Image', array($this, 'header_image'), 'orpheus', 'orpheus_general_settings' );
        add_settings_field( 'header-title', 'Header Title', array($this, 'header_title'), 'orpheus', 'orpheus_general_settings' );




        //Contact Form Options
        register_setting( 'orpheus-contact-group', 'orpheus_activate_contact' );
        register_setting( 'orpheus-contact-group', 'orpheus_activate_delivery' );
        register_setting( 'orpheus-calendar-group', 'orpheus_calendar' );

        add_settings_section( 'contact-section', '', '', 'orpheus_contact' );
        // add_settings_section( 'delivery-section', '', '', 'orpheus_contact' );
        add_settings_section( 'calendar-section', 'Calendar', '', 'orpheus_contact' );

        add_settings_field( 'activate-form', 'Add or remove custom contact form', array($this, 'activate_contact'), 'orpheus_contact', 'contact-section' );
        add_settings_field( 'activate-delivery', 'Add or remove delivery', array($this, 'activate_delivery'), 'orpheus_contact', 'contact-section' );
        add_settings_field( 'calendar-area', 'Booking visualisation', array($this, 'calendar_callback'), 'orpheus_contact', 'contact-section' );



        //Sidebar Options
        register_setting( 'orpheus-sidebar-group', 'orpheus_activate_sidebar' );
        register_setting( 'orpheus-sidebar-group', 'orpheus_profile_picture' );
        register_setting( 'orpheus-sidebar-group', 'orpheus_title' );
        register_setting( 'orpheus-sidebar-group', 'orpheus_description' );
        register_setting( 'orpheus-sidebar-group', 'orpheus_twitter', array( $this, 'sanitize' ));
        register_setting( 'orpheus-sidebar-group', 'orpheus_facebook', array( $this, 'sanitize' ));
        register_setting( 'orpheus-sidebar-group', 'orpheus_google', array( $this, 'sanitize' ));
        register_setting( 'orpheus-sidebar-group', 'orpheus_instagram', array( $this, 'sanitize' ));
        register_setting( 'orpheus-sidebar-group', 'orpheus_youtube', array( $this, 'sanitize' ));
        register_setting( 'orpheus-sidebar-group', 'orpheus_linkedin', array( $this, 'sanitize' ));




        add_settings_section( 'orpheus_sidebar_settings', 'Sidebar Options', '', 'orpheus_sidebar' );


        add_settings_field( 'activate-sidebar', 'Activate Sidebar', array($this, 'activate_sidebar'), 'orpheus_sidebar', 'orpheus_sidebar_settings');
        add_settings_field( 'profile-picture', 'Picture', array($this, 'profile_picture'), 'orpheus_sidebar', 'orpheus_sidebar_settings');
        add_settings_field( 'sidebar-name', 'Text', array($this, 'sidebar_name'), 'orpheus_sidebar', 'orpheus_sidebar_settings');
        add_settings_field( 'sidebar-socials', 'Socials', array($this, 'social_settings'), 'orpheus_sidebar', 'orpheus_sidebar_settings' );




        //Slider Options
        register_setting( 'orpheus-slider-group', 'orpheus_activate_slider' );
        register_setting( 'orpheus-slider-group', 'orpheus_sliderimage' );
        register_setting( 'orpheus-slider-group', 'orpheus_slidertitle' );
        register_setting( 'orpheus-slider-group', 'orpheus_slidersubtitle' );

        add_settings_section( 'orpheus_slider_settings', 'Slider Options', '', 'orpheus_slider' );
        add_settings_section( 'orpheus_slider_content', 'Slider Contents', '', 'orpheus_slider' );

        add_settings_field( 'activate-slider', 'Activate Slider', array($this, 'activate_slider'), 'orpheus_slider', 'orpheus_slider_settings');
        add_settings_field( 'items-slider', 'Slider Images', array($this, 'slider_content'), 'orpheus_slider', 'orpheus_slider_content');

        //add_settings_field( 'header-image', 'Global Header Image', array($this, 'header_image'), 'orpheus', 'orpheus_slider_content' );
        //CPT Options
        // add_settings_section( 'orpheus_cpt_settings', 'CPT Options', '', 'orpheus_cpt' );

        // add_settings_section( 'orpheus_cpt_settings', 'CPT Options', '', 'orpheus_cpt' );
        // add_settings_field( 'cpt', 'CPT', array($this, 'blog_cpt'), 'orpheus_cpt', 'orpheus_cpt');

        //CSS Options
        register_setting( 'orpheus-css-group', 'orpheus_css', array($this, 'sanitize_css') );

        add_settings_section( 'custom-css-section', 'Custom Css', '', 'orpheus_css' );

        add_settings_field( 'custom-css', 'Insert Your own css', array($this, 'custom_css_field_callback'), 'orpheus_css', 'custom-css-section' );


    }

    /*  ======================
        Theme Options Settings
        ======================
    */


    function header_type()
    {

        $formats = array( '1', '2', '3', '4' );
        $output = '';
        foreach ( $formats as $format ){
            //echo $format;
            $checked = ( @$this->header[$format] == 1 ? 'checked' : '' );
            $output .= '<input type="checkbox" class="ios8-switch chb" id="'.$format.'" name="orpheus_header_type['.$format.']" value="1" '.$checked.' /> <label for="'.$format.'">header '.$format.'</label><br><img style="max-width: 350px;margin-bottom:20px" src="'. $this->themeUri . '/assets/images/header'.$format.'.svg"><br>';
        }
        echo $output;
    }

    function logo()
    {
        if (!empty($this->logo)) {
            echo '<div class="add-logo-picture"><div><input type="button" class="button button-secondary btn-upload" value="Upload" id="upload-button" /><input type="button" class="button button-secondary btn-remove" value="&times;" id="remove-picture" /><input type="hidden" id="profile-picture" name="orpheus_logo" value="'. $this->logo .'"/></div><input class="text" type="number" name="orpheus_logosize" placeholder="Logo size 1% ~ 100%" value="'. filter_var($this->logosize , FILTER_SANITIZE_NUMBER_INT).'"/><img id="logo-prev" style="max-width: '. $this->logosize .';" src="'.$this->logo.'" ></div>';
        } else {
            echo '<input type="button" class="button button-secondary btn-upload" value="Upload" id="upload-button" /><input type="hidden" id="profile-picture" name="orpheus_logo" value="'. $this->logo .'"/>';
        }
    }

    function validate($input){
        $output = $input;
        $output .= '%';
        return $output;
    }
    function sticky()
    {
        $formats = array( 'static', 'fixed', 'sticky', 'absolute' );
        $output = '<select id="sticky" name="orpheus_sticky">';
        foreach ( $formats as $format ){
            //echo $format;
            $checked = ( @$this->sticky == $format ? 'selected="selected"' : '' );
            $output .= '<option value="'. $format.'" '.$checked.' >'.ucfirst($format).'</option>';
        }
        $output .= '</select> <label for="sticky">Sticky Menu</label>';
        echo $output;
    }

    function shade()
    {
        $checked = ( @$this->shade == 1 ? 'checked' : '' );
        $name = ( @$this->shade == 1 ? 'Dark Menu' : 'Light Menu' );
        echo '<input type="checkbox" class="ios8-switch" id="shade" name="orpheus_shade_menu" value="1" '.$checked.' /> <label for="shade">'.$name.'</label>';
    }

    function header_image()
    {
        if (!empty($this->header_image)) {
            echo '<div class="add-header-image"><div><input type="button" class="button button-secondary btn-upload" value="Upload" id="upload-button-image" /><input type="button" class="button button-secondary btn-remove" value="&times;" id="remove-header-image" /><input type="hidden" id="header-image" name="orpheus_header_image" value="'. $this->header_image .'"/><img id="header-image-prev" style="max-width:200px" src="'.$this->header_image.'" ></div>';
        } else {
            echo '<input type="button" class="button button-secondary btn-upload" value="Upload" id="upload-button-image" /><input type="hidden" id="header-image" name="orpheus_header_image" value="'. $this->header_image .'"/>';
        }

    }

    function header_title()
    {
        $checked = ( @$this->header_title == 1 ? 'checked' : '' );
        echo '<label> Post / Page Title </label><input type="checkbox" class="ios8-switch" id="header_title" name="orpheus_header_title" value="1" '.$checked.' /> <label for="header_title">Image Title</label>';

    }



/*  ======================
    Theme Options Contact
    ======================
 */



function set_contact_columns( $columns )
{
    $newColumns =   array(
        'title'     =>  'Name',
        'message'   =>  'Message',
        'checkin'   =>  'Check In',
        'checkout'  =>  'Check Out',
        'adults'    =>  'Adults',
        'children'  =>  'Children',
        'email'     =>  'Email',
        'date'      =>  'Date',

    );
    return $newColumns;

}
function contact_custom_column($column, $post_id)
{
    switch($column){
        case 'message' :
            echo get_the_excerpt();
            break;

        case 'email':
            echo get_post_meta( $post_id, '_contact_email_value_key', true );
            break;

        case 'checkin':
            echo get_post_meta( $post_id, '_contact_checkin_value_key', true );
            break;

        case 'checkout':
            echo get_post_meta( $post_id, '_contact_checkout_value_key', true );
            break;

        case 'adults':
            echo get_post_meta( $post_id, '_contact_adults_value_key', true );
            break;

        case 'children':
            echo get_post_meta( $post_id, '_contact_children_value_key', true );
            break;
    }
}

/* CONTACT METABOX */

function contact_add_metabox()
{
    add_meta_box( 'contact_email', 'User email', array($this,'contact_email_callback'), 'orpheus_contact', 'normal', 'high' );
    add_meta_box( 'contact_checkin', 'Check In Date', array($this,'contact_checkin_callback'), 'orpheus_contact', 'normal', 'high' );
    add_meta_box( 'contact_checkout', 'Check Out Date', array($this,'contact_checkout_callback'), 'orpheus_contact', 'normal', 'high' );
    add_meta_box( 'contact_adults', 'Adults', array($this,'contact_adults_callback'), 'orpheus_contact', 'normal', 'high' );
    add_meta_box( 'contact_children', 'Children', array($this,'contact_children_callback'), 'orpheus_contact', 'normal', 'high' );
}

function contact_email_callback($post)
{
    wp_nonce_field( 'orpheus_save_email_data', 'orpheus_contact_email_meta_box_nonce' );
    $value = get_post_meta( $post->ID, '_contact_email_value_key', true );
    //var_dump(get_post_meta($post->ID));
    echo '<label for="orpheus_contact_email_field"> User Email Address: </label>';
    echo '<input class="regular-text" type="email" id="orpheus_contact_email_field" name="orpheus_contact_email_field" value="'.esc_attr( $value ).'" size="25"/>';
}

function contact_checkin_callback($post)
{
    wp_nonce_field( 'orpheus_save_checkin_data', 'orpheus_contact_checkin_meta_box_nonce' );
    $value = get_post_meta( $post->ID, '_contact_checkin_value_key', true );
    //var_dump(get_post_meta($post->ID));
    echo '<label for="checkin-picker"> User Checkin Date: </label>';
    echo '<input type="text" id="checkin-picker" name="orpheus_contact_checkin_field" value="'.esc_attr( $value ).'" size="25"/>';
}

function contact_checkout_callback($post)
{
    wp_nonce_field( 'orpheus_save_checkout_data', 'orpheus_contact_checkout_meta_box_nonce' );
    $value = get_post_meta( $post->ID, '_contact_checkout_value_key', true );
    //var_dump(get_post_meta($post->ID));
    echo '<label for="checkout-picker"> User Checkout Date: </label>';
    echo '<input type="text" id="checkout-picker" name="orpheus_contact_checkout_field" placeholder="dd mmm yyyy" value="'.esc_attr( $value ).'" size="25"/>';
}

function contact_adults_callback($post)
{
    wp_nonce_field( 'orpheus_save_adults_data', 'orpheus_contact_adults_meta_box_nonce' );
    $value = get_post_meta( $post->ID, '_contact_adults_value_key', true );
    //var_dump(get_post_meta($post->ID));
    echo '<label for="checkout-picker"> Adults: </label>';
    echo '<input type="number" id="adults" name="orpheus_contact_adults_field" value="'.esc_attr( $value ).'"';
}

function contact_children_callback($post)
{
    wp_nonce_field( 'orpheus_save_children_data', 'orpheus_contact_children_meta_box_nonce' );
    $value = get_post_meta( $post->ID, '_contact_children_value_key', true );
    //var_dump(get_post_meta($post->ID));
    echo '<label for="checkout-picker"> Children: </label>';
    echo '<input type="number" id="children" name="orpheus_contact_children_field" value="'.esc_attr( $value ).'"';
}

function orpheus_save_email_data($post_id)
{
    $metaBoxes = array( 'email', 'checkin', 'checkout', 'adults', 'children' );

    foreach ($metaBoxes as $meta) {
        if( !isset( $_POST['orpheus_contact_'.$meta.'_meta_box_nonce'])){
            return;
        }
        if(! wp_verify_nonce( $_POST['orpheus_contact_'.$meta.'_meta_box_nonce'], 'orpheus_save_'.$meta.'_data' )){
            return;
        }
        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE ) {
           return;
        }
        if (!current_user_can( 'edit_post', $post_id )) {
            return;
        }
        if (! isset( $_POST['orpheus_contact_'.$meta.'_field'])) {
            return;
        }

        $data = sanitize_text_field( $_POST['orpheus_contact_'.$meta.'_field'] );
        update_post_meta( $post_id, '_contact_'.$meta.'_value_key', $data );
    }


}


function user_cpt() {
    global $wpdb;

    $custom_post_type = 'cpt'; // define your custom post type slug here
    // A sql query to return all post titles
    $results = $wpdb->get_results( $wpdb->prepare( "SELECT ID, post_title FROM {$wpdb->posts} WHERE post_type = %s and post_status = 'publish'", $custom_post_type ), ARRAY_A );

    // Return null if we found no results
    // if ( ! $results )
    //     return;

    foreach( $results as $index => $post ) {
        // $output .= '<option value="' . $post['ID'] . '">' . $post['post_title'] . '</option>';
        $labels = array(
            'name'               => $post['post_title'],
            'singular_name'      => $post['post_title'],
            'add_new'            => 'Add ' .$post['post_title'],
            'all_items'          => 'All '.$post['post_title'].'s',
            'add_new_item'       => 'Add '.$post['post_title'],
            'edit_item'          => 'Edit '.$post['post_title'],
            'new_item'           => 'New '.$post['post_title'],
            'view_item'          => 'View '.$post['post_title'],
            'search_item'        => 'Search '.$post['post_title'],
            'not_found'          => 'No items found',
            'not_found_in_trash' => 'No items found in trash',
            'parent_item_colon'  => 'Parent Item'
        );
        $args = array(
            'labels' => $labels,
            'public' => true,
            'has_archive' => true,
            'publicly_queryable' => false,
            'query_var' => true,
            'rewrite' => true,
            'capability_type' => 'post',
            'hierarchical' => false,
            'supports' => array(
                'title',
                'editor',
                'excerpt',
                'thumbnail',
                'revisions',
                'comments',
                'metaboxes',
                'custom-fields'
            ),
            // 'taxonomies' => array('category', 'post_tag'),
            'menu_icon' => 'data:image/svg+xml;base64,' . base64_encode('<svg style="enable-background:new 0 0 20 20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" version="1.1" y="0px" x="0px">
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
           </svg>'),
            'menu_position' => 5,
            'exclude_from_search' => false,
            'show_in_rest'       => true,
            'rest_base'          => sanitize_title(Globals::remove_accent($post['post_title'])),
            'rest_controller_class' => 'WP_REST_Posts_Controller',
        );
        register_post_type(sanitize_title(Globals::remove_accent($post['post_title'])),$args);


    }


}


function user_add_metabox()
{
    $args = array(
        'name' => 'cpt'
     );

     $output = 'names'; // names or objects, note names is the default
    //  $operator = 'and';

    $screens = get_post_types( $args, $output );

    foreach ( $screens as $screen ) {
        for ($i=1; $i < 6; $i++) {

            add_meta_box( 'orpheus_cat'.$i, ' Category '.$i, array($this,'usr_cat'.$i.'_callback'), $screen, 'normal', 'high' );
        }

    }
}


function usr_cat1_callback($post)
{
    $cat = 'cat1';
    wp_nonce_field( 'orpheus_save_'.$cat.'_data', 'orpheus_'.$cat.'_meta_box_nonce' );
    $value = get_post_meta( $post->ID, '_'.$cat.'_value_key', true );
    echo '<label for="orpheus_'.$cat.'_field"> Taxonomie Name: </label>';
    echo '<input class="regular-text" type="text" id="orpheus_'.$cat.'_field" name="orpheus_'.$cat.'_field" value="'.esc_attr( $value ).'" size="25"/>';

}
function usr_cat2_callback($post)
{
    $cat = 'cat2';
    wp_nonce_field( 'orpheus_save_'.$cat.'_data', 'orpheus_'.$cat.'_meta_box_nonce' );
    $value = get_post_meta( $post->ID, '_'.$cat.'_value_key', true );
    echo '<label for="orpheus_'.$cat.'_field"> Taxonomie Name: </label>';
    echo '<input class="regular-text" type="text" id="orpheus_'.$cat.'_field" name="orpheus_'.$cat.'_field" value="'.esc_attr( $value ).'" size="25"/>';

}
function usr_cat3_callback($post)
{
    $cat = 'cat3';
    wp_nonce_field( 'orpheus_save_'.$cat.'_data', 'orpheus_'.$cat.'_meta_box_nonce' );
    $value = get_post_meta( $post->ID, '_'.$cat.'_value_key', true );
    echo '<label for="orpheus_'.$cat.'_field"> Taxonomie Name: </label>';
    echo '<input class="regular-text" type="text" id="orpheus_'.$cat.'_field" name="orpheus_'.$cat.'_field" value="'.esc_attr( $value ).'" size="25"/>';

}
function usr_cat4_callback($post)
{
    $cat = 'cat4';
    wp_nonce_field( 'orpheus_save_'.$cat.'_data', 'orpheus_'.$cat.'_meta_box_nonce' );
    $value = get_post_meta( $post->ID, '_'.$cat.'_value_key', true );
    echo '<label for="orpheus_'.$cat.'_field"> Taxonomie Name: </label>';
    echo '<input class="regular-text" type="text" id="orpheus_'.$cat.'_field" name="orpheus_'.$cat.'_field" value="'.esc_attr( $value ).'" size="25"/>';

}
function usr_cat5_callback($post)
{
    $cat = 'cat5';
    wp_nonce_field( 'orpheus_save_'.$cat.'_data', 'orpheus_'.$cat.'_meta_box_nonce' );
    $value = get_post_meta( $post->ID, '_'.$cat.'_value_key', true );
    echo '<label for="orpheus_'.$cat.'_field"> Taxonomie Name: </label>';
    echo '<input class="regular-text" type="text" id="orpheus_'.$cat.'_field" name="orpheus_'.$cat.'_field" value="'.esc_attr( $value ).'" size="25"/>';

}

function orpheus_save_cat_data($post_id)
{
    // $data = sanitize_text_field( $_POST['orpheus_cat1_field'] );
    // update_post_meta( $post_id, '_cat1_value_key', $data );
    $metaBoxes = array( 'cat1', 'cat2', 'cat3', 'cat4', 'cat5' );

    foreach ($metaBoxes as $meta) {
        if( !isset( $_POST['orpheus_'.$meta.'_meta_box_nonce'])){
            return;
        }
        if(! wp_verify_nonce( $_POST['orpheus_'.$meta.'_meta_box_nonce'], 'orpheus_save_'.$meta.'_data' )){
            return;
        }
        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE ) {
           return;
        }
        if (!current_user_can( 'edit_post', $post->ID )) {
            return;
        }
        if (! isset( $_POST['orpheus_'.$meta.'_field'])) {
            return;
        }

        $data = sanitize_text_field( $_POST['orpheus_'.$meta.'_field'] );
        update_post_meta( $post_id, '_'.$meta.'_value_key', $data );
    }



}
// function delivery_cpt(){
//     $labels = array(
//         'name'               => 'Company',
//         'singular_name'      => 'Company',
//         'add_new'            => 'Add Company',
//         'all_items'          => 'All Companys',
//         'add_new_item'       => 'Add Company',
//         'edit_item'          => 'Edit Company',
//         'new_item'           => 'New Company',
//         'view_item'          => 'View Company',
//         'search_item'        => 'Search Company',
//         'not_found'          => 'No items found',
//         'not_found_in_trash' => 'No items found in trash',
//         'parent_item_colon'  => 'Parent Item'
//     );
//     $args = array(
//         'labels' => $labels,
//         'public' => true,
//         'has_archive' => true,
//         'publicly_queryable' => true,
//         'query_var' => true,
//         'rewrite' => true,
//         'capability_type' => 'post',
//         'hierarchical' => false,
//         'supports' => array(
//             'title',
//             'editor',
//             'excerpt',
//             'thumbnail',
//             'revisions',
//             'comments',
//         ),
//         // 'taxonomies' => array('category', 'post_tag'),
//         'menu_icon' => 'dashicons-hammer',
//         'menu_position' => 5,
//         'exclude_from_search' => false,
//         'show_in_rest'       => true,
//         'rest_base'          => 'companys',
//         'rest_controller_class' => 'WP_REST_Posts_Controller',
//     );
//     register_post_type('company',$args);
//     }

    function usr_taxonomies() {

        global $wpdb;

        $custom_post_type = 'cpt'; // define your custom post type slug here

        // A sql query to return all post titles
        $results = $wpdb->get_results( $wpdb->prepare( "SELECT ID, post_title FROM {$wpdb->posts} WHERE post_type = %s and post_status = 'publish'", $custom_post_type ), ARRAY_A );
        // Return null if we found no results
        if ( ! $results )
            return;

            foreach( $results as $index => $post ) {
                // var_dump( $post);
                $cats = array('cat1','cat2','cat3','cat4','cat5');
                foreach ($cats as $cat) {
                    # code...
                    $key_value = get_post_meta( $post["ID"], '_'.$cat.'_value_key', true );
                    // Check if the custom field has a value.
                    $slug           = str_replace(' ', '_', strtolower($key_value)).'_type';
                    $single_name    = ucfirst($key_value);
                    $plural_name    = ucfirst($key_value).'s';
                    //$post_type      = $post["post_title"];
                    $post_type  =   sanitize_title(Globals::remove_accent($post['post_title']));
                    $rewrite        = array( 'slug' => $slug );
                    $rest_base      = $slug;
                    $hierarchical   = true;

                    if ( ! empty( $key_value ) ) {

                        $labels = array(
                            'name' => $plural_name,
                            'singular_name' => $single_name,
                            'search_items' =>  'Search ' . $plural_name,
                            'all_items' => 'All ' . $plural_name,
                            'parent_item' => 'Parent ' . $single_name,
                            'parent_item_colon' => 'Parent ' . $single_name . ':',
                            'edit_item' => 'Edit ' . $single_name,
                            'update_item' => 'Update ' . $single_name,
                            'add_new_item' => 'Add New ' . $single_name,
                            'new_item_name' => 'New ' . $single_name . ' Name',
                            'menu_name' => $plural_name
                        );
                        $rewrite = isset( $rewrite ) ? $rewrite : array( 'slug' => $slug );
                        $hierarchical = isset( $hierarchical ) ? $hierarchical : true;

                        register_taxonomy( $slug, $post_type, array(
                            'hierarchical' => $hierarchical,
                            'labels' => $labels,
                            'show_ui' => true,
                            'show_admin_column' => true,
                            'query_var' => true,
                            'rewrite' => $rewrite,
                            'show_in_rest'  => true,
                            'rest_base' => $rest_base,
                            'rest_controller_class' => 'WP_REST_Terms_Controller',
                        ));
                    }
                }

            }



    }


    // function company_taxonomies() {
    // //add new taxonomy hierarchical
    // $taxonomies = array(
	// 	array(
	// 		'slug'         => 'company_type',
	// 		'single_name'  => 'KIND OF BUSINESS (catering, pizza etc...)',
	// 		'plural_name'  => 'KIND OF BUSINESS ',
	// 		'post_type'    => 'company',
    //         'rewrite'      => array( 'slug' => 'company_type' ),
    //         'rest_base'    => 'company_type',
    //         'hierarchical' => false,

	// 	),
	// 	array(
	// 		'slug'         => 'Kitchen-type',
	// 		'single_name'  => 'Kitchen Type',
	// 		'plural_name'  => 'Kitchen Types',
	// 		'post_type'    => 'company',
    //         'hierarchical' => false,
    //         'rest_base'    => 'kitchen_type',

	// 	),
	// 	array(
	// 		'slug'         => 'area',
	// 		'single_name'  => 'Cover Area',
	// 		'plural_name'  => 'Cover Areas',
    //         'post_type'    => 'company',
    //         'hierarchical' => true,
    //         'rest_base'    => 'area',

	// 	),
	// );
	// foreach( $taxonomies as $taxonomy ) {
	// 	$labels = array(
	// 		'name' => $taxonomy['plural_name'],
	// 		'singular_name' => $taxonomy['single_name'],
	// 		'search_items' =>  'Search ' . $taxonomy['plural_name'],
	// 		'all_items' => 'All ' . $taxonomy['plural_name'],
	// 		'parent_item' => 'Parent ' . $taxonomy['single_name'],
	// 		'parent_item_colon' => 'Parent ' . $taxonomy['single_name'] . ':',
	// 		'edit_item' => 'Edit ' . $taxonomy['single_name'],
	// 		'update_item' => 'Update ' . $taxonomy['single_name'],
	// 		'add_new_item' => 'Add New ' . $taxonomy['single_name'],
	// 		'new_item_name' => 'New ' . $taxonomy['single_name'] . ' Name',
	// 		'menu_name' => $taxonomy['plural_name']
	// 	);

	// 	$rewrite = isset( $taxonomy['rewrite'] ) ? $taxonomy['rewrite'] : array( 'slug' => $taxonomy['slug'] );
	// 	$hierarchical = isset( $taxonomy['hierarchical'] ) ? $taxonomy['hierarchical'] : true;

	// 	register_taxonomy( $taxonomy['slug'], $taxonomy['post_type'], array(
	// 		'hierarchical' => $hierarchical,
	// 		'labels' => $labels,
    //         'show_ui' => true,
    //         'show_admin_column' => true,
	// 		'query_var' => true,
    //         'rewrite' => $rewrite,
    //         'show_in_rest'  => true,
    //         'rest_base' => $taxonomy['rest_base'],
    //         'rest_controller_class' => 'WP_REST_Terms_Controller',
	// 	));
	// }
    // }

function activate_contact()
{
    $checked = ( @$this->contact == 1 ? 'checked' : '');
    echo '<input type="checkbox" class="ios8-switch" id="activate_contact" name="orpheus_activate_contact" value="1" '.$checked.' /><label for="activate_contact">Activate Mesages Plugin</label>';
}
function activate_delivery()
{
    $checked = ( @$this->delivery == 1 ? 'checked' : '');
    echo '<input type="checkbox" class="ios8-switch" id="activate_delivery" name="orpheus_activate_delivery" value="1" '.$checked.' /><label for="activate_delivery">Activate Delivery</label>';
}

function calendar_callback()
{
    if (@$this->contact == 1) {
        echo '<div id="calendar" style="display: inline-block;"></div>';
    }
}

function cpt(){
    $labels = array(
        'name'              =>  'Cpt',
        'singular_name'     =>  'Cpt',
        'menu_name'         =>  'Cpt',
        'name_admin_bar'    =>  'Cpt',

    );

    $args = array(
        'labels'            =>  $labels,
        'show_ui'           =>  true,
        'show_in_menu'      =>  'edit.php?post_type=cpt',
        'show_in_rest'      =>  false,
        'show_in_nav_menus' =>  false,
        'view_item'         =>  true,
        'capability_type'   =>  'post',
        'hierarchical'      =>  false,
        'menu_position'     =>  26,
        'supports'          =>  array( 'title', 'editor', 'author','custom-fields' ),
    );
    register_post_type( 'cpt', $args );
}



/*  ======================
    Theme Options Sidebar
    ======================
 */

function activate_sidebar()
{
    $checked = ( @$this->sidebar == 1 ? 'checked' : '');
    echo '<input type="checkbox" class="ios8-switch" id="activate_sidebar" name="orpheus_activate_sidebar" value="1" '.$checked.' /><label for="activate_sidebar">Activate Sidebar</label>';

}

function sidebar_options()
{
    require_once $this->theme . '/inc/adminPages/sidebar-options.php';
}

function profile_picture()
{
    if (!empty($this->profile_pic)) {
        echo '<input type="button" class="button button-secondary btn-upload" value="Upload" id="upload-button" /><input type="button" class="button button-secondary btn-remove" value="&times;" id="remove-picture" /><input type="hidden" id="profile-picture" name="orpheus_profile_picture" value="'. $this->profile_pic .'"/>';
    } else {
        echo '<input type="button" class="button button-secondary btn-upload" value="Upload" id="upload-button" /><input type="hidden" id="profile-picture" name="orpheus_profile_picture" value="'. $this->profile_pic .'"/>';
    }
}

function sidebar_name()
{
    echo '<input class="regular-text" type="text" name="orpheus_title" placeholder="Title" value="'. $this->title .'"/><br /><input class="regular-text" type="text" name="orpheus_description" placeholder="Description" value="'. $this->description .'"/>';
}
function social_settings()
{
    foreach ($this->socials as $key => $value)
    {
        echo '<input class="regular-text" type="text" name="orpheus_'.$key.'" placeholder="'.$key.' name" value="'. $value .'"/><p class="description">Your '.$key.' name </p>';
    }
}



/*  ======================
    Theme Options Slider
    ======================
 */

function activate_slider()
{
    $checked = ( @$this->slider == 1 ? 'checked' : '');
    echo '<input type="checkbox" class="ios8-switch" id="activate_slider" name="orpheus_activate_slider" value="1" '.$checked.' /><label for="activate_slider">Activate Slider</label>';
}

function slider_content()
{
    $output = '<div class="add-slider-image"><div><input type="button" class="button button-secondary btn-upload-slider" value="Upload" id="upload-button-slider" />
    <input type="hidden" id="slider-image" name="orpheus_sliderimage" value="'. $this->sliderimage.'"/>';
    echo $output;

}



/*  ======================
    Theme Options CSS
    ======================
 */
function css_options()
{
    require_once $this->theme . '/inc/admin-adminPages/css-options.php';
}

function custom_css_field_callback()
{
    $css = get_option( 'orpheus_css');
    $css = (empty($css)) ? '/* Orpheus Theme Custom Css*/' : $css ;
    echo '<div id="customCss">'.$css.'</div><textarea id="orpheus_css" name="orpheus_css" style="display:none;visibility:hidden">$'.$css.'</textarea>';
}

function sanitize($input){
    $output = sanitize_text_field( $input );
    $output = str_replace('@', '', $output);
    return $output;
}

function sanitize_css($input){
    $output = esc_textarea( $input );
    return $output;
}

}

