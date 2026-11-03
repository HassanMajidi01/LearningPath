<?php
$enable_article_grid_section = speedblog_get_option('enable_article_grid_section');
$article_grid_post_title_1 = speedblog_get_option('article_grid_post_title_1');
$article_grid_post_sub_title = speedblog_get_option('article_grid_post_sub_title');
$article_grid_post_category = speedblog_get_option('article_grid_post_category');
$enable_article_grid_author_meta = speedblog_get_option('enable_article_grid_author_meta');
$select_article_grid_author_meta = speedblog_get_option('select_article_grid_author_meta');
$article_grid_author_meta_title = speedblog_get_option('article_grid_author_meta_title');
$enable_article_grid_date_meta = speedblog_get_option('enable_article_grid_date_meta');
$select_article_grid_date = speedblog_get_option('select_article_grid_date');
$select_article_grid_date_meta_title = speedblog_get_option('select_article_grid_date_meta_title');
$select_article_grid_date_format = speedblog_get_option('select_article_grid_date_format');
$enable_article_grid_category_meta = speedblog_get_option('enable_article_grid_category_meta');
$article_grid_category_label = speedblog_get_option('article_grid_category_label');
$select_article_grid_category_color = speedblog_get_option('select_article_grid_category_color');
$select_article_grid_number_of_category = speedblog_get_option('select_article_grid_number_of_category');
if (empty($enable_article_grid_section)) {
    return;
}
?>
<section class="wpi-section theme-article-grid">
    <div class="wrapper">
        <div class="row-group">
            <div class="column-lg-12">
                <?php if ($article_grid_post_title_1 || $article_grid_post_sub_title) { ?>
                    <header class="section-header section-header-center">
                        <?php if ($article_grid_post_title_1) { ?>
                            <h2 class="section-header-title" data-aos="fade-up" data-aos-duration="1000"
                                data-aos-delay="100"><?php echo esc_html($article_grid_post_title_1); ?></h2>
                        <?php } ?>
                        <?php if ($article_grid_post_sub_title) { ?>
                            <div class="section-header-sub-title" data-aos="fade-up" data-aos-duration="1000"
                                 data-aos-delay="200"> <?php echo esc_html($article_grid_post_sub_title); ?></div>
                        <?php } ?>
                    </header>
                <?php } ?>
                <div class="article-grid-content">
                    <?php
                    $cat_highlight_args_1 = array(
                        'post_type' => 'post',
                        'posts_per_page' => 13,
                        'post_status' => 'publish',
                        'no_found_rows' => 1,
                        'ignore_sticky_posts' => 1,
                    );
                    // Check for category.
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
                        ?>
                        <div class="row-group">
                            <div class="column-lg-4 column-md-6">
                                <div class="article-list-left">
                                    <?php
                                    $post_count = 0;
                                    $delay = 300;
                                    while ($cat_highlight_post_1->have_posts() && $post_count < 5) :
                                        $cat_highlight_post_1->the_post();
                                        $post_count++;
                                        ?>
                                        <article id="article-list-<?php the_ID(); ?>" class="wpi-post wpi-post-list" data-aos="fade-right" data-aos-duration="1000" data-aos-delay="<?php echo esc_attr($delay); ?>">
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
                                                if ($enable_article_grid_category_meta) {
                                                    speedblog_post_category($select_article_grid_category_color, $article_grid_category_label, $select_article_grid_number_of_category);
                                                }
                                                ?>
                                                <h3 class="entry-title entry-title-small limit-line-3">
                                                    <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                                                </h3>
                                                <div class="entry-meta-wrapper">
                                                    <?php
                                                    if ($enable_article_grid_date_meta) {
                                                        speedblog_posted_on($select_article_grid_date_format, $select_article_grid_date_meta_title, $select_article_grid_date);
                                                    }
                                                    ?>
                                                    <?php
                                                    if ($enable_article_grid_author_meta) {
                                                        speedblog_posted_by($select_article_grid_author_meta, $article_grid_author_meta_title);
                                                    }
                                                    ?>
                                                </div>
                                            </div>
                                        </article>
                                        <?php
                                        $delay += 100;
                                    endwhile;
                                    ?>
                                </div>
                            </div>
                            <div class="column-lg-4 column-md-6">
                                <div class="article-list-middle">
                                    <?php
                                    $delay = 300;
                                    while ($cat_highlight_post_1->have_posts() && $post_count < 8) :
                                        $cat_highlight_post_1->the_post();
                                        $post_count++;
                                        ?>
                                        <article id="article-list-<?php the_ID(); ?>" class="wpi-post wpi-tile-post" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="<?php echo esc_attr($delay); ?>">
                                            <?php if (has_post_thumbnail()) : ?>
                                                <div class="entry-image entry-image-medium image-hover-effect hover-effect-shine">
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
                                            <?php else: ?>
                                                <div class="entry-image entry-image-medium image-hover-effect hover-effect-shine">
                                                    <a class="post-thumbnail" href="<?php the_permalink(); ?>" aria-hidden="true" tabindex="-1">
                                                        <img src="<?php echo esc_url(speedblog_placeholder_image()); ?>" alt="<?php the_title_attribute(); ?>">
                                                    </a>
                                                </div>
                                            <?php endif; ?>
                                            <div class="entry-details">
                                                <?php
                                                if ($enable_article_grid_category_meta) {
                                                    speedblog_post_category($select_article_grid_category_color, $article_grid_category_label, $select_article_grid_number_of_category);
                                                }
                                                ?>
                                                <h3 class="entry-title entry-title-small">
                                                    <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                                                </h3>
                                                <div class="entry-meta-wrapper">
                                                    <?php
                                                    if ($enable_article_grid_date_meta) {
                                                        speedblog_posted_on($select_article_grid_date_format, $select_article_grid_date_meta_title, $select_article_grid_date);
                                                    }
                                                    ?>
                                                    <?php
                                                    if ($enable_article_grid_author_meta) {
                                                        speedblog_posted_by($select_article_grid_author_meta, $article_grid_author_meta_title);
                                                    }
                                                    ?>
                                                </div>
                                            </div>
                                        </article>
                                        <?php
                                        $delay += 100;
                                    endwhile;
                                    ?>
                                </div>
                            </div>
                            <div class="column-lg-4 column-md-12">
                                <div class="article-list-right">
                                    <?php
                                    $delay = 300;
                                    while ($cat_highlight_post_1->have_posts() && $post_count < 13) :
                                        $cat_highlight_post_1->the_post();
                                        $post_count++;
                                        ?>
                                        <article id="article-list-<?php the_ID(); ?>"
                                                 class="wpi-post wpi-post-list wpi-post-list-reverse"
                                                 data-aos="fade-left"
                                                 data-aos-duration="1000"
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
                                                if ($enable_article_grid_category_meta) {
                                                    speedblog_post_category($select_article_grid_category_color, $article_grid_category_label, $select_article_grid_number_of_category);
                                                }
                                                ?>
                                                <h3 class="entry-title entry-title-small limit-line-3">
                                                    <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                                                </h3>
                                                <div class="entry-meta-wrapper">
                                                    <?php
                                                    if ($enable_article_grid_date_meta) {
                                                        speedblog_posted_on($select_article_grid_date_format, $select_article_grid_date_meta_title, $select_article_grid_date);
                                                    }
                                                    ?>
                                                    <?php
                                                    if ($enable_article_grid_author_meta) {
                                                        speedblog_posted_by($select_article_grid_author_meta, $article_grid_author_meta_title);
                                                    }
                                                    ?>
                                                </div>
                                            </div>
                                        </article>
                                        <?php
                                        $delay += 100;
                                    endwhile;
                                    ?>
                                </div>
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