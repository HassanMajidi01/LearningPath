<?php
/**
 * SpeedBlog Elementor Widget Block 3.
 *
 * @package    SpeedBlog
 * @since      SpeedBlog 1.0.0
 */

namespace elementor\widgets;

use elementor\widgets\SpeedBlog_Elementor_Widget_Base;

// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Class SpeedBlog_Elementor_Widgets_Block_3
 */
class SpeedBlog_Elementor_Widgets_Block_3 extends SpeedBlog_Elementor_Widget_Base
{

    /**
     * Post number.
     *
     * @var int
     */
    public $post_number = 6;

    /**
     * Retrieve SpeedBlog_Elementor_Widgets_Block_3 widget name.
     *
     * @access public
     *
     * @return string Widget name.
     */
    public function get_name()
    {
        return 'SpeedBlog-Posts-Block-3';
    }

    /**
     * Retrieve SpeedBlog_Elementor_Widgets_Block_3 widget title.
     *
     * @access public
     *
     * @return string Widget title.
     */
    public function get_title()
    {
        return esc_html__('Block Style 3', 'speedblog');
    }

    /**
     * Retrieve SpeedBlog_Elementor_Widgets_Block_3 widget icon.
     *
     * @access public
     *
     * @return string Widget icon.
     */
    public function get_icon()
    {
        return 'speedblog-econs-block-3';
    }

    /**
     * Retrieve the list of categories the SpeedBlog_Elementor_Widgets_Block_3 widget belongs to.
     *
     * Used to determine where to display the widget in the editor.
     *
     * @access public
     *
     * @return array Widget categories.
     */
    public function get_categories()
    {
        return array('speedblog-widget-blocks');
    }

    /**
     * Render SpeedBlog_Elementor_Widgets_Block_3 widget output on the frontend.
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

        $display_type = $this->get_settings('display_type');
        $offset_posts_number = $this->get_settings('offset_posts_number');
        $categories_selected = $this->get_settings('categories_selected');

        // Create the posts query.
        $get_featured_posts = $this->build_widget_query($posts_number, $display_type, $categories_selected, $offset_posts_number);
        ?>

        <div class="speedblog-module-block speedblog-module-block-style-3 speedblog-element-wrapper wrapper-gutter-small">
            <?php
            // Displays the widget title.
            $this->widget_title($widget_title);
            ?>

            <div class="row-group">
                <?php
                while ($get_featured_posts->have_posts()) :
                    $get_featured_posts->the_post();
                    ?>
                    <div class="elementor-custom-column">
                        <article id="module-3-<?php the_ID(); ?>" <?php post_class('wpi-post-module-block wpi-post wpi-post-list post-list-bullet'); ?>>
                            <div class="elementor-entry-details entry-details">
                            <?php
                            if ($enable_category_meta === 'yes') {
                                speedblog_post_category($display_category_option, $category_meta_text, $number_of_cat);
                            }
                            ?>

                            <?php
                            $font_class = 'entry-title-small';
                            // Display the post title.
                            $this->the_title($font_class);
                            ?>
                            </div>
                        </article>
                    </div>
                <?php
                endwhile;

                // Reset the postdata.
                wp_reset_postdata();
                ?>
            </div>
        </div>

        <?php
    }

}
