<?php
/**
 * @package Orpheus
 *
 */

 namespace Inc\adminPages;

/* ========================
 * Sidebar Page
 * ========================
 */

?>
<h1> <?php echo wp_get_theme(); ?> Sidebar Options</h1>
<?php settings_errors(); ?>
<div class="admin-content">
    <div class="admin-form">
        <form class="general-form" action="options.php" method="post">
            <?php settings_fields( 'orpheus-sidebar-group' ); ?>
            <?php do_settings_sections( 'orpheus_sidebar' ); ?>
            <?php submit_button( 'Save changes', 'primary', 'btnSubmit' ); ?>
        </form>
    </div>
    <div class="admin-preview">
        <div class="sidebar">
            <div class="image-container">
                <div class="profile-picture"><img id="profile-picture-prev" height="150" width="150" src="<?php echo get_option( 'orpheus_profile_picture' ) ?>"></div>
            </div>
            <h1 class="username"><?php echo esc_attr_e(get_option( 'orpheus_title', 'orpheus' )); ?></h1>
            <h2 class="description"><?php echo esc_attr_e( get_option( 'orpheus_description', 'orpheus' ) ); ?></h2>
            <div class="icon-wrapper"></div>
        </div>
    </div>
</div>