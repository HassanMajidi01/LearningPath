<?php
/**
 * SpeedBlog functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package SpeedBlog
 */

if (!defined('SPEEDBLOG_VERSION')) {
    // Replace the version number of the theme on each release.
    define('SPEEDBLOG_VERSION', '1.0.2');
}

/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function speedblog_setup()
{
    /*
        * Make theme available for translation.
        * Translations can be filed in the /languages/ directory.
        * If you're building a theme based on SpeedBlog, use a find and replace
        * to change 'speedblog' to the name of your theme in all the template files.
        */
    load_theme_textdomain('speedblog', get_template_directory() . '/languages');

    // Add default posts and comments RSS feed links to head.
    add_theme_support('automatic-feed-links');

    /*
        * Let WordPress manage the document title.
        * By adding theme support, we declare that this theme does not use a
        * hard-coded <title> tag in the document head, and expect WordPress to
        * provide it for us.
        */
    add_theme_support('title-tag');

    /*
        * Enable support for Post Thumbnails on posts and pages.
        *
        * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
        */
    add_theme_support('post-thumbnails');


    /**
     * Register navigation menus uses wp_nav_menu in five places.
     *
     * @since SpeedBlog SpeedBlog 1.0.0
     */
    function speedblog_menus()
    {

        $locations = array(
            'primary' => __('Desktop Horizontal Menu', 'speedblog'),
            'expanded' => __('Desktop Expanded Menu', 'speedblog'),
            'mobile' => __('Mobile Menu', 'speedblog'),
            'footer' => __('Footer Menu', 'speedblog'),
            'social' => __('Social Menu', 'speedblog'),
        );

        register_nav_menus($locations);
    }

    add_action('init', 'speedblog_menus');


    /*
        * Switch default core markup for search form, comment form, and comments
        * to output valid HTML5.
        */
    add_theme_support(
        'html5',
        array(
            'search-form',
            'comment-form',
            'comment-list',
            'gallery',
            'caption',
            'style',
            'script',
        )
    );

    // Set up the WordPress core custom background feature.
    add_theme_support(
        'custom-background',
        apply_filters(
            'speedblog_custom_background_args',
            array(
                'default-color' => 'ffffff',
                'default-image' => '',
            )
        )
    );

    // Add theme support for selective refresh for widgets.
    add_theme_support('customize-selective-refresh-widgets');

    /**
     * Add support for core custom logo.
     *
     * @link https://codex.wordpress.org/Theme_Logo
     */
    add_theme_support(
        'custom-logo',
        array(
            'height' => 250,
            'width' => 250,
            'flex-width' => true,
            'flex-height' => true,
        )
    );
    add_theme_support( 'align-wide' );
    add_theme_support('responsive-embeds');
    add_theme_support('wp-block-styles');
}

add_action('after_setup_theme', 'speedblog_setup');

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function speedblog_content_width()
{
    $GLOBALS['content_width'] = apply_filters('speedblog_content_width', 640);
}

add_action('after_setup_theme', 'speedblog_content_width', 0);

/**
 * Enqueue scripts and styles.
 */
function speedblog_scripts()
{

    $min = defined('SCRIPT_DEBUG') && SCRIPT_DEBUG ? '' : '.min';


    require_once get_theme_file_path( 'assets/webfont/class-theme-webfont-loader.php' );

    // Load the webfont.
    wp_enqueue_style(
        'speedblog-fonts',
        wptt_get_webfont_url( 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Libre+Baskerville:ital,wght@0,400..700;1,400..700&display=swap' ),
        array(),
        SPEEDBLOG_VERSION
    );


    wp_enqueue_style('swiper', get_template_directory_uri() . '/assets/css/swiper-bundle' . $min . '.css');
    wp_enqueue_style('aos', get_template_directory_uri() . '/assets/css/aos' . $min . '.css');

    wp_enqueue_style('speedblog-style', get_stylesheet_uri(), array(), SPEEDBLOG_VERSION);
    wp_style_add_data('speedblog-style', 'rtl', 'replace');

    wp_add_inline_style('speedblog-style', speedblog_get_inline_css());

    wp_enqueue_script('speedblog-navigation', get_template_directory_uri() . '/assets/js/navigation' . $min . '.js', array(), SPEEDBLOG_VERSION, true);

    // Scripts
    $dependencies = array('swiper');
    wp_enqueue_script('swiper', get_template_directory_uri() . '/assets/js/swiper-bundle' . $min . '.js', array(), SPEEDBLOG_VERSION, true);
    wp_enqueue_script('aos', get_template_directory_uri() . '/assets/js/aos' . $min . '.js', array(), SPEEDBLOG_VERSION, true);

    wp_enqueue_script('speedblog-script', get_template_directory_uri() . '/assets/js/script' . $min . '.js', $dependencies, SPEEDBLOG_VERSION, true);

    //Ajax Load Posts Scripts
    wp_enqueue_script('speedblog-load-posts', get_template_directory_uri() . '/template-parts/pagination/pagination.js', array(), SPEEDBLOG_VERSION, true);

    // Localized variables.
    global $wp_query;
    wp_localize_script(
        'speedblog-load-posts',
        'SpeedBlogVars',
        array(
            'load_post_nonce_wp' => wp_create_nonce('speedblog-load-posts-nonce'),
            'ajaxurl' => admin_url('admin-ajax.php'),
            'query_vars' => wp_json_encode($wp_query->query_vars),
            'query_vars_hash' => wp_hash(wp_json_encode($wp_query->query_vars)),
        )
    );

    if (is_singular() && (comments_open() || '0' != get_comments_number())) {
        wp_enqueue_style('speedblog-comments', get_template_directory_uri() . '/assets/css/comments' . $min . '.css', array(), SPEEDBLOG_VERSION);
    }

    if (is_singular() && comments_open() && get_option('thread_comments')) {
        wp_enqueue_script('comment-reply');
    }
}

add_action('wp_enqueue_scripts', 'speedblog_scripts');

/**
 * Implement the Dynamic Style.
 */
require get_template_directory() . '/inc/dynamic-style.php';
require get_template_directory() . '/template-parts/pagination/pagination-option.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/admin/customizer/customizer-init.php';

// Custom page walker.
require get_template_directory() . '/classes/class-walker-page.php';


// Handle SVG icons.
require get_template_directory() . '/classes/class-svg-icons.php';
require get_template_directory() . '/inc/svg-icons.php';

//widget-initialization.
require get_template_directory() . '/inc/admin/widgets/widget-init.php';

// category-meta-box
require get_template_directory() . '/inc/admin/meta-box/category-meta-box.php';

// single-meta-box
require get_template_directory() . '/inc/admin/meta-box/meta-box.php';


/**
 * Calling in the admin area for the Welcome Page as well as for the new theme notice too.
 */
if (is_admin()) {
    require get_template_directory() . '/inc/admin/dashboard/class-admin.php';
    require get_template_directory() . '/inc/admin/dashboard/class-dashboard.php';
    require get_template_directory() . '/inc/admin/dashboard/class-welcome-notice.php';
    require get_template_directory() . '/inc/admin/dashboard/class-theme-review-notice.php';
}

require get_template_directory() . '/inc/admin/dashboard/class-changelog-parser.php';

/**
 * Enqueue scripts and styles.
 */
function speedblog_preloader_scripts()
{
    $preloader_style = speedblog_get_option('speedblog_preloader_style');
    wp_enqueue_style('speedblog-preloader', get_template_directory_uri() . '/assets/css/preloader-' . $preloader_style . '.css');

}

add_action('wp_enqueue_scripts', 'speedblog_preloader_scripts');

if (!class_exists('SpeedBlog_Constants')) {

    /**
     * SpeedBlog_Constants class.
     */
    class SpeedBlog_Constants
    {

        /**
         * The single instance of the class.
         *
         * @var SpeedBlog_Constants
         */
        private static $instance = null;

        /**
         * Constants array.
         *
         * @var array
         */
        private $constants = array();

        /**
         * Constructor.
         */
        private function __construct()
        {

            // Define constants here.
            $this->constants = array(
                /**
                 * Define URL Location Constants
                 */
                'SPEEDBLOG_PARENT_URL' => get_template_directory_uri(),
            );

            foreach ($this->constants as $name => $value) {
                $this->define_constant($name, $value);
            }
        }

        /**
         * Gets the single instance of the class.
         *
         * @return SpeedBlog_Constants
         */
        public static function get_instance()
        {
            if (null === self::$instance) {
                self::$instance = new self();
            }
            return self::$instance;
        }

        /**
         * Define constant safely.
         *
         * @param string $name Constant name.
         * @param mixed $value Constant value.
         *
         * @return void
         */
        private function define_constant($name, $value)
        {
            if (!defined($name)) {
                define($name, $value);
            }
        }
    }
}

// Initialize the class instance.
SpeedBlog_Constants::get_instance();

add_action('wp_ajax_install_plugin', 'speedblog_plugin_action_callback');
add_action('wp_ajax_activate_plugin', 'speedblog_plugin_action_callback');

function speedblog_plugin_action_callback()
{
    if (!isset($_POST['security']) || !wp_verify_nonce($_POST['security'], 'speedblog_demo_import_nonce')) {
        wp_send_json_error(array('message' => 'Security check failed.'));
    }
    if (!current_user_can('install_plugins')) {
        wp_send_json_error(array('message' => 'You are not allowed to perform this action.'));
    }

    $plugin = sanitize_text_field($_POST['plugin']);
    $plugin_slug = sanitize_text_field($_POST['slug']);

    // Define allowed plugins (Whitelist)
    $allowed_plugins = array(
        'one-click-demo-import' => 'one-click-demo-import/one-click-demo-import.php',
        'mailchimp-for-wp'      => 'mailchimp-for-wp/mailchimp-for-wp.php',
        'wpinterface-add-ons'   => 'wpinterface-add-ons/wpinterface-add-ons.php',
    );

    // Validate if the plugin is in the allowed list
    if (!isset($allowed_plugins[$plugin_slug]) && !in_array($plugin, $allowed_plugins)) {
        wp_send_json_error(array('message' => 'This plugin is not allowed.'));
    }

    if (speedblog_is_plugin_installed($plugin)) {
        if (is_plugin_active($plugin)) {
            wp_send_json_success(array('message' => 'Plugin is already activated.'));
        } else {
            // Activate the plugin
            $result = activate_plugin($plugin);

            if (is_wp_error($result)) {
                wp_send_json_error(array('message' => 'Error activating the plugin.'));
            } else {
                wp_send_json_success(array('message' => 'Plugin activated successfully!'));
            }
        }
    } else {
        // Install and activate the plugin
        include_once ABSPATH . 'wp-admin/includes/plugin-install.php';
        include_once ABSPATH . 'wp-admin/includes/class-wp-upgrader.php';
        $plugin_info = plugins_api('plugin_information', array('slug' => $plugin_slug));
        $upgrader = new Plugin_Upgrader(new WP_Ajax_Upgrader_Skin());
        $result = $upgrader->install($plugin_info->download_link);

        if (is_wp_error($result)) {
            wp_send_json_error(array('message' => 'Error installing the plugin.'));
        }

        $result = activate_plugin($plugin);

        if (is_wp_error($result)) {
            wp_send_json_error(array('message' => 'Error activating the plugin.'));
        } else {
            wp_send_json_success(array('message' => 'Plugin installed and activated successfully!'));
        }
    }
}

function speedblog_is_plugin_installed($plugin_path)
{
    $plugins = get_plugins();
    return isset($plugins[$plugin_path]);
}


/**
 * Load Jetpack compatibility file.
 */
if (defined('JETPACK__VERSION')) {
    require get_template_directory() . '/inc/compatibility/jetpack/jetpack.php';
}

/** Add the WooCommerce plugin support */
if (class_exists('WooCommerce')) {
    require get_template_directory() . '/inc/compatibility/woocommerce/woocommerce.php';
}

/** Add the Elementor compatibility file */
if (defined('ELEMENTOR_VERSION')) {
    require get_template_directory() . '/inc/compatibility/elementor/elementor.php';
    require get_template_directory() . '/inc/compatibility/elementor/elementor-functions.php';
}