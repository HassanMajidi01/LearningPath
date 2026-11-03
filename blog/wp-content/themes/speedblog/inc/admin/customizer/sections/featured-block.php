<?php
/**
 * All settings related to popular block post.
 *
 * @package SpeedBlog
 */

 $wp_customize->add_section(
	'featured_block',
	array(
		'title' => esc_html__( 'Featured Block Section', 'speedblog' ),
		'panel' => 'front_page_theme_options_panel',
	)
);

 $wp_customize->add_setting(
  'speedblog_options[enable_featured_block]',
  array(
      'default'           => $speedblog_default['enable_featured_block'],
      'sanitize_callback' => 'speedblog_sanitize_checkbox',
  )
);
$wp_customize->add_control(
  'speedblog_options[enable_featured_block]',
  array(
      'label'       => esc_html__( 'Enable Featured Block', 'speedblog' ),
      'section'     => 'featured_block',
      'type'        => 'checkbox',
  )
);


$wp_customize->add_setting(
    'speedblog_options[featured_block_post_title]',
    array(
        'default'           => $speedblog_default['featured_block_post_title'],
        'sanitize_callback' => 'sanitize_text_field',
    )
);
$wp_customize->add_control(
    'speedblog_options[featured_block_post_title]',
    array(
        'label'    => __( 'Section Title', 'speedblog' ),
        'section'  => 'featured_block',
        'type'     => 'text',
    )
);

$wp_customize->add_setting(
    'speedblog_options[featured_block_post_sub_title]',
    array(
        'default'           => $speedblog_default['featured_block_post_sub_title'],
        'sanitize_callback' => 'sanitize_text_field',
    )
);
$wp_customize->add_control(
    'speedblog_options[featured_block_post_sub_title]',
    array(
        'label'    => __( 'Section Sub-Title', 'speedblog' ),
        'section'  => 'featured_block',
        'type'     => 'text',
    )
);


$wp_customize->add_setting(
    'speedblog_options[featured_block_category]',
    array(
        'default'           => $speedblog_default['featured_block_category'],
        'sanitize_callback' => 'absint',
    )
);
$wp_customize->add_control(
    new SpeedBlog_Dropdown_Taxonomies_Control(
        $wp_customize,
        'speedblog_options[featured_block_category]',
        array(
            'label'           => __( 'Choose Category', 'speedblog' ),
            'description'     => __( 'Leave Empty if you don\'t want the posts to be category specific', 'speedblog' ),
            'section'         => 'featured_block',
        )
    )
);


$wp_customize->add_setting(
  'speedblog_options[enable_featured_block_category_meta]',
  array(
      'default' => $speedblog_default['enable_featured_block_category_meta'],
      'sanitize_callback' => 'speedblog_sanitize_checkbox',
  )
);
$wp_customize->add_control(
  'speedblog_options[enable_featured_block_category_meta]',
  array(
      'label' => esc_html__('Enable Category Meta', 'speedblog'),
      'section' => 'featured_block',
      'type' => 'checkbox',
  )
);

$wp_customize->add_setting(
  'speedblog_options[featured_block_category_label]',
  array(
      'default' => $speedblog_default['featured_block_category_label'],
      'sanitize_callback' => 'sanitize_text_field',
  )
);
$wp_customize->add_control(
  'speedblog_options[featured_block_category_label]',
  array(
      'label' => __('Category Label', 'speedblog'),
      'section' => 'featured_block',
      'type' => 'text',
  )
);

$wp_customize->add_setting(
  'speedblog_options[select_featured_block_category_color]',
  array(
      'default' => $speedblog_default['select_featured_block_category_color'],
      'sanitize_callback' => 'speedblog_sanitize_select',
  )
);
$wp_customize->add_control(
  'speedblog_options[select_featured_block_category_color]',
  array(
      'label' => esc_html__('Select Category Color', 'speedblog'),
      'section' => 'featured_block',
      'type' => 'select',
      'choices' => speedblog_category_color(),
  )
);

$wp_customize->add_setting(
  'speedblog_options[select_featured_block_number_of_category]',
  array(
      'default' => $speedblog_default['select_featured_block_number_of_category'],
      'sanitize_callback' => 'absint',
  )
);
$wp_customize->add_control(
  'speedblog_options[select_featured_block_number_of_category]',
  array(
      'label' => __('Number of Category', 'speedblog'),
      'section' => 'featured_block',
      'type' => 'number',
  )
);

$wp_customize->add_setting(
  'speedblog_options[enable_featured_block_author_meta]',
  array(
      'default' => $speedblog_default['enable_featured_block_author_meta'],
      'sanitize_callback' => 'speedblog_sanitize_checkbox',
  )
);
$wp_customize->add_control(
  'speedblog_options[enable_featured_block_author_meta]',
  array(
      'label' => esc_html__('Display Author Meta', 'speedblog'),
      'section' => 'featured_block',
      'type' => 'checkbox',
  )
);
$wp_customize->add_setting(
  'speedblog_options[select_featured_block_author_meta]',
  array(
      'default' => $speedblog_default['select_featured_block_author_meta'],
      'sanitize_callback' => 'speedblog_sanitize_select',
  )
);
$wp_customize->add_control(
  'speedblog_options[select_featured_block_author_meta]',
  array(
      'label' => esc_html__('Select Author Meta', 'speedblog'),
      'section' => 'featured_block',
      'type' => 'select',
      'choices' => speedblog_author_meta(),
  )
);
$wp_customize->add_setting(
  'speedblog_options[featured_block_author_meta_title]',
  array(
      'default' => $speedblog_default['featured_block_author_meta_title'],
      'sanitize_callback' => 'sanitize_text_field',
  )
);
$wp_customize->add_control(
  'speedblog_options[featured_block_author_meta_title]',
  array(
      'label' => __('Author Meta Text', 'speedblog'),
      'section' => 'featured_block',
      'type' => 'text',
  )
);
$wp_customize->add_setting(
  'speedblog_options[enable_featured_block_date_meta]',
  array(
      'default' => $speedblog_default['enable_featured_block_date_meta'],
      'sanitize_callback' => 'speedblog_sanitize_checkbox',
  )
);
$wp_customize->add_control(
  'speedblog_options[enable_featured_block_date_meta]',
  array(
      'label' => esc_html__('Display Published Date', 'speedblog'),
      'section' => 'featured_block',
      'type' => 'checkbox',
  )
);
$wp_customize->add_setting(
  'speedblog_options[select_featured_block_date]',
  array(
      'default' => $speedblog_default['select_featured_block_date'],
      'sanitize_callback' => 'speedblog_sanitize_select',
  )
);
$wp_customize->add_control(
  'speedblog_options[select_featured_block_date]',
  array(
      'label' => esc_html__('Select Single Date Meta', 'speedblog'),
      'section' => 'featured_block',
      'type' => 'select',
      'choices' => speedblog_date_meta(),
  )
);
$wp_customize->add_setting(
  'speedblog_options[select_featured_block_date_meta_title]',
  array(
      'default' => $speedblog_default['select_featured_block_date_meta_title'],
      'sanitize_callback' => 'sanitize_text_field',
  )
);
$wp_customize->add_control(
  'speedblog_options[select_featured_block_date_meta_title]',
  array(
      'label' => __('Date Text', 'speedblog'),
      'section' => 'featured_block',
      'type' => 'text',
  )
);
$wp_customize->add_setting(
  'speedblog_options[select_featured_block_date_format]',
  array(
      'default' => $speedblog_default['select_featured_block_date_format'],
      'sanitize_callback' => 'speedblog_sanitize_select',
  )
);
$wp_customize->add_control(
  'speedblog_options[select_featured_block_date_format]',
  array(
      'label' => esc_html__('Select Date Format', 'speedblog'),
      'section' => 'featured_block',
      'type' => 'select',
      'choices' => speedblog_get_date_formats(),
  )
);

$wp_customize->add_setting(
    'speedblog_options[featured_block_button_title]',
    array(
        'default'           => $speedblog_default['featured_block_button_title'],
        'sanitize_callback' => 'sanitize_text_field',
    )
);
$wp_customize->add_control(
    'speedblog_options[featured_block_button_title]',
    array(
        'label'    => __( 'Button Title', 'speedblog' ),
        'section'  => 'featured_block',
        'type'     => 'text',
    )
);

$wp_customize->add_setting(
    'speedblog_options[featured_block_button_url]',
    array(
        'default'           => $speedblog_default['featured_block_button_url'],
        'sanitize_callback' => 'esc_url_raw',
    )
);
$wp_customize->add_control(
    'speedblog_options[featured_block_button_url]',
    array(
        'label'    => __( 'Button URL', 'speedblog' ),
        'section'  => 'featured_block',
        'type'     => 'text',
    )
);

