<?php
$wp_customize->add_section(
   'mobile_menu_options' ,
    array(
        'title' => __( 'Mobile Menu Options', 'speedblog' ),
        'panel' => 'header_options_panel',
    )
);

$wp_customize->add_setting(
    'speedblog_options[enable_social_mobile_menu]',
    array(
        'default'           => $speedblog_default['enable_social_mobile_menu'],
        'sanitize_callback' => 'speedblog_sanitize_checkbox',
    )
);
$wp_customize->add_control(
    'speedblog_options[enable_social_mobile_menu]',
    array(
        'label'         => esc_html__( 'Social Menu to Display in Mobile', 'speedblog' ),
        'section'     => 'mobile_menu_options',
        'type'        => 'checkbox',
    )
);

$wp_customize->add_setting(
    'speedblog_options[select_mobile_social_menu_style]',
    array(
        'default'           => $speedblog_default['select_mobile_social_menu_style'],
        'sanitize_callback' => 'speedblog_sanitize_select',
    )
);
$wp_customize->add_control(
    'speedblog_options[select_mobile_social_menu_style]',
    array(
        'label'         => esc_html__( 'Social Menu Options', 'speedblog' ),
        'section'     => 'mobile_menu_options',
        'type'        => 'select',
        'choices'       => speedblog_social_menu_style(),


    )
);

$wp_customize->add_setting(
    'speedblog_options[enable_mobile_social_nav_border_radius]',
    array(
        'default'           => $speedblog_default['enable_mobile_social_nav_border_radius'],
        'sanitize_callback' => 'speedblog_sanitize_checkbox',
    )
);
$wp_customize->add_control(
    'speedblog_options[enable_mobile_social_nav_border_radius]',
    array(
        'label'    => __( 'Enable Border Radius', 'speedblog' ),
        'section'  => 'mobile_menu_options',
        'type'     => 'checkbox',
    )
);


$wp_customize->add_setting(
    'speedblog_options[enable_copyright_in_menu]',
    array(
        'default'           => $speedblog_default['enable_copyright_in_menu'],
        'sanitize_callback' => 'speedblog_sanitize_checkbox',
    )
);
$wp_customize->add_control(
    'speedblog_options[enable_copyright_in_menu]',
    array(
        'label'         => esc_html__( 'Copyright in Mobile', 'speedblog' ),
        'section'     => 'mobile_menu_options',
        'type'        => 'checkbox',
    )
);

$wp_customize->add_section(
   'header_launcher_button_options' ,
    array(
        'title' => __( 'Header Launcher Button', 'speedblog' ),
        'panel' => 'header_options_panel',
    )
);

$wp_customize->add_setting(
    'speedblog_options[enable_header_launcher_button]',
    array(
        'default'           => $speedblog_default['enable_header_launcher_button'],
        'sanitize_callback' => 'speedblog_sanitize_checkbox',
    )
);
$wp_customize->add_control(
    'speedblog_options[enable_header_launcher_button]',
    array(
        'label'         => esc_html__( 'Enable Header Launcher Button', 'speedblog' ),
        'description'     => __( 'Header styles 1 and 4 does not support this feature.', 'speedblog' ),
        'section'     => 'header_launcher_button_options',
        'type'        => 'checkbox',
    )
);

$wp_customize->add_setting(
    'speedblog_options[header_launcher_button_text]',
    array(
        'default'           => $speedblog_default['header_launcher_button_text'],
        'sanitize_callback' => 'sanitize_text_field',
    )
);
$wp_customize->add_control(
    'speedblog_options[header_launcher_button_text]',
    array(
        'label'    => __( 'Header Launcher Button Text', 'speedblog' ),
        'section'  => 'header_launcher_button_options',
        'type'     => 'text',
    )
);

$wp_customize->add_setting(
    'speedblog_options[header_launcher_button_url]',
    array(
        'default'           => $speedblog_default['header_launcher_button_url'],
        'sanitize_callback' => 'esc_url_raw',
    )
);
$wp_customize->add_control(
    'speedblog_options[header_launcher_button_url]',
    array(
        'label'    => __( 'Header Launcher URL', 'speedblog' ),
        'section'  => 'header_launcher_button_options',
        'type'     => 'text',
    )
);
