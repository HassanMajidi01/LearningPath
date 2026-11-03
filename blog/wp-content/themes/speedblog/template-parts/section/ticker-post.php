<?php
$enable_ticker_posts = speedblog_get_option('enable_ticker_posts');
if ($enable_ticker_posts) {
    $ticker_posts_cat = speedblog_get_option('ticker_posts_cat');
    $no_of_ticker_posts = speedblog_get_option('no_of_ticker_posts');
    $ticker_posts_number_of_post_offsets = speedblog_get_option('ticker_posts_number_of_post_offsets');
    $ticker_posts_orderby = speedblog_get_option('ticker_posts_orderby', 'date');
    $ticker_posts_order = speedblog_get_option('ticker_posts_order', 'desc');
    $enable_ticker_posts_author_meta = speedblog_get_option('enable_ticker_posts_author_meta');
    $select_ticker_posts_author_meta = speedblog_get_option('select_ticker_posts_author_meta');
    $ticker_posts_author_meta_title = speedblog_get_option('ticker_posts_author_meta_title');
    $enable_ticker_posts_date_meta = speedblog_get_option('enable_ticker_posts_date_meta');
    $select_ticker_posts_date = speedblog_get_option('select_ticker_posts_date');
    $single_ticker_post_date_meta_title = speedblog_get_option('single_ticker_post_date_meta_title');
    $select_ticker_posts_date_format = speedblog_get_option('select_ticker_posts_date_format');
    $enable_ticker_posts_category_meta = speedblog_get_option('enable_ticker_posts_category_meta');
    $ticker_posts_category_label = speedblog_get_option('ticker_posts_category_label');
    $select_ticker_posts_category_color = speedblog_get_option('select_ticker_posts_category_color');
    $select_ticker_posts_number_of_category = speedblog_get_option('select_ticker_posts_number_of_category');
    // Covert id to ID to make it work with query
    if ('id' == $ticker_posts_orderby) {
        $ticker_posts_orderby = 'ID';
    }    

    if (!empty($ticker_posts_number_of_post_offsets)) {
        $ticker_posts_offsets = $ticker_posts_number_of_post_offsets;
    }else {
        $ticker_posts_offsets = '';
    }
    $post_args = array(
        'post_type' => 'post',
        'posts_per_page' => absint($no_of_ticker_posts),
        'post_status' => 'publish',
        'no_found_rows' => 1,
        'offset' => $ticker_posts_offsets,
        'ignore_sticky_posts' => 1,
        'orderby' => esc_attr($ticker_posts_orderby),
        'order' => esc_attr($ticker_posts_order),
    );
    // Check for category.
    if (!empty($ticker_posts_cat)) :
        $post_args['tax_query'] = array(
            array(
                'taxonomy' => 'category',
                'field' => 'term_id',
                'terms' => $ticker_posts_cat,
            ),
        );
    endif;
    $ticker_posts = new WP_Query($post_args);
    if ($ticker_posts->have_posts()) :
        $ticker_label_text = speedblog_get_option('ticker_label_text');
        
        ?>
        <div class="wpi-header-ticker">
            <div class="wrapper">
                <div class="wpi-ticker-panel">
                    <?php if (speedblog_get_option('enable_ticker_label', true)) : ?>
                        <div class="wpi-ticker-title">
                            <span class="ticker-loader"></span>
                            <?php
                            if ($ticker_label_text) :
                                echo esc_html($ticker_label_text);
                            else :
                                esc_html_e('News Flash', 'speedblog');
                            endif;
                            ?>
                        </div>
                    <?php endif; ?>
                    <div class="wpi-ticker-content">
                        <div class="wpi-ticker-init swiper" data-mag-ticker-speed="12000">
                            <div class="swiper-wrapper wpi-ticker-init-wrapper">
                                <?php
                                while ($ticker_posts->have_posts()) :
                                    $ticker_posts->the_post();
                                    ?>
                                    <div class="swiper-slide wpi-ticker-init-item">
                                        <article id="ticker-post-<?php the_ID(); ?>" <?php post_class('wpi-post wpi-post-ticker'); ?>>
                                            <div class="entry-details">
                                                <?php
                                                if ($enable_ticker_posts_category_meta) {
                                                    speedblog_post_category($select_ticker_posts_category_color, $ticker_posts_category_label, $select_ticker_posts_number_of_category);
                                                }
                                                ?>
                                                <h3 class="entry-title entry-title-small">
                                                    <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                                                </h3>
                                                <div class="entry-meta-wrapper hide-on-tablet hide-on-mobile">
                                                    <?php
                                                    if ($enable_ticker_posts_date_meta) {
                                                        speedblog_posted_on($select_ticker_posts_date_format, $single_ticker_post_date_meta_title, $select_ticker_posts_date);
                                                    }
                                                    ?>
                                                    <?php
                                                    if ($enable_ticker_posts_date_meta && $enable_ticker_posts_author_meta) { ?>
                                                        <div class="entry-meta-separator"></div>
                                                    <?php } ?>
                                                    <?php
                                                    if ($enable_ticker_posts_author_meta) {
                                                        speedblog_posted_by($select_ticker_posts_author_meta, $ticker_posts_author_meta_title);
                                                    }
                                                    ?>
                                                </div>
                                            </div>
                                        </article>
                                    </div>
                                <?php
                                endwhile;
                                wp_reset_postdata();
                                ?>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    <?php
    endif;
}
