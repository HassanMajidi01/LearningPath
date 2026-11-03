<?php
if (!defined('ABSPATH')) {
    exit;
}

class SpeedBlog_Grid_Post extends SpeedBlog_Widget_Base
{
    public function __construct()
    {
        $this->widget_cssclass = 'widget_speedblog_grid_posts';
        $this->widget_description = __("Displays grid posts with an image", 'speedblog');
        $this->widget_id = 'speedblog_grid_posts';
        $this->widget_name = __('SpeedBlog: Grid Posts', 'speedblog');
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
                'std' => __('Grid Posts', 'speedblog'),
            ),
            'style' => array(
                'type' => 'select',
                'label' => __('Style', 'speedblog'),
                'options' => array(
                    'wpi-post-regular' => __('Regular View', 'speedblog'),
                    'wpi-post-list' => __('List View', 'speedblog'),
                    'wpi-post-card' => __('Card View', 'speedblog'),
                ),
                'std' => 'wpi-post-list',
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
            'offset'                  => array(
                'type'  => 'number',
                'step'  => 1,
                'min'   => 0,
                'max'   => '',
                'std'   => '',
                'label' => __( 'Offset', 'speedblog' ),
                'desc'  => __( 'Offsets are used to skip a certain number of WordPress posts before starting output. Set it to 0 if you do not wish to use this feature.', 'speedblog' ),
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
            'show_image' => array(
                'type' => 'checkbox',
                'label' => __('Show Image', 'speedblog'),
                'std' => true,
            ),
            'image_size' => array(
                'type' => 'select',
                'label' => __('Image Size', 'speedblog'),
                'options' => array(
                    'thumbnail' => __('Thumbnail', 'speedblog'),
                    'medium' => __('Medium', 'speedblog'),
                    'medium_large' => __('Medium Large', 'speedblog'),
                    'large' => __('Large', 'speedblog'),
                    'full' => __('Full', 'speedblog'),
                ),
                'std' => 'medium',

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

        if ( isset($instance['offset']) && absint($instance['offset']) != 0 ) {
            $query_args['offset'] = absint($instance['offset']);
        }

        if (!empty($instance['category']) && -1 != $instance['category'] && 0 != $instance['category']) {
            $query_args['tax_query'][] = array(
                'taxonomy' => 'category',
                'field' => 'term_id',
                'terms' => $instance['category'],
            );
        }

        return new WP_Query(apply_filters('speedblog_grid_posts_query_args', $query_args));
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
        do_action('speedblog_before_grid_posts_with_image');
        if (!empty($instance['title'])) {
            echo $args['before_title'] . esc_html($instance['title']) . $args['after_title'];
        }

        echo '<div class="wpi-grid-widget wpi-widget-list">';
        while ($posts->have_posts()) {
            $posts->the_post();
            $this->render_post($instance);
        }

        wp_reset_postdata();

        echo '</div>';

        do_action('speedblog_after_grid_posts_with_image');
        echo $args['after_widget'];
    }

    /**
     * Render a single post item.
     */
    protected function render_post($instance)
    {
        $style = !empty($instance['style']) ? $instance['style'] : $this->settings['style']['std'];
        $image_size = !empty($instance['image_size']) ? $instance['image_size'] : $this->settings['image_size']['std'];
        ?>
        <article id="grid-post-<?php echo the_ID(); ?>" <?php post_class('wpi-post ' . esc_attr($style) . ' '); ?>>
            <?php if (has_post_thumbnail() && !empty($instance['show_image'])) : ?>
                <div class="entry-image entry-image-small image-hover-effect hover-effect-shine">
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
                <header class="entry-header">
                    <?php the_title('<h3 class="entry-title entry-title-small"><a href="' . esc_url(get_permalink()) . '" rel="bookmark">', '</a></h3>'); ?>
                </header>
                <?php if (!empty($instance['show_date'])): ?>
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
            </div>
        </article>
        <?php
    }
}