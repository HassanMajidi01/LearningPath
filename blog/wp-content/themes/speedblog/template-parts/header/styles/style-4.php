<?php
/**
 * Displays the site header.
 *
 * @package SpeedBlog
 */
?>
<header id="masthead" class="site-header site-header-4">
    <?php get_template_part('template-parts/header/responsive-header'); ?>
    <div class="site-header-desktop hide-on-tablet hide-on-mobile">
        <div class="wrapper header-wrapper">
            <div class="header-components header-components-left">
                <?php
                if (has_nav_menu('expanded')) {
                    ?>
                    <button class="toggle nav-toggle desktop-nav-toggle" data-toggle-target=".menu-modal" data-toggle-body-class="showing-menu-modal" aria-expanded="false" data-set-focus=".close-nav-toggle">
                        <span class="toggle-text screen-reader-text"><?php _e('Menu', 'speedblog'); ?></span>
                        <span class="wpi-menu-icon">
                            <span></span>
                            <span></span>
                        </span>
                    </button><!-- .nav-toggle -->
                    <?php
                }
                ?>
                <?php
                get_template_part('template-parts/header/site-branding');
                ?>
            </div>
            <div class="header-components header-components-center">
                <div class="header-navigation-wrapper">
                    <?php
                    if (has_nav_menu('primary')) {
                        ?>
                        <nav class="primary-menu-wrapper"
                             aria-label="<?php echo esc_attr_x('Horizontal', 'menu', 'speedblog'); ?>">
                            <ul class="primary-menu reset-list-style">
                                <?php
                                if (has_nav_menu('primary')) {
                                    wp_nav_menu(
                                        array(
                                            'container' => '',
                                            'items_wrap' => '%3$s',
                                            'theme_location' => 'primary',
                                        )
                                    );
                                } elseif (!has_nav_menu('expanded')) {
                                    wp_list_pages(
                                        array(
                                            'match_menu_classes' => true,
                                            'show_sub_menu_icons' => true,
                                            'title_li' => false,
                                            'walker' => new SpeedBlog_Walker_Page(),
                                        )
                                    );
                                }
                                ?>
                            </ul>
                        </nav><!-- .primary-menu-wrapper -->
                        <?php
                    } else { ?>
                        <nav class="primary-menu-wrapper ">
                            <ul class="primary-menu reset-list-style fallback-menu">
                                <?php
                                wp_list_pages(
                                    array(
                                        'match_menu_classes' => true,
                                        'show_sub_menu_icons' => true,
                                        'title_li' => false,
                                    )
                                );
                                ?>
                            </ul>
                        </nav>
                    <?php } ?>
                </div><!-- .header-navigation-wrapper -->
            </div>
            <div class="header-components header-components-right">
                <button class="toggle search-toggle desktop-search-toggle" data-toggle-target=".search-modal" data-toggle-body-class="showing-search-modal" data-set-focus=".search-modal .search-field" aria-expanded="false">
                    <?php speedblog_the_theme_svg('search'); ?>
                </button><!-- .search-toggle -->
            </div>
        </div>
    </div>
</header><!-- #masthead -->