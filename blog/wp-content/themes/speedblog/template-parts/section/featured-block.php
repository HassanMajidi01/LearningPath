<?php
$enable_featured_block = speedblog_get_option('enable_featured_block');
$featured_block_post_title = speedblog_get_option('featured_block_post_title');
$featured_block_post_sub_title = speedblog_get_option('featured_block_post_sub_title');
$featured_block_category = speedblog_get_option('featured_block_category');
$enable_featured_block_category_meta = speedblog_get_option('enable_featured_block_category_meta');
$select_featured_block_category_color = speedblog_get_option('select_featured_block_category_color');
$select_featured_block_number_of_category = speedblog_get_option('select_featured_block_number_of_category');
$featured_block_category_label = speedblog_get_option('featured_block_category_label');

$enable_featured_block_author_meta = speedblog_get_option('enable_featured_block_author_meta');
$select_featured_block_author_meta = speedblog_get_option('select_featured_block_author_meta');
$featured_block_author_meta_title = speedblog_get_option('featured_block_author_meta_title');

$enable_featured_block_date_meta = speedblog_get_option('enable_featured_block_date_meta');
$select_featured_block_date = speedblog_get_option('select_featured_block_date');
$select_featured_block_date_meta_title = speedblog_get_option('select_featured_block_date_meta_title');
$select_featured_block_date_format = speedblog_get_option('select_featured_block_date_format');

$featured_block_button_title = speedblog_get_option('featured_block_button_title');
$featured_block_button_url = speedblog_get_option('featured_block_button_url');

$post_args = array(
    'post_type' => 'post',
    'posts_per_page' => 6,
    'post_status' => 'publish',
    'orderby' => 'date',
    'order' => 'DESC',
    'ignore_sticky_posts' => 1,
);
if (!empty($featured_block_category)) :
    $post_args['tax_query'][] = array(
        'taxonomy' => 'category',
        'field' => 'term_id',
        'terms' => absint($featured_block_category),
    );
endif;

$featured_block_posts = new WP_Query($post_args);

?>

<?php if ($enable_featured_block) { ?>
    <section class="wpi-section theme-featured-block">
        <div class="wrapper">
            <div class="row-group">
                <div class="column-lg-12">

                    <?php if ($featured_block_post_title || $featured_block_post_sub_title) { ?>
                        <header class="section-header section-header-center">
                            <?php if ($featured_block_post_title) { ?>
                                <h2 class="section-header-title" data-aos="fade-up" data-aos-duration="1000"
                                    data-aos-delay="100"><?php echo esc_html($featured_block_post_title); ?></h2>
                            <?php } ?>
                            <?php if ($featured_block_post_sub_title) { ?>
                                <div class="section-header-sub-title" data-aos="fade-up" data-aos-duration="1000"
                                     data-aos-delay="200"> <?php echo esc_html($featured_block_post_sub_title); ?></div>
                            <?php } ?>
                        </header>
                    <?php } ?>

                    <div class="section-body">
                        <div class="row-group">
                            <?php
                            if ($featured_block_posts->have_posts()) :
                                $delay = 500;
                                while ($featured_block_posts->have_posts()) : $featured_block_posts->the_post();
                                    $post_index = $featured_block_posts->current_post; ?>
                                    <div class="column-lg-4 column-md-6">
                                        <article
                                                id="featured-block-<?php the_ID(); ?>" <?php post_class('wpi-post content-position-adjust'); ?>
                                                data-aos="fade-up" data-aos-duration="1000"
                                                data-aos-delay="<?php echo esc_attr($delay); ?>">
                                            <?php if (has_post_thumbnail()) : ?>
                                                <div class="entry-image entry-image-medium image-hover-effect hover-effect-shine">
                                                    <a class="post-thumbnail" href="<?php the_permalink(); ?>"
                                                       aria-hidden="true" tabindex="-1">
                                                        <?php
                                                        the_post_thumbnail(
                                                            'medium_large',
                                                            array(
                                                                'alt' => the_title_attribute(
                                                                    array(
                                                                        'echo' => false,
                                                                    )
                                                                )
                                                            )
                                                        )
                                                        ?>
                                                    </a>
                                                </div>
                                            <?php endif; ?>

                                            <div class="entry-details">

                                                <?php
                                                if ($enable_featured_block_category_meta) {
                                                    speedblog_post_category($select_featured_block_category_color, $featured_block_category_label, $select_featured_block_number_of_category);
                                                }
                                                ?>

                                                <h2 class="entry-title entry-title-small limit-line-3">
                                                    <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                                                </h2>

                                                <div class="entry-meta-wrapper">

                                                    <?php
                                                    if ($enable_featured_block_date_meta) {
                                                        speedblog_posted_on($select_featured_block_date_format, $select_featured_block_date_meta_title, $select_featured_block_date);
                                                    }
                                                    ?>

                                                    <?php
                                                    if ($enable_featured_block_date_meta && $enable_featured_block_author_meta) { ?>
                                                        <div class="entry-meta-separator"></div>
                                                    <?php } ?>

                                                    <?php
                                                    if ($enable_featured_block_author_meta) {
                                                        speedblog_posted_by($select_featured_block_author_meta, $featured_block_author_meta_title);
                                                    }
                                                    ?>

                                                </div>

                                            </div>
                                        </article>
                                    </div>
                                    <?php $delay += 100;
                                    endwhile; ?>
                                <?php wp_reset_postdata(); // Reset post data
                                ?>
                            <?php endif; ?>
                        </div>

                        <?php if ($featured_block_button_title) { ?>
                            <div class="wpi-link-container" data-aos="fade-down" data-aos-duration="1000"
                                 data-aos-delay="300">
                                <hr>
                                <a href="<?php echo esc_url($featured_block_button_url); ?>"
                                   class="wpi-button wpi-button-primary"> <?php echo esc_html($featured_block_button_title); ?> </a>
                            </div>
                        <?php } ?>
                    </div>
                </div>
            </div>
        </div>
    </section>
<?php } ?>