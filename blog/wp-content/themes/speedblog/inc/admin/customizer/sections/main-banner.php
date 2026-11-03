<?php
/**
 * All settings related to main banner post.
 *
 * @package SpeedBlog
 */
$wp_customize->add_section(
	'main_banner_post',
	array(
		'title' => esc_html__( 'Main Banner Section', 'speedblog' ),
		'panel' => 'front_page_theme_options_panel',
	)
);

$wp_customize->add_setting(
    'speedblog_options[enable_main_banner_section]',
    array(
        'default'           => $speedblog_default['enable_main_banner_section'],
        'sanitize_callback' => 'speedblog_sanitize_checkbox',
    )
);
$wp_customize->add_control(
    'speedblog_options[enable_main_banner_section]',
    array(
        'label'       => esc_html__( 'Enable Main Banner', 'speedblog' ),
        'section'     => 'main_banner_post',
        'type'        => 'checkbox',
    )
);



$wp_customize->add_setting(
    'speedblog_section_seperator_main_banner_column_1',
    array(
        'default'           => '',
        'capability'        => 'edit_theme_options',
        'sanitize_callback' => 'sanitize_text_field'
    )
);

$wp_customize->add_control(
    new SpeedBlog_Seperator_Control(
        $wp_customize,
        'speedblog_section_seperator_main_banner_column_1',
        array(
            'label'         => esc_html__( 'Main Banner Slider', 'speedblog' ),
            'settings' => 'speedblog_section_seperator_main_banner_column_1',
            'section' => 'main_banner_post',
        )
    )
);


$wp_customize->add_setting(
    'speedblog_options[banner_slider_post_category]',
    array(
        'default'           => $speedblog_default['banner_slider_post_category'],
        'sanitize_callback' => 'absint',
    )
);
$wp_customize->add_control(
    new SpeedBlog_Dropdown_Taxonomies_Control(
        $wp_customize,
        'speedblog_options[banner_slider_post_category]',
        array(
            'label'           => __( 'Choose Slider Post Category', 'speedblog' ),
            'description'     => __( 'Leave Empty if you don\'t want the posts to be category specific', 'speedblog' ),
            'section'         => 'main_banner_post',
        )
    )
);







$wp_customize->add_setting(
    'speedblog_section_seperator_main_banner_column_2',
    array(
        'default'           => '',
        'capability'        => 'edit_theme_options',
        'sanitize_callback' => 'sanitize_text_field'
    )
);

$wp_customize->add_control(
    new SpeedBlog_Seperator_Control(
        $wp_customize,
        'speedblog_section_seperator_main_banner_column_2',
        array(
            'label'         => esc_html__( 'List Below Slider', 'speedblog' ),
            'settings' => 'speedblog_section_seperator_main_banner_column_2',
            'section' => 'main_banner_post',
        )
    )
);

$wp_customize->add_setting(
    'speedblog_options[banner_lists_post_category]',
    array(
        'default'           => $speedblog_default['banner_lists_post_category'],
        'sanitize_callback' => 'absint',
    )
);
$wp_customize->add_control(
    new SpeedBlog_Dropdown_Taxonomies_Control(
        $wp_customize,
        'speedblog_options[banner_lists_post_category]',
        array(
            'label'           => __( 'Choose List Category', 'speedblog' ),
            'description'     => __( 'Leave Empty if you don\'t want the posts to be category specific', 'speedblog' ),
            'section'         => 'main_banner_post',
        )
    )
);

$wp_customize->add_setting(
    'speedblog_section_seperator_slider_banner',
    array(
        'default'           => '',
        'capability'        => 'edit_theme_options',
        'sanitize_callback' => 'sanitize_text_field'
    )
);

$wp_customize->add_control(
    new SpeedBlog_Seperator_Control(
        $wp_customize,
        'speedblog_section_seperator_slider_banner',
        array(
            'label'         => esc_html__( 'Main Banner Section Meta', 'speedblog' ),
            'settings' => 'speedblog_section_seperator_slider_banner',
            'section' => 'main_banner_post',
        )
    )
);


$wp_customize->add_setting(
    'speedblog_options[enable_main_banner_author_meta]',
    array(
        'default' => $speedblog_default['enable_main_banner_author_meta'],
        'sanitize_callback' => 'speedblog_sanitize_checkbox',
    )
);
$wp_customize->add_control(
    'speedblog_options[enable_main_banner_author_meta]',
    array(
        'label' => esc_html__('Display Author Meta', 'speedblog'),
        'section' => 'main_banner_post',
        'type' => 'checkbox',
    )
);
$wp_customize->add_setting(
    'speedblog_options[select_main_banner_author_meta]',
    array(
        'default' => $speedblog_default['select_main_banner_author_meta'],
        'sanitize_callback' => 'speedblog_sanitize_select',
    )
);
$wp_customize->add_control(
    'speedblog_options[select_main_banner_author_meta]',
    array(
        'label' => esc_html__('Select Author Meta', 'speedblog'),
        'section' => 'main_banner_post',
        'type' => 'select',
        'choices' => speedblog_author_meta(),
    )
);
$wp_customize->add_setting(
    'speedblog_options[main_banner_author_meta_title]',
    array(
        'default' => $speedblog_default['main_banner_author_meta_title'],
        'sanitize_callback' => 'sanitize_text_field',
    )
);
$wp_customize->add_control(
    'speedblog_options[main_banner_author_meta_title]',
    array(
        'label' => __('Author Meta Text', 'speedblog'),
        'section' => 'main_banner_post',
        'type' => 'text',
    )
);
$wp_customize->add_setting(
    'speedblog_options[enable_main_banner_date_meta]',
    array(
        'default' => $speedblog_default['enable_main_banner_date_meta'],
        'sanitize_callback' => 'speedblog_sanitize_checkbox',
    )
);
$wp_customize->add_control(
    'speedblog_options[enable_main_banner_date_meta]',
    array(
        'label' => esc_html__('Display Published Date', 'speedblog'),
        'section' => 'main_banner_post',
        'type' => 'checkbox',
    )
);
$wp_customize->add_setting(
    'speedblog_options[select_main_banner_date]',
    array(
        'default' => $speedblog_default['select_main_banner_date'],
        'sanitize_callback' => 'speedblog_sanitize_select',
    )
);
$wp_customize->add_control(
    'speedblog_options[select_main_banner_date]',
    array(
        'label' => esc_html__('Select Single Date Meta', 'speedblog'),
        'section' => 'main_banner_post',
        'type' => 'select',
        'choices' => speedblog_date_meta(),
    )
);
$wp_customize->add_setting(
    'speedblog_options[select_main_banner_date_meta_title]',
    array(
        'default' => $speedblog_default['select_main_banner_date_meta_title'],
        'sanitize_callback' => 'sanitize_text_field',
    )
);
$wp_customize->add_control(
    'speedblog_options[select_main_banner_date_meta_title]',
    array(
        'label' => __('Date Text', 'speedblog'),
        'section' => 'main_banner_post',
        'type' => 'text',
    )
);
$wp_customize->add_setting(
    'speedblog_options[select_main_banner_date_format]',
    array(
        'default' => $speedblog_default['select_main_banner_date_format'],
        'sanitize_callback' => 'speedblog_sanitize_select',
    )
);
$wp_customize->add_control(
    'speedblog_options[select_main_banner_date_format]',
    array(
        'label' => esc_html__('Select Date Format', 'speedblog'),
        'section' => 'main_banner_post',
        'type' => 'select',
        'choices' => speedblog_get_date_formats(),
    )
);
$wp_customize->add_setting(
    'speedblog_options[enable_main_banner_category_meta]',
    array(
        'default' => $speedblog_default['enable_main_banner_category_meta'],
        'sanitize_callback' => 'speedblog_sanitize_checkbox',
    )
);
$wp_customize->add_control(
    'speedblog_options[enable_main_banner_category_meta]',
    array(
        'label' => esc_html__('Enable Category Meta', 'speedblog'),
        'section' => 'main_banner_post',
        'type' => 'checkbox',
    )
);
$wp_customize->add_setting(
    'speedblog_options[select_main_banner_number_of_category]',
    array(
        'default' => $speedblog_default['select_main_banner_number_of_category'],
        'sanitize_callback' => 'absint',
    )
);
$wp_customize->add_control(
    'speedblog_options[select_main_banner_number_of_category]',
    array(
        'label' => __('Number of Category', 'speedblog'),
        'section' => 'main_banner_post',
        'type' => 'number',
    )
);
$wp_customize->add_setting(
    'speedblog_options[main_banner_category_label]',
    array(
        'default' => $speedblog_default['main_banner_category_label'],
        'sanitize_callback' => 'sanitize_text_field',
    )
);
$wp_customize->add_control(
    'speedblog_options[main_banner_category_label]',
    array(
        'label' => __('Category Label', 'speedblog'),
        'section' => 'main_banner_post',
        'type' => 'text',
    )
);

$wp_customize->add_setting(
    'speedblog_options[select_main_banner_category_color]',
    array(
        'default' => $speedblog_default['select_main_banner_category_color'],
        'sanitize_callback' => 'speedblog_sanitize_select',
    )
);
$wp_customize->add_control(
    'speedblog_options[select_main_banner_category_color]',
    array(
        'label' => esc_html__('Select Category Color', 'speedblog'),
        'section' => 'main_banner_post',
        'type' => 'select',
        'choices' => speedblog_category_color(),
    )
);