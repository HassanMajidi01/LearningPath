<?php
/**
 * SpeedBlog Admin Class.
 *
 * @package SpeedBlog
 * @since   1.0.0
 */
if (!defined('ABSPATH')) {
    exit;
}
if (!class_exists('SpeedBlog_Admin')) :
    /**
     * SpeedBlog_Admin Class.
     */
    class SpeedBlog_Admin
    {
        /**
         * Constructor.
         */
        public function __construct()
        {
            add_action('admin_enqueue_scripts', array($this, 'enqueue_scripts'));
        }

        /**
         * Localize array for import button AJAX request.
         */
        public function enqueue_scripts()
        {
            $suffix = (defined('SCRIPT_DEBUG') && SCRIPT_DEBUG) ? '' : '.min';

            $file_name = is_rtl() ? 'admin-rtl' . $suffix . '.css' : 'admin' . $suffix . '.css';

            wp_enqueue_style(
                'speedblog-admin-style',
                get_template_directory_uri() . '/inc/admin/dashboard/css/' . $file_name,
                array(),
                SPEEDBLOG_VERSION
            );

            wp_enqueue_script('speedblog-plugin-install-helper', get_template_directory_uri() . '/inc/admin/dashboard/js/admin.js', array('jquery'), SPEEDBLOG_VERSION, true);
            $welcome_data = array(
                'uri' => esc_url(admin_url('/themes.php?page=speedblog&tab=starter-templates')),
                'btn_text' => esc_html__('Processing...', 'speedblog'),
                'nonce' => wp_create_nonce('speedblog_demo_import_nonce'),
                'admin_url' => esc_url(admin_url()),
                'ajaxurl' => admin_url('admin-ajax.php'), // Include this line for using admin-ajax.php
            );
            wp_localize_script('speedblog-plugin-install-helper', 'speedblogRedirectDemoPage', $welcome_data);
        }
    }
endif;
return new SpeedBlog_Admin();
