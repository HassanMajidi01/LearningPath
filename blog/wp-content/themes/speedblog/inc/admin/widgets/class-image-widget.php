<?php
if (!defined('ABSPATH')) {
    exit;
}

class SpeedBlog_Image_Widget extends SpeedBlog_Widget_Base
{
    /**
     * Constructor.
     */
    public function __construct()
    {
        $this->widget_cssclass = 'speedblog-image-widget';
        $this->widget_description = __("The Image Widget offers versatile design with two style variations. Effortlessly incorporate images, titles, descriptions, and links for dynamic and engaging content presentation in a single widget.", 'speedblog');
        $this->widget_id = 'speedblog_image_widget';
        $this->widget_name = __('SpeedBlog: Image Widget', 'speedblog');
        $this->settings = $this->get_widget_settings();
        parent::__construct();
    }

    /**
     * Define widget settings.
     */
    protected function get_widget_settings()
    {
        return array(
            'title' => array(
                'type' => 'text',
                'label' => __('Widget Title', 'speedblog'),
            ),
            'title_text' => array(
                'type' => 'text',
                'label' => __('Widget Description', 'speedblog'),
            ),
            'bg_image' => array(
                'type' => 'image',
                'label' => __('Background Image', 'speedblog'),
            ),
            'btn_text' => array(
                'type' => 'text',
                'label' => __('Button Text', 'speedblog'),
            ),
            'btn_link' => array(
                'type' => 'url',
                'label' => __('Link to URL', 'speedblog'),
                'desc' => __('Please make sure to provide a complete URL that includes either "http://" or "https://" to ensure the widget operates correctly.', 'speedblog'),
            ),
            'link_target' => array(
                'type' => 'checkbox',
                'label' => __('Open Link in new Tab', 'speedblog'),
                'std' => true,
            ),
            'text_alignment' => array(
                'type' => 'select',
                'label' => __('Text Alignment', 'speedblog'),
                'options' => array(
                    'align-text-center' => __('Center', 'speedblog'),
                    'align-text-left' => __('Left', 'speedblog'),
                    'align-text-right' => __('Right', 'speedblog'),
                ),
                'std' => 'align-text-center',
            ),
            'style' => array(
                'type' => 'select',
                'label' => __('Style', 'speedblog'),
                'options' => array(
                    'style_1' => __('Style 1', 'speedblog'),
                    'style_2' => __('Style 2', 'speedblog'),
                ),
                'std' => 'style_1',
            ),
        );
    }


    /**
     * Output widget.
     *
     * @param array $args
     * @param array $instance
     * @see WP_Widget
     *
     */
    public function widget($args, $instance)
    {
        $class = '';
        ob_start();
        echo $args['before_widget'];
        $class .= $instance['style'];
        $class .= ' ' . $instance['text_alignment'];
        do_action('speedblog_before_image');
        ?>
        <div class="wpi-image-widget <?php echo esc_attr($class); ?>">
            <div class="image-widget-background">
                <?php echo wp_get_attachment_image($instance['bg_image'], 'full'); ?>
            </div>
            <div class="image-widget-description">
                <?php if ($instance['title']) : ?>
                    <h3 class="image-widget-title">
                        <?php echo esc_html($instance['title']); ?>
                    </h3>
                <?php endif; ?>
                <?php if ($instance['title_text']) : ?>
                    <div class="image-widget-details">
                        <?php echo esc_html($instance['title_text']); ?>
                    </div>
                <?php endif; ?>
                <?php if ($instance['btn_text']) : ?>
                    <a href="<?php echo ($instance['btn_link']) ? esc_url($instance['btn_link']) : ''; ?>"
                       target="<?php echo ($instance['link_target']) ? "_blank" : '_self'; ?>"
                       class="wpi-button wpi-button-small wpi-button-primary">
                        <?php echo esc_html(($instance['btn_text'])); ?>
                    </a>
                <?php endif; ?>
            </div>
        </div>
        <?php
        do_action('speedblog_after_image');
        echo $args['after_widget'];
        echo ob_get_clean();
    }
}