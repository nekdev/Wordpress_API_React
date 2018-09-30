<?php
/**
 * @package Orpheus
 *
 */

 namespace Inc\adminPages;

/* ========================
 * Css Page
 * ========================
 */
?>
<h1> <?php echo wp_get_theme(); ?> General Options</h1>
<?php settings_errors(); ?>
<div class="admin-content">
    <div class="admin-form">
        <form class="general-form" action="options.php" method="post">
            <?php settings_fields( 'orpheus-css-group' ); ?>
            <?php do_settings_sections( 'anila_css' ); ?>
            <?php submit_button( 'Save changes', 'primary', 'btnSubmit' ); ?>
        </form>
    </div>
</div>
