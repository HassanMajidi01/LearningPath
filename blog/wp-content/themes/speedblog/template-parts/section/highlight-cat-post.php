<?php
$enable_cat_highlight_section = speedblog_get_option('enable_cat_highlight_section');
$cat_highlight_post_title = speedblog_get_option('cat_highlight_post_title');
$cat_highlight_post_sub_title = speedblog_get_option('cat_highlight_post_sub_title');
$cat_highlight_post_category = speedblog_get_option('cat_highlight_post_category');
$enable_cat_highlight_author_meta = speedblog_get_option('enable_cat_highlight_author_meta');
$select_cat_highlight_author_meta = speedblog_get_option('select_cat_highlight_author_meta');
$cat_highlight_author_meta_title = speedblog_get_option('cat_highlight_author_meta_title');
$enable_cat_highlight_date_meta = speedblog_get_option('enable_cat_highlight_date_meta');
$select_cat_highlight_date = speedblog_get_option('select_cat_highlight_date');
$select_cat_highlight_date_meta_title = speedblog_get_option('select_cat_highlight_date_meta_title');
$select_cat_highlight_date_format = speedblog_get_option('select_cat_highlight_date_format');
$enable_cat_highlight_category_meta = speedblog_get_option('enable_cat_highlight_category_meta');
$cat_highlight_category_label = speedblog_get_option('cat_highlight_category_label');
$select_cat_highlight_category_color = speedblog_get_option('select_cat_highlight_category_color');
$select_cat_highlight_number_of_category = speedblog_get_option('select_cat_highlight_number_of_category');
if (empty($enable_cat_highlight_section)) {
    return;
}
?>
<section class="wpi-section theme-highlight-feed">
    <div class="wrapper">
        <div class="row-group">
            <div class="column-lg-12">
                <?php if ($cat_highlight_post_title || $cat_highlight_post_sub_title) { ?>
                    <header class="section-header section-header-center">
                        <?php if ($cat_highlight_post_title) { ?>
                            <h2 class="section-header-title" data-aos="fade-up" data-aos-duration="1000"
                                data-aos-delay="100"><?php echo esc_html($cat_highlight_post_title); ?></h2>
                        <?php } ?>
                        <?php if ($cat_highlight_post_sub_title) { ?>
                            <div class="section-header-sub-title" data-aos="fade-up" data-aos-duration="1000"
                                 data-aos-delay="200"> <?php echo esc_html($cat_highlight_post_sub_title); ?></div>
                        <?php } ?>
                    </header>
                <?php } ?>
                <div class="row-group">
                    <?php
                    $cat_highlight_args_1 = array(
                        'post_type' => 'post',
                        'posts_per_page' => 7,
                        'post_status' => 'publish',
                        'no_found_rows' => 1,
                        'ignore_sticky_posts' => 1,
                    );
                    if (!empty($cat_highlight_post_category)) :
                        $cat_highlight_args_1['tax_query'] = array(
                            array(
                                'taxonomy' => 'category',
                                'field' => 'term_id',
                                'terms' => $cat_highlight_post_category,
                            ),
                        );
                    endif;
                    $cat_highlight_post_1 = new WP_Query($cat_highlight_args_1);
                    if ($cat_highlight_post_1->have_posts()) :
                        $post_count = 0;
                        ?>
                        <div class="column-lg-4 column-md-6 column-sm-12">
                            <div class="highlight-feed-left">
                                <?php
                                while ($cat_highlight_post_1->have_posts() && $post_count < 1) :
                                    $cat_highlight_post_1->the_post();
                                    $post_count++;
                                    ?>
                                    <article id="highlight-feed-<?php the_ID(); ?>"
                                             class="highlight-feed-large wpi-post content-position-adjust">
                                        <?php if (has_post_thumbnail()) : ?>
                                            <div class="entry-image entry-image-large image-hover-effect hover-effect-shine"
                                                 data-aos="fade-down" data-aos-duration="1000" data-aos-delay="300">
                                                <a class="post-thumbnail" href="<?php the_permalink(); ?>"
                                                   aria-hidden="true"
                                                   tabindex="-1">
                                                    <?php
                                                    the_post_thumbnail(
                                                        'medium_large',
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
                                        <div class="entry-details" data-aos="fade-right" data-aos-duration="1000"
                                             data-aos-delay="400">
                                            <?php
                                            if ($enable_cat_highlight_category_meta) {
                                                speedblog_post_category($select_cat_highlight_category_color, $cat_highlight_category_label, $select_cat_highlight_number_of_category);
                                            }
                                            ?>
                                            <h3 class="entry-title entry-title-small">
                                                <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                                            </h3>
                                            <div class="entry-meta-wrapper">
                                                <?php
                                                if ($enable_cat_highlight_date_meta) {
                                                    speedblog_posted_on($select_cat_highlight_date_format, $select_cat_highlight_date_meta_title, $select_cat_highlight_date);
                                                }
                                                ?>
                                                <?php
                                                if ($enable_cat_highlight_author_meta) {
                                                    speedblog_posted_by($select_cat_highlight_author_meta, $cat_highlight_author_meta_title);
                                                }
                                                ?>
                                            </div>
                                        </div>
                                    </article>
                                <?php endwhile; ?>
                            </div>
                        </div>
                        <div class="column-lg-4 column-md-6 column-sm-12">
                            <div class="highlight-feed-middle">
                                <?php
                                $delay = 500;
                                while ($cat_highlight_post_1->have_posts() && $post_count < 4) :
                                    $cat_highlight_post_1->the_post();
                                    $post_count++;
                                    ?>
                                    <article id="highlight-feed-<?php the_ID(); ?>" class="wpi-post wpi-post-list"
                                             data-aos="fade-up" data-aos-duration="1000"
                                             data-aos-delay="<?php echo esc_attr($delay); ?>">
                                        <?php if (has_post_thumbnail()) : ?>
                                            <div class="entry-image entry-image-small image-hover-effect hover-effect-shine">
                                                <a class="post-thumbnail" href="<?php the_permalink(); ?>"
                                                   aria-hidden="true"
                                                   tabindex="-1">
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
                                            if ($enable_cat_highlight_category_meta) {
                                                speedblog_post_category($select_cat_highlight_category_color, $cat_highlight_category_label, $select_cat_highlight_number_of_category);
                                            }
                                            ?>
                                            <h3 class="entry-title entry-title-small limit-line-3">
                                                <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                                            </h3>
                                            <div class="entry-meta-wrapper">
                                                <?php
                                                if ($enable_cat_highlight_date_meta) {
                                                    speedblog_posted_on($select_cat_highlight_date_format, $select_cat_highlight_date_meta_title, $select_cat_highlight_date);
                                                }
                                                ?>
                                                <?php
                                                if ($enable_cat_highlight_author_meta) {
                                                    speedblog_posted_by($select_cat_highlight_author_meta, $cat_highlight_author_meta_title);
                                                }
                                                ?>
                                            </div>
                                        </div>
                                    </article>
                                    <?php
                                    $delay += 100;
                                endwhile; ?>
                            </div>
                        </div>
                        <div class="column-lg-4 column-md-12">
                            <div class="highlight-feed-right">
                                <?php
                                $delay = 800;
                                while ($cat_highlight_post_1->have_posts() && $post_count < 6) :
                                    $cat_highlight_post_1->the_post();
                                    $post_count++;
                                    ?>
                                    <article id="highlight-feed-<?php the_ID(); ?>" class="wpi-post wpi-tile-post"
                                             data-aos="fade-left" data-aos-duration="1000"
                                             data-aos-delay="<?php echo esc_attr($delay); ?>">
                                        <?php if (has_post_thumbnail()) : ?>
                                            <div class="entry-image entry-image-medium image-hover-effect hover-effect-shine">
                                                <a class="post-thumbnail" href="<?php the_permalink(); ?>"
                                                   aria-hidden="true"
                                                   tabindex="-1">
                                                    <?php
                                                    the_post_thumbnail(
                                                        'medium_large',
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
                                            <div class="entry-image entry-image-medium image-hover-effect hover-effect-shine">
                                                <a class="post-thumbnail" href="<?php the_permalink(); ?>" aria-hidden="true" tabindex="-1">
                                                    <img src="<?php echo esc_url(speedblog_placeholder_image()); ?>" alt="<?php the_title_attribute(); ?>">
                                                </a>
                                            </div>
                                        <?php endif; ?>
                                        <div class="entry-details">
                                            <?php
                                            if ($enable_cat_highlight_category_meta) {
                                                speedblog_post_category($select_cat_highlight_category_color, $cat_highlight_category_label, $select_cat_highlight_number_of_category);
                                            }
                                            ?>
                                            <h3 class="entry-title entry-title-small limit-line-2">
                                                <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                                            </h3>
                                            <div class="entry-meta-wrapper">
                                                <?php
                                                if ($enable_cat_highlight_date_meta) {
                                                    speedblog_posted_on($select_cat_highlight_date_format, $select_cat_highlight_date_meta_title, $select_cat_highlight_date);
                                                }
                                                ?>
                                                <?php
                                                if ($enable_cat_highlight_author_meta) {
                                                    speedblog_posted_by($select_cat_highlight_author_meta, $cat_highlight_author_meta_title);
                                                }
                                                ?>
                                            </div>
                                        </div>
                                    </article>
                                    <?php
                                    $delay += 100;
                                endwhile; ?>
                            </div>
                        </div>
                        <?php
                        wp_reset_postdata();
                    endif;
                    ?>
                </div>
            </div>
        </div>
</section>
