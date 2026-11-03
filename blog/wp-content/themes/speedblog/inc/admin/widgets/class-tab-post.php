<?php
if (!defined('ABSPATH')) {
    exit;
}

class SpeedBlog_Tab_Post extends SpeedBlog_Widget_Base
{
    public $display_style = '';
    private static $counter = 0;

    /**
     * Constructor.
     */
    public function __construct()
    {
        $this->widget_cssclass = 'speedblog-tabbed-widget';
        $this->widget_description = __('Displays posts in tab', 'speedblog');
        $this->widget_id = 'speedblog_tab_posts';
        $this->widget_name = __('SpeedBlog: Tab Posts', 'speedblog');
        $this->settings = $this->get_widget_settings();
        parent::__construct();
    }

    /**
     * Define widget settings.
     */
    protected function get_widget_settings()
    {
        return array(
            'popular_post_settings' => array(
                'type' => 'heading',
                'label' => __('Popular Post Settings', 'speedblog'),
            ),
            'show_popular_posts' => array(
                'type' => 'checkbox',
                'label' => __('Show Tab', 'speedblog'),
                'std' => true,
            ),
            'popular_post_desc' => array(
                'type' => 'subtitle',
                'label' => __('Will display post based on comments count', 'speedblog'),
            ),
            'popular_posts_title' => array(
                'type' => 'text',
                'label' => __('Title', 'speedblog'),
                'std' => __('Popular', 'speedblog'),
                'desc' => __('Leave as it is to show default title or leave blank to only show icon', 'speedblog'),
            ),
            'popular_post_cat' => array(
                'type' => 'dropdown-taxonomies',
                'label' => __('Select Category', 'speedblog'),
                'desc' => __('Leave empty if you don\'t want the posts to be category specific', 'speedblog'),
                'args' => array(
                    'taxonomy' => 'category',
                    'class' => 'widefat',
                    'hierarchical' => true,
                    'show_count' => 1,
                    'show_option_all' => __('&mdash; Select &mdash;', 'speedblog'),
                ),
            ),
            'popular_post_offset' => array(
                'type' => 'number',
                'step' => 1,
                'min' => 0,
                'max' => '',
                'std' => '',
                'label' => __('Offset', 'speedblog'),
                'desc' => __('Can be useful if you want to skip certain number of posts. Leave as 0 if you do not want to use it.', 'speedblog'),
            ),
            'popular_post_orderby' => array(
                'type' => 'select',
                'std' => 'date',
                'label' => __('Order By', 'speedblog'),
                'options' => array(
                    'date' => __('Date', 'speedblog'),
                    'ID' => __('ID', 'speedblog'),
                    'title' => __('Title', 'speedblog'),
                    'rand' => __('Random', 'speedblog'),
                ),
            ),
            'popular_post_order' => array(
                'type' => 'select',
                'std' => 'desc',
                'label' => __('Order', 'speedblog'),
                'options' => array(
                    'asc' => __('ASC', 'speedblog'),
                    'desc' => __('DESC', 'speedblog'),
                ),
            ),
            'hot_post_settings' => array(
                'type' => 'heading',
                'label' => __('Hot Post Settings', 'speedblog'),
            ),
            'show_hot_posts' => array(
                'type' => 'checkbox',
                'label' => __('Show Tab', 'speedblog'),
                'std' => true,
            ),
            'hot_posts_title' => array(
                'type' => 'text',
                'label' => __('Title', 'speedblog'),
                'std' => __('Hot', 'speedblog'),
                'desc' => __('Leave as it is to show default title or leave blank to only show icon', 'speedblog'),
            ),
            'hot_post_cat' => array(
                'type' => 'dropdown-taxonomies',
                'label' => __('Select Category', 'speedblog'),
                'desc' => __('Leave empty if you don\'t want the posts to be category specific', 'speedblog'),
                'args' => array(
                    'taxonomy' => 'category',
                    'class' => 'widefat',
                    'hierarchical' => true,
                    'show_count' => 1,
                    'show_option_all' => __('&mdash; Select &mdash;', 'speedblog'),
                ),
            ),
            'hot_post_offset' => array(
                'type' => 'number',
                'step' => 1,
                'min' => 0,
                'max' => '',
                'std' => '',
                'label' => __('Offset', 'speedblog'),
                'desc' => __('Can be useful if you want to skip certain number of posts. Leave as 0 if you do not want to use it.', 'speedblog'),
            ),
            'hot_post_orderby' => array(
                'type' => 'select',
                'std' => 'date',
                'label' => __('Order By', 'speedblog'),
                'options' => array(
                    'date' => __('Date', 'speedblog'),
                    'ID' => __('ID', 'speedblog'),
                    'title' => __('Title', 'speedblog'),
                    'rand' => __('Random', 'speedblog'),
                ),
            ),
            'hot_post_order' => array(
                'type' => 'select',
                'std' => 'desc',
                'label' => __('Order', 'speedblog'),
                'options' => array(
                    'asc' => __('ASC', 'speedblog'),
                    'desc' => __('DESC', 'speedblog'),
                ),
            ),
            'latest_post_settings' => array(
                'type' => 'heading',
                'label' => __('Latest Post Settings', 'speedblog'),
            ),
            'show_latest_posts' => array(
                'type' => 'checkbox',
                'label' => __('Show Tab', 'speedblog'),
                'std' => true,
            ),
            'latest_posts_title' => array(
                'type' => 'text',
                'label' => __('Title', 'speedblog'),
                'std' => __('Latest', 'speedblog'),
                'desc' => __('Leave as it is to show default title or leave blank to only show icon', 'speedblog'),
            ),
            'latest_post_cat' => array(
                'type' => 'dropdown-taxonomies',
                'label' => __('Select Category', 'speedblog'),
                'desc' => __('Leave empty if you don\'t want the posts to be category specific', 'speedblog'),
                'args' => array(
                    'taxonomy' => 'category',
                    'class' => 'widefat',
                    'hierarchical' => true,
                    'show_count' => 1,
                    'show_option_all' => __('&mdash; Select &mdash;', 'speedblog'),
                ),
            ),
            'latest_post_offset' => array(
                'type' => 'number',
                'step' => 1,
                'min' => 0,
                'max' => '',
                'std' => '',
                'label' => __('Offset', 'speedblog'),
                'desc' => __('Can be useful if you want to skip certain number of posts. Leave as 0 if you do not want to use it.', 'speedblog'),
            ),
            'latest_post_orderby' => array(
                'type' => 'select',
                'std' => 'date',
                'label' => __('Order By', 'speedblog'),
                'options' => array(
                    'date' => __('Date', 'speedblog'),
                    'ID' => __('ID', 'speedblog'),
                    'title' => __('Title', 'speedblog'),
                    'rand' => __('Random', 'speedblog'),
                ),
            ),
            'latest_post_order' => array(
                'type' => 'select',
                'std' => 'desc',
                'label' => __('Order', 'speedblog'),
                'options' => array(
                    'asc' => __('ASC', 'speedblog'),
                    'desc' => __('DESC', 'speedblog'),
                ),
            ),
            'general_settings' => array(
                'type' => 'heading',
                'label' => __('General Settings', 'speedblog'),
            ),
            'number' => array(
                'type' => 'number',
                'step' => 1,
                'min' => 1,
                'max' => '',
                'std' => 5,
                'label' => __('Number of posts to show', 'speedblog'),
            ),
            'date_format' => array(
                'type' => 'select',
                'label' => __('Date Format', 'speedblog'),
                'desc' => __('Make sure to select Date from above for this to work.', 'speedblog'),
                'options' => array(
                    'format_1' => __('Times Ago', 'speedblog'),
                    'format_2' => __('Default Format', 'speedblog'),
                ),
                'std' => 'format_2',
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
            'tab_display_style' => array(
                'type' => 'select',
                'label' => __('Display Style', 'speedblog'),
                'options' => array(
                    'wpi-post-regular' => __('Regular View', 'speedblog'),
                    'wpi-post-list' => __('List View', 'speedblog'),
                    'wpi-post-card' => __('Card View', 'speedblog'),
                ),
                'std' => 'wpi-post-list',
            ),
            'show_counter' => array(
                'type' => 'checkbox',
                'label' => __('Show Counter', 'speedblog'),
                'std' => true,
            ),
            'show_image' => array(
                'type' => 'checkbox',
                'label' => __('Show Image', 'speedblog'),
                'std' => true,
            ),
            'image_size' => array(
                'type' => 'select',
                'label' => __('Image size', 'speedblog'),
                'options' => array(
                    'thumbnail' => __('Thumbnail', 'speedblog'),
                    'medium' => __('Medium', 'speedblog'),
                    'medium_large' => __('Medium Large', 'speedblog'),
                    'large' => __('Large', 'speedblog'),
                ),
                'std' => 'thumbnail',
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
            'font_size' => array(
                'type' => 'select',
                'label' => __('Entry title font size', 'speedblog'),
                'options' => array(
                    'entry-title-xsmall' => __('Extra Small', 'speedblog'),
                    'entry-title-small' => __('Small', 'speedblog'),
                    'entry-title-medium' => __('Medium', 'speedblog'),
                    'entry-title-big' => __('Big', 'speedblog'),
                ),
                'std' => 'entry-title-small',
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
        );
    }

    /**
     * Outputs the tab Content
     *
     * @param array $instance
     * @param string $block The block to display.
     */
    public function render_tab_title($instance, $block, $is_active = false)
    {
        if (!$block) {
            return;
        }
        $enabled = isset($instance["show_{$block}_posts"]) ? $instance["show_{$block}_posts"] : $this->settings["show_{$block}_posts"]['std'];
        if ($enabled) :
            $title = isset($instance["{$block}_posts_title"]) ? $instance["{$block}_posts_title"] : $this->settings["{$block}_posts_title"]['std'];
            ?>
            <li tab-data="tab-<?php echo $block; ?>"
                class="tab-<?php echo $block; ?> tabbed-header-item<?php echo ($is_active) ? ' active' : ''; ?>">
                <a href="javascript:void(0)"
                   aria-controls="<?php echo esc_attr($block); ?>-posts-<?php echo $this->widget_id; ?>-block"
                   role="tab">
                    <?php if ($title) : ?>
                        <?php echo $title; ?>
                    <?php endif; ?>
                </a>
            </li>
        <?php
        endif;
    }

    /**
     * Outputs the tab Content
     *
     * @param array $instance
     * @param string $block The block to display.
     */
    public function render_tab_content($instance, $block, $is_active = false)
    {
        $counter_class = '';
        if (!$block) {
            return;
        }
        $enabled = isset($instance["show_{$block}_posts"]) ? $instance["show_{$block}_posts"] : $this->settings["show_{$block}_posts"]['std'];
        if ($enabled) :
            $number = !empty($instance['number']) ? absint($instance['number']) : $this->settings['number']['std'];
            if ('popular' == $block) {
                $orderby = 'comment_count';
            } else {
                $orderby = !empty($instance["{$block}_post_orderby"]) ? sanitize_text_field($instance["{$block}_post_orderby"]) : $this->settings["{$block}_post_orderby"]['std'];
            }
            $order = !empty($instance["{$block}_post_order"]) ? sanitize_text_field($instance["{$block}_post_order"]) : $this->settings["{$block}_post_order"]['std'];
            $offset = !empty($instance["{$block}_post_offset"]) ? sanitize_text_field($instance["{$block}_post_offset"]) : $this->settings["{$block}_post_offset"]['std'];
            $query_args = array(
                'post_type' => 'post',
                'posts_per_page' => $number,
                'post_status' => 'publish',
                'no_found_rows' => 1,
                'orderby' => $orderby,
                'order' => $order,
                'ignore_sticky_posts' => 1,
            );
            if ($offset && 0 != $offset) {
                $query_args['offset'] = absint($offset);
            }
            if (!empty($instance["{$block}_post_cat"]) && -1 != $instance["{$block}_post_cat"] && 0 != $instance["{$block}_post_cat"]) {
                $query_args['tax_query'][] = array(
                    'taxonomy' => 'category',
                    'field' => 'term_id',
                    'terms' => $instance["{$block}_post_cat"],
                );
            }
            $posts = new WP_Query($query_args);
            if ($posts->have_posts()) :
                $this->display_style = isset($instance['tab_display_style']) ? $instance['tab_display_style'] : $this->settings['tab_display_style']['std'];
                $widget_class = $this->display_style;
                $image_size = !empty($instance['image_size']) ? $instance['image_size'] : $this->settings['image_size']['std'];
                $image_hover_effects = !empty($instance['image_hover_effects']) ? $instance['image_hover_effects'] : $this->settings['image_hover_effects']['std'];
                $font_size = !empty($instance['font_size']) ? $instance['font_size'] : $this->settings['font_size']['std'];
                $font_style = !empty($instance['font_style']) ? $instance['font_style'] : $this->settings['font_style']['std'];
                $show_counter = !empty($instance['show_counter']) ? $instance['show_counter'] : $this->settings['show_counter']['std'];
                if ($show_counter) {
                    $counter_class = 'has-post-counter';
                }
                $category_text = !empty($instance['category_text']) ? $instance['category_text'] : '';
                $display_category_option = !empty($instance['display_category_option']) ? $instance['display_category_option'] : $this->settings['display_category_option']['std'];
                $number_of_cat = !empty($instance['number_of_cat']) ? absint($instance['number_of_cat']) : $this->settings['number_of_cat']['std'];
                $counter = 1;
                ?>
                <div id="<?php echo esc_attr($block); ?>-posts-<?php echo $this->widget_id; ?>-block" class="content-tab-<?php echo $block; ?> tabbed-content-item wpi-widget-list <?php echo ($is_active) ? ' active' : ''; ?>" role="tabpanel">
                    <?php
                    while ($posts->have_posts()) :
                        $posts->the_post();
                        ?>
                        <article id="tabs-widget-<?php the_ID(); ?>" <?php post_class('wpi-post ' . esc_attr($counter_class) . ' ' . esc_attr($widget_class)); ?>>
                            <?php if ($show_counter) { ?>
                                <div class="wpi-post-counter">
                                    <span><?php echo $counter++; ?></span>
                                </div>
                            <?php } ?>
                            <?php if (has_post_thumbnail() && !empty($instance['show_image'])) : ?>
                                <div class="entry-image entry-image-small image-hover-effect <?php echo $image_hover_effects; ?>">
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
                                            )
                                        );
                                        ?>
                                    </a>
                                </div>
                            <?php endif; ?>
                            <div class="entry-details">
                                <?php
                                if (!empty($instance['show_category']) && $instance['show_category']) {
                                    speedblog_post_category($display_category_option, $category_text, $number_of_cat);
                                }
                                ?>
                                <header class="entry-header">
                                    <?php the_title('<h3 class="entry-title ' . $font_size . ' ' . $font_style . '"><a href="' . esc_url(get_permalink()) . '" rel="bookmark">', '</a></h3>'); ?>
                                </header>
                            </div>
                        </article>
                    <?php
                    endwhile;
                    wp_reset_postdata();
                    ?>
                </div>
            <?php
            endif;
        endif;
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
        $before_widget = $args['before_widget'];
        $after_widget = $args['after_widget'];
        echo wp_kses_post($before_widget);
        do_action('speedblog_before_tab_posts');
        ++self::$counter;
        $this->unique_id = 'speedblog-tab-' . self::$counter;
        ?>
        <div class="wpi-tabbed-widget">
            <ul class="tabbed-widget-header reset-list-style" role="tablist"
                aria-label="<?php esc_attr_e('Tab Navigation', 'speedblog'); ?>">
                <?php $this->render_tab_title($instance, 'popular', true); ?>
                <?php $this->render_tab_title($instance, 'hot'); ?>
                <?php $this->render_tab_title($instance, 'latest'); ?>
            </ul>
            <div class="tabbed-widget-content">
                <?php $this->render_tab_content($instance, 'popular', true); ?>
                <?php $this->render_tab_content($instance, 'hot'); ?>
                <?php $this->render_tab_content($instance, 'latest'); ?>
            </div>
        </div>
        <?php
        do_action('speedblog_after_tab_posts');
        echo wp_kses_post($after_widget);
        echo ob_get_clean();
    }
}
