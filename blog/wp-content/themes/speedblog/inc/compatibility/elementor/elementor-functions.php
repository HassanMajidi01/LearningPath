<?php
/**
 * Custom functions to be used within Elementor plugin.
 *
 * @package    SpeedBlog
 * @since      SpeedBlog 1.0.0
 */

if ( ! function_exists( 'speedblog_elementor_categories' ) ) :

	/**
	 * Return the values of all the categories of the posts present in the site.
	 *
	 * @return array of category ids and its respective names.
	 *
	 * @since SpeedBlog 1.0.0
	 */
	function speedblog_elementor_categories() {
		$output     = array();
		$categories = get_categories();

		foreach ( $categories as $category ) {
			$output[ $category->term_id ] = $category->name;
		}

		return $output;
	}

endif;

if ( ! function_exists( 'speedblog_elementor_styles' ) ) :

	/**
	 * Loads styles on elementor editor.
	 *
	 * @since SpeedBlog 1.0.0
	 */
	function speedblog_elementor_styles() {
		wp_enqueue_style( 'speedblog-econs', get_template_directory_uri() . '/inc/compatibility/elementor/assets/css/speedblog-econs.css', false, '1.0' );
	}

endif;

add_action( 'elementor/editor/after_enqueue_styles', 'speedblog_elementor_styles' );
