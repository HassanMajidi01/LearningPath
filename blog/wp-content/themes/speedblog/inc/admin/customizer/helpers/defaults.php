<?php
/**
 * Default customizer values.
 *
 * @package SpeedBlog
 */
if (!function_exists('speedblog_get_all_customizer_default_values')) :
    /**
     * Get default customizer values.
     *
     * @return array Default customizer values.
     * @since 1.0.0
     *
     */
    function speedblog_get_all_customizer_default_values()
    {

        $defaults = array();

        // sidebar
        $defaults['hide_title'] = false;
        $defaults['hide_tagline'] = false;

        $defaults['sidebar_layout_option'] = 'right-sidebar';
        $defaults['single_sidebar_layout_option'] = 'right-sidebar';
        $defaults['enable_sidebar_fix_archive'] = true;
        $defaults['enable_sidebar_fix_single'] = true;

        // preloader
        $defaults['enable_preloader_options'] = true;
        $defaults['speedblog_preloader_style'] = 'style-2';

        // breadrumbs
        $defaults['enable_breadcrumb'] = true;

        $defaults['enable_social_mobile_menu'] = true;
        $defaults['select_mobile_social_menu_style'] = 'has-brand-background ';
        $defaults['enable_mobile_social_nav_border_radius'] = true;
        $defaults['enable_copyright_in_menu'] = true;

        // header launcher button
        $defaults['enable_header_launcher_button'] = true;
        $defaults['header_launcher_button_text'] = esc_html__('View Video Stories', 'speedblog');
        $defaults['header_launcher_button_url'] = '';

        // topbar
        $defaults['select_header_layout_style'] = 'header_style_4';
        $defaults['enable_top_bar'] = true;
        $defaults['hide_topbar_on_mobile'] = false;
        $defaults['enable_header_date'] = true;
        $defaults['date_label_text'] = esc_html__('Today:', 'speedblog');
        $defaults['todays_date_format'] = 'l, F j Y';
        $defaults['enable_social_nav_on_topbar'] = true;
        $defaults['enable_social_nav_border_radius'] = true;
        $defaults['select_top_bar_social_menu_style'] = 'has-brand-background';

        // main banner 
        $defaults['enable_main_banner_section'] = true;
        $defaults['banner_slider_post_category'] = '';
        $defaults['banner_lists_post_category'] = '';
        $defaults['enable_main_banner_author_meta'] = false;
        $defaults['select_main_banner_author_meta'] = 'with_avatar_image';
        $defaults['select_main_banner_date_meta_title'] = esc_html__('Posted on', 'speedblog');
        $defaults['main_banner_author_meta_title'] = esc_html__('Posted by', 'speedblog');
        $defaults['enable_main_banner_date_meta'] = true;
        $defaults['select_main_banner_date'] = 'with_icon';
        $defaults['select_main_banner_date_format'] = 'classic';
        $defaults['enable_main_banner_category_meta'] = true;
        $defaults['main_banner_category_label'] = '';
        $defaults['select_main_banner_category_color'] = 'has-text-color';
        $defaults['select_main_banner_number_of_category'] = 1;

        // article list
        $defaults['enable_article_list_section'] = true;
        $defaults['article_list_post_title'] = esc_html__('Explore Articles', 'speedblog');
        $defaults['article_list_post_sub_title'] = esc_html__('Discover a variety of topics and in-depth reads', 'speedblog');
        $defaults['article_list_post_category'] = '';
        $defaults['enable_article_list_author_meta'] = true;
        $defaults['select_article_list_author_meta'] = 'with_avatar_image';
        $defaults['select_article_list_date_meta_title'] = esc_html__('Posted on', 'speedblog');
        $defaults['article_list_author_meta_title'] = esc_html__('Posted by', 'speedblog');
        $defaults['enable_article_list_date_meta'] = true;
        $defaults['select_article_list_date'] = 'with_icon';
        $defaults['select_article_list_date_format'] = 'classic';
        $defaults['enable_article_list_category_meta'] = true;
        $defaults['article_list_category_label'] = '';
        $defaults['select_article_list_category_color'] = 'has-text-color';
        $defaults['select_article_list_number_of_category'] = 1;
        $defaults['article_list_post_button_title'] = esc_html__('Read More', 'speedblog');
        $defaults['article_list_post_button_url'] = '';


        // article grid 
        $defaults['enable_article_grid_section'] = true;
        $defaults['article_grid_post_title_1'] = esc_html__('Content Showcase', 'speedblog');
        $defaults['article_grid_post_sub_title'] = esc_html__('Browse through our articles in a sleek, organized grid', 'speedblog');
        $defaults['article_grid_post_category'] = '';
        $defaults['enable_article_grid_author_meta'] = false;
        $defaults['select_article_grid_author_meta'] = 'with_avatar_image';
        $defaults['select_article_grid_date_meta_title'] = esc_html__('Posted on', 'speedblog');
        $defaults['article_grid_author_meta_title'] = esc_html__('Posted by', 'speedblog');
        $defaults['enable_article_grid_date_meta'] = true;
        $defaults['select_article_grid_date'] = 'with_icon';
        $defaults['select_article_grid_date_format'] = 'classic';
        $defaults['enable_article_grid_category_meta'] = true;
        $defaults['article_grid_category_label'] = '';
        $defaults['select_article_grid_category_color'] = 'has-text-color';
        $defaults['select_article_grid_number_of_category'] = 1;


        // Single Category Highlight 
        $defaults['enable_cat_highlight_section'] = true;
        $defaults['cat_highlight_post_title'] = esc_html__('Must-Read Highlights', 'speedblog');
        $defaults['cat_highlight_post_sub_title'] = esc_html__('Catch up on the posts we’ve put in the spotlight', 'speedblog');
        $defaults['cat_highlight_post_category'] = '';
        $defaults['enable_cat_highlight_author_meta'] = false;
        $defaults['select_cat_highlight_author_meta'] = 'with_avatar_image';
        $defaults['select_cat_highlight_date_meta_title'] = esc_html__('Posted on', 'speedblog');
        $defaults['cat_highlight_author_meta_title'] = esc_html__('Posted by', 'speedblog');
        $defaults['enable_cat_highlight_date_meta'] = true;
        $defaults['select_cat_highlight_date'] = 'with_icon';
        $defaults['select_cat_highlight_date_format'] = 'classic';
        $defaults['enable_cat_highlight_category_meta'] = true;
        $defaults['cat_highlight_category_label'] = '';
        $defaults['select_cat_highlight_category_color'] = 'has-text-color';
        $defaults['select_cat_highlight_number_of_category'] = 1;

        // Spotlight 
        $defaults['enable_spotlight_section'] = true;
        $defaults['spotlight_post_title'] = esc_html__('Spotlight Picks', 'speedblog');
        $defaults['spotlight_post_category_1'] = '';
        $defaults['spotlight_post_category_2'] = '';
        $defaults['enable_spotlight_author_meta'] = false;
        $defaults['select_spotlight_author_meta'] = 'with_avatar_image';
        $defaults['select_spotlight_date_meta_title'] = esc_html__('Posted on', 'speedblog');
        $defaults['spotlight_author_meta_title'] = esc_html__('Posted by', 'speedblog');
        $defaults['enable_spotlight_date_meta'] = true;
        $defaults['select_spotlight_date'] = 'with_icon';
        $defaults['select_spotlight_date_format'] = 'classic';
        $defaults['enable_spotlight_category_meta'] = true;
        $defaults['spotlight_category_label'] = '';
        $defaults['select_spotlight_category_color'] = 'has-text-color';
        $defaults['select_spotlight_number_of_category'] = 1;

        // excerpt
        $defaults['number_of_word_in_excerpt'] = '20';
        $defaults['excerpt_posts_title_limit'] = '';
        $defaults['archive_excerpt_button_text'] = esc_html__('Learn More', 'speedblog');

        // archive options
        $defaults['archive_layout'] = 'archive_style_3';
        $defaults['archive_posts_title_limit'] = '';
        $defaults['enable_excerpt_on_archive_1'] = true;
        $defaults['enable_excerpt_on_archive_2'] = true;
        $defaults['select_author_meta'] = 'with_label';
        $defaults['archive_author_meta_title'] = esc_html__('by', 'speedblog');
        $defaults['enable_archive_author_meta'] = true;
        $defaults['enable_archive_date_meta'] = true;
        $defaults['archive_date_meta_title'] = esc_html__('Posted on', 'speedblog');
        $defaults['select_date_format'] = 'classic';
        $defaults['select_archive_date'] = 'with_label';


        $defaults['enable_category_meta'] = true;
        $defaults['archive_category_label'] = '';
        $defaults['select_category_style'] = 'archive_cat_style_2';
        $defaults['number_of_category_to_display'] = '2';
        $defaults['select_category_color'] = 'none';
        $defaults['enable_tag_meta'] = false;
        $defaults['enable_comment_meta'] = true;
        $defaults['enable_read_time_meta'] = true;
        $defaults['select_read_time_style'] = 'archive_read_time_style_1';
        $defaults['enable_excerpt'] = true;

        $defaults['select_pagination_style'] = 'pagination_default';


        // single options
        $defaults['enable_single_author_meta'] = true;
        $defaults['single_author_meta_title'] = esc_html__('by', 'speedblog');
        $defaults['select_single_author_meta'] = 'with_label';
        $defaults['enable_single_date_meta'] = true;
        $defaults['select_single_date'] = 'with_label';
        $defaults['single_date_meta_title'] = esc_html__('Posted on', 'speedblog');
        $defaults['select_single_date_format'] = 'classic';
        $defaults['enable_single_category_meta'] = true;
        $defaults['single_category_label'] = '';
        $defaults['select_single_category_color'] = 'has-text-color';
        $defaults['enable_single_tag_meta'] = true;
        $defaults['enable_single_read_time_meta'] = true;


        $defaults['show_author_info'] = true;
        $defaults['show_sticky_article_navigation'] = true;

        // single related post
        $defaults['show_related_posts'] = true;
        $defaults['related_posts_text'] = __('You May Also Like', 'speedblog');
        $defaults['no_of_related_posts'] = 4;
        $defaults['related_posts_orderby'] = 'date';
        $defaults['related_posts_order'] = 'desc';
        $defaults['author_posts_orderby'] = 'date';
        $defaults['enable_related_posts_author_meta'] = true;
        $defaults['select_related_posts_author_meta'] = 'with_icon';
        $defaults['single_related_post_date_meta_title'] = esc_html__('Posted on', 'speedblog');
        $defaults['related_posts_author_meta_title'] = esc_html__('Posted by', 'speedblog');
        $defaults['enable_related_posts_date_meta'] = true;
        $defaults['select_related_posts_date'] = 'with_icon';
        $defaults['select_related_posts_date_format'] = 'classic';
        $defaults['enable_related_posts_category_meta'] = true;
        $defaults['related_posts_category_label'] = '';
        $defaults['select_related_posts_category_color'] = 'has-text-color';
        $defaults['select_related_posts_number_of_category'] = 1;

        // single author post
        $defaults['author_posts_order'] = 'desc';
        $defaults['show_author_posts'] = true;
        $defaults['author_posts_text'] = __('More From Author', 'speedblog');
        $defaults['no_of_author_posts'] = 4;

        $defaults['enable_author_posts_author_meta'] = true;
        $defaults['select_author_posts_author_meta'] = 'with_icon';
        $defaults['single_author_post_date_meta_title'] = esc_html__('Posted on', 'speedblog');
        $defaults['author_posts_author_meta_title'] = esc_html__('Posted by', 'speedblog');
        $defaults['enable_author_posts_date_meta'] = true;
        $defaults['select_author_posts_date'] = 'with_icon';
        $defaults['select_author_posts_date_format'] = 'classic';
        $defaults['enable_author_posts_category_meta'] = true;
        $defaults['author_posts_category_label'] = '';
        $defaults['select_author_posts_category_color'] = 'has-text-color';
        $defaults['select_author_posts_number_of_category'] = 1;

        // featured block post
        $defaults['enable_featured_block'] = true;
        $defaults['featured_block_post_title'] = esc_html__('Block of the Week', 'speedblog');
        $defaults['featured_block_post_sub_title'] = esc_html__('A closer look at the stories that are making waves', 'speedblog');
        $defaults['featured_block_category'] = '';
        $defaults['enable_featured_block_category_meta'] = true;
        $defaults['enable_featured_block_author_meta'] = false;
        $defaults['select_featured_block_author_meta'] = 'with_avatar_image';
        $defaults['select_featured_block_date_meta_title'] = esc_html__('Posted on', 'speedblog');
        $defaults['featured_block_author_meta_title'] = esc_html__('Posted by', 'speedblog');
        $defaults['enable_featured_block_date_meta'] = true;
        $defaults['select_featured_block_date'] = 'with_icon';
        $defaults['select_featured_block_date_format'] = 'classic';
        $defaults['featured_block_category_label'] = '';
        $defaults['select_featured_block_category_color'] = 'has-text-color';
        $defaults['select_featured_block_number_of_category'] = 1;
        $defaults['featured_block_button_title'] = esc_html__('Read More', 'speedblog');
        $defaults['featured_block_button_url'] = '';

        // footer recommended section
        $defaults['enable_recommended_post'] = true;
        $defaults['recommended_post_layout'] = 'wpi-post-recommendation-1';
        $defaults['recommended_post_title'] = esc_html__('Just For You', 'speedblog');
        $defaults['recommended_post_category'] = '';
        
        $defaults['enable_recommended_post_author_meta'] = false;
        $defaults['select_recommended_post_author_meta'] = 'with_avatar_image';
        $defaults['select_recommended_post_date_meta_title'] = esc_html__('Posted on', 'speedblog');
        $defaults['recommended_post_author_meta_title'] = esc_html__('Posted by', 'speedblog');
        $defaults['enable_recommended_post_date_meta'] = true;
        $defaults['select_recommended_post_date'] = 'with_icon';
        $defaults['select_recommended_post_date_format'] = 'classic';
        $defaults['enable_recommended_post_category_meta'] = true;
        $defaults['recommended_post_category_label'] = '';
        $defaults['select_recommended_post_category_color'] = 'has-text-color';
        $defaults['select_recommended_post_number_of_category'] = 1;

        //featured category section
        $defaults['enable_featured_category'] = false;
        $defaults['featured_category_title'] = esc_html__('Browse Our Blog Categories', 'speedblog');
        $defaults['featured_category_sub_title'] = esc_html__('Discover a wide range of subjects, curated just for you', 'speedblog');
        // footer widget section
        $defaults['enable_footer_widget'] = true;
        $defaults['footer_column_layout'] = 'footer_layout_2';

        // footer section
        $defaults['copyright_text'] = esc_html__('&copy; All rights reserved. Proudly powered by WordPress.', 'speedblog');
        $defaults['copyright_date_format'] = 'Y';
        $defaults['enable_footer_nav'] = false;
        $defaults['enable_footer_social_nav'] = true;
        $defaults['enable_footer_social_nav_border_radius'] = true;
        $defaults['select_footer_social_menu_style'] = 'has-brand-background';
        
        $defaults['enable_footer_scroll_to_top'] = true;
        $defaults['enable_footer_progressbar'] = true;



        // tags
        $defaults['enable_tags'] = false;
        $defaults['enable_tags_only_on_frontpage'] = false;
        $defaults['enable_tags_label'] = true;
        $defaults['tags_label_text'] = esc_html__('Trending', 'speedblog');
        $defaults['tags_orderby'] = 'date';
        $defaults['tags_order'] = 'desc';
        $defaults['no_of_tags'] = 12;
        $defaults['tags_label_style'] = 'style_2';
        $defaults['hide_tags_label_responsive'] = true;

        //ticker post
        $defaults['enable_ticker_posts'] = true;
        $defaults['enable_ticker_only_on_frontpage'] = true;
        $defaults['enable_ticker_label'] = true;
        $defaults['ticker_label_text'] = esc_html__('News Flash', 'speedblog');
        $defaults['ticker_posts_cat'] = '';
        $defaults['no_of_ticker_posts'] = 7;
        $defaults['ticker_posts_number_of_post_offsets'] = 0;
        $defaults['ticker_posts_orderby'] = 'date';
        $defaults['ticker_posts_order'] = 'desc';
        $defaults['enable_ticker_posts_author_meta'] = true;
        $defaults['select_ticker_posts_author_meta'] = 'with_icon';
        $defaults['single_ticker_post_date_meta_title'] = esc_html__('on', 'speedblog');
        $defaults['ticker_posts_author_meta_title'] = esc_html__('Posted by', 'speedblog');
        $defaults['enable_ticker_posts_date_meta'] = true;
        $defaults['select_ticker_posts_date'] = 'with_icon';
        $defaults['select_ticker_posts_date_format'] = 'classic';
        $defaults['enable_ticker_posts_category_meta'] = false;
        $defaults['ticker_posts_category_label'] = '';
        $defaults['select_ticker_posts_category_color'] = 'none';
        $defaults['select_ticker_posts_number_of_category'] = 1;

        //popular post
        $defaults['enable_popular_posts'] = true;
        $defaults['enable_popular_only_on_frontpage'] = true;
        $defaults['enable_popular_label'] = true;
        $defaults['popular_label_text'] = esc_html__('Top Picks', 'speedblog');
        $defaults['popular_post_cat'] = '';
        $defaults['no_of_popular_posts'] = 8;
        $defaults['popular_posts_number_of_post_offsets'] = 0;
        $defaults['popular_post_orderby'] = 'date';
        $defaults['popular_post_order'] = 'desc';
        $defaults['enable_popular_post_author_meta'] = false;
        $defaults['select_popular_post_author_meta'] = 'with_icon';
        $defaults['select_popular_post_date_meta_title'] = esc_html__('on', 'speedblog');
        $defaults['popular_post_author_meta_title'] = esc_html__('Posted by', 'speedblog');
        $defaults['enable_popular_post_date_meta'] = true;
        $defaults['select_popular_post_date'] = 'with_icon';
        $defaults['select_popular_post_date_format'] = 'classic';
        $defaults['enable_popular_post_autoplay'] = false;
        $defaults['enable_popular_post_arrows'] = true;
        $defaults['enable_popular_post_dots'] = false;
        $defaults['enable_popular_category_meta'] = false;
        $defaults['popular_category_label'] = '';
        $defaults['select_popular_category_color'] = 'has-background';
        $defaults['select_popular_number_of_category'] = 3;
        $defaults['popular_post_offset_number'] = 0;

        $defaults = apply_filters('speedblog_default_customizer_values', $defaults);
        return $defaults;
    }
endif;