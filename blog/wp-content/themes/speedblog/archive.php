<?php
/**
 * The template for displaying archive pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package SpeedBlog
 */
get_header();
$archive_layout = speedblog_get_option('archive_layout');
?>
    <main id="site-content" class="wpi-section" role="main">
        <div class="wrapper">
            <div class="row-group">
                <div id="primary" class="primary-area">
                    <?php speedblog_get_breadcrumb(); ?>
                    <div class="article-groups <?php echo esc_attr($archive_layout);?>">
                    <?php if (have_posts()) : ?>
                        <header class="page-header">
                            <?php
                            the_archive_title('<h1 class="page-title">', '</h1>');
                            the_archive_description('<div class="archive-description">', '</div>');
                            ?>
                        </header><!-- .page-header -->
                        <?php
                        /* Start the Loop */
                        $delay = 100;
                        while (have_posts()) :
                            the_post();
                            /*
                             * Include the Post-Type-specific template for the content.
                             * If you want to override this in a child theme, then include a file
                             * called content-___.php (where ___ is the Post Type name) and that will be used instead.
                             */
                            get_template_part('template-parts/archive/archive-content', null, array( 'delay' => $delay ));
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
get_footer();
