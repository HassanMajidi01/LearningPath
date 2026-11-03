<?php
if (!function_exists('speedblog_ajax_pagination')):
    /**
     * Outputs the required structure for ajax loading posts on scroll and click
     *
     * @since 1.0.0
     * @param $type string Ajax Load Type
     */
    function speedblog_ajax_pagination($type)
    {
        global $wp_query;
        if ($wp_query->max_num_pages > 1) {

            ?>
            <div class="speedblog-advanced-pagination" data-page="1"
                data-max-pages="<?php echo esc_attr($wp_query->max_num_pages); ?>" data-load-type="<?php echo esc_attr($type); ?>">
                <hr>
                <a href="#" class="speedblog-ajax-load-button wpi-button wpi-button-secondary">
                    <span class="speedblog-pagination-label"><?php esc_html_e('Load More Posts', 'speedblog'); ?></span>
                    <span class="speedblog-pagination-spinner"></span>
                </a>
            </div>
            <?php
        }
    }
endif;

if (!function_exists('speedblog_load_posts')):
    /**
     * Ajax Load posts Callback.
     *
     * @since 1.0.0
     *
     */
    function speedblog_load_posts()
    {

        check_ajax_referer('speedblog-load-posts-nonce', 'nonce');

        // Verify Query Vars Hash
        if (!isset($_POST['query_vars_hash']) || $_POST['query_vars_hash'] !== wp_hash(stripslashes($_POST['query_vars']))) {
            wp_send_json_error(__('Security check failed: Query vars modified.', 'speedblog'));
        }

        $query_vars = json_decode(stripslashes($_POST['query_vars']), true);

        $query_vars['post_type'] = (isset($_POST['post_type']) && !empty($_POST['post_type'])) ? esc_attr($_POST['post_type']) : 'post';
        $query_vars['post_status'] = 'publish';
        $query_vars['paged'] = (int) $_POST['page'];


        $posts = new WP_Query($query_vars);

        if ($posts->have_posts()):

            ob_start();

            $delay = 100;
            while ($posts->have_posts()):
                $posts->the_post();

                get_template_part('template-parts/archive/archive-content', null, array( 'delay' => $delay ));
                $delay += 100;
            endwhile;
            wp_reset_postdata();

            $output['content'][] = ob_get_clean();
            wp_send_json_success($output);

        else:

            $error = new WP_Error('500', __('No More Posts', 'speedblog'));
            wp_send_json_error($error);

        endif;

        wp_die();
    }
endif;
add_action('wp_ajax_speedblog_load_posts', 'speedblog_load_posts');
add_action('wp_ajax_nopriv_speedblog_load_posts', 'speedblog_load_posts');