<?php
/**
 * Customizer Custom Classes.
 *
 * @package SpeedBlog
 */

// Separator Control with Label and Description
class SpeedBlog_Seperator_Control extends WP_Customize_Control {

    public $type = 'sectionseperator';

    public function render_content() {
        // Set the name for the notice (not used here but kept for consistency).
        $name = '_customize-notice-' . $this->id; ?>

        <span class="customize-control-separator">
            <?php if ( ! empty( $this->label ) ) : ?>
                <span class="customize-control-title in-section-seperator"><?php echo esc_html( $this->label ); ?></span>
            <?php endif; ?>
            <?php if ( ! empty( $this->description ) ) : ?>
                <span class="description customize-control-description"><?php echo esc_html( $this->description ); ?></span>
            <?php endif; ?>
            <hr>
        </span>

    <?php }
}

/**
 * Customize Control for Radio Image.
 *
 * @since 1.0.0
 *
 * @see WP_Customize_Control
 */
class SpeedBlog_Custom_Radio_Image_Control extends WP_Customize_Control {

    /**
     * Control type.
     *
     * @access public
     * @var string
     */
    public $type = 'radio-image';

    /**
     * Render content.
     *
     * @since 1.0.0
     */
    public function render_content() {
        if ( empty( $this->choices ) ) {
            return;
        }

        $name = '_customize-radio-' . $this->id;
        ?>

        <span class="customize-control-title">
            <?php echo esc_attr( $this->label ); ?>
        </span>

        <?php if ( ! empty( $this->description ) ) : ?>
            <span class="description customize-control-description"><?php echo wp_kses_post( $this->description ); ?></span>
        <?php endif; ?>

        <div id="input_<?php echo esc_attr( $this->id ); ?>" class="radio-image-wrapper">
            <?php foreach ( $this->choices as $value => $option ) : ?>
                <input class="image-select" type="radio" value="<?php echo esc_attr( $value ); ?>" id="<?php echo esc_attr( $this->id . $value ); ?>" name="<?php echo esc_attr( $name ); ?>" <?php $this->link(); checked( $this->value(), $value );?>>
                <label for="<?php echo esc_attr( $this->id ) . esc_attr( $value ); ?>">
                    <img src="<?php echo esc_html( $option['url'] ); ?>" alt="<?php echo esc_attr( $option['label'] ); ?>" title="<?php echo esc_attr( $option['label'] ); ?>">
                </label>
            <?php endforeach; ?>
        </div>
        <?php
    }
}



/**
 * Customize Control for Taxonomy Select.
 *
 * @since 1.0.0
 *
 * @see WP_Customize_Control
 */
class SpeedBlog_Dropdown_Taxonomies_Control extends WP_Customize_Control {

    /**
     * Control type.
     *
     * @access public
     * @var string
     */
    public $type = 'dropdown-taxonomies';

    /**
     * Dropdown Arguments.
     *
     * @access protected
     * @var array
     */
    protected $dropdown_args = array();

    /**
     * Taxonomy.
     *
     * @access public
     * @var string
     */
    public $taxonomy = '';

    /**
     * Constructor.
     *
     * @since 1.0.0
     *
     * @param WP_Customize_Manager $manager Customizer bootstrap instance.
     * @param string               $id      Control ID.
     * @param array                $args    Optional. Arguments to override class property defaults.
     */
    public function __construct( $manager, $id, $args = array() ) {

        $our_taxonomy = 'category';
        if ( isset( $args['taxonomy'] ) ) {
            $taxonomy_exist = taxonomy_exists( esc_attr( $args['taxonomy'] ) );
            if ( true === $taxonomy_exist ) {
                $our_taxonomy = esc_attr( $args['taxonomy'] );
            }
        }
        $args['taxonomy'] = $our_taxonomy;
        $this->taxonomy   = esc_attr( $our_taxonomy );

        parent::__construct( $manager, $id, $args );
    }

    /**
     * Render content.
     *
     * @since 1.0.0
     */
    public function render_content() {

        $tax_args = array(
            'hierarchical' => 0,
            'taxonomy'     => $this->taxonomy,
        );
        ?>
        <label>
            <?php
            if ( ! empty( $this->label ) ) :
                ?>
                <span class="customize-control-title"><?php echo esc_html( $this->label ); ?></span>
            <?php
            endif;

            if ( ! empty( $this->description ) ) :
                ?>
                <span class="description customize-control-description"><?php echo $this->description; ?></span>
            <?php
            endif;

            $dropdown_args = wp_parse_args(
                $this->dropdown_args,
                array(
                    'taxonomy'          => $tax_args['taxonomy'],
                    'show_option_none'  => __( '&mdash; Select &mdash;', 'speedblog' ),
                    'selected'          => $this->value(),
                    'show_option_all'   => '',
                    'orderby'           => 'id',
                    'order'             => 'ASC',
                    'show_count'        => 1,
                    'hide_empty'        => 1,
                    'child_of'          => 0,
                    'exclude'           => '',
                    'hierarchical'      => 1,
                    'depth'             => 0,
                    'tab_index'         => 0,
                    'hide_if_empty'     => false,
                    'option_none_value' => '',
                    'value_field'       => 'term_id',
                )
            );

            $dropdown_args['echo'] = false;

            $dropdown = wp_dropdown_categories( $dropdown_args );
            $dropdown = str_replace( '<select', '<select ' . $this->get_link(), $dropdown );
            echo $dropdown;
            ?>
        </label>
        <?php
    }
}


/**
 * Customize Control for upsell.
 *
 * @since 1.0.0
 *
 * @see WP_Customize_Control
 */
class SpeedBlog_Upsell extends WP_Customize_Control {

    /**
     * Control type.
     *
     * @access public
     * @var string
     */
    public $type = 'upsell';

    /**
     * Displays the control content.
     *
     * @since  1.0.0
     * @access public
     * @return void
     */
    public function render_content() {
        ?>
        <div>
            <div class="customize-control">
                <h3><?php esc_html_e( 'Explore Our Premium Features', 'speedblog' ); ?></h3>
                <ul class="theme-features">
                    <li><span class="dashicons dashicons-yes"></span><?php esc_html_e( 'Dedicated Premium Support', 'speedblog' ); ?></li>
                    <li><span class="dashicons dashicons-yes"></span><?php esc_html_e( 'More Color Options', 'speedblog' ); ?></li>
                    <li><span class="dashicons dashicons-yes"></span><?php esc_html_e( 'Font Options', 'speedblog' ); ?></li>
                    <li><span class="dashicons dashicons-yes"></span><?php esc_html_e( 'Dark Mode Feature', 'speedblog' ); ?></li>
                    <li><span class="dashicons dashicons-yes"></span><?php esc_html_e( 'Additional Widget Areas', 'speedblog' ); ?></li>
                    <li><span class="dashicons dashicons-yes"></span><?php esc_html_e( 'Additional Widgets', 'speedblog' ); ?></li>
                    <li><span class="dashicons dashicons-yes"></span><?php esc_html_e( 'Extended Widget Options', 'speedblog' ); ?></li>
                    <li><span class="dashicons dashicons-yes"></span><?php esc_html_e( 'Additional Customizer Sections', 'speedblog' ); ?></li>
                    <li><span class="dashicons dashicons-yes"></span><?php esc_html_e( 'Webmaster Tools', 'speedblog' ); ?></li>
                    <li><span class="dashicons dashicons-yes"></span><?php esc_html_e( 'Mailchimp Topbar', 'speedblog' ); ?></li>
                    <li><span class="dashicons dashicons-yes"></span><?php esc_html_e( 'Post Format Support', 'speedblog' ); ?></li>
                    <li><span class="dashicons dashicons-yes"></span><?php esc_html_e( 'Remove Footer Credit', 'speedblog' ); ?></li>
                    <li><span class="dashicons dashicons-plus"></span><?php esc_html_e( 'Many More ..', 'speedblog' ); ?></li>
                </ul>
                <a href="<?php echo esc_url( 'https://wpinterface.com/themes/speedblog/#choose-pricing-plan' ); ?>" target="_blank" class="button upgrade-now"><?php esc_html_e( 'Upgrade Now', 'speedblog' ); ?></a>
            </div>
            <div class="customize-control">
                <h3><?php esc_html_e( 'Need Support?', 'speedblog' ); ?></h3>
                <p><?php esc_html_e( 'If you have any questions about the theme, please don\'t hesitate to reach out to us.', 'speedblog' ); ?></p>

                <a href="<?php echo esc_url( 'https://wpinterface.com/support/' ); ?>" target="_blank" class="button button-primary"><?php esc_html_e( 'Contact Us', 'speedblog' ); ?></a>
            </div>
        </div>
        <?php
    }
}



class SpeedBlog_Section_Features_List extends WP_Customize_Section {

    /**
     * Control Type.
     */
    public $type              = 'section-features-list';
    public $features_list     = array();
    public $is_upsell_feature = true;
    public $upsell_link       = 'https://wpinterface.com/themes/speedblog/#choose-pricing-plan';
    public $upsell_text       = '';
    public $button_link       = '';
    public $button_text       = '';
    public $class             = '';

    /**
     * Add custom parameters to pass to the JS via JSON.
     *
     * @since  1.0.0
     * @access public
     * @return void
     */
    public function json() {
        $json = parent::json();

        $json['title']             = $this->title;
        $json['description']       = $this->description;
        $json['features_list']     = $this->features_list;
        $json['is_upsell_feature'] = $this->is_upsell_feature;
        $json['upsell_link']       = $this->upsell_link;
        $json['upsell_text']       = __( 'Upgrade Now', 'speedblog' );
        $json['button_link']       = $this->button_link;
        $json['button_text']       = $this->button_text;
        $json['class']             = $this->class;

        return $json;
    }

    /**
     * Outputs the Underscore.js template.
     *
     * @since  1.0.0
     * @access public
     * @return void
     */
    protected function render_template() {
        ?>


        <li id="accordion-section-{{ data.id }}" class="accordion-section control-section customize-control-upsell control-section-{{ data.type }} {{data.class}}">

            <# if ( data.title ) { #>
                <h3>{{ data.title }}</h3>
            <# } #>

            <# if ( data.description ) { #>
                <span class="feature-desc">{{{ data.description }}}</span>
            <# } #>

            <# if ( !_.isEmpty(data.features_list) ) { #>
                <ul class="speedblog-bullet-point">
                    <# _.each( data.features_list, function(key, value) { #>
                        <li><span class="dashicons dashicons-arrow-right-alt2"></span>{{{ key }}}</li>
                    <# }) #>
                </ul>
            <# } #>

            <# if ( data.is_upsell_feature ) { #>
                <a href="{{ data.upsell_link }}" role="button" class="button upgrade-now" target="_blank">{{ data.upsell_text }}</a>
            <# } else { #>
                <# if ( data.button_text && data.button_link ) { #>
                    <a href="{{ data.button_link }}" role="button" class="button upgrade-now" target="_blank">{{ data.button_text }}</a>
                <# } #>
            <# } #>

        </li>
        <?php
    }
}
