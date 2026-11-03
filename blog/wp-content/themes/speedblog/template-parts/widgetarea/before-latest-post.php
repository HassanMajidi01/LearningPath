<?php
/**
 * Widgets placed in this region will be displayed before the latest post on homepage.
 *
 * @package SpeedBlog
 */

if (is_active_sidebar('homepage-before-posts')) :
    ?>
    <section class="wpi-section wpi-widgets-section regular-widget-area">
        <div class="wrapper">
            <?php
            do_action('homepage_before_posts_start');
            dynamic_sidebar('homepage-before-posts');
            do_action('homepage_before_posts_end');
            ?>
        </div>
    </section>
<?php
endif;
