<?php
/**
 * All settings related to Featured Category.
 *
 * @package SpeedBlog
 */
$wp_customize->add_section(
	'featured_category',
	array(
		'title' => esc_html__( 'Category Section', 'speedblog' ),
		'panel' => 'front_page_theme_options_panel',
	)
);

$wp_customize->add_setting(
    'speedblog_options[enable_featured_category]',
    array(
        'default'           => $speedblog_default['enable_featured_category'],
        'sanitize_callback' => 'speedblog_sanitize_checkbox',
    )
);
$wp_customize->add_control(
    'speedblog_options[enable_featured_category]',
    array(
        'label'       => esc_html__( 'Enable Featured Category', 'speedblog' ),
        'section'     => 'featured_category',
        'type'        => 'checkbox',
    )
);

$wp_customize->add_setting(
    'speedblog_options[featured_category_title]',
    array(
        'default'           => $speedblog_default['featured_category_title'],
        'sanitize_callback' => 'sanitize_text_field',
    )
);
$wp_customize->add_control(
    'speedblog_options[featured_category_title]',
    array(
        'label'    => __( 'Section Title', 'speedblog' ),
        'section'  => 'featured_category',
        'type'     => 'text',
    )
);

$wp_customize->add_setting(
    'speedblog_options[featured_category_sub_title]',
    array(
        'default'           => $speedblog_default['featured_category_sub_title'],
        'sanitize_callback' => 'sanitize_text_field',
    )
);
$wp_customize->add_control(
    'speedblog_options[featured_category_sub_title]',
    array(
        'label'    => __( 'Section Sub Title', 'speedblog' ),
        'section'  => 'featured_category',
        'type'     => 'text',
    )
);

for ($i=1; $i <=4 ; $i++) { 
    $wp_customize->add_setting(
    'speedblog_options[featured_category_'.$i.']',
    array(
        'default'           => '',
        'sanitize_callback' => 'absint',
    )
    );
    $wp_customize->add_control(
        new SpeedBlog_Dropdown_Taxonomies_Control(
            $wp_customize,
            'speedblog_options[featured_category_'.$i.']',
            array(
                'label'           => __( 'Choose Category -', 'speedblog' ).$i,
                'description'     => __( 'Leave Empty if you don\'t want the posts to be category specific', 'speedblog' ),
                'section'         => 'featured_category',
            )
        )
    );
}

