<?php
/**
 * WooCommerce Compatibility File
 *
 * @link https://woocommerce.com/
 *
 * @package SpeedBlog
 */

/**
 * WooCommerce setup function.
 *
 * @link https://docs.woocommerce.com/document/third-party-custom-theme-compatibility/
 * @link https://github.com/woocommerce/woocommerce/wiki/Enabling-product-gallery-features-(zoom,-swipe,-lightbox)
 * @link https://github.com/woocommerce/woocommerce/wiki/Declaring-WooCommerce-support-in-themes
 *
 * @return void
 */
// Remove default WooCommerce breadcrumb.
remove_action( 'woocommerce_before_main_content', 'woocommerce_breadcrumb', 20, 0 );

// Remove WooCommerce default sidebar.
remove_action( 'woocommerce_sidebar', 'woocommerce_get_sidebar', 10 );

function speedblog_woocommerce_setup()
{
    global $woocommerce;

    add_theme_support(
        'woocommerce',
        array(
            'thumbnail_image_width' => 570,
            'single_image_width' => 665,
            'product_grid' => array(
                'default_rows' => 3,
                'min_rows' => 1,
                'default_columns' => 4,
                'min_columns' => 1,
                'max_columns' => 6,
            ),
        )
    );

    if (version_compare($woocommerce->version, '3.0', ">=")) {
        add_theme_support('wc-product-gallery-zoom');
        add_theme_support('wc-product-gallery-lightbox');
        add_theme_support('wc-product-gallery-slider');
    }
}

add_action('after_setup_theme', 'speedblog_woocommerce_setup');

/**
 * WooCommerce specific scripts & stylesheets.
 *
 * @return void
 */
function speedblog_woocommerce_scripts()
{
    wp_enqueue_style('speedblog-woocommerce-style', get_template_directory_uri() . '/inc/compatibility/woocommerce/assets/css/woocommerce.css', array());

}

//add_action('wp_enqueue_scripts', 'speedblog_woocommerce_scripts');

/**
 * Add 'woocommerce-active' class to the body tag.
 *
 * @param array $classes CSS classes applied to the body tag.
 * @return array $classes modified to include 'woocommerce-active' class.
 */
function speedblog_woocommerce_active_body_class($classes)
{
    $classes[] = 'woocommerce-active';

    return $classes;
}

add_filter('body_class', 'speedblog_woocommerce_active_body_class');

/**
 * Related Products Args.
 *
 * @param array $args related products args.
 * @return array $args related products args.
 */
function speedblog_woocommerce_related_products_args($args)
{
    $defaults = array(
        'posts_per_page' => 3,
        'columns' => 3,
    );

    $args = wp_parse_args($defaults, $args);

    return $args;
}

add_filter('woocommerce_output_related_products_args', 'speedblog_woocommerce_related_products_args');

/**
 * Remove default WooCommerce wrapper.
 */
remove_action('woocommerce_before_main_content', 'woocommerce_output_content_wrapper', 10);
remove_action('woocommerce_after_main_content', 'woocommerce_output_content_wrapper_end', 10);

if (!function_exists('speedblog_woocommerce_wrapper_before')) {
    /**
     * Before Content.
     *
     * Wraps all WooCommerce content in wrappers which match the theme markup.
     *
     * @return void
     */
    function speedblog_woocommerce_wrapper_before()
    {
        ?>
        <main id="site-content" class="wpi-section" role="main">
        <div class="wrapper">
        <div class="row-group">
        <div id="primary" class="content-area">
        <?php
    }
}
add_action('woocommerce_before_main_content', 'speedblog_woocommerce_wrapper_before');

if (!function_exists('speedblog_woocommerce_wrapper_after')) {
    /**
     * After Content.
     *
     * Closes the wrapping divs.
     *
     * @return void
     */
    function speedblog_woocommerce_wrapper_after()
    {
        ?>
        </div>
        <?php do_action('speedblog_woocommerce_sidebar'); ?>
        </div>
        </div>
        </main><!-- #main -->
        <?php

    }
}
add_action('woocommerce_after_main_content', 'speedblog_woocommerce_wrapper_after');

/**
 * Callback function for Shop sidebar
 */
function speedblog_woocommerce_sidebar_cb()
{
    $page_layout = speedblog_get_page_layout();
    if (is_shop() || is_product_category()) {
        $page_layout = speedblog_get_option('shop_page_layout', 'right-sidebar');

        if ('no-sidebar' != $page_layout) {
            echo '<div id="secondary" class="widget-area wpi-widget-area regular-widget-area" role="complementary">';

            dynamic_sidebar('wc-sidebar');

            echo '</div>';
        }
    } elseif (is_product()) {
        $page_layout = speedblog_get_option('product_page_layout', 'right-sidebar');

        if ('no-sidebar' != $page_layout) {
            echo '<div id="secondary" class="widget-area wpi-widget-area regular-widget-area" role="complementary">';

            dynamic_sidebar('wc-product-single-sidebar');

            echo '</div>';
        }
    }
}

add_action('speedblog_woocommerce_sidebar', 'speedblog_woocommerce_sidebar_cb');


/**
 * Removes the "shop" title on the main shop page
 */
add_filter('woocommerce_show_page_title', '__return_false');

if (!function_exists('speedblog_woocommerce_cart_count')) :
    /**
     * Woocommerce Cart Count
     *
     * @link https://isabelcastillo.com/woocommerce-cart-icon-count-theme-header
     */
    function speedblog_woocommerce_cart_count()
    {
        $cart_page = get_option('woocommerce_cart_page_id');
        $count = WC()->cart->cart_contents_count;
        if ($cart_page) { ?>
            <a href="<?php echo esc_url(wc_get_cart_url()); ?>" class="cart-updated cart toggle" title="<?php esc_attr_e('View your shopping cart', 'speedblog'); ?>">
                <?php speedblog_the_theme_svg('cart'); ?>

                <span class="number"><?php echo WC()->cart->get_cart_contents_count(); ?></span>
            </a>
            <?php
        }
    }
endif;

function enqueue_wc_cart_fragments() { 
    wp_enqueue_script( 'wc-cart-fragments' ); 
}
add_action( 'wp_enqueue_scripts', 'enqueue_wc_cart_fragments' );

/**
 * Ensure cart contents update when products are added to the cart via AJAX.
 *
 * @param array $fragments The fragments to update.
 * @return array The updated fragments.
 */
add_filter( 'woocommerce_add_to_cart_fragments', 'add_to_cart_fragment' );
function add_to_cart_fragment( $fragments ) {
    ob_start();
    ?>
    <a href="<?php echo esc_url(wc_get_cart_url()); ?>" class="cart-updated cart toggle" title="<?php esc_attr_e('View your shopping cart', 'speedblog'); ?>">
        <?php speedblog_the_theme_svg('cart'); ?>

        <span class="number"><?php echo WC()->cart->get_cart_contents_count(); ?></span>
    </a>
    <?php
    $fragments['a.cart-updated'] = ob_get_clean();
    return $fragments;
}