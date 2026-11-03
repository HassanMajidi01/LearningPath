<?php
$enable_article_list_section = speedblog_get_option('enable_article_list_section');
$article_list_post_title = speedblog_get_option('article_list_post_title');
$article_list_post_sub_title = speedblog_get_option('article_list_post_sub_title');
$article_list_post_category = speedblog_get_option('article_list_post_category');
$enable_article_list_author_meta = speedblog_get_option('enable_article_list_author_meta');
$select_article_list_author_meta = speedblog_get_option('select_article_list_author_meta');
$article_list_author_meta_title = speedblog_get_option('article_list_author_meta_title');
$enable_article_list_date_meta = speedblog_get_option('enable_article_list_date_meta');
$select_article_list_date = speedblog_get_option('select_article_list_date');
$select_article_list_date_meta_title = speedblog_get_option('select_article_list_date_meta_title');
$select_article_list_date_format = speedblog_get_option('select_article_list_date_format');
$enable_article_list_category_meta = speedblog_get_option('enable_article_list_category_meta');
$article_list_category_label = speedblog_get_option('article_list_category_label');
$select_article_list_category_color = speedblog_get_option('select_article_list_category_color');
$select_article_list_number_of_category = speedblog_get_option('select_article_list_number_of_category');
$article_list_post_button_title = speedblog_get_option('article_list_post_button_title');
$article_list_post_button_url = speedblog_get_option('article_list_post_button_url');
if (empty($enable_article_list_section)) {
    return;
}
?>
<section class="wpi-section theme-article-list">
    <div class="wrapper">
        <div class="row-group">
            <div class="column-lg-12">
                <?php if ($article_list_post_title || $article_list_post_sub_title) { ?>
                    <header class="section-header section-header-center">
                        <?php if ($article_list_post_title) { ?>
                            <h2 class="section-header-title" data-aos="fade-up" data-aos-duration="1000"
                                data-aos-delay="100"><?php echo esc_html($article_list_post_title); ?></h2>
                        <?php } ?>
                        <?php if ($article_list_post_sub_title) { ?>
                            <div class="section-header-sub-title" data-aos="fade-up" data-aos-duration="1000"
                                 data-aos-delay="200"><?php echo esc_html($article_list_post_sub_title); ?></div>
                        <?php } ?>
                    </header>
                <?php } ?>
                <div class="section-body">
                    <div class="article-list-content">
                        <?php
                        $article_list_args_1 = array(
                            'post_type' => 'post',
                            'posts_per_page' => 3,
                            'post_status' => 'publish',
                            'no_found_rows' => 1,
                            'ignore_sticky_posts' => 1,
                        );
                        // Check for category.
                        if (!empty($article_list_post_category)) :
                            $article_list_args_1['tax_query'] = array(
                                array(
                                    'taxonomy' => 'category',
                                    'field' => 'term_id',
                                    'terms' => $article_list_post_category,
                                ),
                            );
                        endif;
                        $count = 1;
                        $article_list_post_1 = new WP_Query($article_list_args_1);
                        if ($article_list_post_1->have_posts()) :
                            $delay = 300;
                            while ($article_list_post_1->have_posts()) :
                                $article_list_post_1->the_post(); ?>
                                <article id="article-list-<?php the_ID(); ?>" <?php post_class('wpi-post'); ?>
                                         data-aos="fade-up" data-aos-duration="1000"
                                         data-aos-delay="<?php echo esc_attr($delay); ?>">
                                    <?php if (has_post_thumbnail()) : ?>
                                        <div class="entry-image entry-image-big image-hover-effect hover-effect-shine">
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
                                        if ($enable_article_list_category_meta) {
                                            speedblog_post_category($select_article_list_category_color, $article_list_category_label, $select_article_list_number_of_category);
                                        }
                                        ?>
                                        <h3 class="entry-title entry-title-small">
                                            <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                                        </h3>
                                        <div class="entry-meta-wrapper">
                                            <?php
                                            if ($enable_article_list_date_meta) {
                                                speedblog_posted_on($select_article_list_date_format, $select_article_list_date_meta_title, $select_article_list_date);
                                            }
                                            ?>
                                            <?php
                                            if ($enable_article_list_author_meta) {
                                                speedblog_posted_by($select_article_list_author_meta, $article_list_author_meta_title);
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
                    <?php if ($article_list_post_button_title) { ?>
                        <div class="wpi-link-container" data-aos="fade-down" data-aos-duration="1000"
                             data-aos-delay="600">
                            <hr>
                            <a href="<?php echo esc_url($article_list_post_button_url); ?>"
                               class="wpi-button wpi-button-primary"> <?php echo esc_html($article_list_post_button_title); ?> </a>
                        </div>
                    <?php } ?>
                </div>
            </div>
        </div>
    </div>
</section>
