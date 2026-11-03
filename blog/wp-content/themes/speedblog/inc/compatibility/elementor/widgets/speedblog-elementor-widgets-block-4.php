<?php
/**
 * SpeedBlog Elementor Widget Block 4.
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
 * SpeedBlog Elementor Widget Block 4.
 *
 * Class SpeedBlog_Elementor_Widgets_Block_4
 */
class SpeedBlog_Elementor_Widgets_Block_4 extends SpeedBlog_Elementor_Widget_Base
{

    /**
     * Retrieve SpeedBlog_Elementor_Widgets_Block_4 widget name.
     *
     * @access public
     *
     * @return string Widget name.
     */
    public function get_name()
    {
        return 'SpeedBlog-Posts-Block-4';
    }

    /**
     * Retrieve SpeedBlog_Elementor_Widgets_Block_4 widget title.
     *
     * @access public
     *
     * @return string Widget title.
     */
    public function get_title()
    {
        return esc_html__('Block Style 4', 'speedblog');
    }

    /**
     * Extra option control related to widget Excerpt section.
     */
    public function posts_controls_excerpt() {
        $this->add_control(
            'enable_post_excerpt',
            [
                'type' => \Elementor\Controls_Manager::SWITCHER,
                'label' => esc_html__('Post Excerpt', 'speedblog'),
                'default' => 'yes',
            ]
        );
        $this->add_control(
            'post_line_limit',
            [
                'type' => \Elementor\Controls_Manager::SELECT,
                'label' => esc_html__('Content Line Limit', 'speedblog'),
                'options' => [
                    'limit-line-1' => esc_html__( '1 Line', 'speedblog' ),
                    'limit-line-2' => esc_html__( '2 Lines', 'speedblog' ),
                    'limit-line-3' => esc_html__( '3 Lines', 'speedblog' ),
                    'limit-line-4' => esc_html__( '4 Lines', 'speedblog' ),
                    'limit-line-5' => esc_html__( '5 Lines', 'speedblog' ),
                ],
                'default' => 'limit-line-3',
            ]
        );
    }

    /**
     * Retrieve SpeedBlog_Elementor_Widgets_Block_4 widget icon.
     *
     * @access public
     *
     * @return string Widget icon.
     */
    public function get_icon()
    {
        return 'speedblog-econs-block-4';
    }

    /**
     * Retrieve the list of categories the SpeedBlog_Elementor_Widgets_Block_4 widget belongs to.
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
     * Render SpeedBlog_Elementor_Widgets_Block_4 widget output on the frontend.
     *
     * Written in PHP and used to generate the final HTML.
     *
     * @access protected
     */
    protected function render()
    {

        $widget_title = $this->get_settings('widget_title');
        $posts_number = $this->get_settings('posts_number');
        $enable_post_excerpt = $this->get_settings('enable_post_excerpt');
        $post_line_limit = $this->get_settings('post_line_limit');

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

        <div class="speedblog-module-block speedblog-module-block-style-4 speedblog-element-wrapper">
            <?php
            // Displays the widget title.
            $this->widget_title($widget_title);

            while ($get_featured_posts->have_posts()) :
                $get_featured_posts->the_post();

                $featured_image_size = 'medium_large';
                ?>


                <article id="module-4-<?php the_ID(); ?>" <?php post_class('wpi-post-module-block wpi-post wpi-post-regular'); ?>>
                    <?php if (has_post_thumbnail()) : ?>
                        <div class="elementor-entry-image entry-image image-hover-effect hover-effect-shine entry-image-big">
                            <?php
                            $this->the_post_thumbnail($featured_image_size);
                            ?>
                        </div>
                    <?php endif; ?>

                    <div class="elementor-entry-details entry-details">

                        <?php
                        if ($enable_category_meta === 'yes') {
                            speedblog_post_category($display_category_option, $category_meta_text, $number_of_cat);
                        }
                        ?>

                        <?php
                        $font_class = 'entry-title-medium';
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


                        <?php if ($enable_post_excerpt == 'yes') { ?>
                            <div class="entry-content <?php echo esc_attr($post_line_limit); ?>">
                                <?php
                                // Displays the post excerpts.
                                the_excerpt();
                                ?>
                            </div>
                        <?php } ?>

                    </div>
                </article>


            <?php
            endwhile;

            // Reset the postdata.
            wp_reset_postdata();
            ?>
        </div>

        <?php
    }
}
