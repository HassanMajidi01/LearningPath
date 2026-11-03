<?php
/**
* Customizer Custom callbacks.
*
* @package SpeedBlog
*/

if ( ! function_exists( 'speedblog_archive_author_meta_title' ) ) :
	/**
	 * Check if excerpt is enabled
	 *
	 * @since SpeedBlog 1.0.0
	 *
	 * @param WP_Customize_Control $control WP_Customize_Control instance.
	 *
	 * @return bool Whether the control is active to the current preview.
	 */
	function speedblog_archive_author_meta_title( $control ) {

		if ( $control->manager->get_setting( 'speedblog_options[select_author_meta]' )->value() === 'with_label' ) {
			return true;
		} else {
			return false;
		}
	}
endif;

if ( ! function_exists( 'speedblog_is_archive_excerpt_callbac_1' ) ) :
	/**
	 * Check if Menu Bar logo is available in header types
	 *
	 * @since SpeedBlog 1.0.0
	 *
	 * @param WP_Customize_Control $control WP_Customize_Control instance.
	 *
	 * @return bool Whether the control is active to the current preview.
	 */
	function speedblog_is_archive_excerpt_callbac_1( $control ) {

		$archive_style   = $control->manager->get_setting( 'speedblog_options[archive_layout]' )->value();
		$allowed_styles = array( 'archive_style_2' );

		if ( in_array( $archive_style, $allowed_styles ) ) {
			return true;
		} else {
			return false;
		}
	}
endif;


if ( ! function_exists( 'speedblog_is_archive_excerpt_callbac_2' ) ) :
	/**
	 * Check if Menu Bar logo is available in header types
	 *
	 * @since SpeedBlog 1.0.0
	 *
	 * @param WP_Customize_Control $control WP_Customize_Control instance.
	 *
	 * @return bool Whether the control is active to the current preview.
	 */
	function speedblog_is_archive_excerpt_callbac_2( $control ) {

		$archive_style   = $control->manager->get_setting( 'speedblog_options[archive_layout]' )->value();
		$allowed_styles = array( 'archive_style_1','archive_style_3' );

		if ( in_array( $archive_style, $allowed_styles ) ) {
			return true;
		} else {
			return false;
		}
	}
endif;

if ( ! function_exists( 'speedblog_archive_date_meta_title' ) ) :
	/**
	 * Check if excerpt is enabled
	 *
	 * @since SpeedBlog 1.0.0
	 *
	 * @param WP_Customize_Control $control WP_Customize_Control instance.
	 *
	 * @return bool Whether the control is active to the current preview.
	 */
	function speedblog_archive_date_meta_title( $control ) {

		if ( $control->manager->get_setting( 'speedblog_options[select_archive_date]' )->value() === 'with_label' ) {
			return true;
		} else {
			return false;
		}
	}
endif;

if ( ! function_exists( 'speedblog_is_archive_date_meta_enabled' ) ) :
	/**
	 * Check if date_meta is enabled
	 *
	 * @since SpeedBlog 1.0.0
	 *
	 * @param WP_Customize_Control $control WP_Customize_Control instance.
	 *
	 * @return bool Whether the control is active to the current preview.
	 */
	function speedblog_is_archive_date_meta_enabled( $control ) {

		if ( $control->manager->get_setting( 'speedblog_options[enable_archive_date_meta]' )->value() === true ) {
			return true;
		} else {
			return false;
		}
	}
endif;

if ( ! function_exists( 'speedblog_is_archive_author_meta_enabled' ) ) :
	/**
	 * Check if date_meta is enabled
	 *
	 * @since 1.0.0
	 *
	 * @param WP_Customize_Control $control WP_Customize_Control instance.
	 *
	 * @return bool Whether the control is active to the current preview.
	 */
	function speedblog_is_archive_author_meta_enabled( $control ) {

		if ( $control->manager->get_setting( 'speedblog_options[enable_archive_author_meta]' )->value() === true ) {
			return true;
		} else {
			return false;
		}
	}
endif;

if ( ! function_exists( 'speedblog_is_archive_category_meta_enabled' ) ) :
	/**
	 * Check if date_meta is enabled
	 *
	 * @since 1.0.0
	 *
	 * @param WP_Customize_Control $control WP_Customize_Control instance.
	 *
	 * @return bool Whether the control is active to the current preview.
	 */
	function speedblog_is_archive_category_meta_enabled( $control ) {

		if ( $control->manager->get_setting( 'speedblog_options[enable_category_meta]' )->value() === true ) {
			return true;
		} else {
			return false;
		}
	}
endif;


if ( ! function_exists( 'speedblog_is_read_time_meta_enabled' ) ) :
	/**
	 * Check if read_time_meta is enabled
	 *
	 * @since 1.0.0
	 *
	 * @param WP_Customize_Control $control WP_Customize_Control instance.
	 *
	 * @return bool Whether the control is active to the current preview.
	 */
	function speedblog_is_read_time_meta_enabled( $control ) {

		if ( $control->manager->get_setting( 'speedblog_options[enable_read_time_meta]' )->value() === true ) {
			return true;
		} else {
			return false;
		}
	}
endif;

if ( ! function_exists( 'speedblog_is_excerpt_enabled' ) ) :
	/**
	 * Check if excerpt is enabled
	 *
	 * @since 1.0.0
	 *
	 * @param WP_Customize_Control $control WP_Customize_Control instance.
	 *
	 * @return bool Whether the control is active to the current preview.
	 */
	function speedblog_is_excerpt_enabled( $control ) {

		if ( $control->manager->get_setting( 'speedblog_options[enable_excerpt]' )->value() === true ) {
			return true;
		} else {
			return false;
		}
	}
endif;

if ( ! function_exists( 'speedblog_is_popular_post_enabled' ) ) :
    /**
     * Check if Popular Posts is active.
     *
     * @since 1.0.0
     *
     * @param WP_Customize_Control $control WP_Customize_Control instance.
     *
     * @return bool Whether the control is active to the current preview.
     */
    function speedblog_is_popular_post_enabled( $control ) {
        if ( $control->manager->get_setting( 'speedblog_options[enable_popular_posts]' )->value() === true ) {
            return true;
        } else {
            return false;
        }
    }
endif;

if ( ! function_exists( 'speedblog_recommended_post_author_meta_title' ) ) :
	/**
	 * Check if excerpt is enabled
	 *
	 * @since 1.0.0
	 *
	 * @param WP_Customize_Control $control WP_Customize_Control instance.
	 *
	 * @return bool Whether the control is active to the current preview.
	 */
	function speedblog_recommended_post_author_meta_title( $control ) {

		if ( $control->manager->get_setting( 'speedblog_options[select_recommended_post_author_meta]' )->value() === 'with_label' ) {
			return true;
		} else {
			return false;
		}
	}
endif;
