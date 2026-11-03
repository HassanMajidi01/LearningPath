<?php
$wp_customize->add_section(
	'sidebar_options',
	array(
		'title' => esc_html__( 'SideBar Options', 'speedblog' ),
		'panel' => 'archive_options_panel',
	)
);

$wp_customize->add_setting(
    'speedblog_options[sidebar_layout_option]',
    array(
        'default'           => $speedblog_default['sidebar_layout_option'],
        'capability'        => 'edit_theme_options',
        'sanitize_callback' => 'speedblog_sanitize_radio'
    )
);

$wp_customize->add_control(
    new SpeedBlog_Custom_Radio_Image_Control(
        $wp_customize,
        'speedblog_options[sidebar_layout_option]',
        array(
            'label'         => esc_html__( 'Select Sidebar Layout (archive)', 'speedblog' ),
            'section'       => 'sidebar_options',
            'choices'       => speedblog_get_sidebar_layouts(),
        )
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
            'section'       => 'sidebar_options',
            'choices'       => speedblog_get_sidebar_layouts(),
        )
    )
);


$wp_customize->add_setting(
    'speedblog_options[enable_sidebar_fix_archive]',
    array(
        'default'           => $speedblog_default['enable_sidebar_fix_archive'],
        'sanitize_callback' => 'speedblog_sanitize_checkbox',
    )
);
$wp_customize->add_control(
    'speedblog_options[enable_sidebar_fix_archive]',
    array(
        'label'    => __( 'Enable Sticky Sidebar', 'speedblog' ),
        'section'     => 'sidebar_options',
        'type'        => 'checkbox',
    )
);
