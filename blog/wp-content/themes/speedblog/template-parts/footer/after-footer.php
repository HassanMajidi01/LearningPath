<?php
/**
 * Displays after footer
 *
 * @package SpeedBlog
 */


if (is_active_sidebar('after-footer-widgetarea')) :

    ?>
    <section class="wpi-section wpi-widgets-section wpi-widget-area fullwidth-widget-area">
        <div class="wrapper">
            <?php do_action('fullwidth_after_footer_widgetarea_start'); ?>
            <?php dynamic_sidebar('after-footer-widgetarea'); ?>
            <?php do_action('fullwidth_after_footer_widgetarea_end'); ?>
        </div>
    </section>
<?php

endif;
