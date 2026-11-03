<?php
// footer widget Options.
$wp_customize->add_section(
    'footer_widget_section',
    array(
        'title' => __('Footer Widget Options', 'speedblog'),
        'panel' => 'footer_options_panel',
    )
);



/*Enable Footer Nav*/
$wp_customize->add_setting(
    'speedblog_options[enable_footer_widget]',
    array(
        'default'           => $speedblog_default['enable_footer_widget'],
        'sanitize_callback' => 'speedblog_sanitize_checkbox',
    )
);
$wp_customize->add_control(
    'speedblog_options[enable_footer_widget]',
    array(
        'label'       => __( 'Show Footer widgetarea', 'speedblog' ),
        'section'     => 'footer_widget_section',
        'type'     => 'checkbox',
    )
);

// Option to choose footer column layout.
$wp_customize->add_setting(
	'speedblog_options[footer_column_layout]',
	array(
		'default'           => $speedblog_default['footer_column_layout'],
		'sanitize_callback' => 'speedblog_sanitize_radio',
	)
);
$wp_customize->add_control(
	new SpeedBlog_Custom_Radio_Image_Control(
		$wp_customize,
		'speedblog_options[footer_column_layout]',
		array(
			'label'       => __( 'Footer Column Layout', 'speedblog' ),
			'description' => __( 'Some footer widgetareas will not be used based on the footer column layout chosen. Also make sure to insert at least one widget on the respective widgetarea for it to display.', 'speedblog' ),
			'section'     => 'footer_widget_section',
			'choices'     => speedblog_get_footer_layouts(),
			'priority'    => 40,
		)
	)
);
