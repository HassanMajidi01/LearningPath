<?php
/**
 * All settings related to single.
 *
 * @package SpeedBlog
 */
$wp_customize->add_section(
	'single_options',
	array(
		'title' => esc_html__( 'Single Page Options', 'speedblog' ),
		'panel' => 'single_options_panel',
	)
);

$wp_customize->add_setting(
    'speedblog_options[enable_single_author_meta]',
    array(
        'default'           => $speedblog_default['enable_single_author_meta'],
        'sanitize_callback' => 'speedblog_sanitize_checkbox',
    )
);
$wp_customize->add_control(
    'speedblog_options[enable_single_author_meta]',
    array(
        'label'       => esc_html__( 'Show Author Meta', 'speedblog' ),
        'section'     => 'single_options',
        'type'        => 'checkbox',
    )
);

$wp_customize->add_setting(
    'speedblog_options[select_single_author_meta]',
    array(
        'default'           => $speedblog_default['select_single_author_meta'],
        'sanitize_callback' => 'speedblog_sanitize_select',
    )
);
$wp_customize->add_control(
    'speedblog_options[select_single_author_meta]',
    array(
        'label'         => esc_html__( 'Author Meta Display Options', 'speedblog' ),
        'section'     => 'single_options',
        'type'        => 'select',
        'choices'       => speedblog_author_meta(),


    )
);

$wp_customize->add_setting(
    'speedblog_options[single_author_meta_title]',
    array(
        'default'           => $speedblog_default['single_author_meta_title'],
        'sanitize_callback' => 'sanitize_text_field',
    )
);
$wp_customize->add_control(
    'speedblog_options[single_author_meta_title]',
    array(
        'label'    => __( 'Author Meta Text', 'speedblog' ),
        'section'  => 'single_options',
        'type'     => 'text',
    )
);

$wp_customize->add_setting(
    'speedblog_options[enable_single_date_meta]',
    array(
        'default'           => $speedblog_default['enable_single_date_meta'],
        'sanitize_callback' => 'speedblog_sanitize_checkbox',
    )
);
$wp_customize->add_control(
    'speedblog_options[enable_single_date_meta]',
    array(
        'label'       => esc_html__( 'Display Published Date', 'speedblog' ),
        'section'     => 'single_options',
        'type'        => 'checkbox',
    )
);

$wp_customize->add_setting(
    'speedblog_options[select_single_date]',
    array(
        'default'           => $speedblog_default['select_single_date'],
        'sanitize_callback' => 'speedblog_sanitize_select',
    )
);
$wp_customize->add_control(
    'speedblog_options[select_single_date]',
    array(
        'label'         => esc_html__( 'Select Single Date Meta', 'speedblog' ),
        'section'     => 'single_options',
        'type'        => 'select',
        'choices'       => speedblog_date_meta(),

    )
);

$wp_customize->add_setting(
    'speedblog_options[single_date_meta_title]',
    array(
        'default'           => $speedblog_default['single_date_meta_title'],
        'sanitize_callback' => 'sanitize_text_field',
    )
);
$wp_customize->add_control(
    'speedblog_options[single_date_meta_title]',
    array(
        'label'    => __( 'Date Text', 'speedblog' ),
        'section'  => 'single_options',
        'type'     => 'text',
    )
);

$wp_customize->add_setting(
    'speedblog_options[select_single_date_format]',
    array(
        'default'           => $speedblog_default['select_single_date_format'],
        'sanitize_callback' => 'speedblog_sanitize_select',
    )
);
$wp_customize->add_control(
    'speedblog_options[select_single_date_format]',
    array(
        'label'         => esc_html__( 'Select Date Format', 'speedblog' ),
        'section'     => 'single_options',
        'type'        => 'select',
        'choices'  		=> speedblog_get_date_formats(),
    )
);

$wp_customize->add_setting(
    'speedblog_options[enable_single_category_meta]',
    array(
        'default'           => $speedblog_default['enable_single_category_meta'],
        'sanitize_callback' => 'speedblog_sanitize_checkbox',
    )
);
$wp_customize->add_control(
    'speedblog_options[enable_single_category_meta]',
    array(
        'label'       => esc_html__( 'Enable Single Category Meta', 'speedblog' ),
        'section'     => 'single_options',
        'type'        => 'checkbox',
    )
);


$wp_customize->add_setting(
    'speedblog_options[single_category_label]',
    array(
        'default'           => $speedblog_default['single_category_label'],
        'sanitize_callback' => 'sanitize_text_field',
    )
);
$wp_customize->add_control(
    'speedblog_options[single_category_label]',
    array(
        'label'    => __( 'Category Title', 'speedblog' ),
        'section'  => 'single_options',
        'type'     => 'text',
    )
);

$wp_customize->add_setting(
    'speedblog_options[select_single_category_color]',
    array(
        'default'           => $speedblog_default['select_single_category_color'],
        'sanitize_callback' => 'speedblog_sanitize_select',
    )
);
$wp_customize->add_control(
    'speedblog_options[select_single_category_color]',
    array(
        'label'         => esc_html__( 'Select Category Color', 'speedblog' ),
        'section'     => 'single_options',
        'type'        => 'select',
        'choices'  		=> speedblog_category_color(),

    )
);

$wp_customize->add_setting(
    'speedblog_options[enable_single_tag_meta]',
    array(
        'default'           => $speedblog_default['enable_single_tag_meta'],
        'sanitize_callback' => 'speedblog_sanitize_checkbox',
    )
);
$wp_customize->add_control(
    'speedblog_options[enable_single_tag_meta]',
    array(
        'label'       => esc_html__( 'Enable Tag Meta', 'speedblog' ),
        'section'     => 'single_options',
        'type'        => 'checkbox',
    )
);

$wp_customize->add_setting(
    'speedblog_options[enable_single_read_time_meta]',
    array(
        'default'           => $speedblog_default['enable_single_read_time_meta'],
        'sanitize_callback' => 'speedblog_sanitize_checkbox',
    )
);
$wp_customize->add_control(
    'speedblog_options[enable_single_read_time_meta]',
    array(
        'label'       => esc_html__( 'Enable Read Time', 'speedblog' ),
        'section'     => 'single_options',
        'type'        => 'checkbox',
    )
);



$wp_customize->add_setting(
    'speedblog_section_seperator_single_5',
    array(
        'default'           => '',
        'capability'        => 'edit_theme_options',
        'sanitize_callback' => 'sanitize_text_field'
    )
);

$wp_customize->add_control(
    new SpeedBlog_Seperator_Control(
        $wp_customize,
        'speedblog_section_seperator_single_5',
        array(
            'settings' => 'speedblog_section_seperator_single_5',
            'section'       => 'single_options',
        )
    )
);


$wp_customize->add_setting(
    'speedblog_options[show_sticky_article_navigation]',
    array(
        'default'           => $speedblog_default['show_sticky_article_navigation'],
        'sanitize_callback' => 'speedblog_sanitize_checkbox',
    )
);
$wp_customize->add_control(
    'speedblog_options[show_sticky_article_navigation]',
    array(
        'label'    => __( 'Show Sticky Article Navigation', 'speedblog' ),
        'section'  => 'single_options',
        'type'     => 'checkbox',
    )
);

/*Show Author Info Box start
*-------------------------------*/
$wp_customize->add_setting(
    'speedblog_section_seperator_single_2',
    array(
        'default'           => '',
        'capability'        => 'edit_theme_options',
        'sanitize_callback' => 'sanitize_text_field'
    )
);

$wp_customize->add_control(
    new SpeedBlog_Seperator_Control(
        $wp_customize,
        'speedblog_section_seperator_single_2',
        array(
            'settings' => 'speedblog_section_seperator_single_2',
            'section'       => 'single_options',
        )
    )
);

$wp_customize->add_setting(
    'speedblog_options[show_author_info]',
    array(
        'default'           => $speedblog_default['show_author_info'],
        'sanitize_callback' => 'speedblog_sanitize_checkbox',
    )
);
$wp_customize->add_control(
    'speedblog_options[show_author_info]',
    array(
        'label'    => __( 'Show Author Info Box', 'speedblog' ),
        'section'  => 'single_options',
        'type'     => 'checkbox',
    )
);


$wp_customize->add_section(
    'single_sidebar_options',
    array(
        'title' => esc_html__( 'SideBar Options', 'speedblog' ),
        'panel' => 'single_options_panel',
    )
);


$wp_customize->add_setting(
    'speedblog_options[single_sidebar_layout_option]',
    array(
        'default'           => $speedblog_default['single_sidebar_layout_option'],
        'capability'        => 'edit_theme_options',
        'sanitize_callback' => 'speedblog_sanitize_radio'
    )
);

$wp_customize->add_control(
    new SpeedBlog_Custom_Radio_Image_Control(
        $wp_customize,
        'speedblog_options[single_sidebar_layout_option]',
        array(
            'label'         => esc_html__( 'Select Sidebar Layout (Single)', 'speedblog' ),
            'section'       => 'single_sidebar_options',
            'choices'       => speedblog_get_sidebar_layouts(),
        )
    )
);




$wp_customize->add_setting(
    'speedblog_options[enable_sidebar_fix_single]',
    array(
        'default'           => $speedblog_default['enable_sidebar_fix_single'],
        'sanitize_callback' => 'speedblog_sanitize_checkbox',
    )
);
$wp_customize->add_control(
    'speedblog_options[enable_sidebar_fix_single]',
    array(
        'label'    => __( 'Enable Sticky Sidebar', 'speedblog' ),
        'section'     => 'single_options_panel',
        'type'        => 'checkbox',
    )
);