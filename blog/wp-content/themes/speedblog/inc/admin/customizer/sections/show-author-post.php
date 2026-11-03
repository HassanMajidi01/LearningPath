<?php
$wp_customize->add_section(
    'single_author_options',
    array(
        'title' => esc_html__( 'Single Author Post Options', 'speedblog' ),
        'panel' => 'single_options_panel',
    )
);
/*Show Author Posts
*-----------------------------------------*/
$wp_customize->add_setting(
    'speedblog_options[show_author_posts]',
    array(
        'default'           => $speedblog_default['show_author_posts'],
        'sanitize_callback' => 'speedblog_sanitize_checkbox',
    )
);
$wp_customize->add_control(
    'speedblog_options[show_author_posts]',
    array(
        'label'    => __( 'Show Author Posts', 'speedblog' ),
        'section'  => 'single_author_options',
        'type'     => 'checkbox',
    )
);

/*Author Posts Text.*/
$wp_customize->add_setting(
    'speedblog_options[author_posts_text]',
    array(
        'default'           => $speedblog_default['author_posts_text'],
        'sanitize_callback' => 'sanitize_text_field',
    )
);
$wp_customize->add_control(
    'speedblog_options[author_posts_text]',
    array(
        'label'    => __( 'Author Posts Text', 'speedblog' ),
        'section'  => 'single_author_options',
        'type'     => 'text',
    )
);

/* Number of Author Posts */
$wp_customize->add_setting(
    'speedblog_options[no_of_author_posts]',
    array(
        'default'           => $speedblog_default['no_of_author_posts'],
        'sanitize_callback' => 'absint',
    )
);
$wp_customize->add_control(
    'speedblog_options[no_of_author_posts]',
    array(
        'label'       => __( 'Number of Author Posts', 'speedblog' ),
        'section'     => 'single_author_options',
        'type'        => 'number',
    )
);

/*Author Posts Orderby*/
$wp_customize->add_setting(
    'speedblog_options[author_posts_orderby]',
    array(
        'default'           => $speedblog_default['author_posts_orderby'],
        'sanitize_callback' => 'speedblog_sanitize_select',
    )
);
$wp_customize->add_control(
    'speedblog_options[author_posts_orderby]',
    array(
        'label'       => __( 'Orderby', 'speedblog' ),
        'section'     => 'single_author_options',
        'type'        => 'select',
        'choices' => array(
            'date' => __('Date', 'speedblog'),
            'id' => __('ID', 'speedblog'),
            'title' => __('Title', 'speedblog'),
            'rand' => __('Random', 'speedblog'),
        ),
    )
);

/*Author Posts Order*/
$wp_customize->add_setting(
    'speedblog_options[author_posts_order]',
    array(
        'default'           => $speedblog_default['author_posts_order'],
        'sanitize_callback' => 'speedblog_sanitize_select',
    )
);
$wp_customize->add_control(
    'speedblog_options[author_posts_order]',
    array(
        'label'       => __( 'Order', 'speedblog' ),
        'section'     => 'single_author_options',
        'type'        => 'select',
        'choices' => array(
            'asc' => __('ASC', 'speedblog'),
            'desc' => __('DESC', 'speedblog'),
        ),
    )
);



$wp_customize->add_setting(
    'speedblog_options[enable_author_posts_author_meta]',
    array(
        'default'           => $speedblog_default['enable_author_posts_author_meta'],
        'sanitize_callback' => 'speedblog_sanitize_checkbox',
    )
);
$wp_customize->add_control(
    'speedblog_options[enable_author_posts_author_meta]',
    array(
        'label'       => esc_html__( 'Show Author Meta', 'speedblog' ),
        'section'     => 'single_author_options',
        'type'        => 'checkbox',
    )
);

$wp_customize->add_setting(
    'speedblog_options[select_author_posts_author_meta]',
    array(
        'default'           => $speedblog_default['select_author_posts_author_meta'],
        'sanitize_callback' => 'speedblog_sanitize_select',
    )
);
$wp_customize->add_control(
    'speedblog_options[select_author_posts_author_meta]',
    array(
        'label'         => esc_html__( 'Author Meta Display Options', 'speedblog' ),
        'section'     => 'single_author_options',
        'type'        => 'select',
        'choices'       => speedblog_author_meta(),


    )
);

$wp_customize->add_setting(
    'speedblog_options[author_posts_author_meta_title]',
    array(
        'default'           => $speedblog_default['author_posts_author_meta_title'],
        'sanitize_callback' => 'sanitize_text_field',
    )
);
$wp_customize->add_control(
    'speedblog_options[author_posts_author_meta_title]',
    array(
        'label'    => __( 'Author Meta Text', 'speedblog' ),
        'section'  => 'single_author_options',
        'type'     => 'text',
    )
);

$wp_customize->add_setting(
    'speedblog_options[enable_author_posts_date_meta]',
    array(
        'default'           => $speedblog_default['enable_author_posts_date_meta'],
        'sanitize_callback' => 'speedblog_sanitize_checkbox',
    )
);
$wp_customize->add_control(
    'speedblog_options[enable_author_posts_date_meta]',
    array(
        'label'       => esc_html__( 'Display Published Date', 'speedblog' ),
        'section'     => 'single_author_options',
        'type'        => 'checkbox',
    )
);

$wp_customize->add_setting(
    'speedblog_options[select_author_posts_date]',
    array(
        'default'           => $speedblog_default['select_author_posts_date'],
        'sanitize_callback' => 'speedblog_sanitize_select',
    )
);
$wp_customize->add_control(
    'speedblog_options[select_author_posts_date]',
    array(
        'label'         => esc_html__( 'Select Single Date Meta', 'speedblog' ),
        'section'     => 'single_author_options',
        'type'        => 'select',
        'choices'       => speedblog_date_meta(),

    )
);

$wp_customize->add_setting(
    'speedblog_options[single_related_post_date_meta_title]',
    array(
        'default'           => $speedblog_default['single_related_post_date_meta_title'],
        'sanitize_callback' => 'sanitize_text_field',
    )
);
$wp_customize->add_control(
    'speedblog_options[single_related_post_date_meta_title]',
    array(
        'label'    => __( 'Date Text', 'speedblog' ),
        'section'  => 'single_author_options',
        'type'     => 'text',
    )
);

$wp_customize->add_setting(
    'speedblog_options[select_author_posts_date_format]',
    array(
        'default'           => $speedblog_default['select_author_posts_date_format'],
        'sanitize_callback' => 'speedblog_sanitize_select',
    )
);
$wp_customize->add_control(
    'speedblog_options[select_author_posts_date_format]',
    array(
        'label'         => esc_html__( 'Select Date Format', 'speedblog' ),
        'section'     => 'single_author_options',
        'type'        => 'select',
        'choices'       => speedblog_get_date_formats(),
    )
);

$wp_customize->add_setting(
    'speedblog_options[enable_author_posts_category_meta]',
    array(
        'default'           => $speedblog_default['enable_author_posts_category_meta'],
        'sanitize_callback' => 'speedblog_sanitize_checkbox',
    )
);
$wp_customize->add_control(
    'speedblog_options[enable_author_posts_category_meta]',
    array(
        'label'       => esc_html__( 'Enable Category Meta', 'speedblog' ),
        'section'     => 'single_author_options',
        'type'        => 'checkbox',
    )
);

$wp_customize->add_setting(
    'speedblog_options[select_author_posts_number_of_category]',
    array(
        'default'           => $speedblog_default['select_author_posts_number_of_category'],
        'sanitize_callback' => 'absint',
    )
);
$wp_customize->add_control(
    'speedblog_options[select_author_posts_number_of_category]',
    array(
        'label'       => __( 'Number of Category', 'speedblog' ),
        'section'     => 'single_related_options',
        'type'        => 'number',
    )
);

$wp_customize->add_setting(
    'speedblog_options[author_posts_category_label]',
    array(
        'default'           => $speedblog_default['author_posts_category_label'],
        'sanitize_callback' => 'sanitize_text_field',
    )
);
$wp_customize->add_control(
    'speedblog_options[author_posts_category_label]',
    array(
        'label'    => __( 'Category Label', 'speedblog' ),
        'section'  => 'single_author_options',
        'type'     => 'text',
    )
);

$wp_customize->add_setting(
    'speedblog_options[select_author_posts_category_color]',
    array(
        'default'           => $speedblog_default['select_author_posts_category_color'],
        'sanitize_callback' => 'speedblog_sanitize_select',
    )
);
$wp_customize->add_control(
    'speedblog_options[select_author_posts_category_color]',
    array(
        'label'         => esc_html__( 'Select Category Color', 'speedblog' ),
        'section'     => 'single_author_options',
        'type'        => 'select',
        'choices'       => speedblog_category_color(),

    )
);
