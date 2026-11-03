<?php
/**
 * Displays the site header.
 *
 * @package SpeedBlog
 */
do_action('speedblog_before_header');
if (speedblog_get_option('enable_top_bar', true)) :
    get_template_part('template-parts/header/topbar');
endif;
$select_header_layout_style = speedblog_get_option('select_header_layout_style');

switch ($select_header_layout_style) {
    case 'header_style_1':
        get_template_part('template-parts/header/styles/style-1');
        break;
    case 'header_style_2':
        get_template_part('template-parts/header/styles/style-2');
        break;
    case 'header_style_3':
        get_template_part('template-parts/header/styles/style-3');
        break;
    case 'header_style_4':
        get_template_part('template-parts/header/styles/style-4');
        break;
    case 'header_style_5':
        get_template_part('template-parts/header/styles/style-5');
        break;
    default:
        return;
}


do_action('speedblog_after_header');