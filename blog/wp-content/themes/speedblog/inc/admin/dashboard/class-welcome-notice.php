<?php
// Exit if accessed directly.
defined('ABSPATH') || exit;

class SpeedBlog_Welcome_Notice {
    private $theme_url = 'https://wpinterface.com/themes/speedblog/';
    private $doc_url = 'https://docs.wpinterface.com/speedblog/';
    private $theme_name;
    private $theme_version;
    private $theme_slug;

    public function __construct() {
        add_action('wp_loaded', [$this, 'show_welcome_notice'], 20);
        add_action('wp_loaded', [$this, 'handle_hide_notice'], 15);
        add_action('wp_ajax_import_button', [$this, 'handle_import_button']);
    }

    public function show_welcome_notice() {
        if (!get_option('speedblog_admin_notice_welcome')) {
            add_action('admin_notices', [$this, 'render_welcome_notice']);
        }
    }

    private function get_import_button_html() {
        return sprintf(
            '<a class="btn-get-started button button-primary" href="#" data-name="%s" data-slug="%s" aria-label="%s">%s</a>',
            esc_attr('mailchimp-for-wp, wpinterface-add-ons, one-click-demo-import'),
            esc_attr('mailchimp-for-wp, wpinterface-add-ons, one-click-demo-import'),
            esc_attr__('Get Started', 'speedblog'),
            esc_html__('Get started', 'speedblog')
        );
    }

    public function render_welcome_notice() {
        $dismiss_url = wp_nonce_url(
            remove_query_arg(['activated'], add_query_arg('speedblog-hide-notice', 'welcome')),
            'speedblog_hide_notices_nonce',
            '_speedblog_notice_nonce'
        );
        $current_user = wp_get_current_user();
        $theme = wp_get_theme();
        $this->theme_name = $theme->get('Name');
        $this->theme_version = $theme->get('Version');
        $this->theme_slug = $theme->get_template();

        if (is_plugin_active('mailchimp-for-wp/mailchimp-for-wp.php') && is_plugin_active('one-click-demo-import/one-click-demo-import.php')&& is_plugin_active('wpinterface-add-ons/wpinterface-add-ons.php')) {
            return;
        }

        ?>
        <div id="message" class="notice notice-success speedblog-notice">
            <a class="speedblog-message-close notice-dismiss" href="<?php echo esc_url($dismiss_url); ?>"></a>
            <div class="speedblog-notice-wrapper">
                <div class="speedblog-notice-welcome">
                    <div class="speedblog-notice-left">
                        <div class="speedblog-notice-subheading">
                            <?php printf(esc_html__('Welcome %1$s!', 'speedblog'), $current_user->user_login); ?>
                        </div>
                        <h2 class="speedblog-notice-heading">
                            <?php esc_html_e('Thank you for choosing SpeedBlog!', 'speedblog'); ?>
                        </h2>
                    </div>
                </div>
                <div class="speedblog-notice-content">
                    <div class="speedblog-notice-item speedblog-notice-template-import">
                        <h3><?php esc_html_e('Recommended Plugins', 'speedblog'); ?></h3>
                        <p><?php esc_html_e('Let\'s start by installing and activating One Click Demo Import, WPInterface Add-ons and MC4WP: Mailchimp for WordPress', 'speedblog'); ?></p>
                        <?php echo $this->get_import_button_html(); ?>
                    </div>
                    <div class="speedblog-notice-item speedblog-notice-theme-dashboard">
                        <h3><?php esc_html_e('Quick Links', 'speedblog'); ?></h3>
                        <p><?php esc_html_e("Check the quick links below for detailed information and to make the most of all the features our theme offers.", 'speedblog'); ?></p>
                        <div class="dashboard-button-group">
                            <a href="<?php echo esc_url(admin_url('themes.php?page=' . $this->theme_slug)); ?>" class="button button-secondary">
                                <?php esc_html_e('Theme Dashboard', 'speedblog'); ?>
                            </a>
                            <a href="<?php echo esc_url($this->doc_url); ?>" class="button button-secondary" target="_blank">
                                <?php esc_html_e('Documentation', 'speedblog'); ?>
                            </a>
                            <a href="<?php echo esc_url($this->theme_url); ?>#choose-pricing-plan" class="button button-secondary" target="_blank">
                                <?php esc_html_e('Upgrade to Pro', 'speedblog'); ?>
                            </a>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <?php
    }

    public function handle_hide_notice() {
        if (isset($_GET['speedblog-hide-notice']) && isset($_GET['_speedblog_notice_nonce'])) {
            if (!wp_verify_nonce(wp_unslash($_GET['_speedblog_notice_nonce']), 'speedblog_hide_notices_nonce')) {
                wp_die(__('Action failed. Please refresh the page and retry.', 'speedblog'));
            }
            if (!current_user_can('manage_options')) {
                wp_die(__('Cheatin&#8217; huh?', 'speedblog'));
            }
            $hide_notice = sanitize_text_field(wp_unslash($_GET['speedblog-hide-notice']));
            update_option('speedblog_admin_notice_' . $hide_notice, 1);
        }
    }

    public function handle_import_button() {
        check_ajax_referer('speedblog_demo_import_nonce', 'security');
        $state = [];

        if (class_exists('MC4WP_MailChimp')) {
            $state['mailchimp-for-wp'] = 'activated';
        } elseif (file_exists(WP_PLUGIN_DIR . '/mailchimp-for-wp/mailchimp-for-wp.php')) {
            $state['mailchimp-for-wp'] = 'installed';
        }

        if (class_exists('Wpinterface_Add_Ons')) {
            $state['wpinterface-add-ons'] = 'activated';
        } elseif (file_exists(WP_PLUGIN_DIR . '/wpinterface-add-ons/wpinterface-add-ons.php')) {
            $state['wpinterface-add-ons'] = 'installed';
        }
        
        if (class_exists('OCDI_Plugin')) {
            $state['one-click-demo-import'] = 'activated';
        } elseif (file_exists(WP_PLUGIN_DIR . '/one-click-demo-import/one-click-demo-import.php')) {
            $state['one-click-demo-import'] = 'installed';
        }

        $response = ['redirect' => admin_url('/themes.php?page=speedblog&tab=dashboard')];

        foreach (['mailchimp-for-wp',  'wpinterface-add-ons', 'one-click-demo-import'] as $plugin) {
            if (isset($state[$plugin]) && ('activated' === $state[$plugin] || 'installed' === $state[$plugin])) {
                if (current_user_can('activate_plugin')) {
                    $result = activate_plugin($plugin . '/' . $plugin . '.php');
                    if (is_wp_error($result)) {
                        $response['errorCode'] = $result->get_error_code();
                        $response['errorMessage'] = $result->get_error_message();
                    }
                }
            } else {
                wp_enqueue_style('plugin-install');
                wp_enqueue_script('plugin-install');
                include_once ABSPATH . 'wp-admin/includes/class-wp-upgrader.php';
                include_once ABSPATH . 'wp-admin/includes/plugin-install.php';

                $api = plugins_api('plugin_information', ['slug' => $plugin, 'fields' => ['sections' => false]]);
                $upgrader = new Plugin_Upgrader(new WP_Ajax_Upgrader_Skin());
                $result = $upgrader->install($api->download_link);

                if ($result && current_user_can('activate_plugin')) {
                    $result = activate_plugin($plugin . '/' . $plugin . '.php');
                    if (is_wp_error($result)) {
                        $response['errorCode'] = $result->get_error_code();
                        $response['errorMessage'] = $result->get_error_message();
                    }
                }
            }
        }

        wp_send_json($response);
    }
}

new SpeedBlog_Welcome_Notice();