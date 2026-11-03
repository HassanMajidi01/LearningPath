<?php
$wp_customize->add_section(
   'topbar_options' ,
    array(
        'title' => __( 'Topbar Options', 'speedblog' ),
        'panel' => 'header_options_panel',
    )
);

/*Enable Top Bar*/
$wp_customize->add_setting(
    'speedblog_options[enable_top_bar]',
    array(
        'default'           => $speedblog_default['enable_top_bar'],
        'sanitize_callback' => 'speedblog_sanitize_checkbox',
    )
);
$wp_customize->add_control(
    'speedblog_options[enable_top_bar]',
    array(
        'label'    => __( 'Enable Top Bar', 'speedblog' ),
        'section'  => 'topbar_options',
        'type'     => 'checkbox',
    )
);

$wp_customize->add_setting(
    'speedblog_options[hide_topbar_on_mobile]',
    array(
        'default'           => $speedblog_default['hide_topbar_on_mobile'],
        'sanitize_callback' => 'speedblog_sanitize_checkbox',
    )
);
$wp_customize->add_control(
    'speedblog_options[hide_topbar_on_mobile]',
    array(
        'label'    => __( 'Hide Top Bar on Mobile', 'speedblog' ),
        'section'  => 'topbar_options',
        'type'     => 'checkbox',
    )
);

/*Enable Today's Date*/
$wp_customize->add_setting(
    'speedblog_options[enable_header_date]',
    array(
        'default'           => $speedblog_default['enable_header_date'],
        'sanitize_callback' => 'speedblog_sanitize_checkbox',
    )
);
$wp_customize->add_control(
    'speedblog_options[enable_header_date]',
    array(
        'label'    => __( 'Enable Today\'s Date', 'speedblog' ),
        'section'  => 'topbar_options',
        'type'     => 'checkbox',
    )
);

// Date Label Text
$wp_customize->add_setting(
    'speedblog_options[date_label_text]',
    array(
        'default'           => $speedblog_default['date_label_text'],
        'sanitize_callback' => 'sanitize_text_field',
    )
);
$wp_customize->add_control(
    'speedblog_options[date_label_text]',
    array(
        'label'           => __( 'Date Label Text', 'speedblog' ),
        'description'     => __( 'Leave empty if you want to use the default text "Today".', 'speedblog' ),
        'section'  => 'topbar_options',
        'type'     => 'text',
    )
);


/*Todays Date Format*/
$wp_customize->add_setting(
    'speedblog_options[todays_date_format]',
    array(
        'default'           => $speedblog_default['todays_date_format'],
        'sanitize_callback' => 'sanitize_text_field',
    )
);
$wp_customize->add_control(
    'speedblog_options[todays_date_format]',
    array(
        'label'    => __( 'Today\'s Date Format', 'speedblog' ),
        'description' => sprintf( wp_kses( __( '<a href="%s" target="_blank">Date and Time Formatting Documentation</a>.', 'speedblog' ), array(  'a' => array( 'href' => array(), 'target' => array() ) ) ), esc_url( 'https://wordpress.org/support/article/formatting-date-and-time' ) ),
        'section'  => 'topbar_options',
        'type'     => 'text',
    )
);

$wp_customize->add_setting(
    'speedblog_options[enable_social_nav_on_topbar]',
    array(
        'default'           => $speedblog_default['enable_social_nav_on_topbar'],
        'sanitize_callback' => 'speedblog_sanitize_checkbox',
    )
);
$wp_customize->add_control(
    'speedblog_options[enable_social_nav_on_topbar]',
    array(
        'label'    => __( 'Enable Social Nav on TopBar', 'speedblog' ),
        'section'  => 'topbar_options',
        'type'     => 'checkbox',
    )
);

$wp_customize->add_setting(
    'speedblog_options[select_top_bar_social_menu_style]',
    array(
        'default'           => $speedblog_default['select_top_bar_social_menu_style'],
        'sanitize_callback' => 'speedblog_sanitize_select',
    )
);
$wp_customize->add_control(
    'speedblog_options[select_top_bar_social_menu_style]',
    array(
        'label'         => esc_html__( 'Social Menu Options', 'speedblog' ),
        'section'     => 'topbar_options',
        'type'        => 'select',
        'choices'       => speedblog_social_menu_style(),


    )
);

$wp_customize->add_setting(
    'speedblog_options[enable_social_nav_border_radius]',
    array(
        'default'           => $speedblog_default['enable_social_nav_border_radius'],
        'sanitize_callback' => 'speedblog_sanitize_checkbox',
    )
);
$wp_customize->add_control(
    'speedblog_options[enable_social_nav_border_radius]',
    array(
        'label'    => __( 'Enable Border Radius', 'speedblog' ),
        'section'  => 'topbar_options',
        'type'     => 'checkbox',
    )
);
