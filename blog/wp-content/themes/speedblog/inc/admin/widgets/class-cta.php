<?php
if (!defined('ABSPATH')) {
    exit;
}

class SpeedBlog_CTA extends SpeedBlog_Widget_Base
{
    public function __construct()
    {
        $this->widget_cssclass = 'widget_speedblog_cat';
        $this->widget_description = __("Displays call to action button and text with background", 'speedblog');
        $this->widget_id = 'speedblog_cat';
        $this->widget_name = __('SpeedBlog: CTA', 'speedblog');
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
                'label' => __('CTA Title', 'speedblog'),
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
                'label' => __('CTA Description', 'speedblog'),
                'rows' => 10,
            ),
            'button_text_1' => array(
                'type' => 'text',
                'label' => __('Button Text - 1', 'speedblog'),
            ),
            'button_link_1' => array(
                'type' => 'url',
                'label' => __('Link to url - 1', 'speedblog'),
                'desc' => __('Enter a proper url with http: OR https:', 'speedblog'),
            ),
            'link_target_1' => array(
                'type' => 'checkbox',
                'label' => __('Open Link in new Tab - 1', 'speedblog'),
                'std' => true,
            ),
            'button_text_2' => array(
                'type' => 'text',
                'label' => __('Button Text - 2', 'speedblog'),
            ),
            'button_link_2' => array(
                'type' => 'url',
                'label' => __('Link to url - 2', 'speedblog'),
                'desc' => __('Enter a proper url with http: OR https:', 'speedblog'),
            ),
            'link_target_2' => array(
                'type' => 'checkbox',
                'label' => __('Open Link in new Tab - 2', 'speedblog'),
                'std' => true,
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
                'std' => false,
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
                'std' => 560,
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
        $style .= '--cta-text-color:' . esc_attr($text_color) . ';';
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
        do_action('speedblog_before_cta');
        ?>
        <div class="wpi-cta-widget wpi-special-widget <?php echo esc_attr($class); ?>" style="<?php echo esc_attr($style); ?>">
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
                    <?php echo wpautop(wp_kses_post($instance['description'])); ?>
                <?php endif; ?>
                <?php
                if ((isset($instance['button_text_1']) && $instance['button_text_1']) || (isset($instance['button_text_2']) && $instance['button_text_2'])):
                    ?>
                    <div class="wpi-button-group">
                        <?php if (isset($instance['button_text_1']) && $instance['button_text_1']): ?>
                            <a href="<?php echo esc_url($instance['button_link_1'] ?? ''); ?>" target="<?php echo isset($instance['link_target_1']) && $instance['link_target_1'] ? '_blank' : '_self'; ?>" class="wpi-button wpi-button-small wpi-button-primary">
                                <?php echo esc_html($instance['button_text_1']); ?>
                            </a>
                        <?php endif; ?>
                        <?php if (isset($instance['button_text_2']) && $instance['button_text_2']): ?>
                            <a href="<?php echo esc_url($instance['button_link_2'] ?? ''); ?>" target="<?php echo isset($instance['link_target_2']) && $instance['link_target_2'] ? '_blank' : '_self'; ?>" class="wpi-button wpi-button-small wpi-button-outline">
                                <?php echo esc_html($instance['button_text_2']); ?>
                            </a>
                        <?php endif; ?>
                    </div>
                <?php endif; ?>
            </div>
        </div>
        <?php
        do_action('speedblog_after_cta');
        $this->widget_end($args);
        echo ob_get_clean();
    }
}