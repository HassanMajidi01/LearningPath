<?php
// Popular Posts Options.
$wp_customize->add_section(
    'home_page_popular_post_options',
    array(
        'title' => __('Popular Options', 'speedblog'),
        'panel' => 'header_options_panel',
    )
);
$wp_customize->add_setting(
    'speedblog_options[enable_popular_posts]',
    array(
        'default' => $speedblog_default['enable_popular_posts'],
        'sanitize_callback' => 'speedblog_sanitize_checkbox',
    )
);
$wp_customize->add_control(
    'speedblog_options[enable_popular_posts]',
    array(
        'label' => __('Enable Popular Section', 'speedblog'),
        'section' => 'home_page_popular_post_options',
        'type' => 'checkbox',
    )
);

$wp_customize->add_setting(
    'speedblog_options[enable_popular_only_on_frontpage]',
    array(
        'default' => $speedblog_default['enable_popular_only_on_frontpage'],
        'sanitize_callback' => 'speedblog_sanitize_checkbox',
    )
);
$wp_customize->add_control(
    'speedblog_options[enable_popular_only_on_frontpage]',
    array(
        'label' => __('Display only on the Homepage', 'speedblog'),
        'section' => 'home_page_popular_post_options',
        'type' => 'checkbox',
    )
);


$wp_customize->add_setting(
    'speedblog_options[enable_popular_label]',
    array(
        'default'           => $speedblog_default['enable_popular_label'],
        'sanitize_callback' => 'speedblog_sanitize_checkbox',
    )
);
$wp_customize->add_control(
    'speedblog_options[enable_popular_label]',
    array(
        'label'           => __( 'Enable Popular Label', 'speedblog' ),
        'section'     => 'home_page_popular_post_options',
        'type'        => 'checkbox',
    )
);

// Popular Label Text.
$wp_customize->add_setting(
    'speedblog_options[popular_label_text]',
    array(
        'default'           => $speedblog_default['popular_label_text'],
        'sanitize_callback' => 'sanitize_text_field',
    )
);
$wp_customize->add_control(
    'speedblog_options[popular_label_text]',
    array(
        'label'           => __( 'Popular Label', 'speedblog' ),
        'description'     => __( 'Leave blank to use the default text "Latest".', 'speedblog' ),
        'section'         => 'home_page_popular_post_options',
        'type'            => 'text',
    )
);


// Popular Posts Category.
$wp_customize->add_setting(
    'speedblog_options[popular_post_cat]',
    array(
        'default' => $speedblog_default['popular_post_cat'],
        'sanitize_callback' => 'absint',
    )
);
$wp_customize->add_control(
    new SpeedBlog_Dropdown_Taxonomies_Control(
        $wp_customize,
        'speedblog_options[popular_post_cat]',
        array(
            'label' => __('Choose Category', 'speedblog'),
            'section' => 'home_page_popular_post_options',
        )
    )
);
// No of posts.
$wp_customize->add_setting(
    'speedblog_options[no_of_popular_posts]',
    array(
        'default' => $speedblog_default['no_of_popular_posts'],
        'sanitize_callback' => 'absint',
    )
);
$wp_customize->add_control(
    'speedblog_options[no_of_popular_posts]',
    array(
        'label' => __('Number of Posts', 'speedblog'),
        'section' => 'home_page_popular_post_options',
        'type' => 'number',
    )
);

// No of posts offset.
$wp_customize->add_setting(
    'speedblog_options[popular_posts_number_of_post_offsets]',
    array(
        'default' => $speedblog_default['popular_posts_number_of_post_offsets'],
        'sanitize_callback' => 'absint',
    )
);
$wp_customize->add_control(
    'speedblog_options[popular_posts_number_of_post_offsets]',
    array(
        'label' => __('Post Offset Number', 'speedblog'),
        'section' => 'home_page_popular_post_options',
        'type' => 'number',
    )
);


// Posts Orderby.
$wp_customize->add_setting(
    'speedblog_options[popular_post_orderby]',
    array(
        'default' => $speedblog_default['popular_post_orderby'],
        'sanitize_callback' => 'speedblog_sanitize_select',
    )
);
$wp_customize->add_control(
    'speedblog_options[popular_post_orderby]',
    array(
        'label' => __('Orderby', 'speedblog'),
        'section' => 'home_page_popular_post_options',
        'type' => 'select',
        'choices' => array(
            'date' => __('Date', 'speedblog'),
            'id' => __('ID', 'speedblog'),
            'title' => __('Title', 'speedblog'),
            'rand' => __('Random', 'speedblog'),
        ),
    )
);
// Posts Order.
$wp_customize->add_setting(
    'speedblog_options[popular_post_order]',
    array(
        'default' => $speedblog_default['popular_post_order'],
        'sanitize_callback' => 'speedblog_sanitize_select',
    )
);
$wp_customize->add_control(
    'speedblog_options[popular_post_order]',
    array(
        'label' => __('Order', 'speedblog'),
        'section' => 'home_page_popular_post_options',
        'type' => 'select',
        'choices' => array(
            'asc' => __('ASC', 'speedblog'),
            'desc' => __('DESC', 'speedblog'),
        ),
    )
);
$wp_customize->add_setting(
    'speedblog_options[enable_popular_post_author_meta]',
    array(
        'default' => $speedblog_default['enable_popular_post_author_meta'],
        'sanitize_callback' => 'speedblog_sanitize_checkbox',
    )
);
$wp_customize->add_control(
    'speedblog_options[enable_popular_post_author_meta]',
    array(
        'label' => esc_html__('Display Author Meta', 'speedblog'),
        'section' => 'home_page_popular_post_options',
        'type' => 'checkbox',
    )
);
$wp_customize->add_setting(
    'speedblog_options[select_popular_post_author_meta]',
    array(
        'default' => $speedblog_default['select_popular_post_author_meta'],
        'sanitize_callback' => 'speedblog_sanitize_select',
    )
);
$wp_customize->add_control(
    'speedblog_options[select_popular_post_author_meta]',
    array(
        'label' => esc_html__('Select Author Meta', 'speedblog'),
        'section' => 'home_page_popular_post_options',
        'type' => 'select',
        'choices' => speedblog_author_meta(),
    )
);
$wp_customize->add_setting(
    'speedblog_options[popular_post_author_meta_title]',
    array(
        'default' => $speedblog_default['popular_post_author_meta_title'],
        'sanitize_callback' => 'sanitize_text_field',
    )
);
$wp_customize->add_control(
    'speedblog_options[popular_post_author_meta_title]',
    array(
        'label' => __('Author Meta Text', 'speedblog'),
        'section' => 'home_page_popular_post_options',
        'type' => 'text',
    )
);
$wp_customize->add_setting(
    'speedblog_options[enable_popular_post_date_meta]',
    array(
        'default' => $speedblog_default['enable_popular_post_date_meta'],
        'sanitize_callback' => 'speedblog_sanitize_checkbox',
    )
);
$wp_customize->add_control(
    'speedblog_options[enable_popular_post_date_meta]',
    array(
        'label' => esc_html__('Display Published Date', 'speedblog'),
        'section' => 'home_page_popular_post_options',
        'type' => 'checkbox',
    )
);
$wp_customize->add_setting(
    'speedblog_options[select_popular_post_date]',
    array(
        'default' => $speedblog_default['select_popular_post_date'],
        'sanitize_callback' => 'speedblog_sanitize_select',
    )
);
$wp_customize->add_control(
    'speedblog_options[select_popular_post_date]',
    array(
        'label' => esc_html__('Select Date Meta', 'speedblog'),
        'section' => 'home_page_popular_post_options',
        'type' => 'select',
        'choices' => speedblog_date_meta(),
    )
);
$wp_customize->add_setting(
    'speedblog_options[select_popular_post_date_meta_title]',
    array(
        'default' => $speedblog_default['select_popular_post_date_meta_title'],
        'sanitize_callback' => 'sanitize_text_field',
    )
);
$wp_customize->add_control(
    'speedblog_options[select_popular_post_date_meta_title]',
    array(
        'label' => __('Date Meta Text', 'speedblog'),
        'section' => 'home_page_popular_post_options',
        'type' => 'text',
    )
);
$wp_customize->add_setting(
    'speedblog_options[select_popular_post_date_format]',
    array(
        'default' => $speedblog_default['select_popular_post_date_format'],
        'sanitize_callback' => 'speedblog_sanitize_select',
    )
);
$wp_customize->add_control(
    'speedblog_options[select_popular_post_date_format]',
    array(
        'label' => esc_html__('Select Date Format', 'speedblog'),
        'section' => 'home_page_popular_post_options',
        'type' => 'select',
        'choices' => speedblog_get_date_formats(),
    )
);

$wp_customize->add_setting(
    'speedblog_options[enable_popular_category_meta]',
    array(
        'default' => $speedblog_default['enable_popular_category_meta'],
        'sanitize_callback' => 'speedblog_sanitize_checkbox',
    )
);
$wp_customize->add_control(
    'speedblog_options[enable_popular_category_meta]',
    array(
        'label' => esc_html__('Enable Category Meta', 'speedblog'),
        'section' => 'home_page_popular_post_options',
        'type' => 'checkbox',
    )
);
$wp_customize->add_setting(
    'speedblog_options[select_popular_number_of_category]',
    array(
        'default' => $speedblog_default['select_popular_number_of_category'],
        'sanitize_callback' => 'absint',
    )
);
$wp_customize->add_control(
    'speedblog_options[select_popular_number_of_category]',
    array(
        'label' => __('Number of Category', 'speedblog'),
        'section' => 'home_page_popular_post_options',
        'type' => 'number',
    )
);

$wp_customize->add_setting(
    'speedblog_options[popular_post_offset_number]',
    array(
        'default' => $speedblog_default['popular_post_offset_number'],
        'sanitize_callback' => 'absint',
    )
);
$wp_customize->add_control(
    'speedblog_options[popular_post_offset_number]',
    array(
        'label' => __('Post Offset', 'speedblog'),
        'section' => 'home_page_popular_post_options',
        'type' => 'number',
    )
);

$wp_customize->add_setting(
    'speedblog_options[popular_category_label]',
    array(
        'default' => $speedblog_default['popular_category_label'],
        'sanitize_callback' => 'sanitize_text_field',
    )
);
$wp_customize->add_control(
    'speedblog_options[popular_category_label]',
    array(
        'label' => __('Category Label', 'speedblog'),
        'section' => 'home_page_popular_post_options',
        'type' => 'text',
    )
);

$wp_customize->add_setting(
    'speedblog_options[select_popular_category_color]',
    array(
        'default' => $speedblog_default['select_popular_category_color'],
        'sanitize_callback' => 'speedblog_sanitize_select',
    )
);
$wp_customize->add_control(
    'speedblog_options[select_popular_category_color]',
    array(
        'label' => esc_html__('Select Category Color', 'speedblog'),
        'section' => 'home_page_popular_post_options',
        'type' => 'select',
        'choices' => speedblog_category_color(),
    )
);

// Enable  Autoplay.
$wp_customize->add_setting(
    'speedblog_options[enable_popular_post_autoplay]',
    array(
        'default' => $speedblog_default['enable_popular_post_autoplay'],
        'sanitize_callback' => 'speedblog_sanitize_checkbox',
    )
);
$wp_customize->add_control(
    'speedblog_options[enable_popular_post_autoplay]',
    array(
        'label' => __('Enable Autoplay', 'speedblog'),
        'section' => 'home_page_popular_post_options',
        'type' => 'checkbox',
        'active_callback' => 'speedblog_is_popular_post_enabled',
    )
);
$wp_customize->add_setting(
    'speedblog_options[enable_popular_post_arrows]',
    array(
        'default' => $speedblog_default['enable_popular_post_arrows'],
        'sanitize_callback' => 'speedblog_sanitize_checkbox',
    )
);
$wp_customize->add_control(
    'speedblog_options[enable_popular_post_arrows]',
    array(
        'label' => __('Enable Arrows', 'speedblog'),
        'section' => 'home_page_popular_post_options',
        'type' => 'checkbox',
        'active_callback' => 'speedblog_is_popular_post_enabled',
    )
);
$wp_customize->add_setting(
    'speedblog_options[enable_popular_post_dots]',
    array(
        'default' => $speedblog_default['enable_popular_post_dots'],
        'sanitize_callback' => 'speedblog_sanitize_checkbox',
    )
);
$wp_customize->add_control(
    'speedblog_options[enable_popular_post_dots]',
    array(
        'label' => __('Enable Dots', 'speedblog'),
        'section' => 'home_page_popular_post_options',
        'type' => 'checkbox',
        'active_callback' => 'speedblog_is_popular_post_enabled',
    )
);
