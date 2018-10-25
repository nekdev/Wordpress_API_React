<?php
/**
 * @package Orpheus
 *
 */

 namespace Inc\api;

/* ========================
 * Init API
 * ========================
 */



class InitApi
{
    public function registerRoutes() {
        // Define API endpoint arguments
        $slug_arg = [
            'validate_callback' => function ( $param, $request, $key ) {
                return( is_string( $param ) );
            },
        ];
        $post_slug_arg = array_merge(
            $slug_arg,
            [
                "name" => "Orpheus",
                'description' => 'String representing a valid WordPress post slug',
            ]
        );
        $company_slug_arg = array_merge(
            $slug_arg,
            [
                "name" => "Orpheus",
                'description' => 'String representing a valid Company slug',
            ]
        );
        $test_slug_arg = array_merge(
            $slug_arg,
            [
                "name" => "Orpheus",
                'description' => 'String representing a valid test slug',
            ]
        );
        $mpiftekakia_slug_arg = array_merge(
            $slug_arg,
            [
                "name" => "Orpheus",
                'description' => 'String representing a valid Mpiftekakia slug',
            ]
        );
        $contact_slug_arg = array_merge(
            $slug_arg,
            [
                "name" => "Orpheus",
                'description' => 'Contact form',
            ]
        );
        $social_slug_arg = array_merge(
            $slug_arg,
            [
                "name" => "Orpheus",
                'description' => 'Social links',
            ]
        );
        $page_slug_arg = array_merge(
            $slug_arg,
            [
                'description' => 'String representing a valid WordPress page slug',
            ]
        );

        // Register routes
        register_rest_route( 'orpheus/v1', '/post', [
            'methods'  => 'GET',
            'callback' => array($this, 'rest_get_post'),
            'args' => [
                'slug' => array_merge(
                    $post_slug_arg,
                    [
                        'required' => true,
                    ]
                ),
            ],
        ] );

        register_rest_route('orpheus/v1', 'users/register', array(
            'methods' => 'POST',
            'callback' => 'rest_user_endpoint_handler',
          ));
          register_rest_route( 'orpheus/v1', '/login', array(
            'methods' => 'post',
            'callback' => array($this,'rest_user_login')
        ));
        register_rest_route( 'orpheus/v1', '/auth', array(
            'methods' => 'POST',
            'callback' => array($this,'rest_auth_user')
        ));

        register_rest_route( 'orpheus/v1', '/company', [
            'methods'  => 'GET',
            'callback' => array($this, 'rest_get_company'),
            'args' => [
                'slug' => array_merge(
                    $company_slug_arg,
                    [
                        'required' => true,
                    ]
                ),
            ],
        ] );
        register_rest_route( 'orpheus/v1', '/test', [
            'methods'  => 'GET',
            'callback' => array($this, 'rest_get_test'),
            'args' => [
                'slug' => array_merge(
                    $test_slug_arg,
                    [
                        'required' => true,
                    ]
                ),
            ],
        ] );
        register_rest_route( 'orpheus/v1', '/mpiftekakia', [
            'methods'  => 'GET',
            'callback' => array($this, 'rest_get_mpiftekakia'),
            'args' => [
                'slug' => array_merge(
                    $mpiftekakia_slug_arg,
                    [
                        'required' => false,
                    ]
                ),
            ],
        ] );

        register_rest_route( 'orpheus/v1', '/order', [
            'methods'  => 'post',
            'callback' => array($this, 'rest_order'),

        ] );

        register_rest_route( 'orpheus/v1', '/contact', [
            'methods'  => 'post',
            'callback' => array($this, 'rest_contact'),

        ] );

        register_rest_route( 'orpheus/v1', '/social', [
            'methods'  => 'get',
            'callback' => array($this, 'rest_social'),

        ] );

        register_rest_route( 'orpheus/v1', '/settings', [
            'methods'  => 'get',
            'callback' => array($this, 'rest_settings'),

        ] );


        register_rest_route( 'orpheus/v1', '/page', [
            'methods'  => 'GET',
            'callback' => array($this, 'rest_get_page'),
            'args' => [
                'slug' => array_merge(
                    $page_slug_arg,
                    [
                        'required' => true,
                    ]
                ),
            ],
        ] );

        register_rest_route('orpheus/v1', '/post/preview', [
            'methods'  => 'GET',
            'callback' => array($this, 'rest_get_post_preview'),
            'args' => [
                'id' => [
                    'validate_callback' => function ( $param, $request, $key ) {
                        return ( is_numeric( $param ) );
                    },
                    'required' => true,
                    'description' => 'Valid WordPress post ID',
                ],
            ],
            'permission_callback' => function () {
                return current_user_can( 'edit_posts' );
            },
        ] );

        register_rest_field(
            array ('post', 'page', 'company'), // Where to add the field (Here, blog posts. Could be an array)
            'featured_image_src', // Name of new field (You can call this anything)
            array(
                'get_callback'    => array ($this, 'get_image_src'),
                'update_callback' => null,
                'schema'          => null,
                 )
            );

        register_rest_field(
            array ('post', 'page', 'company'), // Where to add the field (Here, blog posts. Could be an array)
            'meta_src', // Name of new field (You can call this anything)
            array(
                'get_callback'    => array ($this, 'get_meta_src'),
                'update_callback' => null,
                'schema'          => null,
                    )
            );

    }


}