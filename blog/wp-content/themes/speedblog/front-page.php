<?php
/**
 * The front page template file
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package SpeedBlog
 */
get_header();
if ('posts' == get_option('show_on_front')) {

    if (!is_paged() && is_front_page()) {
        
        
        get_template_part('template-parts/section/main-banner');
        get_template_part('template-parts/section/featured-category');
        get_template_part('template-parts/section/highlight-cat-post');
        get_template_part('template-parts/section/article-list');
        get_template_part('template-parts/section/article-grid');
        get_template_part('template-parts/section/featured-block');
        get_template_part('template-parts/section/spotlight-section');
        get_template_part('template-parts/widgetarea/homepage-fullwidth-top');
        get_template_part('template-parts/widgetarea/homepage-two-column');
        get_template_part('template-parts/widgetarea/homepage-fullwidth-bottom');
    }

    include get_home_template();
} else {
        get_template_part('template-parts/section/main-banner');
        get_template_part('template-parts/section/featured-category');
        get_template_part('template-parts/section/highlight-cat-post');
        get_template_part('template-parts/section/article-list');
        get_template_part('template-parts/section/article-grid');
        get_template_part('template-parts/section/featured-block');
        get_template_part('template-parts/section/spotlight-section');

    if (!is_paged() && is_front_page()) {
        get_template_part('template-parts/widgetarea/homepage-fullwidth-top');
        get_template_part('template-parts/widgetarea/homepage-two-column');
        get_template_part('template-parts/widgetarea/homepage-fullwidth-bottom');
    }

    do_action('speedblog_home_before_widget_area');
    ?>

    <main id="site-content" class="wpi-section" role="main">
        <div class="wrapper">
            <div class="row-group">
                <div id="primary" class="primary-area">
                    <div class="article-groups <?php echo esc_attr($archive_layout); ?>">
                        <?php
                        if (have_posts()) :
                            $delay = 100;
                            /* Start the Loop */
                            while (have_posts()) :
                                the_post();
                                /*
                                 * Include the Post-Type-specific template for the content.
                                 * If you want to override this in a child theme, then include a file
                                 * called content-___.php (where ___ is the Post Type name) and that will be used instead.
                                 */
                                get_template_part('template-parts/archive/archive', 'content', array( 'delay' => $delay ));
                            $delay += 100;
                            endwhile;

                        else :
                            get_template_part('template-parts/content', 'none');
                        endif;
                        ?>
                    </div>
                    <?php
                    speedblog_pagination_style();
                    ?>
                </div>
                <?php
                get_sidebar();
                ?>
            </div>
        </div>
    </main><!-- #main -->

    <?php
    if (!is_paged() && is_front_page()) {
        get_template_part('template-parts/footer/footer-recomended');
    }
}

get_footer();
