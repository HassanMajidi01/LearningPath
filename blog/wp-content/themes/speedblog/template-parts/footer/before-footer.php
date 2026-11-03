<?php
/**
 * Displays before footer
 *
 * @package SpeedBlog
 */

if (is_active_sidebar('before-footer-widgetarea')) :

    ?>
    <section class="wpi-section wpi-widgets-section wpi-widget-area fullwidth-widget-area">
        <div class="wrapper">
            <?php do_action('fullwidth_before_footer_widgetarea_start'); ?>
            <?php dynamic_sidebar('before-footer-widgetarea'); ?>
            <?php do_action('fullwidth_before_footer_widgetarea_end'); ?>
        </div>
    </section>
<?php

endif;