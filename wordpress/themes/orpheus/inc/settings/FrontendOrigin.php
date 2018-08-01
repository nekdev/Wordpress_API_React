<?php
/**
 * @package Orpheus
 *
 */
/* =========================================================
 * Placeholder function for determining the frontend origin.
 * =========================================================
 */
namespace Inc\settings;

class FrontendOrigin
{
    /**
     *
     * @TODO Determine the headless client's URL based on the current environment.
     *
     * @return str Frontend origin URL, i.e., http://localhost:3000.
     */
    function get_frontend_origin() {
        return 'http://gerti.dev';
    }

}

