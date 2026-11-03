<?php
// Tags Posts Options.
$wp_customize->add_section(
	'home_page_tags_options',
	array(
		'title' => __( 'Tags Options', 'speedblog' ),
		'panel' => 'header_options_panel',
	)
);

$wp_customize->add_setting(
    'speedblog_options[enable_tags]',
    array(
        'default'           => $speedblog_default['enable_tags'],
        'sanitize_callback' => 'speedblog_sanitize_checkbox',
    )
);
$wp_customize->add_control(
    'speedblog_options[enable_tags]',
    array(
		'label'    => __( 'Enable Tags Section', 'speedblog' ),
        'section'     => 'home_page_tags_options',
        'type'        => 'checkbox',
    )
);

$wp_customize->add_setting(
    'speedblog_options[enable_tags_only_on_frontpage]',
    array(
        'default' => $speedblog_default['enable_tags_only_on_frontpage'],
        'sanitize_callback' => 'speedblog_sanitize_checkbox',
    )
);
$wp_customize->add_control(
    'speedblog_options[enable_tags_only_on_frontpage]',
    array(
        'label' => __('Display only on the Homepage', 'speedblog'),
        'section' => 'home_page_tags_options',
        'type' => 'checkbox',
    )
);

$wp_customize->add_setting(
    'speedblog_options[enable_tags_label]',
    array(
        'default'           => $speedblog_default['enable_tags_label'],
        'sanitize_callback' => 'speedblog_sanitize_checkbox',
    )
);

$wp_customize->add_control(
    'speedblog_options[enable_tags_label]',
    array(
        'label'           => __( 'Enable Tags Label', 'speedblog' ),
        'section'     => 'home_page_tags_options',
        'type'        => 'checkbox',
    )
);

// Tags Label Style.
$wp_customize->add_setting(
    'speedblog_options[tags_label_style]',
    array(
        'default'           => $speedblog_default['tags_label_style'],
        'sanitize_callback' => 'speedblog_sanitize_select',
    )
);
$wp_customize->add_control(
    'speedblog_options[tags_label_style]',
    array(
        'label'           => __( 'Label Style', 'speedblog' ),
        'section'         => 'home_page_tags_options',
        'type'            => 'select',
        'choices'         => array(
            'style_1' => __( 'Plain', 'speedblog' ),
            'style_2' => __( 'With Icon', 'speedblog' ),
        ),
    )
);


// Tags Label Text.
$wp_customize->add_setting(
    'speedblog_options[tags_label_text]',
    array(
        'default'           => $speedblog_default['tags_label_text'],
        'sanitize_callback' => 'sanitize_text_field',
    )
);
$wp_customize->add_control(
    'speedblog_options[tags_label_text]',
    array(
        'label'           => __( 'Tags Label Text', 'speedblog' ),
        'description'     => __( 'Leave empty if you want it blank', 'speedblog' ),
        'section'         => 'home_page_tags_options',
        'type'            => 'text',
    )
);

// No of posts.
$wp_customize->add_setting(
    'speedblog_options[no_of_tags]',
    array(
        'default'           => $speedblog_default['no_of_tags'],
        'sanitize_callback' => 'absint',
    )
);
$wp_customize->add_control(
    'speedblog_options[no_of_tags]',
    array(
		'label'           => __( 'Number of Tags', 'speedblog' ),
		'section'         => 'home_page_tags_options',
		'type'            => 'number',
    )
);


// Posts Orderby.
$wp_customize->add_setting(
    'speedblog_options[tags_orderby]',
    array(
        'default'           => $speedblog_default['tags_orderby'],
        'sanitize_callback' => 'speedblog_sanitize_select',
    )
);
$wp_customize->add_control(
    'speedblog_options[tags_orderby]',
    array(
		'label'           => __( 'Orderby', 'speedblog' ),
		'section'         => 'home_page_tags_options',
		'type'            => 'select',
		'choices'         => array(
			'date'  => __( 'Date', 'speedblog' ),
			'id'    => __( 'ID', 'speedblog' ),
			'title' => __( 'Title', 'speedblog' ),
			'rand'  => __( 'Random', 'speedblog' ),
		),
    )
);


// Posts Order.
$wp_customize->add_setting(
    'speedblog_options[tags_order]',
    array(
        'default'           => $speedblog_default['tags_order'],
        'sanitize_callback' => 'speedblog_sanitize_select',
    )
);
$wp_customize->add_control(
    'speedblog_options[tags_order]',
    array(
		'label'           => __( 'Order', 'speedblog' ),
		'section'         => 'home_page_tags_options',
		'type'            => 'select',
		'choices'         => array(
			'asc'  => __( 'ASC', 'speedblog' ),
			'desc' => __( 'DESC', 'speedblog' ),
		),
    )
);


$wp_customize->add_setting(
    'speedblog_options[hide_tags_label_responsive]',
    array(
        'default'           => $speedblog_default['hide_tags_label_responsive'],
        'sanitize_callback' => 'speedblog_sanitize_checkbox',
    )
);
$wp_customize->add_control(
    'speedblog_options[hide_tags_label_responsive]',
    array(
		'label'           => __( 'Hide Label on Responsive', 'speedblog' ),
        'section'     => 'home_page_tags_options',
        'type'        => 'checkbox',
    )
);
