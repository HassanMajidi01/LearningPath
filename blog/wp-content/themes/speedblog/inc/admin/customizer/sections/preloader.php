<?php
/**
 * All settings related to preloader.
 *
 * @package SpeedBlog
 */
$wp_customize->add_section(
	'preloader_options',
	array(
		'title' => esc_html__( 'Preloader Options', 'speedblog' ),
		'panel' => 'general_options_panel',
	)
);

$wp_customize->add_setting(
    'speedblog_options[enable_preloader_options]',
    array(
        'default'           => $speedblog_default['enable_preloader_options'],
        'sanitize_callback' => 'speedblog_sanitize_checkbox',
    )
);
$wp_customize->add_control(
    'speedblog_options[enable_preloader_options]',
    array(
        'label'       => esc_html__( 'Enable Preloader Option', 'speedblog' ),
        'section'     => 'preloader_options',
        'type'        => 'checkbox',
    )
);

$wp_customize->add_setting(
    'speedblog_options[speedblog_preloader_style]',
    array(
        'default'           => $speedblog_default['speedblog_preloader_style'],
        'sanitize_callback' => 'speedblog_sanitize_select',
    )
);
$wp_customize->add_control(
    'speedblog_options[speedblog_preloader_style]',
    array(
        'label'         => esc_html__( 'Select Preloader Style', 'speedblog' ),
        'section'     => 'preloader_options',
        'type'        => 'select',
        'choices'       => speedblog_preloader_style_option(),

    )
);
