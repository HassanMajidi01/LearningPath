<?php
if (!function_exists('speedblog_get_option')) :
    /**
     * Get customizer value by key.
     *
     * @param string $key Option key.
     * @return mixed Option value.
     * @since 1.0.0
     *
     */
    function speedblog_get_option($key)
    {
        $key_value = '';
        if (!$key) {
            return $key_value;
        }
        $default_values = speedblog_get_all_customizer_default_values();
        $customizer_values = get_theme_mod('speedblog_options');
        $customizer_values = wp_parse_args($customizer_values, $default_values);

        $key_value = (isset($customizer_values[$key])) ? $customizer_values[$key] : '';
        return $key_value;
    }
endif;

if ( ! function_exists( 'speedblog_get_archive_layouts' ) ) :
	/**
	 * Returns archive layout options.
	 *
	 * @since 1.0.0
	 *
	 * @return array Options array.
	 */
	function speedblog_get_archive_layouts() {
		$options = apply_filters(
			'speedblog_get_archive_layouts',
			array(
				'archive_style_1' => array(
					'url'   => get_template_directory_uri() . '/assets/images/archive-1.webp',
					'label' => esc_html__( 'Archive List View', 'speedblog' ),
				),
				'archive_style_2' => array(
					'url'   => get_template_directory_uri() . '/assets/images/archive-2.webp',
					'label' => esc_html__( 'Archive Grid View', 'speedblog' ),
				),
				'archive_style_3' => array(
					'url'   => get_template_directory_uri() . '/assets/images/archive-3.webp',
					'label' => esc_html__( 'Archive Alternate Grid View', 'speedblog' ),
				),
			)
		);
		return $options;
	}
endif;

if ( ! function_exists( 'speedblog_get_date_formats' ) ) :
	/**
	 * Returns title Alignments
	 *
	 * @since 1.0.0
	 *
	 * @return array Options array.
	 */
	function speedblog_get_date_formats() {
		$options = apply_filters(
			'speedblog_archive_date_format',
			array(
				'classic'   => __( 'Classic', 'speedblog' ),
				'time_ago' => __( 'Time Ago', 'speedblog' ),
			)
		);
		return $options;
	}
endif;


if ( ! function_exists( 'speedblog_line_limit_choices' ) ) :
	/**
	 * Returns title limit options.
	 *
	 * @since 1.0.0
	 *
	 * @return array Options array.
	 */
	function speedblog_line_limit_choices() {
		$options = apply_filters(
			'speedblog_title_limit_options',
			array(
				''              => __( '&mdash; No Limit &mdash;', 'speedblog' ),
				'limit-line-1' => __( '1 Line', 'speedblog' ),
				'limit-line-2' => __( '2 Lines', 'speedblog' ),
				'limit-line-3' => __( '3 Lines', 'speedblog' ),
				'limit-line-4' => __( '4 Lines', 'speedblog' ),
				'limit-line-5' => __( '5 Lines', 'speedblog' ),
			)
		);
		return $options;
	}
endif;
if ( ! function_exists( 'speedblog_archive_category_style' ) ) :
	/**
	 * Returns title Alignments
	 *
	 * @since 1.0.0
	 *
	 * @return array Options array.
	 */
	function speedblog_archive_category_style() {
		$options = apply_filters(
			'speedblog_archive_category_style',
			array(
				'archive_cat_style_1'   => __( 'Category Style 1', 'speedblog' ),
				'archive_cat_style_2'   => __( 'Category Style 2', 'speedblog' ),
				'archive_cat_style_3'   => __( 'Category Style 3', 'speedblog' ),

			)
		);
		return $options;
	}
endif;

if ( ! function_exists( 'speedblog_archive_read_time_style' ) ) :
	/**
	 * Returns title Alignments
	 *
	 * @since 1.0.0
	 *
	 * @return array Options array.
	 */
	function speedblog_archive_read_time_style() {
		$options = apply_filters(
			'speedblog_archive_read_time_style',
			array(
				'archive_read_time_style_1'   => __( 'Read Time Style 1', 'speedblog' ),
				'archive_read_time_style_2'   => __( 'Read Time Style 2', 'speedblog' ),
				'archive_read_time_style_3'   => __( 'Read Time Style 3', 'speedblog' ),

			)
		);
		return $options;
	}
endif;


if ( ! function_exists( 'speedblog_get_header_layout' ) ) :
	/**
	 * Returns header layout options.
	 *
	 * @since 1.0.0
	 *
	 * @return array Options array.
	 */
	function speedblog_get_header_layout() {
		$options = apply_filters(
			'speedblog_get_header_layout',
			array(
				'header_style_1' => array(
					'url'   => get_template_directory_uri() . '/assets/images/header-1.webp',
					'label' => esc_html__( 'Header Style 1', 'speedblog' ),
				),
				'header_style_2' => array(
					'url'   => get_template_directory_uri() . '/assets/images/header-2.webp',
					'label' => esc_html__( 'Header Style 2', 'speedblog' ),
				),
        'header_style_3' => array(
            'url'   => get_template_directory_uri() . '/assets/images/header-3.webp',
            'label' => esc_html__( 'Header Style 3', 'speedblog' ),
        ),
        'header_style_4' => array(
            'url'   => get_template_directory_uri() . '/assets/images/header-4.webp',
            'label' => esc_html__( 'Header Style 4', 'speedblog' ),
        ),
        'header_style_5' => array(
            'url'   => get_template_directory_uri() . '/assets/images/header-5.webp',
            'label' => esc_html__( 'Header Style 5', 'speedblog' ),
        ),
			)
		);
		return $options;
	}
endif;

if ( ! function_exists( 'speedblog_social_menu_style' ) ) :
	/**
	 * Returns title Alignments
	 *
	 * @since 1.0.0
	 *
	 * @return array Options array.
	 */
	function speedblog_social_menu_style() {
		$options = apply_filters(
			'speedblog_social_menu_style',
			array(
				'has-brand-background'   => __( 'Has Brand Background', 'speedblog' ),
				'has-brand-color'   => __( 'Has Brand Color', 'speedblog' ),
				'none'   => __( 'None', 'speedblog' ),

			)
		);
		return $options;
	}
endif;

if ( ! function_exists( 'speedblog_pagination_style_choice' ) ) :
	/**
	 * Returns title Alignments
	 *
	 * @since 1.0.0
	 *
	 * @return array Options array.
	 */
	function speedblog_pagination_style_choice() {
		$options = apply_filters(
			'speedblog_pagination_style_choice',
			array(
				'pagination_none'   => __( 'None', 'speedblog' ),
				'pagination_numeric'   => __( 'Numeric', 'speedblog' ),
				'pagination_default'   => __( 'Default(New/Old Post)', 'speedblog' ),
				'pagination_ajax_on_scroll'   => __( 'Load More On Scroll', 'speedblog' ),
				'pagination_ajax_on_click'   => __( 'Load More On Click', 'speedblog' ),

			)
		);
		return $options;
	}
endif;

if ( ! function_exists( 'speedblog_category_color' ) ) :
	/**
	 * Returns title Alignments
	 *
	 * @since 1.0.0
	 *
	 * @return array Options array.
	 */
	function speedblog_category_color() {
		$options = apply_filters(
			'speedblog_category_color',
			array(
				'none'   => __( 'None', 'speedblog' ),
				'has-background'   => __( 'Has dot', 'speedblog' ),
				'has-text-color'   => __( 'Has text color', 'speedblog' ),

			)
		);
		return $options;
	}
endif;


if ( ! function_exists( 'speedblog_get_footer_layouts' ) ) :
	/**
	 * Returns footer layout options.
	 *
	 * @since 1.0.0
	 *
	 * @return array Options array.
	 */
	function speedblog_get_footer_layouts() {
		$options = apply_filters(
			'speedblog_footer_layouts',
			array(
				'footer_layout_1' => array(
					'url'   => get_template_directory_uri() . '/assets/images/footer-col-4.webp',
					'label' => esc_html__( 'Four Columns', 'speedblog' ),
				),
				'footer_layout_2' => array(
					'url'   => get_template_directory_uri() . '/assets/images/footer-col-3.webp',
					'label' => esc_html__( 'Three Columns', 'speedblog' ),
				),
				'footer_layout_3' => array(
					'url'   => get_template_directory_uri() . '/assets/images/footer-col-2.webp',
					'label' => esc_html__( 'Two Columns', 'speedblog' ),
				),
				'footer_layout_4' => array(
					'url'   => get_template_directory_uri() . '/assets/images/footer-col-2-big-left.webp',
					'label' => esc_html__( 'Two Columns Big Left', 'speedblog' ),
				),
				'footer_layout_5' => array(
					'url'   => get_template_directory_uri() . '/assets/images/footer-col-3-big-middle.webp',
					'label' => esc_html__( 'Three Columns Big Middle', 'speedblog' ),
				),
				'footer_layout_6' => array(
					'url'   => get_template_directory_uri() . '/assets/images/footer-col-2-big-right.webp',
					'label' => esc_html__( 'Two Columns Big Right', 'speedblog' ),
				),
				'footer_layout_7' => array(
					'url'   => get_template_directory_uri() . '/assets/images/footer-col-1.webp',
					'label' => esc_html__( 'Single Column', 'speedblog' ),
				),
			)
		);
		return $options;
	}
endif;


if ( ! function_exists( 'speedblog_preloader_style_option' ) ) :
	/**
	 * Returns title Alignments
	 *
	 * @since 1.0.0
	 *
	 * @return array Options array.
	 */
	function speedblog_preloader_style_option() {
		$options = apply_filters(
			'speedblog_preloader_style_option',
			array(
				'style-1'   => __( 'Style - 1', 'speedblog' ),
				'style-2'   => __( 'Style - 2', 'speedblog' ),
				'style-3'   => __( 'Style - 3', 'speedblog' ),
				'style-4'   => __( 'Style - 4', 'speedblog' ),
				'style-5'   => __( 'Style - 5', 'speedblog' ),
				'style-6'   => __( 'Style - 6', 'speedblog' ),
				'style-7'   => __( 'Style - 7', 'speedblog' ),
				'style-8'   => __( 'Style - 8', 'speedblog' ),
				'style-9'   => __( 'Style - 9', 'speedblog' ),
				'style-10'   => __( 'Style - 10', 'speedblog' ),

			)
		);
		return $options;
	}
endif;


if ( ! function_exists( 'speedblog_get_recommended_post' ) ) :
	/**
	 * Returns recommended layout options.
	 *
	 * @since 1.0.0
	 *
	 * @return array Options array.
	 */
	function speedblog_get_recommended_post() {
		$options = apply_filters(
			'speedblog_get_recommended_post',
			array(
				'wpi-post-recommendation-1' => array(
					'url'   => get_template_directory_uri() . '/assets/images/recommended-1.webp',
					'label' => esc_html__( 'Recommended List View', 'speedblog' ),
				),
				'wpi-post-recommendation-2' => array(
					'url'   => get_template_directory_uri() . '/assets/images/recommended-2.webp',
					'label' => esc_html__( 'Recommended Grid View', 'speedblog' ),
				),
				'wpi-post-recommendation-3' => array(
					'url'   => get_template_directory_uri() . '/assets/images/recommended-3.webp',
					'label' => esc_html__( 'Recommended Alternate Grid View', 'speedblog' ),
				),
			)
		);
		return $options;
	}
endif;



if ( ! function_exists( 'speedblog_author_meta' ) ) :
	/**
	 * Returns title Alignments
	 *
	 * @since 1.0.0
	 *
	 * @return array Options array.
	 */
	function speedblog_author_meta() {
		$options = apply_filters(
			'speedblog_author_meta',
			array(
				'with_label'   => __( 'With Label', 'speedblog' ),
				'with_icon'   => __( 'With Icon', 'speedblog' ),
				'with_avatar_image'   => __( 'With Avatar Image', 'speedblog' ),

			)
		);
		return $options;
	}
endif;

if ( ! function_exists( 'speedblog_date_meta' ) ) :
	/**
	 * Returns title Alignments
	 *
	 * @since 1.0.0
	 *
	 * @return array Options array.
	 */
	function speedblog_date_meta() {
		$options = apply_filters(
			'speedblog_date_meta',
			array(
				'with_label'   => __( 'With Label', 'speedblog' ),
				'with_icon'   => __( 'With Icon', 'speedblog' ),

			)
		);
		return $options;
	}
endif;

if ( ! function_exists( 'speedblog_get_sidebar_layouts' ) ) :
	/**
	 * Returns general layout options.
	 *
	 * @since 1.0.0
	 *
	 * @return array Options array.
	 */
	function speedblog_get_sidebar_layouts() {
		$options = apply_filters(
			'speedblog_sidebar_layouts',
			array(
				'left-sidebar'      => array(
					'url'   => get_template_directory_uri() . '/assets/images/left-sidebar.webp',
					'label' => esc_html__( 'Left Sidebar', 'speedblog' ),
				),
				'right-sidebar'     => array(
					'url'   => get_template_directory_uri() . '/assets/images/right-sidebar.webp',
					'label' => esc_html__( 'Right Sidebar', 'speedblog' ),
				),
				'no-sidebar'        => array(
					'url'   => get_template_directory_uri() . '/assets/images/no-sidebar.webp',
					'label' => esc_html__( 'No Sidebar - Wide', 'speedblog' ),
				),
			)
		);
		return $options;
	}
endif;


if ( ! function_exists( 'speedblog_get_social_links_styles' ) ) :
	/**
	 * Returns social links styles options.
	 *
	 * @since 1.0.0
	 *
	 * @return array Options array.
	 */
	function speedblog_get_social_links_styles() {
		$options = apply_filters(
			'speedblog_social_links_styles',
			array(
				'style_1' => __( 'Style 1', 'speedblog' ),
				'style_2' => __( 'Style 2', 'speedblog' ),
				'style_3' => __( 'Style 3', 'speedblog' ),
				'style_4' => __( 'Style 4', 'speedblog' ),
			)
		);
		return $options;
	}
endif;
