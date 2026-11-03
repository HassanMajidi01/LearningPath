<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @link https://codex.wordpress.org/Creating_an_Error_404_Page
 *
 * @package SpeedBlog
 */
get_header();
?>
    <main id="site-content" class="wpi-section" role="main">
        <div id="primary" class="primary-area">
            <div class="wrapper">
                <div id="notfound">

                    <div class="notfound-404">
                        <h1><?php esc_html_e('404', 'speedblog'); ?></h1>
                    </div>
                    <h2><?php esc_html_e('Oops! That page can&rsquo;t be found.', 'speedblog'); ?></h2>
                    <?php get_search_form(); ?>
                    <a href="<?php echo esc_url(home_url('/')); ?>" class="notfound-link">
                        <?php speedblog_the_theme_svg('arrow-double'); ?><?php esc_html_e('Go Back To Homepage', 'speedblog'); ?>
                    </a>

                </div>
            </div>
        </div>
    </main><!-- #main -->
<?php
get_footer();
