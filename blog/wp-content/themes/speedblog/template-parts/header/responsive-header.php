<?php
/**
 * Displays Responsive Header
 *
 * @package SpeedBlog
 */

$blog_info = get_bloginfo('name');
$hide_title = speedblog_get_option('hide_title');
$header_class = $hide_title ? 'screen-reader-text' : 'site-title';
?>
<div class="site-header-responsive has-sticky-navigation hide-on-desktop">
    <div class="wrapper header-wrapper">
        <div class="header-components header-components-left">
            <button class="toggle nav-toggle" data-toggle-target=".menu-modal" data-toggle-body-class="showing-menu-modal" aria-expanded="false" data-set-focus=".close-nav-toggle">
                <span class="wpi-menu-icon">
                    <span></span>
                    <span></span>
                </span>
            </button><!-- .nav-toggle -->
        </div>
        <div class="header-components header-components-center">

            <div class="site-branding">
                <?php
                if (has_custom_logo()) {
                    ?>
                    <div class="site-logo">
                        <?php the_custom_logo(); ?>
                    </div>
                    <?php
                }
                if ($blog_info) {
                    ?>
                    <div class="<?php echo esc_attr($header_class); ?>">
                        <a href="<?php echo esc_url(home_url('/')); ?>"><?php echo esc_html($blog_info); ?></a></div>
                    <?php
                }
                ?>
            </div><!-- .site-branding -->
        </div>
        <div class="header-components header-components-right">
            <button class="toggle search-toggle" data-toggle-target=".search-modal" data-toggle-body-class="showing-search-modal" data-set-focus=".search-modal .search-field" aria-expanded="false">
                <?php speedblog_the_theme_svg('search'); ?>
            </button><!-- .search-toggle -->
        </div>
    </div>
</div>