<?php
/**
 * All settings related to footer recommended post.
 *
 * @package SpeedBlog
 */
$wp_customize->add_section(
	'footer_recommended_post',
	array(
		'title' => esc_html__( 'Recommended Section', 'speedblog' ),
		'panel' => 'front_page_theme_options_panel',
	)
);

$wp_customize->add_setting(
    'speedblog_options[enable_recommended_post]',
    array(
        'default'           => $speedblog_default['enable_recommended_post'],
        'sanitize_callback' => 'speedblog_sanitize_checkbox',
    )
);
$wp_customize->add_control(
    'speedblog_options[enable_recommended_post]',
    array(
        'label'       => esc_html__( 'Enable Recommended Post', 'speedblog' ),
        'section'     => 'footer_recommended_post',
        'type'        => 'checkbox',
    )
);


$wp_customize->add_setting(
    'speedblog_options[recommended_post_layout]',
    array(
        'default'           => $speedblog_default['recommended_post_layout'],
        'capability'        => 'edit_theme_options',
        'sanitize_callback' => 'speedblog_sanitize_radio'
    )
);


$wp_customize->add_control(
    new SpeedBlog_Custom_Radio_Image_Control(
        $wp_customize,
        'speedblog_options[recommended_post_layout]',
        array(
            'label'         => esc_html__( 'Recommended Post Layout', 'speedblog' ),
            'section'       => 'footer_recommended_post',
            'choices'       => speedblog_get_recommended_post(),
        )
    )
);



$wp_customize->add_setting(
    'speedblog_options[recommended_post_title]',
    array(
        'default'           => $speedblog_default['recommended_post_title'],
        'sanitize_callback' => 'sanitize_text_field',
    )
);
$wp_customize->add_control(
    'speedblog_options[recommended_post_title]',
    array(
        'label'    => __( 'Recommended Post', 'speedblog' ),
        'section'  => 'footer_recommended_post',
        'type'     => 'text',
    )
);

$wp_customize->add_setting(
    'speedblog_options[recommended_post_category]',
    array(
        'default'           => $speedblog_default['recommended_post_category'],
        'sanitize_callback' => 'absint',
    )
);
$wp_customize->add_control(
    new SpeedBlog_Dropdown_Taxonomies_Control(
        $wp_customize,
        'speedblog_options[recommended_post_category]',
        array(
            'label'           => __( 'Choose Category', 'speedblog' ),
            'description'     => __( 'Leave Empty if you don\'t want the posts to be category specific', 'speedblog' ),
            'section'         => 'footer_recommended_post',
        )
    )
);









$wp_customize->add_setting(
    'speedblog_options[enable_recommended_post_author_meta]',
    array(
        'default' => $speedblog_default['enable_recommended_post_author_meta'],
        'sanitize_callback' => 'speedblog_sanitize_checkbox',
    )
);
$wp_customize->add_control(
    'speedblog_options[enable_recommended_post_author_meta]',
    array(
        'label' => esc_html__('Display Author Meta', 'speedblog'),
        'section' => 'footer_recommended_post',
        'type' => 'checkbox',
    )
);
$wp_customize->add_setting(
    'speedblog_options[select_recommended_post_author_meta]',
    array(
        'default' => $speedblog_default['select_recommended_post_author_meta'],
        'sanitize_callback' => 'speedblog_sanitize_select',
    )
);
$wp_customize->add_control(
    'speedblog_options[select_recommended_post_author_meta]',
    array(
        'label' => esc_html__('Select Author Meta', 'speedblog'),
        'section' => 'footer_recommended_post',
        'type' => 'select',
        'choices' => speedblog_author_meta(),
    )
);
$wp_customize->add_setting(
    'speedblog_options[recommended_post_author_meta_title]',
    array(
        'default' => $speedblog_default['recommended_post_author_meta_title'],
        'sanitize_callback' => 'sanitize_text_field',
    )
);
$wp_customize->add_control(
    'speedblog_options[recommended_post_author_meta_title]',
    array(
        'label' => __('Author Meta Text', 'speedblog'),
        'section' => 'footer_recommended_post',
        'type' => 'text',
    )
);
$wp_customize->add_setting(
    'speedblog_options[enable_recommended_post_date_meta]',
    array(
        'default' => $speedblog_default['enable_recommended_post_date_meta'],
        'sanitize_callback' => 'speedblog_sanitize_checkbox',
    )
);
$wp_customize->add_control(
    'speedblog_options[enable_recommended_post_date_meta]',
    array(
        'label' => esc_html__('Display Published Date', 'speedblog'),
        'section' => 'footer_recommended_post',
        'type' => 'checkbox',
    )
);
$wp_customize->add_setting(
    'speedblog_options[select_recommended_post_date]',
    array(
        'default' => $speedblog_default['select_recommended_post_date'],
        'sanitize_callback' => 'speedblog_sanitize_select',
    )
);
$wp_customize->add_control(
    'speedblog_options[select_recommended_post_date]',
    array(
        'label' => esc_html__('Select Single Date Meta', 'speedblog'),
        'section' => 'footer_recommended_post',
        'type' => 'select',
        'choices' => speedblog_date_meta(),
    )
);
$wp_customize->add_setting(
    'speedblog_options[select_recommended_post_date_meta_title]',
    array(
        'default' => $speedblog_default['select_recommended_post_date_meta_title'],
        'sanitize_callback' => 'sanitize_text_field',
    )
);
$wp_customize->add_control(
    'speedblog_options[select_recommended_post_date_meta_title]',
    array(
        'label' => __('Date Text', 'speedblog'),
        'section' => 'footer_recommended_post',
        'type' => 'text',
    )
);
$wp_customize->add_setting(
    'speedblog_options[select_recommended_post_date_format]',
    array(
        'default' => $speedblog_default['select_recommended_post_date_format'],
        'sanitize_callback' => 'speedblog_sanitize_select',
    )
);
$wp_customize->add_control(
    'speedblog_options[select_recommended_post_date_format]',
    array(
        'label' => esc_html__('Select Date Format', 'speedblog'),
        'section' => 'footer_recommended_post',
        'type' => 'select',
        'choices' => speedblog_get_date_formats(),
    )
);
$wp_customize->add_setting(
    'speedblog_options[enable_recommended_post_category_meta]',
    array(
        'default' => $speedblog_default['enable_recommended_post_category_meta'],
        'sanitize_callback' => 'speedblog_sanitize_checkbox',
    )
);
$wp_customize->add_control(
    'speedblog_options[enable_recommended_post_category_meta]',
    array(
        'label' => esc_html__('Enable Category Meta', 'speedblog'),
        'section' => 'footer_recommended_post',
        'type' => 'checkbox',
    )
);
$wp_customize->add_setting(
    'speedblog_options[select_recommended_post_number_of_category]',
    array(
        'default' => $speedblog_default['select_recommended_post_number_of_category'],
        'sanitize_callback' => 'absint',
    )
);
$wp_customize->add_control(
    'speedblog_options[select_recommended_post_number_of_category]',
    array(
        'label' => __('Number of Category', 'speedblog'),
        'section' => 'footer_recommended_post',
        'type' => 'number',
    )
);
$wp_customize->add_setting(
    'speedblog_options[recommended_post_category_label]',
    array(
        'default' => $speedblog_default['recommended_post_category_label'],
        'sanitize_callback' => 'sanitize_text_field',
    )
);
$wp_customize->add_control(
    'speedblog_options[recommended_post_category_label]',
    array(
        'label' => __('Category Label', 'speedblog'),
        'section' => 'footer_recommended_post',
        'type' => 'text',
    )
);

$wp_customize->add_setting(
    'speedblog_options[select_recommended_post_category_color]',
    array(
        'default' => $speedblog_default['select_recommended_post_category_color'],
        'sanitize_callback' => 'speedblog_sanitize_select',
    )
);
$wp_customize->add_control(
    'speedblog_options[select_recommended_post_category_color]',
    array(
        'label' => esc_html__('Select Category Color', 'speedblog'),
        'section' => 'footer_recommended_post',
        'type' => 'select',
        'choices' => speedblog_category_color(),
    )
);