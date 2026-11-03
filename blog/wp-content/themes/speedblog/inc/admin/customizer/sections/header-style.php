<?php
$wp_customize->add_section(
   'header_style_options' ,
    array(
        'title' => __( 'Header style Option', 'speedblog' ),
        'panel' => 'header_options_panel',
    )
);


$wp_customize->add_setting(
    'speedblog_options[select_header_layout_style]',
    array(
        'default'           => $speedblog_default['select_header_layout_style'],
        'capability'        => 'edit_theme_options',
        'sanitize_callback' => 'speedblog_sanitize_radio'
    )
);

$wp_customize->add_control(
    new SpeedBlog_Custom_Radio_Image_Control(
        $wp_customize,
        'speedblog_options[select_header_layout_style]',
        array(
            'label'         => esc_html__( 'Select Header Layout', 'speedblog' ),
            'section'       => 'header_style_options',
            'choices'       => speedblog_get_header_layout(),
        )
    )
);