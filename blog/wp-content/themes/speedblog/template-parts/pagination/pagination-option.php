<?php
get_template_part('template-parts/pagination/post', 'load');
if (!function_exists('speedblog_pagination_style')):
    /**
     * Styles the pagination style.
     *
     * @see select_pagination_style().
     */
    function speedblog_pagination_style()
    {
        $select_pagination_style = speedblog_get_option('select_pagination_style');
        if ('pagination_none' == $select_pagination_style) {
            return;
        }
        ?>
        <div class="speedblog-nav-pagination">
            <?php
            if ('pagination_ajax_on_click' == $select_pagination_style || 'pagination_ajax_on_scroll' == $select_pagination_style):
                speedblog_ajax_pagination($select_pagination_style);
            elseif ('pagination_numeric' == $select_pagination_style):
                $prev_text = sprintf(
                    '<span class="nav-prev-text">%s %s</span>',
                    speedblog_get_theme_svg('chevron-left'),
                    __('Previous', 'speedblog')
                );
                $next_text = sprintf(
                    '<span class="nav-next-text">%s %s</span>',
                    __('Next', 'speedblog'),
                    speedblog_get_theme_svg('chevron-right')
                );

                $posts_pagination = get_the_posts_pagination(
                    array(
                        'mid_size' => 1,
                        'prev_text' => $prev_text,
                        'next_text' => $next_text,
                    )
                );
                // If we're not outputting the previous page link, prepend a placeholder with `visibility: hidden` to take its place.
                if (strpos($posts_pagination, 'prev page-numbers') === false):
                    $posts_pagination = str_replace('<div class="nav-links">', '<div class="nav-links"><span class="prev page-numbers placeholder" aria-hidden="true">' . $prev_text . '</span>', $posts_pagination);
                endif;
                // If we're not outputting the next page link, append a placeholder with `visibility: hidden` to take its place.
                if (strpos($posts_pagination, 'next page-numbers') === false):
                    $posts_pagination = str_replace('</div>', '<span class="next page-numbers placeholder" aria-hidden="true">' . $next_text . '</span></div>', $posts_pagination);
                endif;
                if ($posts_pagination):
                    echo $posts_pagination; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- already escaped during generation.
                endif;
            else:
                // Default Pagination.
                $prev_text = sprintf(
                    '%s <span class="nav-prev-text title">%s</span>',
                    '<span class="arrow" aria-hidden="true">&larr;</span>',
                    __('Older Articles', 'speedblog')
                );
                $next_text = sprintf(
                    '<span class="nav-next-text title">%s</span> %s',
                    __('Newer Articles', 'speedblog'),
                    '<span class="arrow" aria-hidden="true">&rarr;</span>'
                );
                the_posts_navigation(
                    array(
                        'prev_text' => $prev_text,
                        'next_text' => $next_text,
                    )
                );
            endif;
            ?>
        </div>
    <?php }
endif;
