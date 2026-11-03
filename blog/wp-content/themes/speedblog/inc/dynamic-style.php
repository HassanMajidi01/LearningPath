<?php
/* ------------------------------------------------------------------------- *
 *  Dynamic styles
/* ------------------------------------------------------------------------- */

if (!function_exists('speedblog_get_inline_css')) :
    /**
     * Outputs theme custom CSS.
     *
     * @since 1.0.0
     */
    function speedblog_get_inline_css()
    {
        $defaults = speedblog_get_all_customizer_default_values();
        $background_color = get_theme_mod('background_color');
        ob_start();
        ?>
        <?php if (!empty($background_color) && $background_color != 'ffffff') :
            ?>
            :root {
            --wpi--base-bg-color: #<?php echo esc_attr($background_color); ?>;
            }
        <?php endif; ?>
        <?php
        return ob_get_clean();
    }
endif;
