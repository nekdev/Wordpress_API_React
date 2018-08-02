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
        );
        // print_r($socials) ;
        // header('Content-Type: application/json');
        // echo json_encode($socials);
        //  echo $socialsJSON;
        //  $output = '[';
        // foreach ($socials as $key => $value)
        // {
        //     if ($value) {

        //         $output .=  '{'. $value .'}';
        //         // <a class="social-link" href="https://www.'.$key.'.com/'.$value.'" target="_blank" aria-label="fa fa-'.$key.'">
        //         // <span class="simple-svg" data-icon="simple-line-icons:social-'.$key.'" data-inline="false"></span>
        //         // </a></li>';
        //     }

        // }

        // $output .= ']';
        // echo $output;
    }

}