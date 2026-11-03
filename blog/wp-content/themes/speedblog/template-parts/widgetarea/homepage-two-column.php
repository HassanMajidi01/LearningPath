<?php
/**
 * Homepage widget area with the two-column layout.
 *
 * @package SpeedBlog
 */
if (is_active_sidebar('homepage-column-one') || is_active_sidebar('homepage-column-two')) :
    ?>
    <section class="wpi-section wpi-widgets-section">
        <div class="wrapper">
            <?php do_action('homepage_two_column_widgetarea_start'); ?>
            <div class="row-group">
                <?php if (is_active_sidebar('homepage-column-one')) : ?>
                    <div class="widget-area wpi-widget-area fullwidth-widget-area wpi-primary-widgetarea">
                        <div class="site-sticky-components">
                            <?php do_action('homepage_two_column_primary_start'); ?>
                            <?php dynamic_sidebar('homepage-column-one'); ?>
                            <?php do_action('homepage_two_column_primary_end'); ?>
                        </div>
                    </div>
                <?php endif; ?>
                <?php if (is_active_sidebar('homepage-column-two')) : ?>
                    <div class="widget-area wpi-widget-area regular-widget-area wpi-secondary-widgetarea" role="complementary">
                        <div class="site-sticky-components">
                            <?php do_action('homepage_two_column_secondary_start'); ?>
                            <?php dynamic_sidebar('homepage-column-two'); ?>
                            <?php do_action('homepage_two_column_secondary_end'); ?>
                        </div>
                    </div>
                <?php endif; ?>
            </div>
            <?php do_action('homepage_two_column_widgetarea_end'); ?>
        </div>
    </section>
<?php
endif;
