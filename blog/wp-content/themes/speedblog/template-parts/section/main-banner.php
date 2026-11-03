<?php
$enable_main_banner_section = speedblog_get_option('enable_main_banner_section');
$banner_slider_post_category = speedblog_get_option('banner_slider_post_category');
$banner_lists_post_category = speedblog_get_option('banner_lists_post_category');
$enable_main_banner_author_meta = speedblog_get_option('enable_main_banner_author_meta');
$select_main_banner_author_meta = speedblog_get_option('select_main_banner_author_meta');
$main_banner_author_meta_title = speedblog_get_option('main_banner_author_meta_title');
$enable_main_banner_date_meta = speedblog_get_option('enable_main_banner_date_meta');
$select_main_banner_date = speedblog_get_option('select_main_banner_date');
$select_main_banner_date_meta_title = speedblog_get_option('select_main_banner_date_meta_title');
$select_main_banner_date_format = speedblog_get_option('select_main_banner_date_format');
$enable_main_banner_category_meta = speedblog_get_option('enable_main_banner_category_meta');
$main_banner_category_label = speedblog_get_option('main_banner_category_label');
$select_main_banner_category_color = speedblog_get_option('select_main_banner_category_color');
$select_main_banner_number_of_category = speedblog_get_option('select_main_banner_number_of_category');
if (empty($enable_main_banner_section)) {
    return;
}
?>
<section class="wpi-section theme-main-banner">
    <div class="wrapper">
        <div class="row-group">

            <div class="column-lg-7 column-md-12">
                <div class="main-banner-left">
                    <div class="main-banner-slider swiper adjust-pagination">
                        <div class="swiper-wrapper">
                            <?php
                            // post slider section
                            $post_slider_args = array(
                                'post_type' => 'post',
                                'posts_per_page' => 5,
                                'post_status' => 'publish',
                                'no_found_rows' => 1,
                                'ignore_sticky_posts' => 1,
                            );
                            // Check for category.
                            if (!empty($banner_slider_post_category)) :
                                $post_slider_args['tax_query'] = array(
                                    array(
                                        'taxonomy' => 'category',
                                        'field' => 'term_id',
                                        'terms' => $banner_slider_post_category,
                                    ),
                                );
                            endif;
                            $slider_posts = new WP_Query($post_slider_args);
                            if ($slider_posts->have_posts()) :
                                while ($slider_posts->have_posts()) :
                                    $slider_posts->the_post(); ?>
                                    <div class="swiper-slide">
                                        <article id="main-banner-<?php the_ID(); ?>" class="wpi-post">
                                            <?php if (has_post_thumbnail()) : ?>
                                                <div class="entry-image image-hover-effect hover-effect-shine">
                                                    <a class="post-thumbnail" href="<?php the_permalink(); ?>" aria-hidden="true" tabindex="-1">
                                                        <?php
                                                        the_post_thumbnail(
                                                            'large',
                                                            array(
                                                                'alt' => the_title_attribute(
                                                                    array(
                                                                        'echo' => false,
                                                                    )
                                                                ),
                                                            )
                                                        );
                                                        ?>
                                                    </a>
                                                </div>
                                            <?php else: ?>
                                                <div class="entry-image image-hover-effect hover-effect-shine">
                                                    <a class="post-thumbnail" href="<?php the_permalink(); ?>" aria-hidden="true" tabindex="-1">
                                                        <img src="<?php echo esc_url(speedblog_placeholder_image()); ?>" alt="<?php the_title_attribute(); ?>">
                                                    </a>
                                                </div>
                                            <?php endif; ?>
                                            <div class="entry-details">
                                                <?php
                                                if ($enable_main_banner_category_meta) {
                                                    speedblog_post_category($select_main_banner_category_color, $main_banner_category_label, $select_main_banner_number_of_category);
                                                }
                                                ?>
                                                <h3 class="entry-title entry-title-large limit-line-3" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="100">
                                                    <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                                                </h3>
                                                <div class="entry-content-excerpt" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                                                    <?php echo wpautop(wp_kses_post(speedblog_get_archive_excerpt())); ?>
                                                </div>
                                                <div class="entry-meta-wrapper" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300">
                                                    <?php
                                                    if ($enable_main_banner_date_meta) {
                                                        speedblog_posted_on($select_main_banner_date_format, $select_main_banner_date_meta_title, $select_main_banner_date);
                                                    }
                                                    ?>
                                                    <?php
                                                    if ($enable_main_banner_author_meta) {
                                                        speedblog_posted_by($select_main_banner_author_meta, $main_banner_author_meta_title);
                                                    }
                                                    ?>
                                                </div>
                                            </div>
                                        </article>
                                    </div>
                                <?php
                                endwhile;
                                wp_reset_postdata();
                            endif; ?>
                        </div>
                        <div class="swiper-pagination"></div>
                        <div class="swiper-button-next"></div>
                        <div class="swiper-button-prev"></div>
                    </div>
                </div>
            </div>

            <div class="column-lg-5 column-md-12">
                <div class="main-banner-right">
                    <?php
                    // post grid bottom section
                    $post_list_args = array(
                        'post_type' => 'post',
                        'posts_per_page' => 5,
                        'post_status' => 'publish',
                        'no_found_rows' => 1,
                        'ignore_sticky_posts' => 1,
                    );
                    // Check for category.
                    if (!empty($banner_lists_post_category)) :
                        $post_list_args['tax_query'] = array(
                            array(
                                'taxonomy' => 'category',
                                'field' => 'term_id',
                                'terms' => $banner_lists_post_category,
                            ),
                        );
                    endif;
                    $count = 1;
                    $slider_list_posts = new WP_Query($post_list_args);
                    if ($slider_list_posts->have_posts()) :
                        $delay = 100;
                        while ($slider_list_posts->have_posts()) :
                            $slider_list_posts->the_post(); ?>
                            <article id="main-banner-<?php the_ID(); ?>" class="wpi-post wpi-post-list" data-aos="fade-left" data-aos-delay="<?php echo esc_attr($delay); ?>">
                                <?php if (has_post_thumbnail()) : ?>
                                    <div class="entry-image entry-image-small image-hover-effect hover-effect-zoom">
                                        <a class="post-thumbnail" href="<?php the_permalink(); ?>" aria-hidden="true" tabindex="-1">
                                            <?php
                                            the_post_thumbnail(
                                                'medium',
                                                array(
                                                    'alt' => the_title_attribute(
                                                        array(
                                                            'echo' => false,
                                                        )
                                                    ),
                                                )
                                            );
                                            ?>
                                        </a>
                                    </div>
                                <?php endif; ?>
                                <div class="entry-details">
                                    <?php
                                    if ($enable_main_banner_category_meta) {
                                        speedblog_post_category($select_main_banner_category_color, $main_banner_category_label, $select_main_banner_number_of_category);
                                    }
                                    ?>
                                    <h3 class="entry-title entry-title-small limit-line-3">
                                        <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                                    </h3>
                                    <div class="entry-meta-wrapper">
                                        <?php
                                        if ($enable_main_banner_date_meta) {
                                            speedblog_posted_on($select_main_banner_date_format, $select_main_banner_date_meta_title, $select_main_banner_date);
                                        }
                                        ?>
                                        <?php
                                        if ($enable_main_banner_author_meta) {
                                            speedblog_posted_by($select_main_banner_author_meta, $main_banner_author_meta_title);
                                        }
                                        ?>
                                    </div>
                                </div>
                            </article>
                            <?php
                            $delay += 100;
                        endwhile;
                        wp_reset_postdata();
                    endif; ?>
                </div>
            </div>
        </div>
    </div>
</section>