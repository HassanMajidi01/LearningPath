<?php
/**
 * All settings related to article list.
 *
 * @package SpeedBlog
 */
$wp_customize->add_section(
	'article_list',
	array(
		'title' => esc_html__( 'Article List Section', 'speedblog' ),
		'panel' => 'front_page_theme_options_panel',
	)
);

$wp_customize->add_setting(
    'speedblog_options[enable_article_list_section]',
    array(
        'default'           => $speedblog_default['enable_article_list_section'],
        'sanitize_callback' => 'speedblog_sanitize_checkbox',
    )
);
$wp_customize->add_control(
    'speedblog_options[enable_article_list_section]',
    array(
        'label'       => esc_html__( 'Enable Article List', 'speedblog' ),
        'section'     => 'article_list',
        'type'        => 'checkbox',
    )
);


$wp_customize->add_setting(
    'speedblog_options[article_list_post_title]',
    array(
        'default'           => $speedblog_default['article_list_post_title'],
        'sanitize_callback' => 'sanitize_text_field',
    )
);
$wp_customize->add_control(
    'speedblog_options[article_list_post_title]',
    array(
        'label'    => __( 'Section Title', 'speedblog' ),
        'section'  => 'article_list',
        'type'     => 'text',
    )
);

$wp_customize->add_setting(
    'speedblog_options[article_list_post_sub_title]',
    array(
        'default'           => $speedblog_default['article_list_post_sub_title'],
        'sanitize_callback' => 'sanitize_text_field',
    )
);
$wp_customize->add_control(
    'speedblog_options[article_list_post_sub_title]',
    array(
        'label'    => __( 'Section Sub-Title', 'speedblog' ),
        'section'  => 'article_list',
        'type'     => 'text',
    )
);



$wp_customize->add_setting(
    'speedblog_options[article_list_post_category]',
    array(
        'default'           => $speedblog_default['article_list_post_category'],
        'sanitize_callback' => 'absint',
    )
);
$wp_customize->add_control(
    new SpeedBlog_Dropdown_Taxonomies_Control(
        $wp_customize,
        'speedblog_options[article_list_post_category]',
        array(
            'label'           => __( 'Choose Post Category', 'speedblog' ),
            'description'     => __( 'Leave Empty if you don\'t want the posts to be category specific', 'speedblog' ),
            'section'         => 'article_list',
        )
    )
);


$wp_customize->add_setting(
    'speedblog_section_seperator_article_list_column_1',
    array(
        'default'           => '',
        'capability'        => 'edit_theme_options',
        'sanitize_callback' => 'sanitize_text_field'
    )
);

$wp_customize->add_control(
    new SpeedBlog_Seperator_Control(
        $wp_customize,
        'speedblog_section_seperator_article_list_column_1',
        array(
            'label'         => esc_html__( 'Article List', 'speedblog' ),
            'settings' => 'speedblog_section_seperator_article_list_column_1',
            'section' => 'article_list',
        )
    )
);

$wp_customize->add_setting(
    'speedblog_options[enable_article_list_author_meta]',
    array(
        'default' => $speedblog_default['enable_article_list_author_meta'],
        'sanitize_callback' => 'speedblog_sanitize_checkbox',
    )
);
$wp_customize->add_control(
    'speedblog_options[enable_article_list_author_meta]',
    array(
        'label' => esc_html__('Display Author Meta', 'speedblog'),
        'section' => 'article_list',
        'type' => 'checkbox',
    )
);
$wp_customize->add_setting(
    'speedblog_options[select_article_list_author_meta]',
    array(
        'default' => $speedblog_default['select_article_list_author_meta'],
        'sanitize_callback' => 'speedblog_sanitize_select',
    )
);
$wp_customize->add_control(
    'speedblog_options[select_article_list_author_meta]',
    array(
        'label' => esc_html__('Select Author Meta', 'speedblog'),
        'section' => 'article_list',
        'type' => 'select',
        'choices' => speedblog_author_meta(),
    )
);
$wp_customize->add_setting(
    'speedblog_options[article_list_author_meta_title]',
    array(
        'default' => $speedblog_default['article_list_author_meta_title'],
        'sanitize_callback' => 'sanitize_text_field',
    )
);
$wp_customize->add_control(
    'speedblog_options[article_list_author_meta_title]',
    array(
        'label' => __('Author Meta Text', 'speedblog'),
        'section' => 'article_list',
        'type' => 'text',
    )
);
$wp_customize->add_setting(
    'speedblog_options[enable_article_list_date_meta]',
    array(
        'default' => $speedblog_default['enable_article_list_date_meta'],
        'sanitize_callback' => 'speedblog_sanitize_checkbox',
    )
);
$wp_customize->add_control(
    'speedblog_options[enable_article_list_date_meta]',
    array(
        'label' => esc_html__('Display Published Date', 'speedblog'),
        'section' => 'article_list',
        'type' => 'checkbox',
    )
);
$wp_customize->add_setting(
    'speedblog_options[select_article_list_date]',
    array(
        'default' => $speedblog_default['select_article_list_date'],
        'sanitize_callback' => 'speedblog_sanitize_select',
    )
);
$wp_customize->add_control(
    'speedblog_options[select_article_list_date]',
    array(
        'label' => esc_html__('Select Single Date Meta', 'speedblog'),
        'section' => 'article_list',
        'type' => 'select',
        'choices' => speedblog_date_meta(),
    )
);
$wp_customize->add_setting(
    'speedblog_options[select_article_list_date_meta_title]',
    array(
        'default' => $speedblog_default['select_article_list_date_meta_title'],
        'sanitize_callback' => 'sanitize_text_field',
    )
);
$wp_customize->add_control(
    'speedblog_options[select_article_list_date_meta_title]',
    array(
        'label' => __('Date Text', 'speedblog'),
        'section' => 'article_list',
        'type' => 'text',
    )
);
$wp_customize->add_setting(
    'speedblog_options[select_article_list_date_format]',
    array(
        'default' => $speedblog_default['select_article_list_date_format'],
        'sanitize_callback' => 'speedblog_sanitize_select',
    )
);
$wp_customize->add_control(
    'speedblog_options[select_article_list_date_format]',
    array(
        'label' => esc_html__('Select Date Format', 'speedblog'),
        'section' => 'article_list',
        'type' => 'select',
        'choices' => speedblog_get_date_formats(),
    )
);
$wp_customize->add_setting(
    'speedblog_options[enable_article_list_category_meta]',
    array(
        'default' => $speedblog_default['enable_article_list_category_meta'],
        'sanitize_callback' => 'speedblog_sanitize_checkbox',
    )
);
$wp_customize->add_control(
    'speedblog_options[enable_article_list_category_meta]',
    array(
        'label' => esc_html__('Enable Category Meta', 'speedblog'),
        'section' => 'article_list',
        'type' => 'checkbox',
    )
);
$wp_customize->add_setting(
    'speedblog_options[select_article_list_number_of_category]',
    array(
        'default' => $speedblog_default['select_article_list_number_of_category'],
        'sanitize_callback' => 'absint',
    )
);
$wp_customize->add_control(
    'speedblog_options[select_article_list_number_of_category]',
    array(
        'label' => __('Number of Category', 'speedblog'),
        'section' => 'article_list',
        'type' => 'number',
    )
);
$wp_customize->add_setting(
    'speedblog_options[article_list_category_label]',
    array(
        'default' => $speedblog_default['article_list_category_label'],
        'sanitize_callback' => 'sanitize_text_field',
    )
);
$wp_customize->add_control(
    'speedblog_options[article_list_category_label]',
    array(
        'label' => __('Category Label', 'speedblog'),
        'section' => 'article_list',
        'type' => 'text',
    )
);

$wp_customize->add_setting(
    'speedblog_options[select_article_list_category_color]',
    array(
        'default' => $speedblog_default['select_article_list_category_color'],
        'sanitize_callback' => 'speedblog_sanitize_select',
    )
);
$wp_customize->add_control(
    'speedblog_options[select_article_list_category_color]',
    array(
        'label' => esc_html__('Select Category Color', 'speedblog'),
        'section' => 'article_list',
        'type' => 'select',
        'choices' => speedblog_category_color(),
    )
);



$wp_customize->add_setting(
    'speedblog_options[article_list_post_button_title]',
    array(
        'default'           => $speedblog_default['article_list_post_button_title'],
        'sanitize_callback' => 'sanitize_text_field',
    )
);
$wp_customize->add_control(
    'speedblog_options[article_list_post_button_title]',
    array(
        'label'    => __( 'Button Title', 'speedblog' ),
        'section'  => 'article_list',
        'type'     => 'text',
    )
);

$wp_customize->add_setting(
    'speedblog_options[article_list_post_button_url]',
    array(
        'default'           => $speedblog_default['article_list_post_button_url'],
        'sanitize_callback' => 'esc_url_raw',
    )
);
$wp_customize->add_control(
    'speedblog_options[article_list_post_button_url]',
    array(
        'label'    => __( 'Button URL', 'speedblog' ),
        'section'  => 'article_list',
        'type'     => 'text',
    )
);
