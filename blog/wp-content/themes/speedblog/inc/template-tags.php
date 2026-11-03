<?php
/**
 * Custom template tags for this theme
 *
 * Eventually, some of the functionality here could be replaced by core features.
 *
 * @package SpeedBlog
 */
if (!function_exists('speedblog_posted_on')) :
    /**
     * Prints HTML with meta information for the current post-date/time.
     * @param $date_format format 'time_ago' or null.
     * @param $date_label Show Label or Not.
     * @param $date_meta Show Icon or Not.
     */
    function speedblog_posted_on($date_format = null, $date_label = null, $date_meta = null)
    {
        $time_string = '<time class="entry-date published updated" datetime="%1$s">%2$s</time>';
        if (get_the_time('U') !== get_the_modified_time('U')) {
            $time_string = '<time class="entry-date published" datetime="%1$s">%2$s</time><time class="updated" datetime="%3$s">%4$s</time>';
        }

        $time_string = sprintf(
            $time_string,
            esc_attr(get_the_date(DATE_W3C)),
            esc_html(get_the_date()),
            esc_attr(get_the_modified_date(DATE_W3C)),
            esc_html(get_the_modified_date())
        );
        ?>
        <div class="entry-meta entry-date posted-on">
            <?php

            if ($date_label && $date_meta == 'with_label') : ?>
                <span class="entry-meta-label date-label"><?php echo esc_html($date_label); ?></span>
            <?php else : ?>
                <span class="screen-reader-text"><?php echo esc_html($date_label); ?></span>
            <?php endif;

            if ($date_meta == 'with_icon') :
                speedblog_the_theme_svg('calendar');
            endif;

            if ($date_format == 'time_ago') {
                echo esc_html(human_time_diff(get_the_time('U'), current_time('timestamp')) . ' ' . __('ago', 'speedblog'));
            } else {
                $posted_on = sprintf(
                /* translators: %s: post date. */
                    esc_html_x('%s', 'post date', 'speedblog'),
                    '<a href="' . esc_url(get_permalink()) . '" rel="bookmark">' . $time_string . '</a>'
                );


                echo $posted_on; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
            }

            ?>
        </div>
        <?php

    }
endif;

if (!function_exists('speedblog_posted_by')) :
    /**
     * Prints HTML with meta information for the current post-date/time.
     * @param $show_label  Show Label or not.
     * @param $show_image Show image or Not.
     * @param $show_icon Show Icon or Not.
     */
    function speedblog_posted_by($author_meta = null, $meta_text = null)
    {
        // Author.
        $author_image = get_avatar(get_the_author_meta('ID'), 45, '', '', array('class' => 'post-author-image'));
        $author_url = get_author_posts_url(get_the_author_meta('ID'));
        $author_name = get_the_author_meta('display_name'); ?>
        <div class="entry-meta entry-author posted-by">
            <?php
            if ($author_meta == 'with_label') : ?>
                <span class="entry-meta-label author-label"><?php echo esc_html($meta_text); ?></span>
            <?php else : ?>
                <span class="screen-reader-text"><?php echo esc_html($meta_text); ?></span>
            <?php endif;
            if ($author_meta == 'with_icon') :
                speedblog_the_theme_svg('user');
            endif;
            if ($author_meta == 'with_avatar_image') {
                ?>
                <a href="<?php echo esc_url($author_url); ?>" class="text-decoration-reset">
                    <?php
                    echo wp_kses_post($author_image);
                    echo esc_html($author_name);
                    ?>
                </a>
                <?php
            } else {
                printf(
                    __('%s', 'speedblog'),
                    '<a href="' . esc_url($author_url) . '" class="text-decoration-reset">' . esc_html($author_name) . '</a>'
                );
            }
            ?>
        </div>
        <?php
    }
endif;


if (!function_exists('speedblog_post_category')) :
    /**
     * Display post categories.
     *
     * @param $show_color Show Category Color.
     * @param $meta_text Show Label or Not.
     *
     * @since 1.0.0
     */
    function speedblog_post_category($show_color = null, $meta_text = null, $limit = 0)
    {

        $categories = get_the_category(get_the_ID());

        if (empty($categories)) {
            return;
        }

        if ( 0 != $limit ) {
            $limit = absint( $limit );
            if ( count( $categories ) > $limit ) {
                $categories = array_slice( $categories, 0, $limit );
            }
        }
        if (null == $show_color) {
            $show_color = 'none';
        }

        $wrapper_class = ' categories-' . $show_color;

        ?>
        <div class="entry-meta entry-categories cat-links<?php echo esc_attr($wrapper_class); ?>">
            <?php
            if ($meta_text) : ?>
                <span class="entry-meta-label author-label"><?php echo esc_html($meta_text); ?></span>
            <?php else : ?>
                <span class="screen-reader-text"><?php esc_html_e('Posted in', 'speedblog'); ?></span>
            <?php endif;
            ?>
            <?php
            $style_attr = '';

            if ('none' != $show_color) :
                if ('has-text-color' == $show_color) :
                    $style_attr = ' style="color:value;"';
                else :
                    $style_attr = ' style="background-color:value;"';
                endif;
            endif;

            global $wp_rewrite;

            $rel = (is_object($wp_rewrite) && $wp_rewrite->using_permalinks()) ? 'rel="category tag"' : 'rel="category"';

            $separator = ' ';

            $cat_list = '';
            $i = 0;

            foreach ($categories as $category) {

                $class = '';

                if (0 < $i) {
                    $cat_list .= $separator;
                }

                $build_style_attr = '';
                if ('none' != $show_color) {
                    $color = get_term_meta($category->term_id, 'category_color', true);
                    if ($color) {
                        $build_style_attr = str_replace('value', $color, $style_attr);
                    } else {
                        $build_style_attr = '';
                    }
                    if ('has-text-color' == $show_color) :
                        $class = ' class="has-text-color"';
                    endif;
                    if ('has-background' == $show_color) :
                        $class = ' class="has-background-color"';
                    endif;
                }

                $cat_list .= '<a href="' . esc_url(get_category_link($category->term_id)) . '" ' . $rel . $class . $build_style_attr . '>' . $category->name . '</a>';
                ++$i;
            }
            echo $cat_list;
            ?>
        </div>
        <?php
    }
endif;

if (!function_exists('speedblog_entry_footer')) :
    /**
     * Prints HTML with meta information for the categories, tags and comments.
     */
    function speedblog_entry_footer($show_tag = true, $show_comment = true)
    {
        // Hide category and tag text for pages.
        if ('post' === get_post_type() && $show_tag) {

            /* translators: used between list items, there is a space after the comma */
            $tags_list = get_the_tag_list('', esc_html_x(', ', 'list item separator', 'speedblog'));
            if ($tags_list) {
                /* translators: 1: list of tags. */
                printf('<span class="entry-meta entry-tags tags-links">' . esc_html__('Tagged %1$s', 'speedblog') . '</span>', $tags_list); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
            }
        }

        if ((!is_single() && !post_password_required() && (comments_open() || get_comments_number())) && $show_comment) {
            echo '<span class="entry-meta entry-comments comments-link">';
            comments_popup_link(
                sprintf(
                    wp_kses(
                    /* translators: %s: post title */
                        __('Leave a Comment<span class="screen-reader-text"> on %s</span>', 'speedblog'),
                        array(
                            'span' => array(
                                'class' => array(),
                            ),
                        )
                    ),
                    wp_kses_post(get_the_title())
                )
            );
            echo '</span>';
        }

        edit_post_link(
            sprintf(
                wp_kses(
                /* translators: %s: Name of current post. Only visible to screen readers */
                    __('Edit <span class="screen-reader-text">%s</span>', 'speedblog'),
                    array(
                        'span' => array(
                            'class' => array(),
                        ),
                    )
                ),
                wp_kses_post(get_the_title())
            ),
            '<span class="entry-meta entry-edit edit-link">',
            '</span>'
        );
    }
endif;

if (!function_exists('speedblog_post_thumbnail')) :
    /**
     * Displays an optional post thumbnail.
     *
     * Wraps the post thumbnail in an anchor element on index views, or a div
     * element when on single views.
     */
    function speedblog_post_thumbnail($image_class = null, $image_size = null)
    {
        if (post_password_required() || is_attachment() || !has_post_thumbnail()) {
            return;
        }

        if (is_singular()) :
            ?>
            <div class="entry-image image-hover-effect hover-effect-shine">
                <div class="post-thumbnail">
                    <?php the_post_thumbnail(); ?>
                </div><!-- .post-thumbnail -->
            </div>
        <?php else : ?>
            <div class="entry-image image-hover-effect hover-effect-shine <?php echo esc_attr($image_class); ?>">
                <a class="post-thumbnail" href="<?php the_permalink(); ?>" aria-hidden="true" tabindex="-1">
                    <?php
                    the_post_thumbnail(
                        $image_size,
                        array(
                            'alt' => the_title_attribute(
                                array(
                                    'echo' => false,
                                )
                            ),
                        )
                    );
                    ?>
                </a>
            </div>
        <?php
        endif; // End is_singular().
    }
endif;

if (!function_exists('wp_body_open')) :
    /**
     * Shim for sites older than 5.2.
     *
     * @link https://core.trac.wordpress.org/ticket/12563
     */
    function wp_body_open()
    {
        do_action('wp_body_open');
    }
endif;


/**
 * Filters classes of wp_list_pages items to match menu items.
 *
 * Filter the class applied to wp_list_pages() items with children to match the menu class, to simplify.
 * styling of sub levels in the fallback. Only applied if the match_menu_classes argument is set.
 *
 * @param string[] $css_class An array of CSS classes to be applied to each list item.
 * @param WP_Post $page Page data object.
 * @param int $depth Depth of page, used for padding.
 * @param array $args An array of arguments.
 * @return array CSS class names.
 * @since SpeedBlog 1.0.0
 *
 */
function speedblog_filter_wp_list_pages_item_classes($css_class, $page, $depth, $args)
{

    // Only apply to wp_list_pages() calls with match_menu_classes set to true.
    $match_menu_classes = isset($args['match_menu_classes']);

    if (!$match_menu_classes) {
        return $css_class;
    }

    // Add current menu item class.
    if (in_array('current_page_item', $css_class, true)) {
        $css_class[] = 'current-menu-item';
    }

    // Add menu item has children class.
    if (in_array('page_item_has_children', $css_class, true)) {
        $css_class[] = 'menu-item-has-children';
    }

    return $css_class;
}

add_filter('page_css_class', 'speedblog_filter_wp_list_pages_item_classes', 10, 4);

/**
 * Adds a Sub Nav Toggle to the Expanded Menu and Mobile Menu.
 *
 * @param stdClass $args An object of wp_nav_menu() arguments.
 * @param WP_Post $item Menu item data object.
 * @return stdClass An object of wp_nav_menu() arguments.
 * @since SpeedBlog 1.0
 *
 */
function speedblog_add_sub_toggles_to_main_menu($args, $item)
{

    // Add sub menu toggles to the Expanded Menu with toggles.
    if (isset($args->show_toggles) && $args->show_toggles) {

        // Wrap the menu item link contents in a div, used for positioning.
        $args->before = '<div class="ancestor-wrapper">';
        $args->after = '';

        // Add a toggle to items with children.
        if (in_array('menu-item-has-children', $item->classes, true)) {

            $toggle_target_string = '.menu-modal .menu-item-' . $item->ID . ' > .sub-menu';
            $toggle_duration = speedblog_toggle_duration();

            // Add the sub menu toggle.
            $args->after .= '<button class="toggle sub-menu-toggle" data-toggle-target="' . $toggle_target_string . '" data-toggle-type="slidetoggle" data-toggle-duration="' . absint($toggle_duration) . '" aria-expanded="false"><span class="screen-reader-text">' .
                /* translators: Hidden accessibility text. */
                __('Show sub menu', 'speedblog') .
                '</span>' . speedblog_get_theme_svg('chevron-down') . '</button>';

        }

        // Close the wrapper.
        $args->after .= '</div><!-- .ancestor-wrapper -->';

        // Add sub menu icons to the primary menu without toggles.
    } elseif ('primary' === $args->theme_location) {
        if (in_array('menu-item-has-children', $item->classes, true)) {
            $args->after = '<span class="icon"></span>';
        } else {
            $args->after = '';
        }
    }

    return $args;
}

add_filter('nav_menu_item_args', 'speedblog_add_sub_toggles_to_main_menu', 10, 2);

/**
 * Displays SVG icons in social links menu.
 *
 * @param string $item_output The menu item's starting HTML output.
 * @param WP_Post $item Menu item data object.
 * @param int $depth Depth of the menu. Used for padding.
 * @param stdClass $args An object of wp_nav_menu() arguments.
 * @return string The menu item output with social icon.
 * @since SpeedBlog 1.0
 *
 */
function speedblog_nav_menu_social_icons($item_output, $item, $depth, $args)
{
    // Change SVG icon inside social links menu if there is supported URL.
    if ('social' === $args->theme_location) {
        $svg = SpeedBlog_SVG_Icons::get_social_link_svg($item->url);
        if (empty($svg)) {
            $svg = speedblog_get_theme_svg('link');
        }
        $item_output = str_replace($args->link_after, '</span>' . $svg, $item_output);
    }

    return $item_output;
}

add_filter('walker_nav_menu_start_el', 'speedblog_nav_menu_social_icons', 10, 4);

/**
 * Toggles animation duration in milliseconds.
 *
 * @return int Duration in milliseconds
 * @since SpeedBlog 1.0
 *
 */
function speedblog_toggle_duration()
{
    /**
     * Filters the animation duration/speed used usually for submenu toggles.
     *
     * @param int $duration Duration in milliseconds.
     * @since SpeedBlog 1.0
     *
     */
    $duration = apply_filters('speedblog_toggle_duration', 250);

    return $duration;
}
