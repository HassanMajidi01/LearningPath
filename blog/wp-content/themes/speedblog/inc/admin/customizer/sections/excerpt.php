<?php
$wp_customize->add_section(
    'pagination_options',
    array(
        'title' => esc_html__( 'Pagination Options', 'speedblog' ),
        'panel' => 'archive_options_panel',
    )
);


$wp_customize->add_setting(
    'speedblog_options[select_pagination_style]',
    array(
        'default'           => $speedblog_default['select_pagination_style'],
        'sanitize_callback' => 'speedblog_sanitize_select',
    )
);
$wp_customize->add_control(
    'speedblog_options[select_pagination_style]',
    array(
        'label'         => esc_html__( 'Select Pagination Style', 'speedblog' ),
        'section'     => 'pagination_options',
        'type'        => 'select',
        'choices'       => speedblog_pagination_style_choice(),

    )
);


$wp_customize->add_section(
    'excerpt_options',
    array(
        'title' => esc_html__( 'Excerpt Options', 'speedblog' ),
        'panel' => 'archive_options_panel',
    )
);

$wp_customize->add_setting(
    'speedblog_options[number_of_word_in_excerpt]',
    array(
        'default'           => $speedblog_default['number_of_word_in_excerpt'],
        'sanitize_callback' => 'absint',
    )
);
$wp_customize->add_control(
    'speedblog_options[number_of_word_in_excerpt]',
    array(
        'label'         => esc_html__( 'Number Of Excerpt Word', 'speedblog' ),
        'section'     => 'excerpt_options',
        'type'        => 'number',

    )
);


$wp_customize->add_setting(
    'speedblog_options[excerpt_posts_title_limit]',
    array(
        'default'           => $speedblog_default['excerpt_posts_title_limit'],
        'sanitize_callback' => 'speedblog_sanitize_select',
    )
);
$wp_customize->add_control(
    'speedblog_options[excerpt_posts_title_limit]',
    array(
        'label'    => __( 'Excerpt Line Limit', 'speedblog' ),
        'section'  => 'excerpt_options',
        'type'     => 'select',
        'choices'  => speedblog_line_limit_choices(),
    )
);

$wp_customize->add_setting(
    'speedblog_options[archive_excerpt_button_text]',
    array(
        'default'           => $speedblog_default['archive_excerpt_button_text'],
        'sanitize_callback' => 'sanitize_text_field',
    )
);
$wp_customize->add_control(
    'speedblog_options[archive_excerpt_button_text]',
    array(
        'label'    => __( 'Excerpt Button Text', 'speedblog' ),
        'section'  => 'excerpt_options',
        'type'     => 'text',
    )
);