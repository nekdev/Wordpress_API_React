<?php
/**
 * @package Orpheus
 */
/* ========================
 * Admin Configuration Page
 * ========================
 */

if ( file_exists( get_template_directory(). '/vendor/autoload.php')) {
    require_once get_template_directory(). '/vendor/autoload.php';
}

use Inc\settings\AcfOptions;
use Inc\settings\FrontendOrigin;
use Inc\settings\MenuOptions;
use Inc\settings\Settings;
use Inc\settings\EnqueueAdmin;



class Admin {

     function __construct()
     {
        $this   ->  theme               =   get_template_directory();
        $this   ->  themeUri            =   get_template_directory_uri();
        $this   ->  acf_options         =   new AcfOptions;
        $this   ->  frontend_origin     =   new FrontendOrigin;
        $this   ->  MenuOptions         =   new MenuOptions;
        $this   ->  Settings            =   new Settings;
        $this   ->  enqueueAdmin        =   new EnqueueAdmin;
    }
    function register()
    {

        add_filter( 'script_loader_src', array($this, 'removeVersion' ));
        add_filter( 'style_loader_src', array($this, 'removeVersion' ));
        add_filter( 'the_generator', array($this, 'removeMetaVersion') );
        add_action( 'admin_enqueue_scripts', array($this->enqueueAdmin, 'enqueueAdmin' ));
        add_action( 'after_setup_theme', array($this, 'orpheus_setup'));
        add_filter('upload_mimes', array($this, 'cc_mime_types'));
        add_filter( 'wp_terms_checklist_args', array($this, 'taxonomy_ontop_filter' ));
        add_filter( 'preview_post_link', array($this, 'set_headless_preview_link' ));
        add_action( 'admin_menu',array($this->MenuOptions, 'admin_menu_option'));
        remove_filter( 'the_excerpt', 'wpautop' );
        add_action( 'init', array($this->Settings,'cpt'));
        add_action( 'init', array($this->Settings,'company_taxonomies'));
        add_action( 'init', array($this->Settings,'usr_taxonomies'));
        add_action( 'init', array($this->Settings,'user_cpt'));
        add_action( 'add_meta_boxes', array($this->Settings,'user_add_metabox' ));
        add_action( 'save_post', array($this->Settings, 'orpheus_save_cat_data' ));

        if( @$this->Settings->contact == 1) {
            add_action( 'init', array($this->Settings,'contact_cpt'));
            add_filter( 'manage_orpheus_contact_posts_columns', array($this->Settings, 'set_contact_columns'));
            add_action( 'manage_orpheus_contact_posts_custom_column', array($this->Settings, 'contact_custom_column'), 10, 2);
            add_action( 'add_meta_boxes', array($this->Settings,'contact_add_metabox' ));
            add_action( 'save_post', array($this->Settings, 'orpheus_save_email_data'));
            add_shortcode( 'booking_form', array($this->shortcodes, 'booking_form'));
        }
        if( @$this->Settings->delivery == 1) {
            add_action( 'init', array($this->Settings,'delivery_cpt'));
            add_filter( 'manage_orpheus_delivery_posts_columns', array($this->Settings, 'set_delivery_columns'));
            add_action( 'manage_orpheus_delivery_posts_custom_column', array($this->Settings, 'delivery_custom_column'), 10, 2);
            // add_action( 'add_meta_boxes', array($this->Settings,'delivery_add_metabox' ));
            // add_action( 'save_post', array($this->Settings, 'orpheus_save_email_data'));
            // add_shortcode( 'booking_form', array($this->shortcodes, 'booking_form'));
        }


        add_action( 'rest_api_init', function () {

            remove_filter( 'rest_pre_serve_request', 'rest_send_cors_headers' );

            add_filter( 'rest_pre_serve_request', function ( $value ) {
                header( 'Access-Control-Allow-Origin: ' . $this->frontend_origin->get_frontend_origin());
                header( 'Access-Control-Allow-Methods: GET' );
                header( 'Access-Control-Allow-Credentials: true' );
                return $value;
            });
        }, 15 );
        add_action(
            'rest_api_init',
            function () {
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
        );

		//$acf_commands = ACF_Commands();


    }

    /**
     * Removes the version of WP to prevent
     * @param str $src file types.
     * @return arr
     */
    function removeVersion($src)
    {
        global $wp_version;
        parse_str(parse_url($src, PHP_URL_QUERY),$query);
        if (!empty($query['ver']) && $query['ver'] === $wp_version) {
            $src = remove_query_arg( 'ver', $src );
        }
        return $src;
    }
    // Remove Meta version
    function removeMetaVersion()
    {
        return '';
    }
    /**
     * Adds theme support for for some commonly used features of WP and initialize the main menu
     */
    function orpheus_setup()
    {
        add_theme_support( 'title-tag' );
        add_theme_support( 'post-thumbnails' );
        add_theme_support( 'align-wide' );
        load_theme_textdomain( 'orpheus' );
        register_nav_menu( 'header-menu', __( 'Header Menu', 'orpheus' ) );
    }
    /**
     * Enables svg files to upload
     * @param arr $mimes file types.
     * @return arr
     */
    function cc_mime_types($mimes) {
        $mimes['svg'] = 'image/svg+xml';
        return $mimes;
    }

     /**
     * This function removes automatic reordering so the categories widget retains its order regardless of checked state.
     * @param arr $args Array of arguments.
     * @return arr
     */
    function taxonomy_ontop_filter( $args ) {
        $args['checked_ontop'] = false;
        return $args;
    }

    /**
     * Customize the preview button in the WordPress admin to point to the headless client.
     *
     * @param  str $link The WordPress preview link.
     * @return str The headless WordPress preview link.
     */
    function set_headless_preview_link( $link ) {
        return $this->frontend_origin->get_frontend_origin() . '/'
            . '_preview/'
            . get_the_ID() . '/'
            . wp_create_nonce( 'wp_rest' );
    }


    ////// set user Registretation and login
     //USER REGISTER
    // function rest_user_endpoint_handler(WP_REST_Request $request) {

    //     $username = sanitize_text_field($request['username']);
    //     $email = sanitize_text_field($request['email']);
    //     $password = sanitize_text_field($request['password']);
    //     // $role = sanitize_text_field($parameters['role']);
    //     $error = new WP_Error();
    //     if (empty($username)) {
    //       $error->add(400, __("Username field 'username' is required.", 'wp-rest-user'), array('status' => 400));
    //       return $error;
    //     }
    //     if (empty($email)) {
    //       $error->add(401, __("Email field 'email' is required.", 'wp-rest-user'), array('status' => 400));
    //       return $error;
    //     }
    //     if (empty($password)) {
    //       $error->add(404, __("Password field 'password' is required.", 'wp-rest-user'), array('status' => 400));
    //       return $error;
    //     }
    //     // if (empty($role)) {
    //     //  $role = 'subscriber';
    //     // } else {
    //     //     if ($GLOBALS['wp_roles']->is_role($role)) {
    //     //      // Silence is gold
    //     //     } else {
    //     //    $error->add(405, __("Role field 'role' is not a valid. Check your User Roles from Dashboard.", 'wp_rest_user'), array('status' => 400));
    //     //    return $error;
    //     //     }
    //     // }
    //     $user_id = username_exists($username);
    //     if (!$user_id && email_exists($email) == false) {
    //       $user_id = wp_create_user($username, $password, $email);
    //       if (!is_wp_error($user_id)) {
    //         // Ger User Meta Data (Sensitive, Password included. DO NOT pass to front end.)
    //         $user = get_user_by('id', $user_id);
    //         // $user->set_role($role);
    //         $user->set_role('subscriber');
    //         // WooCommerce specific code
    //         if (class_exists('WooCommerce')) {
    //           $user->set_role('customer');
    //         }
    //         // Ger User Data (Non-Sensitive, Pass to front end.)
    //         $response['code'] = 200;
    //         $response['message'] = __("User '" . $username . "' Registration was Successful", "wp-rest-user");
    //       } else {
    //         return $user_id;
    //       }
    //     } else {
    //       $error->add(406, __("Email already exists, please try 'Reset Password'", 'wp-rest-user'), array('status' => 400));
    //       return $error;
    //     }
    //     return new WP_REST_Response($response, 123);
    //   }

    /**
     * Respond to a REST API request user login.
     *
     * @param WP_REST_Request $request Request.
     * @return WP_REST_Response
     */
    function rest_user_login( WP_REST_Request $request ) {
        $nonce = wp_create_nonce("wp_rest");
        $user = wp_signon(array('user_login' => $request['user'],
            'user_password' => $request['password'], "rememberme" => true), false);
        if (is_wp_error($user)) {
            return $user;
        }

        //do_action( 'wp_login', "capad" );
        //$user['isloggedin'] = is_user_logged_in();
        return array('user' => $user,
            'nonce' => $nonce);
        // return $request;
    }



     /**
     * Respond to a REST API request to get post data.
     *
     * @param WP_REST_Request $request Request.
     * @return WP_REST_Response
     */
    function rest_get_post( WP_REST_Request $request ) {
        return $this->rest_get_content( $request, 'post', __FUNCTION__ );
    }

    /**
     * Respond to a REST API request to get delivery data.
     *
     * @param WP_REST_Request $request Request.
     * @return WP_REST_Response
     */
    function rest_get_company( WP_REST_Request $request ) {
        return $this->rest_get_content( $request, 'company', __FUNCTION__ );
    }


    // Add order items to wp post order
    function rest_order( WP_REST_Request $request ) {
        $order = $request['orders'];
        $store = $request['store'];
        $total = $request['total'];
        $items = '';

        function showItems($i){
                $txt= '';
                foreach ($i as $key => $value) {
                    if ($value == "true") {
                        $txt .= ' '.$key .', ';

                    }else {
                        $txt .= ' <del>'.$key .', </del> ';
                    }
                }
                return $txt;
            }
        foreach ($order as $item => $value) {
            $items .= $value['quantity'] .' '. $value['name'] . ' - ' . showItems($value['ingredients']) .' -- '. showItems($value['extras']) . ' --- ' . '<span style="font-wheight:500;">'.$value['multiline'].'</span>' . ' | '.$value['price'] .'€<br>';
            if ($value == 'name') {

            }
        };
        $items .= 'TOTAL: ' .$total.'€';


        $my_post = array(
            'post_type'     => 'order',
            'post_title'    => wp_strip_all_tags( 'New order for '.$store ),
            'post_content'  => $items,
            'post_status'   => 'draft',
            'post_author'   => 1,
            // 'post_category' => array( 8,39 )
          );

          // Insert the post into the database
          wp_insert_post( $my_post );
    return $total;
    }

    /**
     * Respond to a REST API request to get contact data.
     *
     * @param WP_REST_Request $request Request.
     * @return WP_REST_Response
     */
    function rest_contact( WP_REST_Request $request ) {

        $admin_email = get_option('admin_email');

        $name = sanitize_text_field($request['name']);
        $email = sanitize_email($request['email']);
        $businessName = sanitize_text_field($request['businessName']);
        $phone = sanitize_text_field($request['phone']);
        $website = sanitize_text_field($request['website']);
        $value = sanitize_text_field($request['value']);
        $textarea = sanitize_textarea_field($request['textarea']);
        $to = $admin_email;
        $subject = 'Contact form ConceptShop';
        $body = 'Name: '.$name . '<br /> Email: '. $email.' <br />Business Name: '.$businessName.'<br />Phone: '.$phone.'<br />Website: '.$website.'<br />Area: '.$value.'<br />Message : '.$textarea;
        $headers = array('Content-Type: text/html; charset=UTF-8');

        wp_mail( $to, $subject, $body, $headers );

    return "message sent";
    }

    /**
     * Respond to a REST API request to get Social data.
     *
     * @param WP_REST_Request $request Request.
     * @return WP_REST_Response
     */
    function rest_social( WP_REST_Request $request ) {
        $socials   =   array(
            'facebook'  => esc_attr( get_option( 'orpheus_facebook' ) ),
            'twitter'   => esc_attr( get_option( 'orpheus_twitter' ) ),
            'google'    => esc_attr( get_option( 'orpheus_google' ) ),
            'instagram'  => esc_attr( get_option( 'orpheus_instagram' ) ),
            'youtube'   => esc_attr( get_option( 'orpheus_youtube' ) ),
            'linkedin'    => esc_attr( get_option( 'orpheus_linkedin' ) ),
        );
    return $socials;
    }

    /**
     * Respond to a REST API request to get Theme settings.
     *
     * @param WP_REST_Request $request Request.
     * @return WP_REST_Response
     */
    function rest_settings( WP_REST_Request $request ) {
        $settings   =   array(
            'header-type'  => esc_attr( get_option( 'orpheus_header_type' ) ),
            'logo'  => esc_attr( get_option( 'orpheus_logo' ) ),
            'logoSize'  => esc_attr( get_option( 'orpheus_logosize' ) ),
            'sticky'   => esc_attr( get_option( 'orpheus_sticky' ) ),
            'shadeMenu'    => esc_attr( get_option( 'orpheus_shade_menu' ) ),
            'headerImage'    => esc_attr( get_option( 'orpheus_header_image' ) ),
            'headerTitle'    => esc_attr( get_option( 'orpheus_header_title' ) ),

        );
    return $settings;
    }


    /**
     * Respond to a REST API request to get page data.
     *
     * @param WP_REST_Request $request Request.
     * @return WP_REST_Response
     */
    function rest_get_page( WP_REST_Request $request ) {
        return $this->rest_get_content( $request, 'page', __FUNCTION__ );
    }

    function rest_get_content( WP_REST_Request $request, $type, $function_name ) {
        $content_in_array = in_array(
            $type,
            [
                'post',
                'page',
                'company',
            ],
            true
        );
        if ( ! $content_in_array ) {
            $type = 'post';
        }
        $slug = $request->get_param( 'slug' );
        $post = $this->get_content_by_slug( $slug, $type );
        if ( ! $post ) {
            return new WP_Error(
                $function_name,
                $slug . ' ' . $type . ' does not exist',
                [
                    'status' => 404,
                ]
            );
        };

        // Shortcut to WP admin page editor
        $edit = $request->get_param( 'edit' );
        if ( 'true' === $edit ) {
            header( 'Location: /wp-admin/post.php?post=' . $post->ID . '&action=edit' );
            exit;
        }
        $controller = new WP_REST_Posts_Controller( 'post' );
        $data = $controller->prepare_item_for_response( $post, $request );
        $response = $controller->prepare_response_for_collection( $data );

        return new WP_REST_Response( $response );
    }

    //Rest get featured image
    function get_image_src( $object, $field_name, $request ) {
        $feat_img_array = wp_get_attachment_image_src(
          $object['featured_media'], // Image attachment ID
          'full',  // Size.  Ex. "thumbnail", "large", "full", etc..
          true // Whether the image should be treated as an icon.
        );
        return $feat_img_array[0];
      }

      //Rest get categories terms from cpt , ['area','company_type']
      function get_meta_src( $object, $field_name, $request ) {
        $terms =  get_the_terms( $object["id"], 'area' );
        return $terms;
      }
    /**
     * Returns a post or page given a slug. Returns false if no post matches.
     *
     * @param str $slug Slug
     * @param str $type Valid values are 'post' or 'page'
     * @return Post
     */
    function get_content_by_slug( $slug, $type = 'post' ) {
        $content_in_array = in_array(
            $type,
            [
                'post',
                'page',
                'company',
            ],
            true
        );
        if ( ! $content_in_array ) {
            $type = 'post';
        }
        $args = [
            'name'        => $slug,
            'post_type'   => $type,
            'post_status' => 'publish',
            'numberposts' => 1,
        ];

        // phpcs:ignore WordPress.VIP.RestrictedFunctions.get_posts_get_posts
        $post_search_results = get_posts( $args );

        if ( !$post_search_results ) { // Maybe the slug changed
            // check wp_postmeta table for old slug
            $args = [
                // phpcs:ignore WordPress.VIP.SlowDBQuery.slow_db_query_meta_query
                'meta_query' => [
                    [
                        'key' => '_wp_old_slug',
                        'value' => "name",
                        'compare' => '=',
                    ],
                ],
            ];
            $query = new WP_Query( $args );
            $post_search_results = $query->posts;
        }
        if ( isset( $post_search_results[0] ) ) {
            return $post_search_results[0];
        }
        return false;
    }

    /**
     * Respond to a REST API request to get a post's latest revision.
     * * Requires a valid _wpnonce on the query string
     * * User must have 'edit_posts' rights
     * * Will return draft revisions of even published posts
     *
     * @param  WP_REST_Request $request Rest request.
     * @return WP_REST_Response
     */
    function rest_get_post_preview( WP_REST_Request $request ) {

        $post_id = $request->get_param( 'id' );
        // Revisions are drafts so here we remove the default 'publish' status
        remove_action( 'pre_get_posts', 'set_default_status_to_publish' );
        $check_enabled = [
            'check_enabled' => false,
        ];
        if ( $revisions = wp_get_post_revisions( $post_id, $check_enabled ) ) {
            $last_revision = reset( $revisions );
            $rev_post = wp_get_post_revision( $last_revision->ID );
            $controller = new WP_REST_Posts_Controller( 'post' );
            $data = $controller->prepare_item_for_response( $rev_post, $request );
        } elseif ( $post = get_post( $post_id ) ) { // There are no revisions, just return the saved parent post
            $controller = new WP_REST_Posts_Controller( 'post' );
            $data = $controller->prepare_item_for_response( $post, $request );
        } else {
            $not_found = [
                'status' => 404,
            ];
            $error = new WP_Error(
                'rest_get_post_preview',
                'Post ' . $post_id . ' does not exist',
                $not_found
            );
            return $error;
        }
        $response = $controller->prepare_response_for_collection( $data );
        return new WP_REST_Response( $response );
    }

}
if (class_exists('Admin')) {
    $admin =new Admin();
    $admin->register();
}

