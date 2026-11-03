<?php
/**
 * Widget area positioned at the top of homepage layouts, above the two-column widget area.
 *
 * @package SpeedBlog
 */

if (is_active_sidebar('homepage-fullwidth-top')) :
    ?>
    <section class="wpi-section wpi-widgets-section wpi-widget-area fullwidth-widget-area">
        <div class="wrapper">
            <?php
            do_action('homepage_fullwidth_top_widgetarea_start');
            dynamic_sidebar('homepage-fullwidth-top');
            do_action('homepage_fullwidth_top_widgetarea_end');
            ?>
        </div>
    </section>
<?php
endif;
