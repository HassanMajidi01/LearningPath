<?php
/**
 * Widget area positioned at the bottom of homepage layouts, before Footer Fullwidth widget area.
 *
 * @package SpeedBlog
 */


if (is_active_sidebar('homepage-fullwidth-bottom')) :
    ?>
    <section class="wpi-section wpi-widgets-section wpi-widget-area fullwidth-widget-area">
        <div class="wrapper">
            <?php
            do_action('homepage_fullwidth_bottom_widgetarea_start');
            dynamic_sidebar('homepage-fullwidth-bottom');
            do_action('homepage_fullwidth_bottom_widgetarea_end');
            ?>
        </div>
    </section>
<?php
endif;