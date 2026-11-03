<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package SpeedBlog
 */
?>
<!doctype html>
<html <?php language_attributes(); ?>>
    <head>
        <meta charset="<?php bloginfo('charset'); ?>">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="profile" href="https://gmpg.org/xfn/11">
        <?php wp_head(); ?>

    </head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<div id="page" class="site">
    <a class="skip-link screen-reader-text" href="#site-content"><?php esc_html_e('Skip to content', 'speedblog'); ?></a>
    <?php
    $enable_preloader_options = speedblog_get_option('enable_preloader_options');
    if ($enable_preloader_options) {
        get_template_part('template-parts/general/preloader');
    }
    get_template_part('template-parts/header/site-header');

    get_template_part('template-parts/modal-search');
    get_template_part('template-parts/modal-menu');

    // Helper function
    function speedblog_load_section($option_name, $template) {
        $enabled_frontpage_only = speedblog_get_option($option_name) == 1;
        if ($enabled_frontpage_only) {
            if (!is_paged() && is_front_page()) {
                get_template_part($template);
            }
        } else {
            get_template_part($template);
        }
    }

    // Load sections
    speedblog_load_section('enable_tags_only_on_frontpage', 'template-parts/section/tags');
    speedblog_load_section('enable_ticker_only_on_frontpage', 'template-parts/section/ticker-post');
    speedblog_load_section('enable_popular_only_on_frontpage', 'template-parts/section/popular-post');

    if (!is_paged() && is_front_page()) {
        get_template_part('template-parts/widgetarea/after-header');
    }
