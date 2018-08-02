<?php
/**
 * @package Orpheus
 *
 */

/* ========================
 * Socials Configuration Page
 * ========================
 */

namespace Inc\settings;


class Socials
{
    //private $adm;
    function __construct(){
        //$this   ->  themeUri            =   get_template_directory_uri();
    }
    function social_display()
    {
        $socials   =   array(
            'facebook'  => esc_attr( get_option( 'orpheus_facebook' ) ),
            'twitter'   => esc_attr( get_option( 'orpheus_twitter' ) ),
            'google'    => esc_attr( get_option( 'orpheus_google' ) ),
            'instagram'    => esc_attr( get_option( 'orpheus_instagram' ) ),
            'youtube'    => esc_attr( get_option( 'orpheus_youtube' ) ),
            'linkedin'    => esc_attr( get_option( 'orpheus_linkedin' ) )
        );
     return $socials;
    }

}