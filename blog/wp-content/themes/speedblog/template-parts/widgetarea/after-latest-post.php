<?php
/**
 * Widgets placed in this region will be displayed after the latest post on homepage.
 *
 * @package SpeedBlog
 */

if (is_active_sidebar('homepage-after-posts')) :
    ?>
    <section class="wpi-section wpi-widgets-section regular-widget-area">
        <div class="wrapper">
            <?php
            do_action('homepage_after_posts_start');
            dynamic_sidebar('homepage-after-posts');
            do_action('homepage_after_posts_end');
            ?>
        </div>
    </section>
<?php
endif;
