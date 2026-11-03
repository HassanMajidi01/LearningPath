<?php
$wp_customize->add_section(
	'breadcrumb_options',
	array(
		'title' => __( 'Breadcrumb Options', 'speedblog' ),
		'panel' => 'general_options_panel',
	)
);

$wp_customize->add_setting(
    'speedblog_options[enable_breadcrumb]',
    array(
        'default'           => $speedblog_default['enable_breadcrumb'],
        'sanitize_callback' => 'speedblog_sanitize_checkbox',
    )
);
$wp_customize->add_control(
    'speedblog_options[enable_breadcrumb]',
    array(
		'label'    => __( 'Enable Breadcrumb', 'speedblog' ),
        'section'     => 'breadcrumb_options',
        'type'        => 'checkbox',
    )
);
