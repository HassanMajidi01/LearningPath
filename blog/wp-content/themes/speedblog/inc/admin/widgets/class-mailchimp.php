<?php
if (!defined('ABSPATH')) {
    exit;
}

class SpeedBlog_Mailchimp extends SpeedBlog_Widget_Base
{
    public function __construct()
    {
        $this->widget_cssclass = 'widget_speedblog_mailchimp';
        $this->widget_description = __("Displays call to action button and text with background", 'speedblog');
        $this->widget_id = 'speedblog_mailchimp';
        $this->widget_name = __('SpeedBlog: Mailchimp', 'speedblog');
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
                'label' => __('Mailchimp Title', 'speedblog'),
            ),
            'font_size' => array(
                'type' => 'select',
                'label' => __('Heading font size', 'speedblog'),
                'options' => array(
                    'entry-title-small' => __('Small', 'speedblog'),
                    'entry-title-medium' => __('Medium', 'speedblog'),
                    'entry-title-big' => __('Big', 'speedblog'),
                    'entry-title-large' => __('Large', 'speedblog'),
                ),
                'std' => 'entry-title-large',
            ),
            'font_style' => array(
                'type' => 'select',
                'label' => __('Heading font style', 'speedblog'),
                'options' => array(
                    'entry-title-normal' => __('Normal', 'speedblog'),
                    'entry-title-italic' => __('Italic', 'speedblog'),
                ),
                'std' => 'entry-title-normal',
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
            'description' => array(
                'type' => 'textarea',
                'label' => __('Mailchimp Description', 'speedblog'),
                'rows' => 10,
            ),
            'mailchimp_shortcode' => array(
                'type' => 'text',
                'label' => __('MailChimp Form Shortcode', 'speedblog'),
            ),
            'widget_settings' => array(
                'type' => 'heading',
                'label' => __('Widget Settings', 'speedblog'),
            ),
            'display_layout' => array(
                'type' => 'select',
                'label' => __('Display Layout', 'speedblog'),
                'options' => array(
                    'display-regular-layout' => __('Regular layout', 'speedblog'),
                    'display-fullwidth-layout' => __('Full Width Layout', 'speedblog'),
                ),
                'std' => 'display-regular-layout',
            ),
            'vertical_alignment' => array(
                'type' => 'select',
                'label' => __('Vertical Alignment', 'speedblog'),
                'options' => array(
                    'vertical-align-top' => __('Top', 'speedblog'),
                    'vertical-align-middle' => __('Middle', 'speedblog'),
                    'vertical-align-bottom' => __('Bottom', 'speedblog'),
                ),
                'std' => 'vertical-align-middle',
            ),
            'text_color' => array(
                'type' => 'color',
                'label' => __('Text Color', 'speedblog'),
                'std' => '#ffffff',
            ),
            'bg_color' => array(
                'type' => 'color',
                'label' => __('Background Color', 'speedblog'),
                'std' => '#000000',
                'desc' => __('Will be overridden if used background image.', 'speedblog'),
            ),
            'bg_image' => array(
                'type' => 'image',
                'label' => __('Background Image', 'speedblog'),
            ),
            'enable_fixed_bg' => array(
                'type' => 'checkbox',
                'label' => __('Enable Fixed Background Image', 'speedblog'),
                'std' => true,
            ),
            'bg_overlay_color' => array(
                'type' => 'color',
                'label' => __('Overlay Color', 'speedblog'),
                'std' => '#000000',
            ),
            'overlay_opacity' => array(
                'type' => 'number',
                'step' => 10,
                'min' => 0,
                'max' => 100,
                'std' => 50,
                'label' => __('Overlay Opacity', 'speedblog'),
            ),
            'height' => array(
                'type' => 'number',
                'step' => 1,
                'min' => 150,
                'max' => '',
                'std' => 500,
                'label' => __('Height (px)', 'speedblog'),
                'desc' => __('Works when there is either a background color or image.', 'speedblog'),
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
        ob_start();
        $style = '';
        $font_size = !empty($instance['font_size']) ? $instance['font_size'] : $this->settings['font_size']['std'];
        $font_style = !empty($instance['font_style']) ? $instance['font_style'] : $this->settings['font_style']['std'];
        $text_alignment = !empty($instance['text_alignment']) ? $instance['text_alignment'] : $this->settings['text_alignment']['std'];
        $vertical_alignment = !empty($instance['vertical_alignment']) ? $instance['vertical_alignment'] : $this->settings['vertical_alignment']['std'];
        $class = isset($instance['display_layout']) ? $instance['display_layout'] : $this->settings['display_layout']['std'];
        $image_enabled = false;
        $this->widget_start($args, $instance);
        $bg_color = isset($instance['bg_color']) ? $instance['bg_color'] : $this->settings['bg_color']['std'];
        $text_color = isset($instance['text_color']) ? $instance['text_color'] : $this->settings['text_color']['std'];
        $style = 'background-color:' . esc_attr($bg_color) . ';';
        $style .= '--mailchimp-text-color:' . esc_attr($text_color) . ';';
        $height = isset($instance['height']) ? $instance['height'] : $this->settings['height']['std'];
        $style .= 'min-height:' . esc_attr($height) . 'px;';
        if ((isset($instance['bg_image']) && 0 != $instance['bg_image'])) {
            $image_enabled = true;
            if ($instance['enable_fixed_bg']) {
                $class .= ' background-image-fixed';
            }
        }
        if ($image_enabled) {
            $class .= ' widget-has-background entry-background-image';
        }
        if ($vertical_alignment) {
            $class .= ' ' . $vertical_alignment;
        }
        do_action('speedblog_before_mailchimp');
        ?>
        <div class="wpi-mailchimp-widget wpi-special-widget <?php echo esc_attr($class); ?>" style="<?php echo esc_attr($style); ?>">
            <?php
            if ($image_enabled) {
                $overlay_style = 'background-color:' . $instance['bg_overlay_color'] . ';';
                $overlay_style .= 'opacity:' . ($instance['overlay_opacity'] / 100) . ';';
                ?>
                <span aria-hidden="true" class="background-image-overlay" style="<?php echo esc_attr($overlay_style); ?>"></span>
                <?php echo wp_get_attachment_image($instance['bg_image'], 'full'); ?>
                <?php
            }
            ?>
            <div class="widget-wrapper <?php echo $text_alignment; ?>">
                <?php if (isset($instance['title_text']) && $instance['title_text']) : ?>
                    <h2 class="entry-title <?php echo $font_size . ' ' . $font_style; ?>">
                        <?php echo esc_html($instance['title_text']); ?>
                    </h2>
                <?php endif; ?>
                <?php if (isset($instance['description']) && $instance['description']) : ?>
                    <div class="site-mailchimp-summary">
                        <?php echo wpautop(wp_kses_post($instance['description'])); ?>
                    </div>
                <?php endif; ?>
                <?php if (isset($instance['mailchimp_shortcode']) && $instance['mailchimp_shortcode']) : ?>
                    <?php echo do_shortcode($instance['mailchimp_shortcode']); ?>
                <?php endif; ?>
            </div>
        </div>
        <?php
        do_action('speedblog_after_mailchimp');
        $this->widget_end($args);
        echo ob_get_clean();
    }
}