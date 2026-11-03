<?php
/**
 * SpeedBlog Theme Review Notice Class.
 *
 * @package SpeedBlog
 * @since   SpeedBlog 1.0.0
 */
// Exit if accessed directly.
defined('ABSPATH') || exit;

/**
 * Class to display the theme review notice after certain period.
 *
 * Class SpeedBlog_Theme_Review_Notice
 */
class SpeedBlog_Theme_Review_Notice
{
    /**
     * Constructor function to include the required functionality for the class.
     *
     * SpeedBlog_Theme_Review_Notice constructor.
     */
    public function __construct()
    {
        add_action('after_setup_theme', array($this, 'review_notice'));
        add_action('admin_notices', array($this, 'review_notice_markup'), 0);
        add_action('admin_init', array($this, 'ignore_theme_review_notice'), 0);
        add_action('admin_init', array($this, 'ignore_theme_review_notice_partially'), 0);
        add_action('switch_theme', array($this, 'review_notice_data_remove'));
    }

    /**
     * Set the required option value as needed for theme review notice.
     */
    public function review_notice()
    {
        // Set the installed time in `speedblog_theme_installed_time` option table.
        if (!get_option('speedblog_theme_installed_time')) {
            update_option('speedblog_theme_installed_time', time());
        }
    }

    /**
     * Show HTML markup if conditions meet.
     */
    public function review_notice_markup()
    {
        $user_id = get_current_user_id();
        $ignored_notice = get_user_meta($user_id, 'speedblog_ignore_theme_review_notice', true);
        $ignored_notice_partially = get_user_meta($user_id, 'nag_speedblog_ignore_theme_review_notice_partially', true);
        $dismiss_url = wp_nonce_url(
            add_query_arg('nag_speedblog_ignore_theme_review_notice', 0),
            'nag_speedblog_ignore_theme_review_notice_nonce',
            '_speedblog_ignore_theme_review_notice_nonce'
        );
        $temporary_dismiss_url = wp_nonce_url(
            add_query_arg('nag_speedblog_ignore_theme_review_notice_partially', 0),
            'nag_speedblog_ignore_theme_review_notice_partially_nonce',
            '_speedblog_ignore_theme_review_notice_nonce'
        );
        if (!current_user_can('edit_posts')) {
            return;
        }
        /**
         * Return from notice display if:
         *
         * 1. The theme installed is less than 14 days ago.
         * 2. If the user has ignored the message partially for 14 days.
         * 3. Dismiss always if clicked on 'I Already Did' button.
         */
        if ((get_option('speedblog_theme_installed_time') > strtotime('-14 day')) || ($ignored_notice_partially > strtotime('-14 day')) || ($ignored_notice)) {
            return;
        }
        ?>
        <div class="notice notice-success speedblog-notice theme-review-notice" style="position:relative;">
            <div class="speedblog-notice-wrapper">
                <div class="speedblog-notice-welcome notice-is-review">
                    <div class="speedblog-notice-left">

                            <h2 class="speedblog-notice-heading"><?php echo esc_html('🌟 Love our theme? Give us a 5-star rating! 🌟'); ?></h2>

                            <p>
                                <?php
                                printf(
                                /* translators: %1$s: Opening of strong tag, %2$s: Theme's Name, %3$s: Closing of strong tag  */
                                    esc_html__('We hope you\'re enjoying our %1$s%2$s%3$s WordPress theme! Your feedback helps us improve and reach more users. If you love our theme, please take a moment to leave us a 5-star rating. Your support means the world to us!', 'speedblog'),
                                    '<strong>',
                                    esc_html(wp_get_theme()->get('Name')),
                                    '</strong>'
                                );
                                ?>

                            </p>
                            <strong>
                                <?php esc_html_e('Thank you for being an awesome part of our community! 💖', 'speedblog'); ?>
                            </strong>

                            <div class="dashboard-button-group">
                                <a href="https://wordpress.org/support/theme/speedblog/reviews/?filter=5#new-post" class="button button-primary" target="_blank">
                                    <span class="dashicons dashicons-thumbs-up"></span>
                                    <?php esc_html_e('Sure, I\'d love to!', 'speedblog'); ?>
                                </a>
                                <a href="<?php echo esc_url($dismiss_url); ?>" class="button button-secondary">
                                    <span class="dashicons dashicons-smiley"></span>
                                    <?php esc_html_e('I already did!', 'speedblog'); ?>
                                </a>
                                <a href="<?php echo esc_url($temporary_dismiss_url); ?>" class="button button-secondary">
                                    <span class="dashicons dashicons-calendar"></span>
                                    <?php esc_html_e('Maybe later', 'speedblog'); ?>
                                </a>
                                <a href="<?php echo esc_url('https://wordpress.org/support/theme/speedblog/'); ?>"
                                   class="button button-secondary" target="_blank">
                                    <span class="dashicons dashicons-testimonial"></span>
                                    <?php esc_html_e('I have a query', 'speedblog'); ?>
                                </a>
                            </div>

                    </div>
                </div>
            </div>
            <a class="notice-dismiss" href="<?php echo esc_url($dismiss_url); ?>"></a>
        </div> <!-- /.theme-review-notice -->
        <?php
    }

    /**
     * `I already did` button or `dismiss` button: remove the review notice permanently.
     */
    public function ignore_theme_review_notice()
    {
        // If user clicks to ignore the notice, add that to their user meta.
        if (isset($_GET['nag_speedblog_ignore_theme_review_notice']) && isset($_GET['_speedblog_ignore_theme_review_notice_nonce'])) {
            if (!wp_verify_nonce(wp_unslash($_GET['_speedblog_ignore_theme_review_notice_nonce']), 'nag_speedblog_ignore_theme_review_notice_nonce')) {
                wp_die(esc_html__('Action failed. Please refresh the page and retry.', 'speedblog'));
            }
            if ('0' === $_GET['nag_speedblog_ignore_theme_review_notice']) {
                add_user_meta(get_current_user_id(), 'speedblog_ignore_theme_review_notice', 'true', true);
            }
        }
    }

    /**
     * `Maybe later` button: remove the review notice partially.
     */
    public function ignore_theme_review_notice_partially()
    {
        // If user clicks to ignore the notice, add that to their user meta.
        if (isset($_GET['nag_speedblog_ignore_theme_review_notice_partially']) && isset($_GET['_speedblog_ignore_theme_review_notice_nonce'])) {
            if (!wp_verify_nonce(wp_unslash($_GET['_speedblog_ignore_theme_review_notice_nonce']), 'nag_speedblog_ignore_theme_review_notice_partially_nonce')) {
                wp_die(esc_html__('Action failed. Please refresh the page and retry.', 'speedblog'));
            }
            if ('0' === $_GET['nag_speedblog_ignore_theme_review_notice_partially']) {
                update_user_meta(get_current_user_id(), 'nag_speedblog_ignore_theme_review_notice_partially', time());
            }
        }
    }

    /**
     * Remove the data set after the theme has been switched to other theme.
     */
    public function review_notice_data_remove()
    {
        $get_all_users = get_users();
        $theme_installed_time = get_option('speedblog_theme_installed_time');
        // Delete options data.
        if ($theme_installed_time) {
            delete_option('speedblog_theme_installed_time');
        }
        // Delete user meta data for theme review notice.
        foreach ($get_all_users as $user) {
            $ignored_notice = get_user_meta($user->ID, 'speedblog_ignore_theme_review_notice', true);
            $ignored_notice_partially = get_user_meta($user->ID, 'nag_speedblog_ignore_theme_review_notice_partially', true);
            // Delete permanent notice remove data.
            if ($ignored_notice) {
                delete_user_meta($user->ID, 'speedblog_ignore_theme_review_notice');
            }
            // Delete partial notice remove data.
            if ($ignored_notice_partially) {
                delete_user_meta($user->ID, 'nag_speedblog_ignore_theme_review_notice_partially');
            }
        }
    }
}

new SpeedBlog_Theme_Review_Notice();
