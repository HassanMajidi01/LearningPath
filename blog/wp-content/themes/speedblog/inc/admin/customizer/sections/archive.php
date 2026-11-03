<?php
/**
 * All settings related to archive.
 *
 * @package SpeedBlog
 */
$wp_customize->add_section(
	'archive_options',
	array(
		'title' => esc_html__( 'Archive Options', 'speedblog' ),
		'panel' => 'archive_options_panel',
	)
);

// Archive Layout.
$wp_customize->add_setting(
    'speedblog_options[archive_layout]',
    array(
        'default'           => $speedblog_default['archive_layout'],
        'capability'        => 'edit_theme_options',
        'sanitize_callback' => 'speedblog_sanitize_radio'
    )
);

$wp_customize->add_control(
    new SpeedBlog_Custom_Radio_Image_Control(
        $wp_customize,
        'speedblog_options[archive_layout]',
        array(
            'label'         => esc_html__( 'Archive Layout', 'speedblog' ),
            'section'       => 'archive_options',
            'choices'       => speedblog_get_archive_layouts(),
        )
    )
);

$wp_customize->add_setting(
    'speedblog_section_seperator_archive_1',
    array(
        'default'           => '',
        'capability'        => 'edit_theme_options',
        'sanitize_callback' => 'sanitize_text_field'
    )
);

$wp_customize->add_control(
    new SpeedBlog_Seperator_Control(
        $wp_customize,
        'speedblog_section_seperator_archive_1',
        array(
            'label'         => esc_html__( 'Archive Meta Options', 'speedblog' ),
            'settings' => 'speedblog_section_seperator_archive_1',
            'section' => 'archive_options',
        )
    )
);


$wp_customize->add_setting(
    'speedblog_options[archive_posts_title_limit]',
    array(
        'default'           => $speedblog_default['archive_posts_title_limit'],
        'sanitize_callback' => 'speedblog_sanitize_select',
    )
);
$wp_customize->add_control(
    'speedblog_options[archive_posts_title_limit]',
    array(
        'label'    => __( 'Title Line Limit', 'speedblog' ),
        'section'  => 'archive_options',
        'type'     => 'select',
        'choices'  => speedblog_line_limit_choices(),
    )
);


$wp_customize->add_setting(
    'speedblog_options[enable_excerpt_on_archive_1]',
    array(
        'default'           => $speedblog_default['enable_excerpt_on_archive_1'],
        'sanitize_callback' => 'speedblog_sanitize_checkbox',
    )
);
$wp_customize->add_control(
    'speedblog_options[enable_excerpt_on_archive_1]',
    array(
        'label'    => __( 'Enable Excerpt On Archive', 'speedblog' ),
        'section'     => 'archive_options',
        'type'        => 'checkbox',
        'active_callback' => 'speedblog_is_archive_excerpt_callbac_1',

    )
);



$wp_customize->add_setting(
    'speedblog_options[enable_excerpt_on_archive_2]',
    array(
        'default'           => $speedblog_default['enable_excerpt_on_archive_2'],
        'sanitize_callback' => 'speedblog_sanitize_checkbox',
    )
);
$wp_customize->add_control(
    'speedblog_options[enable_excerpt_on_archive_2]',
    array(
        'label'    => __( 'Enable Excerpt On Archive', 'speedblog' ),
        'section'     => 'archive_options',
        'type'        => 'checkbox',
        'active_callback' => 'speedblog_is_archive_excerpt_callbac_2',
        
    )
);

$wp_customize->add_setting(
    'speedblog_options[enable_archive_author_meta]',
    array(
        'default'           => $speedblog_default['enable_archive_author_meta'],
        'sanitize_callback' => 'speedblog_sanitize_checkbox',
    )
);
$wp_customize->add_control(
    'speedblog_options[enable_archive_author_meta]',
    array(
        'label'       => esc_html__( 'Show Author Meta', 'speedblog' ),
        'section'     => 'archive_options',
        'type'        => 'checkbox',
    )
);

$wp_customize->add_setting(
    'speedblog_options[select_author_meta]',
    array(
        'default'           => $speedblog_default['select_author_meta'],
        'sanitize_callback' => 'speedblog_sanitize_select',
    )
);
$wp_customize->add_control(
    'speedblog_options[select_author_meta]',
    array(
        'label'         => esc_html__( 'Author Meta Display Options', 'speedblog' ),
        'section'     => 'archive_options',
        'type'        => 'select',
        'choices'       => speedblog_author_meta(),
        'active_callback' => 'speedblog_is_archive_author_meta_enabled',


    )
);

$wp_customize->add_setting(
    'speedblog_options[archive_author_meta_title]',
    array(
        'default'           => $speedblog_default['archive_author_meta_title'],
        'sanitize_callback' => 'sanitize_text_field',
    )
);
$wp_customize->add_control(
    'speedblog_options[archive_author_meta_title]',
    array(
        'label'    => __( 'Author Meta Text', 'speedblog' ),
        'section'  => 'archive_options',
        'type'     => 'text',
        'active_callback' => function ( $control ) {
            return (
                speedblog_is_archive_author_meta_enabled( $control )
                &&
                speedblog_archive_author_meta_title( $control )
            );
        },
    )
);

$wp_customize->add_setting(
    'speedblog_options[enable_archive_date_meta]',
    array(
        'default'           => $speedblog_default['enable_archive_date_meta'],
        'sanitize_callback' => 'speedblog_sanitize_checkbox',
    )
);
$wp_customize->add_control(
    'speedblog_options[enable_archive_date_meta]',
    array(
        'label'       => esc_html__( 'Show Date Meta', 'speedblog' ),
        'section'     => 'archive_options',
        'type'        => 'checkbox',
    )
);

$wp_customize->add_setting(
    'speedblog_options[select_archive_date]',
    array(
        'default'           => $speedblog_default['select_archive_date'],
        'sanitize_callback' => 'speedblog_sanitize_select',
    )
);
$wp_customize->add_control(
    'speedblog_options[select_archive_date]',
    array(
        'label'         => esc_html__( 'Date Meta Display Options', 'speedblog' ),
        'section'     => 'archive_options',
        'type'        => 'select',
        'choices'       => speedblog_date_meta(),
        'active_callback' => 'speedblog_is_archive_date_meta_enabled',

    )
);

$wp_customize->add_setting(
    'speedblog_options[archive_date_meta_title]',
    array(
        'default'           => $speedblog_default['archive_date_meta_title'],
        'sanitize_callback' => 'sanitize_text_field',
    )
);
$wp_customize->add_control(
    'speedblog_options[archive_date_meta_title]',
    array(
        'label'    => __( 'Date Text', 'speedblog' ),
        'section'  => 'archive_options',
        'type'     => 'text',
        'active_callback' => function ( $control ) {
            return (
                speedblog_is_archive_date_meta_enabled( $control )
                &&
                speedblog_archive_date_meta_title( $control )
            );
        },
    )
);

$wp_customize->add_setting(
    'speedblog_options[select_date_format]',
    array(
        'default'           => $speedblog_default['select_date_format'],
        'sanitize_callback' => 'speedblog_sanitize_select',
    )
);
$wp_customize->add_control(
    'speedblog_options[select_date_format]',
    array(
        'label'         => esc_html__( 'Select Date Format', 'speedblog' ),
        'section'     => 'archive_options',
        'type'        => 'select',
        'choices'  		=> speedblog_get_date_formats(),
        'active_callback' => 'speedblog_is_archive_date_meta_enabled',
    )
);

$wp_customize->add_setting(
    'speedblog_options[enable_category_meta]',
    array(
        'default'           => $speedblog_default['enable_category_meta'],
        'sanitize_callback' => 'speedblog_sanitize_checkbox',
    )
);
$wp_customize->add_control(
    'speedblog_options[enable_category_meta]',
    array(
        'label'       => esc_html__( 'Enable Category Meta', 'speedblog' ),
        'section'     => 'archive_options',
        'type'        => 'checkbox',
    )
);

$wp_customize->add_setting(
    'speedblog_options[number_of_category_to_display]',
    array(
        'default' => $speedblog_default['number_of_category_to_display'],
        'sanitize_callback' => 'absint',
    )
);
$wp_customize->add_control(
    'speedblog_options[number_of_category_to_display]',
    array(
        'label' => __('Number of Category', 'speedblog'),
        'section' => 'archive_options',
        'type' => 'number',
    )
);

$wp_customize->add_setting(
    'speedblog_options[archive_category_label]',
    array(
        'default'           => $speedblog_default['archive_category_label'],
        'sanitize_callback' => 'sanitize_text_field',
    )
);
$wp_customize->add_control(
    'speedblog_options[archive_category_label]',
    array(
        'label'    => __( 'Category Title', 'speedblog' ),
        'section'  => 'archive_options',
        'type'     => 'text',
        'active_callback' => 'speedblog_is_archive_category_meta_enabled',
    )
);

$wp_customize->add_setting(
    'speedblog_options[select_category_color]',
    array(
        'default'           => $speedblog_default['select_category_color'],
        'sanitize_callback' => 'speedblog_sanitize_select',
    )
);
$wp_customize->add_control(
    'speedblog_options[select_category_color]',
    array(
        'label'         => esc_html__( 'Select Category Color', 'speedblog' ),
        'section'     => 'archive_options',
        'type'        => 'select',
        'choices'  		=> speedblog_category_color(),
        'active_callback' => 'speedblog_is_archive_category_meta_enabled',

    )
);

$wp_customize->add_setting(
    'speedblog_options[enable_tag_meta]',
    array(
        'default'           => $speedblog_default['enable_tag_meta'],
        'sanitize_callback' => 'speedblog_sanitize_checkbox',
    )
);
$wp_customize->add_control(
    'speedblog_options[enable_tag_meta]',
    array(
        'label'       => esc_html__( 'Enable Tag Meta', 'speedblog' ),
        'section'     => 'archive_options',
        'type'        => 'checkbox',
    )
);

$wp_customize->add_setting(
    'speedblog_options[enable_comment_meta]',
    array(
        'default'           => $speedblog_default['enable_comment_meta'],
        'sanitize_callback' => 'speedblog_sanitize_checkbox',
    )
);
$wp_customize->add_control(
    'speedblog_options[enable_comment_meta]',
    array(
        'label'       => esc_html__( 'Enable Comment Meta', 'speedblog' ),
        'section'     => 'archive_options',
        'type'        => 'checkbox',
    )
);


$wp_customize->add_setting(
    'speedblog_options[enable_read_time_meta]',
    array(
        'default'           => $speedblog_default['enable_read_time_meta'],
        'sanitize_callback' => 'speedblog_sanitize_checkbox',
    )
);
$wp_customize->add_control(
    'speedblog_options[enable_read_time_meta]',
    array(
        'label'       => esc_html__( 'Enable Read Time', 'speedblog' ),
        'section'     => 'archive_options',
        'type'        => 'checkbox',
    )
);
