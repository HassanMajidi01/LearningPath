<?php
$enable_recommended_post = speedblog_get_option('enable_recommended_post');
$recommended_post_title = speedblog_get_option('recommended_post_title');
$recommended_post_layout = speedblog_get_option('recommended_post_layout');
$recommended_post_args = array(
    'post_type' => 'post',
    'post_status' => 'publish',
    'no_found_rows' => 1,
    'ignore_sticky_posts' => 1,
);
$recommended_post_category = speedblog_get_option('recommended_post_category');
$recommended_post_args['posts_per_page'] = 4;
if (!empty($recommended_post_category)) :
    $recommended_post_args['tax_query'][] = array(
        'taxonomy' => 'category',
        'field' => 'term_id',
        'terms' => absint($recommended_post_category),
    );
endif;

$enable_recommended_post_author_meta = speedblog_get_option('enable_recommended_post_author_meta');
$select_recommended_post_author_meta = speedblog_get_option('select_recommended_post_author_meta');
$recommended_post_author_meta_title = speedblog_get_option('recommended_post_author_meta_title');

$enable_recommended_post_date_meta = speedblog_get_option('enable_recommended_post_date_meta');
$select_recommended_post_date = speedblog_get_option('select_recommended_post_date');
$select_recommended_post_date_meta_title = speedblog_get_option('select_recommended_post_date_meta_title');
$select_recommended_post_date_format = speedblog_get_option('select_recommended_post_date_format');

$enable_recommended_post_category_meta = speedblog_get_option('enable_recommended_post_category_meta');
$recommended_post_category_label = speedblog_get_option('recommended_post_category_label');
$select_recommended_post_category_color = speedblog_get_option('select_recommended_post_category_color');
$select_recommended_post_number_of_category = speedblog_get_option('select_recommended_post_number_of_category');


$wrapper_classes = '';
$title_class = '';
$image_class = '';
switch ($recommended_post_layout) {
    case 'wpi-post-recommendation-1':
        $recommended_post_args['posts_per_page'] = 6;
        $wrapper_classes = 'recommendation-style-1';
        for ($i = 1; $i <= 6; $i++) {
            if ($i <= 2) {
                $title_classes[$i] = ' entry-title-medium';
                $image_classes[$i] = ' entry-image-medium';
            } else {
                $title_classes[$i] = ' entry-title-small';
            }
        }
        break;
    case 'wpi-post-recommendation-2':
        $recommended_post_args['posts_per_page'] = 5;
        $wrapper_classes = 'recommendation-style-2';
        for ($i = 1; $i < 6; $i++) {
            if ($i <= 2) {
                $title_classes[$i] = ' entry-title-medium';
                $image_classes[$i] = ' entry-image-medium';
            } else {
                $title_classes[$i] = ' entry-title-medium';
                $image_classes[$i] = ' entry-image-small';
            }
        }
        break;
    case 'wpi-post-recommendation-3':
        $recommended_post_args['posts_per_page'] = 5;
        $wrapper_classes = 'recommendation-style-3';

        for ($i = 1; $i < 6; $i++) {
            if ($i <= 1) {
                $title_classes[$i] = ' entry-title-large';
                $image_classes[$i] = ' entry-image-large';
            } else {
                $title_classes[$i] = ' entry-title-medium';
                $image_classes[$i] = ' entry-image-medium';
            }
        }

        break;
}
$recommended_post = new WP_Query($recommended_post_args);
$post_index = 1;
if ($enable_recommended_post) { ?>
    <section class="wpi-section wpi-recommendation-section">
        <div class="wrapper">
            <?php if ($recommended_post_title) { ?>
                <header class="wpi-section-header">
                    <h2 class="section-header-title">
                        <?php echo esc_html($recommended_post_title); ?>
                    </h2>
                </header>
            <?php } ?>
            <div class="wpi-section-content recommendation-section-content <?php echo esc_attr($wrapper_classes); ?>">
                <?php
                $delay = 100;
                while ($recommended_post->have_posts()) :
                    $recommended_post->the_post(); ?>
                    <article id="recommendation-post-<?php the_ID(); ?>" <?php post_class('wpi-post wpi-post-recommendation wpi-post-recommendation-' . $post_index); ?> data-aos="fade-up" data-aos-duration="1000" data-aos-delay="<?php echo esc_attr($delay); ?>">
                        <?php if ($recommended_post_layout !== 'wpi-post-recommendation-1' || $post_index <= 2) { ?>
                            <div class="entry-image image-hover-effect hover-effect-shine<?php echo esc_attr($image_classes[$post_index]); ?>">
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
                        <?php } ?>
                        <div class="entry-details">
                            <?php
                            if ($enable_recommended_post_category_meta) {
                                speedblog_post_category($select_recommended_post_category_color, $recommended_post_category_label, $select_recommended_post_number_of_category);
                            }
                            ?>

                            <header class="entry-header">
                                <h3 class="entry-title<?php echo esc_attr($title_classes[$post_index]); ?>">
                                    <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                                </h3>
                            </header><!-- .entry-header -->

                            <div class="entry-meta-wrapper">

                                <?php
                                if ($enable_recommended_post_date_meta) {
                                    speedblog_posted_on($select_recommended_post_date_format, $select_recommended_post_date_meta_title, $select_recommended_post_date);
                                }
                                ?>

                                <?php
                                if ($enable_recommended_post_date_meta && $enable_recommended_post_author_meta) { ?>
                                    <div class="entry-meta-separator"></div>
                                <?php } ?>

                                <?php
                                if ($enable_recommended_post_author_meta) {
                                    speedblog_posted_by($select_recommended_post_author_meta, $recommended_post_author_meta_title);
                                }
                                ?>

                            </div>
                            
                        </div>
                    </article>
                    <?php
                    $post_index++;
                    $delay += 100;
                    ?>
                <?php endwhile;
                wp_reset_postdata();
                ?>
            </div>
        </div>
    </section>
<?php }