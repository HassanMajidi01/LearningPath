<?php
if (!defined('ABSPATH')) {
    exit;
}
class SpeedBlog_Slider_Posts extends SpeedBlog_Widget_Base
{
    public function __construct()
    {
        $this->widget_cssclass = 'speedblog-slider-widget';
        $this->widget_description = __("Displays recent posts in a slider with an image", 'speedblog');
        $this->widget_id = 'speedblog_slider_posts';
        $this->widget_name = __('SpeedBlog: Slider Posts', 'speedblog');
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
                'label' => __('Title', 'speedblog'),
                'std' => __('Slider Posts', 'speedblog'),
            ),
            'display_layout' => array(
                'type' => 'select',
                'label' => __('Display Layout', 'speedblog'),
                'options' => array(
                    'display-regular-layout' => __('Wrapper Layout', 'speedblog'),
                    'display-fullwidth-layout' => __('Full Width Layout', 'speedblog'),
                ),
                'std' => 'display-regular-layout',
                'desc' => __('Works exclusively in the fullwidth widget area', 'speedblog'),
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
            'display_style' => array(
                'type' => 'select',
                'label' => __('Display Style', 'speedblog'),
                'options' => array(
                    'wpi-post-regular' => __('Regular View', 'speedblog'),
                    'wpi-slides-card' => __('Card View', 'speedblog'),
                ),
                'std' => 'wpi-post-regular',
            ),
            'category' => array(
                'type' => 'dropdown-taxonomies',
                'label' => __('Select Category', 'speedblog'),
                'args' => array(
                    'taxonomy' => 'category',
                    'class' => 'widefat',
                    'hierarchical' => true,
                    'show_count' => 1,
                    'show_option_all' => __('&mdash; Select &mdash;', 'speedblog'),
                ),
            ),

            'number' => array(
                'type' => 'number',
                'step' => 1,
                'min' => 1,
                'std' => 5,
                'label' => __('Number of posts to show', 'speedblog'),
            ),
            'offset' => array(
                'type' => 'number',
                'step' => 1,
                'min' => 0,
                'max' => '',
                'std' => '',
                'label' => __('Offset', 'speedblog'),
                'desc' => __('Offsets are used to skip a certain number of WordPress posts before starting output. Set it to 0 if you do not wish to use this feature.', 'speedblog'),
            ),
            'show_excerpt' => array(
                'type' => 'checkbox',
                'label' => __('Enable Excerpt', 'speedblog'),
                'std' => false,
            ),
            'font_size' => array(
                'type' => 'select',
                'label' => __('Entry title font size', 'speedblog'),
                'options' => array(
                    'entry-title-small' => __('Small', 'speedblog'),
                    'entry-title-medium' => __('Medium', 'speedblog'),
                    'entry-title-big' => __('Big', 'speedblog'),
                    'entry-title-large' => __('Large', 'speedblog'),
                ),
                'std' => 'entry-title-big',
            ),
            'font_style' => array(
                'type' => 'select',
                'label' => __('Entry title font style', 'speedblog'),
                'options' => array(
                    'entry-title-normal' => __('Normal', 'speedblog'),
                    'entry-title-italic' => __('Italic', 'speedblog'),
                ),
                'std' => 'entry-title-normal',
            ),
            'image_size' => array(
                'type' => 'select',
                'label' => __('Image size', 'speedblog'),
                'options' => array(
                    'medium' => __('Medium', 'speedblog'),
                    'medium_large' => __('Medium Large', 'speedblog'),
                    'large' => __('Large', 'speedblog'),
                    'full' => __('Full', 'speedblog'),
                ),
                'std' => 'large',
            ),
            'image_hover_effects' => array(
                'type' => 'select',
                'label' => __('Image hover effects', 'speedblog'),
                'options' => array(
                    'hover-effect-shine' => __('Shine', 'speedblog'),
                    'hover-effect-slide' => __('Slide', 'speedblog'),
                    'hover-effect-zoom' => __('Zoom', 'speedblog'),
                ),
                'std' => 'hover-effect-shine',
            ),
            'show_overlay' => array(
                'type' => 'checkbox',
                'label' => __('Enable background overlay', 'speedblog'),
                'std' => true,
            ),
            'image_overlay_style' => array(
                'type' => 'select',
                'label' => __('Background overlay style', 'speedblog'),
                'options' => array(
                    'regular' => __('Regular', 'speedblog'),
                    'gradient' => __('Gradient', 'speedblog'),
                ),
                'std' => 'gradient',
            ),
            'height' => array(
                'type' => 'number',
                'step' => 1,
                'min' => 150,
                'max' => '',
                'std' => 640,
                'label' => __('Height (px)', 'speedblog'),
                'desc' => __('Change Height of Slides.', 'speedblog'),
            ),
            'arrows' => array(
                'type' => 'checkbox',
                'label' => __('Enable Arrows', 'speedblog'),
                'std' => true,
            ),
            'dots' => array(
                'type' => 'checkbox',
                'label' => __('Enable Dots', 'speedblog'),
                'std' => false,
            ),
            'autoplay' => array(
                'type' => 'checkbox',
                'label' => __('Autoplay', 'speedblog'),
                'std' => true,
            ),
            'orderby' => array(
                'type' => 'select',
                'std' => 'date',
                'label' => __('Order by', 'speedblog'),
                'options' => array(
                    'date' => __('Date', 'speedblog'),
                    'ID' => __('ID', 'speedblog'),
                    'title' => __('Title', 'speedblog'),
                    'rand' => __('Random', 'speedblog'),
                ),
            ),
            'order' => array(
                'type' => 'select',
                'std' => 'desc',
                'label' => __('Order', 'speedblog'),
                'options' => array(
                    'asc' => __('ASC', 'speedblog'),
                    'desc' => __('DESC', 'speedblog'),
                ),
            ),
            'show_date' => array(
                'type' => 'checkbox',
                'label' => __('Show Date', 'speedblog'),
                'std' => true,
            ),
            'date_format' => array(
                'type' => 'select',
                'label' => __('Date Format', 'speedblog'),
                'options' => array(
                    'format_1' => __('Format 1', 'speedblog'),
                    'format_2' => __('Format 2', 'speedblog'),
                ),
                'std' => 'format_2',
            ),
            'show_author' => array(
                'type' => 'checkbox',
                'label' => __('Show Author', 'speedblog'),
                'std' => true,
            ),
            'display_author_option' => array(
                'type' => 'select',
                'label' => __('Author Option', 'speedblog'),
                'options' => array(
                    'with_label' => __('With Label', 'speedblog'),
                    'with_icon' => __('With Icon', 'speedblog'),
                    'with_avatar_image' => __('With Avatar Image', 'speedblog'),
                ),
                'std' => 'with_icon',
            ),
            'author_text' => array(
                'type' => 'text',
                'label' => __('Author Text', 'speedblog'),
                'std' => __('By:', 'speedblog'),
                'desc' => __('This only works when the "With Label" option is selected under "Author Option"', 'speedblog'),
            ),
            'show_category' => array(
                'type' => 'checkbox',
                'label' => __('Show Category', 'speedblog'),
                'std' => true,
            ),
            'category_text' => array(
                'type' => 'text',
                'label' => __('Category Text', 'speedblog'),
            ),
            'display_category_option' => array(
                'type' => 'select',
                'label' => __('Category Option', 'speedblog'),
                'options' => array(
                    'none' => __('None', 'speedblog'),
                    'has-background' => __('Has dot', 'speedblog'),
                    'has-text-color' => __('Has text color', 'speedblog'),
                ),
                'std' => 'has-text-color',
            ),
            'number_of_cat' => array(
                'type' => 'number',
                'step' => 1,
                'min' => 1,
                'std' => 1,
                'label' => __('Number of Category to show', 'speedblog'),
            ),
        );
    }
    /**
     * Query the posts and return them.
     */
    protected function get_posts($args, $instance)
    {
        $query_args = array(
            'posts_per_page' => !empty($instance['number']) ? absint($instance['number']) : $this->settings['number']['std'],
            'post_status' => 'publish',
            'no_found_rows' => 1,
            'orderby' => !empty($instance['orderby']) ? sanitize_text_field($instance['orderby']) : $this->settings['orderby']['std'],
            'order' => !empty($instance['order']) ? sanitize_text_field($instance['order']) : $this->settings['order']['std'],
            'offset' => !empty($instance['offset']) ? sanitize_text_field($instance['offset']) : $this->settings['offset']['std'],
            'ignore_sticky_posts' => 1
        );
        if (isset($instance['offset']) && absint($instance['offset']) != 0) {
            $query_args['offset'] = absint($instance['offset']);
        }
        if (!empty($instance['category']) && -1 != $instance['category'] && 0 != $instance['category']) {
            $query_args['tax_query'][] = array(
                'taxonomy' => 'category',
                'field' => 'term_id',
                'terms' => $instance['category'],
            );
        }
        return new WP_Query(apply_filters('speedblog_slider_posts_query_args', $query_args));
    }
    /**
     * Output widget content.
     */
    public function widget($args, $instance)
    {
        $posts = $this->get_posts($args, $instance);
        if (!$posts->have_posts()) {
            return;
        }
        echo $args['before_widget'];
        do_action('speedblog_before_slider_posts_with_image');
        $class = isset($instance['display_layout']) ? $instance['display_layout'] : $this->settings['display_layout']['std'];
        $vertical_alignment = !empty($instance['vertical_alignment']) ? $instance['vertical_alignment'] : $this->settings['vertical_alignment']['std'];
        if ($vertical_alignment) {
            $class .= ' ' . $vertical_alignment;
        }
        $slider_nav = '';
        $data_slider = array();
        $autoplay = isset($instance['autoplay']) ? $instance['autoplay'] : $this->settings['autoplay']['std'];
        if ($autoplay) :
            $data_slider['autoplay'] = array(
                'delay' => 4000,
            );
        endif;
        $dots = isset($instance['dots']) ? $instance['dots'] : $this->settings['dots']['std'];
        if ($dots) {
            $slider_nav .= '<div class="swiper-pagination wpi-swiper-pagination wpi-widget-pagination"></div>';
        }
        $arrows = isset($instance['arrows']) ? $instance['arrows'] : $this->settings['arrows']['std'];
        if ($arrows) {
            $slider_nav .= '<div class="widget-slider-next swiper-button-next"></div><div class="widget-slider-prev swiper-button-prev"></div>';
        }
        if (!empty($instance['title'])) {
            echo $args['before_title'] . esc_html($instance['title']) . $args['after_title'];
        }
        ?>
        <div class="wpi-slider-widget <?php echo esc_attr($class); ?>">
            <div class="swiper wpi-swiper-init" data-slider='<?php echo esc_attr(json_encode($data_slider)); ?>'>
                <div class="swiper-wrapper">
                    <?php
                    while ($posts->have_posts()) : $posts->the_post();
                        $this->render_post($instance);
                    endwhile;
                    wp_reset_postdata();
                    ?>
                </div>
                <?php
                if ($slider_nav) :
                    echo $slider_nav;
                endif;
                ?>
            </div>
        </div>
        <?php
        do_action('speedblog_after_slider_posts_with_image');
        echo $args['after_widget'];
    }
    /**
     * Render a single post item.
     */
    protected function render_post($instance)
    {
        $style = '';
        $display_style = !empty($instance['display_style']) ? $instance['display_style'] : $this->settings['display_style']['std'];
        $image_size = !empty($instance['image_size']) ? $instance['image_size'] : $this->settings['image_size']['std'];
        $image_hover_effects = !empty($instance['image_hover_effects']) ? $instance['image_hover_effects'] : $this->settings['image_hover_effects']['std'];
        $show_overlay = !empty($instance['show_overlay']) ? $instance['show_overlay'] : $this->settings['show_overlay']['std'];
        $image_overlay_style = !empty($instance['image_overlay_style']) ? $instance['image_overlay_style'] : $this->settings['image_overlay_style']['std'];
        $text_alignment = !empty($instance['text_alignment']) ? $instance['text_alignment'] : $this->settings['text_alignment']['std'];
        $font_size = !empty($instance['font_size']) ? $instance['font_size'] : $this->settings['font_size']['std'];
        $font_style = !empty($instance['font_style']) ? $instance['font_style'] : $this->settings['font_style']['std'];
        $height = isset($instance['height']) ? $instance['height'] : $this->settings['height']['std'];
        $style = 'height:' . esc_attr($height) . 'px;';
        $show_author = !empty($instance['show_author']) ? $instance['show_author'] : $this->settings['show_author']['std'];
        $author_text = !empty($instance['author_text']) ? $instance['author_text'] : $this->settings['author_text']['std'];
        $display_author_option = !empty($instance['display_author_option']) ? $instance['display_author_option'] : $this->settings['display_author_option']['std'];
        $category_text = !empty($instance['category_text']) ? $instance['category_text'] : '';
        $display_category_option = !empty($instance['display_category_option']) ? $instance['display_category_option'] : $this->settings['display_category_option']['std'];
        $number_of_cat = !empty($instance['number_of_cat']) ? absint($instance['number_of_cat']) : $this->settings['number_of_cat']['std'];
        $show_excerpt = !empty($instance['show_excerpt']) ? $instance['show_excerpt'] : $this->settings['show_excerpt']['std'];

        ?>
        <div class="swiper-slide wpi-swiper-slide">
            <article id="widget-slide-<?php the_ID(); ?>" <?php post_class('wpi-post ' . esc_attr($display_style)); ?>>
                <?php if (has_post_thumbnail()) : ?>
                    <div class="entry-image image-hover-effect <?php echo $image_hover_effects; ?> <?php if ($show_overlay) {
                        echo "entry-image-overlay";
                    } ?> image-overlay-<?php echo $image_overlay_style; ?>">
                        <a class="post-thumbnail" href="<?php the_permalink(); ?>" aria-hidden="true" tabindex="-1">
                            <?php
                            the_post_thumbnail(
                                $image_size,
                                array(
                                    'alt' => the_title_attribute(
                                        array(
                                            'echo' => false,
                                        )
                                    ),
                                    'style' => esc_attr($style)
                                )
                            );
                            ?>
                        </a>
                    </div>
                <?php endif; ?>
                <div class="entry-details <?php echo $text_alignment; ?>">
                    <div class="widget-wrapper">
                        <?php
                        if (!empty($instance['show_category']) && $instance['show_category']) {
                            speedblog_post_category($display_category_option, $category_text, $number_of_cat);
                        }
                        ?>
                        <header class="entry-header">
                            <?php the_title('<h3 class="entry-title ' . $font_size . ' ' . $font_style . '"><a href="' . esc_url(get_permalink()) . '" rel="bookmark">', '</a></h3>'); ?>
                        </header>
                        <div class="entry-meta-wrapper">
                            <?php if (!empty($instance['show_date']) && $instance['show_date']) : ?>
                                <div class="entry-meta entry-date posted-on">
                                    <span class="screen-reader-text"><?php _e('Post Date', 'speedblog'); ?></span>
                                    <?php speedblog_the_theme_svg('calendar'); ?>
                                    <?php
                                    $date_format = !empty($instance['date_format']) ? $instance['date_format'] : 'format_1';
                                    if ('format_1' === $date_format) {
                                        echo esc_html(human_time_diff(get_the_time('U'), current_time('timestamp')) . ' ' . __('ago', 'speedblog'));
                                    } else {
                                        echo esc_html(get_the_date());
                                    }
                                    ?>
                                </div>
                            <?php endif; ?>
                            <?php if (!empty($instance['show_author']) && $instance['show_author']) : ?>

                                    <?php
                                    if ($show_author) {
                                        speedblog_posted_by($display_author_option, $author_text);
                                    }
                                    ?>

                            <?php endif; ?>
                        </div>
                        <?php if ($show_excerpt) { ?>
                            <div class="entry-content">
                                <?php
                                speedblog_the_archive_excerpt();
                                speedblog_the_archive_readmore();
                                ?>
                            </div><!-- .entry-content -->
                        <?php } ?>
                    </div>
                </div>
            </article>
        </div>
        <?php
    }
}