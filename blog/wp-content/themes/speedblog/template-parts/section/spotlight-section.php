<?php
$enable_spotlight_section = speedblog_get_option('enable_spotlight_section');
$spotlight_post_title = speedblog_get_option('spotlight_post_title');
$spotlight_post_category_1 = speedblog_get_option('spotlight_post_category_1');
$spotlight_post_category_2 = speedblog_get_option('spotlight_post_category_2');

$enable_spotlight_author_meta = speedblog_get_option('enable_spotlight_author_meta');
$select_spotlight_author_meta = speedblog_get_option('select_spotlight_author_meta');
$spotlight_author_meta_title = speedblog_get_option('spotlight_author_meta_title');

$enable_spotlight_date_meta = speedblog_get_option('enable_spotlight_date_meta');
$select_spotlight_date = speedblog_get_option('select_spotlight_date');
$select_spotlight_date_meta_title = speedblog_get_option('select_spotlight_date_meta_title');
$select_spotlight_date_format = speedblog_get_option('select_spotlight_date_format');

$enable_spotlight_category_meta = speedblog_get_option('enable_spotlight_category_meta');
$spotlight_category_label = speedblog_get_option('spotlight_category_label');
$select_spotlight_category_color = speedblog_get_option('select_spotlight_category_color');
$select_spotlight_number_of_category = speedblog_get_option('select_spotlight_number_of_category');
if (empty($enable_spotlight_section)) {
    return;
}
?>
<section class="wpi-section theme-spotlight-section">
  <div class="wrapper">
    <div class="row-group">
      <div class="column-lg-12">
        <div class="section-body">
          <div class="row-group">
            <div class="column-lg-8 column-md-7">
              <?php
                $cat_highlight_args_1 = array(
                    'post_type' => 'post',
                    'posts_per_page' => 5,
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
                        <div class="column-lg-6 column-md-12">
                            <div class="highlight-feed-left">
                                <?php
                                $post_count = 0;
                                while ($cat_highlight_post_1->have_posts() && $post_count < 2) :
                                    $cat_highlight_post_1->the_post();
                                    $post_count++;
                                    ?>
                                    <article id="highlight-feed-<?php the_ID(); ?>" class="wpi-post content-position-adjust">
                                    <?php if (has_post_thumbnail()) : ?>
                                              <div class="entry-image entry-image-big image-hover-effect hover-effect-shine">
                                                  <a class="post-thumbnail" href="<?php the_permalink(); ?>" aria-hidden="true"
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
      
                                        <div class="entry-details">
                                            <?php
                                            if ($enable_spotlight_category_meta) {
                                                speedblog_post_category($select_spotlight_category_color, $spotlight_category_label, $select_spotlight_number_of_category);
                                            }
                                            ?>
                                            <h3 class="entry-title entry-title-medium">
                                                <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                                            </h3>
                                            <div class="entry-meta-wrapper">
      
                                                <?php
                                                if ($enable_spotlight_date_meta) {
                                                    speedblog_posted_on($select_spotlight_date_format, $select_spotlight_date_meta_title, $select_spotlight_date);
                                                }
                                                ?>
      
                                                <?php
                                                if ($enable_spotlight_author_meta) {
                                                    speedblog_posted_by($select_spotlight_author_meta, $spotlight_author_meta_title);
                                                }
                                                ?>
      
                                            </div>
                                        </div>
                                    </article>
                                    <?php
                                endwhile;
                                ?>
                            </div>
                        </div>
      
                        <div class="column-lg-6 column-md-12">
                          <?php
                                $delay = 100;
                                while ($cat_highlight_post_1->have_posts() && $post_count < 5) :
                                    $cat_highlight_post_1->the_post();
                                    $post_count++;
                                    ?>
                                    <article id="highlight-feed-<?php the_ID(); ?>" class="wpi-post wpi-tile-post"  data-aos="fade-up" data-aos-duration="1000"
                                             data-aos-delay="<?php echo esc_attr($delay); ?>">
                                    <?php if (has_post_thumbnail()) : ?>
                                              <div class="entry-image entry-image-medium image-hover-effect hover-effect-shine">
                                                  <a class="post-thumbnail" href="<?php the_permalink(); ?>" aria-hidden="true"
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
                                            if ($enable_spotlight_category_meta) {
                                                speedblog_post_category($select_spotlight_category_color, $spotlight_category_label, $select_spotlight_number_of_category);
                                            }
                                            ?>
                                            <h3 class="entry-title entry-title-small">
                                                <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                                            </h3>
                                            <div class="entry-meta-wrapper">
      
                                                <?php
                                                if ($enable_spotlight_date_meta) {
                                                    speedblog_posted_on($select_spotlight_date_format, $select_spotlight_date_meta_title, $select_spotlight_date);
                                                }
                                                ?>
      
                                                <?php
                                                if ($enable_spotlight_author_meta) {
                                                    speedblog_posted_by($select_spotlight_author_meta, $spotlight_author_meta_title);
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
                    <?php
                    wp_reset_postdata();
                endif;
                ?>
            </div>

            <div class="column-lg-4 column-md-5">
              <div class="spotlight-right">
                <?php if ($spotlight_post_title) { ?>
                  <header class="spotlight-header">
                    <h2 class="spotlight-title" data-aos="fade-down" data-aos-duration="1000"
                        data-aos-delay="100"><?php echo esc_html($spotlight_post_title); ?></h2>
                  </header>
                <?php } ?>
  
                  <?php
                    $spotlight_args_2 = array(
                        'post_type' => 'post',
                        'posts_per_page' => 5,
                        'post_status' => 'publish',
                        'no_found_rows' => 1,
                        'ignore_sticky_posts' => 1,
                    );
                    $counter=1;
                    // Check for category.
                    if (!empty($spotlight_post_category_2)) :
                        $spotlight_args_2['tax_query'] = array(
                            array(
                                'taxonomy' => 'category',
                                'field' => 'term_id',
                                'terms' => $spotlight_post_category_2,
                            ),
                        );
                    endif;
                    $spotlight_post_2 = new WP_Query($spotlight_args_2);
                    if ($spotlight_post_2->have_posts()) :
                        $delay = 100;
                        while ($spotlight_post_2->have_posts()) :
                            $spotlight_post_2->the_post(); ?>
                              <article id="spotlight-<?php the_ID(); ?>" class="wpi-post has-article-count"  data-aos="fade-right" data-aos-delay="<?php echo esc_attr($delay); ?>">
                                <span class="article-count">
                                  <?php echo $counter++; ?>
                                </span>

                                <div class="entry-details">
                                    <div class="entry-meta-wrapper">
            
                                        <?php
                                        if ($enable_spotlight_date_meta) {
                                            speedblog_posted_on($select_spotlight_date_format, $select_spotlight_date_meta_title, $select_spotlight_date);
                                        }
                                        ?>
            
                                        <?php
                                        if ($enable_spotlight_author_meta) {
                                            speedblog_posted_by($select_spotlight_author_meta, $spotlight_author_meta_title);
                                        }
                                        ?>
            
                                    </div>

                                    <h3 class="entry-title entry-title-small">
                                        <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                                    </h3>
                                </div>
                              </article>
                        <?php
                        $delay += 100;
                        endwhile;
                      wp_reset_postdata();
                    endif; 
                  ?>      
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>