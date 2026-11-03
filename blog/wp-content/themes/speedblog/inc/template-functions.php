<?php
/**
 * Functions which enhance the theme by hooking into WordPress
 *
 * @package SpeedBlog
 */
/**
 * Adds custom classes to the array of body classes.
 *
 * @param array $classes Classes for the body element.
 * @return array
 */
function speedblog_body_classes($classes)
{
    // Adds a class of hfeed to non-singular pages.
    if (!is_singular()) {
        $classes[] = 'hfeed';
    }
    // Adds a class of no-sidebar when there is no sidebar present.
    if (!is_active_sidebar('sidebar')) {
        $classes[] = 'no-sidebar';
    } else {
        $page_layout = speedblog_get_page_layout();
        if ('no-sidebar' == $page_layout) {
            $classes[] = 'no-sidebar';
        } else {
            $classes[] = 'has-sidebar ' . esc_attr($page_layout);
        }
    }
    $enable_sidebar_fix_archive = speedblog_get_option('enable_sidebar_fix_archive');
    $enable_sidebar_fix_single = speedblog_get_option('enable_sidebar_fix_single');

    if (( is_archive() || is_front_page() || is_home() ) && !empty($enable_sidebar_fix_archive)) {
       $classes[] = 'has-sticky-sidebar';
    }
    if (is_single() && !empty($enable_sidebar_fix_single)) {
        $classes[] = 'has-sticky-sidebar';
    }
    return $classes;
}
add_filter('body_class', 'speedblog_body_classes');
/**
 * Add a pingback url auto-discovery header for single posts, pages, or attachments.
 */
function speedblog_pingback_header()
{
    if (is_singular() && pings_open()) {
        printf('<link rel="pingback" href="%s">', esc_url(get_bloginfo('pingback_url')));
    }
}
add_action('wp_head', 'speedblog_pingback_header');
if (!function_exists('speedblog_get_page_layout')) :
    /**
     * Get Page Layout based on the post meta or customizer value
     *
     * @return string Page Layout.
     * @since 1.0.0
     *
     */
    function speedblog_get_page_layout()
    {
        global $post;
        $page_layout = '';
        // For homepage regardless of static page or latest posts.
        if (is_front_page() || is_home()) {
            return speedblog_get_option('sidebar_layout_option');
        }
        // Fetch from Post Meta on single posts or pages.
        if ($post && is_singular()) {
            $page_layout = get_post_meta($post->ID, 'speedblog_page_layout', true);
            if (empty($page_layout) && is_single()) {
                $page_layout = speedblog_get_option('single_post_layout');
            }
        }
        // Fetch from customizer if everything else fails.
        if (empty($page_layout)) {
            $page_layout = speedblog_get_option('single_sidebar_layout_option');
        }
        return $page_layout;
    }
endif;


if (!function_exists('speedblog_placeholder_image')) :
    /**
     * Get placeholder image
     *
     * @since 1.0.0
     */
    function speedblog_placeholder_image()
    {
        $src = get_template_directory_uri() . '/assets/images/default-fallback-image.png';
        return apply_filters('speedblog_placeholder_image', $src);
    }
endif;

if (!function_exists('speedblog_get_archive_excerpt')) :
    /**
     * Get archive excerpt
     *
     * @return string Page ID.
     * @since 1.0.0
     *
     */
    function speedblog_get_archive_excerpt()
    {
        $number_of_word_in_excerpt = speedblog_get_option('number_of_word_in_excerpt', 25);
        return wp_trim_words(get_the_excerpt(), $number_of_word_in_excerpt, '&hellip;');
    }
endif;

if (!function_exists('speedblog_the_archive_excerpt')) :
    /**
     * Print archive excerpt
     *
     * @return string Page ID.
     * @since 1.0.0
     *
     */
    function speedblog_the_archive_excerpt()
    {
        $excerpt_posts_title_limit = speedblog_get_option('excerpt_posts_title_limit'); ?>
        <div class="entry-content-excerpt <?php echo $excerpt_posts_title_limit; ?>">
            <?php echo wpautop(wp_kses_post(speedblog_get_archive_excerpt())); ?>
        </div>
    <?php }
endif;

if (!function_exists('speedblog_the_archive_readmore')) :
    /**
     * Print archive excerpt
     *
     * @return string Page ID.
     * @since 1.0.0
     *
     */
    function speedblog_the_archive_readmore()
    {
        $archive_excerpt_button_text = speedblog_get_option('archive_excerpt_button_text');
        if (!$archive_excerpt_button_text) {
            $archive_excerpt_button_text = __('Read More', 'speedblog');
        } ?>
        <span class="entry-meta entry-link more-link">
            <a href="<?php the_permalink(); ?>" class="post-more-link">
                <?php echo esc_html($archive_excerpt_button_text); ?>
                <?php speedblog_the_theme_svg('arrow-double'); ?>
            </a>
        </span>
    <?php }
endif;

if (!function_exists('speedblog_get_breadcrumb')) :
    /**
     * Print archive excerpt
     *
     * @return string Page ID.
     * @since 1.0.0
     *
     */
    function speedblog_get_breadcrumb()
    {
        if (speedblog_get_option('enable_breadcrumb')) :
            if (!function_exists('breadcrumb_trail')) {
                require_once get_template_directory() . '/assets/breadcrumbs/breadcrumbs.php';
            }
            $breadcrumb_args = array(
                'wrapper_start' => '<div class="wpi-breadcrumb-trails hide-on-tablet hide-on-mobile">',
                'wrapper_end' => '</div>',
                'container' => 'div',
                'show_browse' => false,
                'show_on_front' => false,
            );
            breadcrumb_trail($breadcrumb_args);
        endif;
    }
endif;

if (!function_exists('speedblog_get_copyright_text')) :
    /**
     * Print archive excerpt
     *
     * @return string Page ID.
     * @since 1.0.0
     *
     */
    function speedblog_get_copyright_text()
    {
        $copyright_text = speedblog_get_option('copyright_text');
        $copyright_date_format = speedblog_get_option('copyright_date_format'); ?>
        <div class="copyright-info">
            <?php
            $copyright_text = speedblog_get_option('copyright_text', esc_html__('Copyright &copy; {{ date }}.', 'speedblog'));
            if ($copyright_text) :
                $copyright_date_format = speedblog_get_option('copyright_date_format', 'Y');
                if ($copyright_date_format) {
                    $copyright_date_format = date_i18n($copyright_date_format, current_time('timestamp'));
                }
                $copyright_text = str_replace('{{ date }}', $copyright_date_format, $copyright_text);
                echo wp_kses_post($copyright_text);
            endif;
            ?>
            <?php
            /* translators: 1: Theme name, 2: Theme author. */
            printf(esc_html__('Theme %1$s designed by %2$s.', 'speedblog'), 'SpeedBlog', '<a href="https://wpinterface.com/themes/speedblog">WPInterface</a>');
            ?>
        </div>
    <?php }
endif;

if (!function_exists('speedblog_estimated_read_time')) :
    /**
     * Estimated reading time in minutes
     *
     * @param $content
     * @param $with_gutenberg
     *
     * @return int estimated time in minutes
     */
    function speedblog_estimated_read_time($content = '', $with_gutenberg = false)
    {
        // In case if content is build with gutenberg parse blocks.
        if ($with_gutenberg) {
            $blocks = parse_blocks($content);
            $contentHtml = '';
            foreach ($blocks as $block) {
                $contentHtml .= render_block($block);
            }
            $content = $contentHtml;
        }
        // Remove HTML tags from string.
        $content = wp_strip_all_tags($content);
        // When content is empty return 0.
        if (!$content) {
            return 0;
        }
        // Count words containing string.
        $words_count = str_word_count($content);
        // Words per minute.
        $words_per_minute = 200;
        // Calculate time for read all words and round.
        $minutes = ceil($words_count / $words_per_minute);
        return $minutes;
    }
endif;

if (!function_exists('speedblog_get_readtime')) :
    /**
     * Print archive excerpt
     *
     * @return string Page ID.
     * @since 1.0.0
     *
     */
    function speedblog_get_readtime()
    { ?>
        <div class="entry-meta entry-read-time">
            <span class="screen-reader-text"><?php esc_html_e('Estimated read time', 'speedblog'); ?></span>
            <?php
            $read_time = get_post_meta(get_the_ID(), 'speedblog_post_read_time', true);
            if ($read_time) {
                printf( /* translators: %s: Read Time. */
                    esc_html__('%s min read', 'speedblog'),
                    number_format_i18n($read_time)
                );
            } else {
                $read_time = speedblog_estimated_read_time(get_the_content());
                printf( /* translators: %s: Read Time. */
                    esc_html__('%s min read', 'speedblog'),
                    number_format_i18n($read_time)
                );
            }
            ?>
        </div>
    <?php }
endif;


if ( ! function_exists( 'speedblog_is_wc_active' ) ) :
    /**
     * Check WooCommerce Status
     *
     * @since 1.0.0
     *
     * return boolean true/false
     */
    function speedblog_is_wc_active() {
        return class_exists( 'WooCommerce' ) ? true : false;
    }
endif;