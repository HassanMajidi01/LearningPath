<?php
/**
 * Template part for displaying posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package SpeedBlog
 */



$enable_single_author_meta = speedblog_get_option('enable_single_author_meta');
$select_single_author_meta = speedblog_get_option('select_single_author_meta');
$single_author_meta_title = speedblog_get_option('single_author_meta_title');

$enable_single_date_meta = speedblog_get_option('enable_single_date_meta');
$select_single_date = speedblog_get_option('select_single_date');
$single_date_meta_title = speedblog_get_option('single_date_meta_title');
$select_single_date_format = speedblog_get_option('select_single_date_format');

$enable_single_category_meta = speedblog_get_option('enable_single_category_meta');
$single_category_label = speedblog_get_option('single_category_label');
$select_single_category_color = speedblog_get_option('select_single_category_color');
$enable_single_read_time_meta = speedblog_get_option('enable_single_read_time_meta');
$enable_single_tag_meta = speedblog_get_option('enable_single_tag_meta');

$show_sticky_article_navigation = speedblog_get_option('show_sticky_article_navigation');
$show_related_posts = speedblog_get_option('show_related_posts');
$show_author_posts = speedblog_get_option('show_author_posts');
$show_author_info = speedblog_get_option('show_author_info');

$speedblog_post_navigation = get_post_meta($post->ID, 'speedblog_single_post_navigation', true);
$speedblog_single_category_meta = get_post_meta($post->ID, 'speedblog_single_category_meta', true);
$speedblog_single_date_meta = get_post_meta($post->ID, 'speedblog_single_date_meta', true);
$speedblog_single_author_meta = get_post_meta($post->ID, 'speedblog_single_author_meta', true);
$speedblog_single_related_post = get_post_meta($post->ID, 'speedblog_single_related_post', true);
$speedblog_single_author_post = get_post_meta($post->ID, 'speedblog_single_author_post', true);
$speedblog_single_post_author = get_post_meta($post->ID, 'speedblog_single_post_author_info', true);
?>

<article id="post-<?php the_ID(); ?>" <?php post_class('wpi-post wpi-post-default'); ?>>
    <?php speedblog_post_thumbnail(); ?>
    <div class="entry-details">
        <header class="entry-header">
            <?php
            if ($speedblog_single_category_meta == 1) {
                speedblog_post_category($select_single_category_color, $single_category_label);
            } elseif ($speedblog_single_category_meta == '') {
                if ($enable_single_category_meta) {
                    speedblog_post_category($select_single_category_color, $single_category_label);
                }
            } elseif ($speedblog_single_category_meta == 0) {
            }

            ?>
            <?php
            if (!$enable_single_read_time_meta) {
                speedblog_get_readtime();
            } ?>
            <?php
            the_title('<h1 class="entry-title entry-title-large entry-title-prime">', '</h1>');

            if ('post' === get_post_type()):
                ?>
                <div class="entry-meta-wrapper">

                    <?php
                    if ($speedblog_single_date_meta == 1) {
                        speedblog_posted_on($select_single_date_format, $single_date_meta_title, $select_single_date);
                    } elseif ($speedblog_single_date_meta == '') {
                        if ($enable_single_date_meta) {
                            speedblog_posted_on($select_single_date_format, $single_date_meta_title, $select_single_date);
                        }
                    } elseif ($speedblog_single_date_meta == 0) {
                    }
                    ?>

                    <?php
                    if ($speedblog_single_author_meta == 1) {
                        echo '<div class="entry-meta-separator"></div>';
                        speedblog_posted_by($select_single_author_meta, $single_author_meta_title);
                    } elseif ($speedblog_single_author_meta == '') {
                        if ($enable_single_author_meta) {
                            echo '<div class="entry-meta-separator"></div>';
                            speedblog_posted_by($select_single_author_meta, $single_author_meta_title);
                        }
                    } elseif ($speedblog_single_author_meta == 0) {
                    }
                    ?>

                </div><!-- .entry-meta -->
            <?php endif; ?>
        </header><!-- .entry-header -->

        <div class="entry-content">
            <?php
            the_content(
                sprintf(
                    wp_kses(
                        /* translators: %s: Name of current post. Only visible to screen readers */
                        __('Continue reading<span class="screen-reader-text"> "%s"</span>', 'speedblog'),
                        array(
                            'span' => array(
                                'class' => array(),
                            ),
                        )
                    ),
                    wp_kses_post(get_the_title())
                )
            );

            wp_link_pages(
                array(
                    'before' => '<div class="page-links">' . esc_html__('Pages:', 'speedblog'),
                    'after' => '</div>',
                )
            );
            ?>
        </div><!-- .entry-content -->

        <footer class="entry-footer">
            <?php speedblog_entry_footer($enable_single_tag_meta); ?>
        </footer><!-- .entry-footer -->
    </div>
</article><!-- #post-<?php the_ID(); ?> -->

<?php
if ('post' === get_post_type()):

    if ($speedblog_single_post_author == 1) {
        get_template_part('template-parts/single/single-author-info');
    } elseif ($speedblog_single_post_author == '') {
        if ($show_author_info) {
            get_template_part('template-parts/single/single-author-info');
        }
    } elseif ($speedblog_single_post_author == 0) {
    }

    if ($speedblog_single_related_post == 1) {
        get_template_part('template-parts/single/single-related-posts');
    } elseif ($speedblog_single_related_post == '') {
        if ($show_related_posts) {
            get_template_part('template-parts/single/single-related-posts');
        }
    } elseif ($speedblog_single_related_post == 0) {
    }

    if ($speedblog_single_author_post == 1) {
        get_template_part('template-parts/single/single-author-posts');
    } elseif ($speedblog_single_author_post == '') {
        if ($show_author_posts) {
            get_template_part('template-parts/single/single-author-posts');
        }
    } elseif ($speedblog_single_author_post == 0) {
    }

endif;
?>

<?php
if ($speedblog_post_navigation == 1) {
    get_template_part('template-parts/single/sticky-article-nav');
} elseif ($speedblog_post_navigation == '') {
    if ($show_sticky_article_navigation) {
        get_template_part('template-parts/single/sticky-article-nav');
    }
} elseif ($speedblog_post_navigation == 0) {
}
?>