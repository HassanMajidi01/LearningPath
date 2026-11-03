<?php
/**
 * Implements the compatibility for the Elementor plugin in SpeedBlog theme.
 *
 * @package    SpeedBlog
 * @since      SpeedBlog 1.0.0
 */

use elementor\widgets\SpeedBlog_Elementor_Global_Widgets_Title;
use elementor\widgets\SpeedBlog_Elementor_Widgets_Block_1;
use elementor\widgets\SpeedBlog_Elementor_Widgets_Block_2;
use elementor\widgets\SpeedBlog_Elementor_Widgets_Block_3;
use elementor\widgets\SpeedBlog_Elementor_Widgets_Block_4;
use elementor\widgets\SpeedBlog_Elementor_Widgets_Block_5;
use elementor\widgets\SpeedBlog_Elementor_Widgets_Grid_1;
use elementor\widgets\SpeedBlog_Elementor_Widgets_Grid_2;
use elementor\widgets\SpeedBlog_Elementor_Widgets_Grid_3;
use elementor\widgets\SpeedBlog_Elementor_Widgets_Grid_4;
use elementor\widgets\SpeedBlog_Elementor_Widgets_Grid_5;

/**
 * Load the SpeedBlog Elementor widgets file and registers it
 */
if ( ! function_exists( 'speedblog_elementor_widgets_registered' ) ) :

	/**
	 * Load and register the required Elementor widgets file.
	 *
	 * @param Elementor\Widgets_Manager $widgets_manager The widgets manager instance.
	 *
	 * @since SpeedBlog 1.0.0
	 */
	function speedblog_elementor_widgets_registered( $widgets_manager ) {

		// Require the Widget Base class.
		require get_template_directory()  . '/inc/compatibility/elementor/widgets/class-speedblog-elementor-widget-base.php';

		// Require the files.
		// 1. Block Widgets.
		require get_template_directory()  . '/inc/compatibility/elementor/widgets/speedblog-elementor-widgets-block-1.php';
		require get_template_directory()  . '/inc/compatibility/elementor/widgets/speedblog-elementor-widgets-block-2.php';
        require get_template_directory()  . '/inc/compatibility/elementor/widgets/speedblog-elementor-widgets-block-3.php';
		require get_template_directory()  . '/inc/compatibility/elementor/widgets/speedblog-elementor-widgets-block-4.php';
		require get_template_directory()  . '/inc/compatibility/elementor/widgets/speedblog-elementor-widgets-block-5.php';

		// 2. Grid Widgets.
		require get_template_directory()  . '/inc/compatibility/elementor/widgets/speedblog-elementor-widgets-grid-1.php';
		require get_template_directory()  . '/inc/compatibility/elementor/widgets/speedblog-elementor-widgets-grid-2.php';
		require get_template_directory()  . '/inc/compatibility/elementor/widgets/speedblog-elementor-widgets-grid-3.php';
		require get_template_directory()  . '/inc/compatibility/elementor/widgets/speedblog-elementor-widgets-grid-4.php';
		require get_template_directory()  . '/inc/compatibility/elementor/widgets/speedblog-elementor-widgets-grid-5.php';

		// 3. Global Widgets.
		require get_template_directory()  . '/inc/compatibility/elementor/widgets/speedblog-elementor-global-widgets-title.php';

		// Register the widgets
		// 1. Block Widgets.
		$widgets_manager->register_widget_type( new SpeedBlog_Elementor_Widgets_Block_1() );
		$widgets_manager->register_widget_type( new SpeedBlog_Elementor_Widgets_Block_2() );
        $widgets_manager->register_widget_type( new SpeedBlog_Elementor_Widgets_Block_3() );
		$widgets_manager->register_widget_type( new SpeedBlog_Elementor_Widgets_Block_4() );
		$widgets_manager->register_widget_type( new SpeedBlog_Elementor_Widgets_Block_5() );

		// 2. Grid Widgets.
		$widgets_manager->register_widget_type( new SpeedBlog_Elementor_Widgets_Grid_1() );
		$widgets_manager->register_widget_type( new SpeedBlog_Elementor_Widgets_Grid_2() );
		$widgets_manager->register_widget_type( new SpeedBlog_Elementor_Widgets_Grid_3() );
		$widgets_manager->register_widget_type( new SpeedBlog_Elementor_Widgets_Grid_4() );
		$widgets_manager->register_widget_type( new SpeedBlog_Elementor_Widgets_Grid_5() );

		// 3. Global Widgets.
		$widgets_manager->register_widget_type( new SpeedBlog_Elementor_Global_Widgets_Title() );

	}

endif;

add_action( 'elementor/widgets/widgets_registered', 'speedblog_elementor_widgets_registered' );

if ( ! function_exists( 'speedblog_elementor_category' ) ) :

	/**
	 * Add the Elementor category for use in SpeedBlog widgets as separator.
	 *
	 * @since SpeedBlog 1.0.0
	 */
	function speedblog_elementor_category() {

		// Register widget block category for Elementor section.
		\Elementor\Plugin::instance()->elements_manager->add_category(
			'speedblog-widget-blocks',
			array(
				'title' => esc_html__( 'SpeedBlog Widget Blocks', 'speedblog' ),
			),
			1
		);

		// Register widget grid category for Elementor section.
		\Elementor\Plugin::instance()->elements_manager->add_category(
			'speedblog-widget-grid',
			array(
				'title' => esc_html__( 'SpeedBlog Widget Grid', 'speedblog' ),
			),
			1
		);

		// Register widget global category for Elementor section.
		\Elementor\Plugin::instance()->elements_manager->add_category(
			'speedblog-widget-global',
			array(
				'title' => esc_html__( 'SpeedBlog Global Widgets', 'speedblog' ),
			),
			1
		);
	}

endif;

add_action( 'elementor/init', 'speedblog_elementor_category' );

if ( ! function_exists( 'speedblog_elementor_enqueue_style' ) ) :

	/**
	 * Enqueue the styles for use within Elementor only.
	 *
	 * @since SpeedBlog 1.0.0
	 */
	function speedblog_elementor_enqueue_style() {

        $suffix = (defined('SCRIPT_DEBUG') && SCRIPT_DEBUG) ? '' : '.min';

        $file_name = is_rtl() ? 'elementor-rtl' . $suffix . '.css' : 'elementor' . $suffix . '.css';

        wp_enqueue_style(
            'speedblog-elementor-style',
            get_template_directory_uri() . '/inc/compatibility/elementor/assets/css/' . $file_name,
            array(),
            SPEEDBLOG_VERSION
        );
	}

endif;

add_action( 'elementor/frontend/after_enqueue_styles', 'speedblog_elementor_enqueue_style' );
