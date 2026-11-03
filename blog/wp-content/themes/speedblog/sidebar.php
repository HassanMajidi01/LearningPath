<?php
/**
 * The sidebar containing the main widget area
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package SpeedBlog
 */

if ( ! is_active_sidebar( 'sidebar' ) ) {
	return;
}
$page_layout = speedblog_get_page_layout();
if ($page_layout == 'no-sidebar') {
	return;
}
?>

<div id="secondary" class="widget-area wpi-widget-area regular-widget-area">
    <div class="site-sticky-components">
	    <?php dynamic_sidebar( 'sidebar' ); ?>
    </div>
</div>
