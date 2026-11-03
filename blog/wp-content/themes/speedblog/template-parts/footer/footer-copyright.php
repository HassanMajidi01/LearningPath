<?php
/**
 * Displays footer Copyright Info
 *
 * @package SpeedBlog
 */

$enable_footer_nav = speedblog_get_option('enable_footer_nav');
$enable_footer_social_nav = speedblog_get_option('enable_footer_social_nav');
$enable_footer_social_nav_border_radius = speedblog_get_option('enable_footer_social_nav_border_radius');
$select_footer_social_menu_style = speedblog_get_option('select_footer_social_menu_style');
?>
<div class="site-info">
    <div class="wrapper">
        <div class="site-info-panel">
            <?php speedblog_get_copyright_text(); ?>
            <?php if ($enable_footer_social_nav) { ?>
                <nav aria-label="<?php esc_attr_e('Footer Social links', 'speedblog'); ?>">
                    <ul class="social-menu reset-list-style social-icons <?php echo esc_attr($select_footer_social_menu_style); ?> <?php if ($enable_footer_social_nav_border_radius) {
                        echo "has-border-radius";
                    } ?>">
                        <?php
                        wp_nav_menu(
                            array(
                                'theme_location' => 'social',
                                'container' => '',
                                'container_class' => '',
                                'items_wrap' => '%3$s',
                                'menu_id' => '',
                                'menu_class' => '',
                                'depth' => 1,
                                'link_before' => '<span class="screen-reader-text">',
                                'link_after' => '</span>',
                                'fallback_cb' => '',
                            )
                        );
                        ?>
                    </ul>
                </nav>
            <?php } ?>

            <?php if ($enable_footer_nav) { ?>
                <?php
                wp_nav_menu(
                    array(
                        'theme_location'  => 'footer',
                        'container_class' => 'footer-navigation',
                        'fallback_cb'     => false,
                        'depth'           => 1,
                        'menu_class'      => 'footer-menu reset-list-style',
                    )
                );
                ?>
            <?php } ?>

        </div>
    </div>
</div><!-- .site-info -->