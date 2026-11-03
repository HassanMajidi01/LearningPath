<?php
/**
 * Displays the footer widget area.
 *
 * @package SpeedBlog
 */
if( !is_active_sidebar( 'footer-1' ) && !is_active_sidebar( 'footer-2' ) && !is_active_sidebar( 'footer-3' ) && !is_active_sidebar( 'footer-4' ) ){
    return;
}
// Get the footer column layout from the customizer
$footer_column_layout = speedblog_get_option('footer_column_layout');
$enable_footer_widget = speedblog_get_option('enable_footer_widget');
if(empty($enable_footer_widget)){
    return;
}
// Set default footer column and class
$footer_column = 4;
$footer_class = 'column-md-6 column-lg-3';

// Match column layout with the corresponding class
switch ($footer_column_layout) {
    case 'footer_layout_1':
        $footer_column = 4;
        $footer_class = 'column-md-6 column-lg-3';
        break;
    case 'footer_layout_2':
        $footer_column = 3;
        $footer_class = 'column-md-6 column-lg-4';
        break;
    case 'footer_layout_3':
        $footer_column = 2;
        $footer_class = 'column-md-6 column-lg-6';
        break;
    case 'footer_layout_4':
        $footer_column = 2;
        $footer_class = array('column-md-6 column-lg-9', 'column-md-6 column-lg-3');
        break;
    case 'footer_layout_5':
        $footer_column = 3;
        $footer_class = array('column-lg-3 column-md-3', 'column-lg-6 column-md-6', 'column-lg-3 column-md-3');
        break;
    case 'footer_layout_6':
        $footer_column = 2;
        $footer_class = array('column-md-6 column-lg-3', 'column-md-6 column-lg-9');
        break;
    case 'footer_layout_7':
        $footer_column = 1;
        $footer_class = 'column-md-12';
        break;
    default:
        $footer_column = 4;
        $footer_class = 'column-md-6 column-lg-3';
}

// Apply filter to adjust the number of footer columns if needed
$cols = intval(apply_filters('speedblog_footer_widget_columns', $footer_column));

// Determine the number of active columns
for ($j = $cols; $j > 0; $j--) {
    if (is_active_sidebar('footer-' . $j)) {
        $columns = $j;
        break;
    }
}

if (isset($columns)) :
    ?>
    <div class="footer-widget-area wpi-widget-area regular-widget-area">
        <div class="wrapper">
            <div class="row-group">
                <?php
                for ($column = 1; $column <= $columns; $column++) :
                    if (is_active_sidebar('footer-' . $column)) :
                        // Determine the appropriate column class
                        $footer_display_class = is_array($footer_class) ? $footer_class[$column - 1] : $footer_class;
                        ?>
                        <div class="column-sm-12 <?php echo esc_attr($footer_display_class); ?> footer-widget-<?php echo esc_attr($column); ?>">
                            <?php dynamic_sidebar('footer-' . $column); ?>
                        </div><!-- .footer-widget-<?php echo esc_html($column); ?> -->
                    <?php
                    endif;
                endfor;
                ?>
            </div>
        </div>
    </div>
    <?php
    unset($columns);
endif;
