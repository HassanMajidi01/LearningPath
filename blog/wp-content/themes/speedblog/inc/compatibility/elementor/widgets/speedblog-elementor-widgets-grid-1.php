<?php
/**
 * SpeedBlog Elementor Widget Grid 1.
 *
 * @package    SpeedBlog
 * @since      SpeedBlog 1.0.0
 */
namespace Elementor\Widgets;
use Elementor\Widgets\SpeedBlog_Elementor_Widget_Base;
// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}
/**
 * SpeedBlog Elementor Widget Grid 1.
 *
 * Class SpeedBlog_Elementor_Widgets_Grid_1
 */
class SpeedBlog_Elementor_Widgets_Grid_1 extends SpeedBlog_Elementor_Widget_Base
{
    /**
     * Retrieve SpeedBlog_Elementor_Widgets_Grid_1 widget name.
     *
     * @access public
     *
     * @return string Widget name.
     */
    public function get_name()
    {
        return 'SpeedBlog-Posts-Grid-1';
    }
    /**
     * Retrieve SpeedBlog_Elementor_Widgets_Grid_1 widget title.
     *
     * @access public
     *
     * @return string Widget title.
     */
    public function get_title()
    {
        return esc_html__('Grid Style 1', 'speedblog');
    }
    /**
     * Retrieve SpeedBlog_Elementor_Widgets_Grid_1 widget icon.
     *
     * @access public
     *
     * @return string Widget icon.
     */
    public function get_icon()
    {
        return 'speedblog-econs-grid-1';
    }
    /**
     * Retrieve the list of categories the SpeedBlog_Elementor_Widgets_Grid_1 widget belongs to.
     *
     * Used to determine where to display the widget in the editor.
     *
     * @access public
     *
     * @return array Widget categories.
     */
    public function get_categories()
    {
        return array('speedblog-widget-grid');
    }
    /**
     * Enable post category options for this widget.
     *
     * @var bool
     */
    public $has_post_category = true;
    /**
     * Render SpeedBlog_Elementor_Widgets_Grid_1 widget output on the frontend.
     *
     * Written in PHP and used to generate the final HTML.
     *
     * @access protected
     */
    protected function render()
    {
        $widget_title = $this->get_settings('widget_title');
        $posts_number = $this->get_settings('posts_number');
        $enable_category_meta = $this->get_settings('enable_category_meta');
        $category_meta_text = $this->get_settings('category_meta_text');
        $display_category_option = $this->get_settings('display_category_option');
        $number_of_cat = $this->get_settings('number_of_cat');
        $enable_author_meta = $this->get_settings('enable_author_meta');
        $display_author_option = $this->get_settings('display_author_option');
        $author_text = $this->get_settings('author_text');
        $enable_date_meta = $this->get_settings('enable_date_meta');
        $date_format = $this->get_settings('date_format');
        $display_type = $this->get_settings('display_type');
        $offset_posts_number = $this->get_settings('offset_posts_number');
        $categories_selected = $this->get_settings('categories_selected');
        // Create the posts query.
        $get_featured_posts = $this->build_widget_query($posts_number, $display_type, $categories_selected, $offset_posts_number);
        ?>
        <div class="speedblog-module-grid speedblog-module-grid-style-1 speedblog-element-wrapper wrapper-gutter-small">
            <?php
            // Displays the widget title.
            $this->widget_title($widget_title);
            ?>
            <div class="row-group">
                <?php
                $count = 1;
                while ($get_featured_posts->have_posts()) :
                    $get_featured_posts->the_post();
                    $title_font_size = 'entry-title-small';
                    $thumbnail_image_class = 'entry-image-medium';
                    if (1 == $count) {
                        $title_font_size = 'entry-title-big';
                        $thumbnail_image_class = 'entry-image-large';
                    }
                    $thumbnail_size = (1 === $count) ? 'large' : 'medium_large';
                    $main_wrapper_class = (1 === $count) ? 'wpi-post-module-grid wpi-post wpi-tile-post speedblog-module-grid--full elementor-custom-column' : 'wpi-post-module-grid wpi-post wpi-tile-post speedblog-module-grid--quarter elementor-custom-column';
                    ?>
                    <article id="module-grid-2-<?php the_ID(); ?>" class="<?php echo esc_attr($main_wrapper_class); ?>">
                        <?php if (has_post_thumbnail()) : ?>
                            <div class="elementor-entry-image entry-image image-hover-effect hover-effect-shine <?php echo esc_attr($thumbnail_image_class); ?>">
                                <?php $this->the_post_thumbnail($thumbnail_size); ?>
                            </div>
                        <?php endif; ?>
                        <div class="elementor-entry-details entry-details">
                            <?php
                            if ($enable_category_meta === 'yes') {
                                speedblog_post_category($display_category_option, $category_meta_text, $number_of_cat);
                            }
                            ?>
                            <?php
                            $font_class = esc_attr($title_font_size);
                            // Display the post title.
                            $this->the_title($font_class);
                            ?>
                            <div class="entry-meta-wrapper">
                                <?php
                                // Displays the entry meta.
                                if ($enable_date_meta == 'yes') { ?>
                                    <div class="entry-meta entry-date posted-on">
                                        <span class="screen-reader-text"><?php _e('Post Date', 'speedblog'); ?></span>
                                        <?php speedblog_the_theme_svg('calendar'); ?>
                                        <?php
                                        if ('format_1' === $date_format) {
                                            echo esc_html(human_time_diff(get_the_time('U'), current_time('timestamp')) . ' ' . __('ago', 'speedblog'));
                                        } else {
                                            echo esc_html(get_the_date());
                                        }
                                        ?>
                                    </div>
                                    <?php
                                }
                                if ($enable_author_meta == 'yes') {
                                    speedblog_posted_by($display_author_option, $author_text);
                                } ?>
                            </div>
                        </div>
                    </article>
                    <?php
                    ++$count;
                endwhile;
                // Reset the postdata.
                wp_reset_postdata();
                ?>
            </div>
        </div>
        <?php
    }
}
