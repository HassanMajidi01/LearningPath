<?php
// Fetch options for the featured category
$enable_featured_category = speedblog_get_option('enable_featured_category');
$featured_category_title = speedblog_get_option('featured_category_title');
$featured_category_sub_title = speedblog_get_option('featured_category_sub_title');

// Check if the featured category section is enabled
if ($enable_featured_category) { ?>
    <section class="wpi-section wpi-categories-section">
        <div class="wrapper">
            <?php
            // Display the section header if title or subtitle is available
            if ($featured_category_title || $featured_category_sub_title) { ?>
                <header class="section-header section-header-center">
                    <?php if ($featured_category_title) { ?>
                        <h2 class="section-header-title"><?php echo esc_html($featured_category_title); ?></h2>
                    <?php } ?>
                    <?php if ($featured_category_sub_title) { ?>
                        <div class="section-header-sub-title"><?php echo esc_html($featured_category_sub_title); ?></div>
                    <?php } ?>
                </header>
            <?php } ?>

            <div class="wpi-section-content categories-section-content">
                <?php
                // Loop through up to 4 featured categories
                for ($i = 1; $i <= 4; $i++) {
                    $featured_category = speedblog_get_option('featured_category_' . $i);

                    if ($featured_category) {
                        $cat_info = get_category($featured_category);
                        if ($cat_info) {
                            $term_link = get_category_link($cat_info);
                            $post_count = $cat_info->count ?? '';
                            $term_name = $cat_info->name ?? '';
                            $thumbnail_id = get_term_meta($cat_info->term_id ?? '', 'thumbnail_id', true); ?>

                            <div class="wpi-category-panel">
                                <!-- Category Image -->
                                <div class="entry-category-image">
                                    <a class="post-thumbnail" href="<?php echo esc_url($term_link); ?>" aria-hidden="true" tabindex="-1">
                                        <?php echo wp_get_attachment_image($thumbnail_id, 'medium_large'); ?>
                                    </a>
                                </div>

                                <!-- Category Details -->
                                <div class="entry-category-details category-details-vertical">
                                    <span class="entry-category-count">
                                        <?php echo absint($post_count) . ' ' . __('Articles', 'speedblog'); ?>
                                    </span>
                                    <h2 class="entry-category-title">
                                        <a href="<?php echo esc_url($term_link); ?>" rel="bookmark">
                                            <?php echo esc_html($term_name); ?>
                                        </a>
                                    </h2>
                                </div>

                                <?php
                                // Query the latest post from this category
                                $category_post_args = array(
                                    'post_type' => 'post',
                                    'post_status' => 'publish',
                                    'no_found_rows' => true,
                                    'ignore_sticky_posts' => true,
                                    'posts_per_page' => 1,
                                    'tax_query' => array(
                                        array(
                                            'taxonomy' => 'category',
                                            'field' => 'term_id',
                                            'terms' => absint($cat_info->term_id),
                                        ),
                                    ),
                                );

                                $category_post = new WP_Query($category_post_args);

                                // Display the latest post
                                if ($category_post->have_posts()) :
                                    while ($category_post->have_posts()) :
                                        $category_post->the_post(); ?>
                                        <div class="entry-category-details category-details-horizontal">
                                            <span class="entry-category-label">
                                                <?php echo __('Latest:', 'speedblog'); ?>
                                            </span>
                                            <header class="entry-header">
                                                <?php the_title('<h3 class="entry-title entry-title-small"><a href="' . esc_url(get_permalink()) . '" rel="bookmark">', '</a></h3>'); ?>
                                            </header>
                                        </div>
                                    <?php endwhile;
                                    wp_reset_postdata();
                                endif; ?>
                            </div>
                        <?php }
                    }
                } ?>
            </div>
        </div>
    </section>
<?php } ?>