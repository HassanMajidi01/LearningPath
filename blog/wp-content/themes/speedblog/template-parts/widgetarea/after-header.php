<?php
/**
 * Widgets placed in this region will be displayed below the header and above the main content.
 *
 * @package SpeedBlog
 */

if (is_active_sidebar('after-header')) :
    ?>
    <section class="wpi-section wpi-widgets-section wpi-widget-area fullwidth-widget-area">
        <div class="wrapper">
            <?php
            do_action('after_header_widgetarea_start');
            dynamic_sidebar('after-header');
            do_action('after_header_widgetarea_end');
            ?>
        </div>
    </section>
<?php
endif;
