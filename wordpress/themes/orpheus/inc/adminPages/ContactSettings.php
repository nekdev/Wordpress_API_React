<?php
/**
 * @package Orpheus
 *
 */

 namespace Inc\adminPages;

/* ========================
 * Contact Page
 * ========================
 */
?>
<h1> <?php echo wp_get_theme(); ?> Contact Options</h1>
<?php settings_errors(); ?>

<p>Use this <strong>Shortcode</strong> to activate the Booking Form</p>
<p><code>[booking_form]</code></p>

<div class="admin-content">
    <div class="admin-form">
        <form class="general-form" action="options.php" method="post">
            <?php settings_fields( 'orpheus-contact-group' ); ?>
            <?php do_settings_sections( 'orpheus_contact', 'orpheus_activate_contact' ); ?>
            <?php submit_button( 'Save changes', 'primary', 'btnSubmit' ); ?>
        </form>
    </div>
</div>
