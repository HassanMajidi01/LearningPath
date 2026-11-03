<?php
if (!is_child_theme()) {
    $theme = wp_get_theme();
} else {
    $theme = wp_get_theme()->parent();
}
$link_icon = '<span class="svg-external-link"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10"><path fill="currentColor" d="M9.08379 0.492193L2.17293 0.442474C1.87462 0.442474 1.6426 0.674494 1.6426 0.972805C1.6426 1.27112 1.87462 1.50313 2.17293 1.50313L7.79111 1.55285L0.747666 8.5963C0.548792 8.79517 0.548792 9.12663 0.747666 9.3255C0.94654 9.52438 1.29457 9.54095 1.49344 9.34208L8.57003 2.26548L8.61975 7.94996C8.61975 8.24827 8.85177 8.48029 9.15008 8.48029C9.28267 8.48029 9.41525 8.414 9.51469 8.31456C9.61412 8.21513 9.68041 8.08254 9.66384 7.93339L9.61412 1.02252C9.61412 0.724212 9.3821 0.492193 9.08379 0.492193Z"/></svg></span>';
$star_icon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M24,9l-19.655,15l2.821,-8.866l-7.166,-6.134l9.153,0l2.846,-9l2.853,9l9.148,0Zm-4.216,15l-6.361,-4.429l3.872,-2.96l2.489,7.389Z" /></svg>';

$admin_url = admin_url();
function import_button_html()
{
    // Check if the plugin is installed and not activated
    if (file_exists(WP_PLUGIN_DIR . '/mailchimp-for-wp/mailchimp-for-wp.php') && is_plugin_inactive('mailchimp-for-wp/mailchimp-for-wp.php')) {
        $speedblog_btn_texts = __('Activate MC4WP: Mailchimp for WordPress', 'speedblog');
        $button_url = $admin_url . 'plugins.php?action=activate&plugin=mailchimp-for-wp/mailchimp-for-wp.php&plugin_status=all&paged=1&s&_wpnonce=' . wp_create_nonce('activate-plugin_mailchimp-for-wp/mailchimp-for-wp.php');
    }
    // Check if the plugin is not installed
    elseif (!file_exists(WP_PLUGIN_DIR . '/wpinterface-add-ons/wpinterface-add-ons.php')&& is_plugin_inactive('wpinterface-add-ons/wpinterface-add-ons.php')) {
        $speedblog_btn_texts = __('Install WpInterface Add-Ons', 'speedblog');
        $button_url = $admin_url . 'plugin-install.php?s=wpinterface-add-ons&tab=search&type=term';
    }
    // Default to view starter templates
    else {
        $speedblog_btn_texts = __('View Starter Templates', 'speedblog');
        $button_url = '#'; // Replace with the actual URL for viewing starter templates
    }

    $html = '<a class="btn-get-started" href="' . esc_url($button_url) . '" data-name="' . esc_attr('mailchimp-for-wp') . '" data-slug="' . esc_attr('mailchimp-for-wp') . '" aria-label="' . esc_attr($speedblog_btn_texts) . '">' . esc_html($speedblog_btn_texts) . '</a>';
    return $html;
}

?>
    <div class="speedblog-dashboard-content">
        <div class="dashboard-content-panel content-panel-upper">
            <div class="postbox">
                <div class="inside speedblog-dashboard-welcome">
                    <div class="speedblog-notice-left">
                        <h2 class="speedblog-notice-heading">
                            <?php
                            printf(
                                esc_html__('Start Building with SpeedBlog!', 'speedblog')
                            );
                            ?>
                        </h2>
                        <p>
                            <?php esc_html_e('Experience effortless magazine-themed website creation with SpeedBlog! Explore all the settings and features here.', 'speedblog'); ?>
                        </p>

                        <div class="dashboard-button-group">
                            <?php if (!$this->pro_status) { ?>
                                <a href="<?php echo esc_url($this->theme_url); ?>#choose-pricing-plan"
                                   class="button button-secondary dashboard-button dashboard-button-primary"
                                   target="_blank">
                                    <?php esc_html_e('Upgrade to Pro', 'speedblog'); ?>
                                </a>
                            <?php } ?>
                            <a href="<?php echo esc_url($this->preview_url); ?>"
                               class="button button-secondary dashboard-button dashboard-button-secondary"
                               target="_blank">
                                <?php esc_html_e('Live Preview', 'speedblog'); ?>
                            </a>

                        </div>

                    </div>
                </div>
            </div>
        </div>
        <div class="dashboard-content-panel content-panel-lower">
            <div class="dashboard-content-left">
                <div class="postbox speedblog-quick-settings">
                    <div class="postbox-header">
                        <h2 class="hndle ui-sortable-handle"><?php esc_html_e('Quick Settings', 'speedblog'); ?></h2>
                        <a href="<?php echo esc_url(' ' . $admin_url . 'customize.php?'); ?>"
                           class="hndle-controller speedblog-link" target="_blank">
                            <?php echo 'Visit Customizer' . $link_icon; ?>
                        </a>
                    </div>
                    <div class="inside speedblog-available-settings">
                        <?php
                        // Array of settings items
                        $settings_items = array(
                            array(
                                'title' => esc_html__('Site Identity', 'speedblog'),
                                'type' => 'section',
                                'id' => 'title_tagline',
                            ),
                            array(
                                'title' => esc_html__('Header Options', 'speedblog'),
                                'type' => 'panel',
                                'id' => 'header_options_panel',
                            ),
                            array(
                                'title' => esc_html__('Footer Options', 'speedblog'),
                                'type' => 'panel',
                                'id' => 'footer_options_panel',
                            ),
                            array(
                                'title' => esc_html__('Preloader Options', 'speedblog'),
                                'type' => 'section',
                                'id' => 'preloader_options',
                            ),
                            array(
                                'title' => esc_html__('Archive Options', 'speedblog'),
                                'type' => 'panel',
                                'id' => 'archive_options_panel',
                            ),
                            array(
                                'title' => esc_html__('Single Options', 'speedblog'),
                                'type' => 'panel',
                                'id' => 'single_options_panel',
                            ),
                        );
                        // Loop through the settings items
                        foreach ($settings_items as $item) {
                            ?>
                            <div class="speedblog-features-list speedblog-free-options">
                                <h4><?php echo esc_html($item['title']); ?></h4>
                                <a href="<?php if (isset($item['type'])) {
                                    echo admin_url('customize.php?autofocus[' . $item['type'] . ']=' . $item['id']);
                                } ?>" class="speedblog-link" target="_blank">
                                    <?php echo 'Customize' . $link_icon; ?>
                                </a>
                            </div>
                            <?php
                        }
                        ?>
                    </div>
                </div>
                <div class="postbox speedblog-premium-settings">
                    <div class="postbox-header">
                        <h2 class="hndle ui-sortable-handle"><?php esc_html_e('Premium Features', 'speedblog'); ?></h2>
                        <?php if (!$this->pro_status) { ?>
                            <a href="<?php echo esc_url($this->theme_url); ?>#choose-pricing-plan"
                               class="hndle-controller speedblog-link" target="_blank">
                                <?php echo 'Upgrade Now' . $link_icon; ?>
                            </a>
                        <?php } ?>
                    </div>
                    <div class="inside speedblog-unavailable-settings">
                        <?php
                        // Array of premium features items
                        $premium_features_items = array(
                            array(
                                'title' => esc_html__('Font Options', 'speedblog'),
                                'link' => 'https://docs.wpinterface.com/docs/font-options/',
                            ),
                            array(
                                'title' => esc_html__('Webmaster Tools', 'speedblog'),
                                'link' => 'https://docs.wpinterface.com/docs/webmaster-tools/',
                            ),
                            array(
                                'title' => esc_html__('Advanced Color options', 'speedblog'),
                                'link' => 'https://docs.wpinterface.com/docs/color-options/',
                            ),
                            array(
                                'title' => esc_html__('Social Share', 'speedblog'),
                                'link' => 'https://docs.wpinterface.com/docs/social-share/',
                            ),
                            array(
                                'title' => esc_html__('Reaction Add-Ons', 'speedblog'),
                                'link' => 'https://docs.wpinterface.com/docs/reaction-add-ons/',
                            ),
                            array(
                                'title' => esc_html__('Remove Theme Credit', 'speedblog'),
                                'link' => 'https://docs.wpinterface.com/docs/remove-theme-credit/',
                            ),
                            array(
                                'title' => esc_html__('Extra Widget Area', 'speedblog'),
                                'link' => 'https://docs.wpinterface.com/docs/extra-widget-area/',
                            ),
                            array(
                                'title' => esc_html__('Modal Popup Module', 'speedblog'),
                                'link' => 'https://docs.wpinterface.com/docs/modal-popup-module/',
                            ),
                            array(
                                'title' => esc_html__('Extra Customizer Sections', 'speedblog'),
                                'link' => 'https://docs.wpinterface.com/docs/extra-customizer-sections/',
                            ),
                            array(
                                'title' => esc_html__('Offcanvas Content Module', 'speedblog'),
                                'link' => 'https://docs.wpinterface.com/docs/offcanvas-content-module/',
                            ),
                            array(
                                'title' => esc_html__('Instagram Widget', 'speedblog'),
                                'link' => 'https://docs.wpinterface.com/docs/instagram-widget/',
                            ),
                            array(
                                'title' => esc_html__('FSE Support', 'speedblog'),
                                'link' => 'https://docs.wpinterface.com/docs/fse-support/',
                            ),
                            // Add more items as needed
                        );
                        // Loop through the premium features items
                        foreach ($premium_features_items as $item) {
                            ?>
                            <div class="speedblog-features-list speedblog-premium-features">
                                <div class="item-content-left">
                                    <h4><?php echo esc_html($item['title']); ?></h4>
                                    <a href="<?php if (isset($item['link'])) {
                                        echo esc_url($item['link']);
                                    } ?>" class="speedblog-link" target="_blank">
                                        <?php echo 'Documentation' . $link_icon; ?>
                                    </a>
                                </div>
                                <div class="item-content-right">
                                    <img class="speedblog-premium-badge"
                                         src="<?php echo esc_url(SPEEDBLOG_PARENT_URL . '/inc/admin/dashboard/images/badge.webp'); ?>"
                                         alt="<?php esc_attr_e('SpeedBlog', 'speedblog'); ?>">
                                </div>
                            </div>
                            <?php
                        }
                        ?>
                    </div>
                </div>
            </div>
            <div class="dashboard-content-right">
                <div class="postbox speedblog-postbox-documentation">
                    <div class="postbox-header">
                        <h3 class="hndle ui-sortable-handle">
                            <?php esc_html_e('Documentation', 'speedblog'); ?>
                        </h3>
                        <div class="hndle-controller">
                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20"
                                 fill="none">
                                <path d="M12.584 1.66602H5.50065C5.05862 1.66602 4.6347 1.84161 4.32214 2.15417C4.00958 2.46673 3.83398 2.89065 3.83398 3.33268V16.666C3.83398 17.108 4.00958 17.532 4.32214 17.8445C4.6347 18.1571 5.05862 18.3327 5.50065 18.3327H15.5006C15.9427 18.3327 16.3666 18.1571 16.6792 17.8445C16.9917 17.532 17.1673 17.108 17.1673 16.666V6.24935L12.584 1.66602Z"
                                      stroke="#2563EB" stroke-width="1.5" stroke-linecap="round"
                                      stroke-linejoin="round"/>
                                <path d="M12.166 1.66602V6.66602H17.166" stroke="#2563EB" stroke-width="1.5"
                                      stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M13.8327 10.833H7.16602" stroke="#2563EB" stroke-width="1.5"
                                      stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M13.8327 14.166H7.16602" stroke="#2563EB" stroke-width="1.5"
                                      stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M8.83268 7.5H7.16602" stroke="#2563EB" stroke-width="1.5"
                                      stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                    </div>
                    <div class="inside">
                        <p>
                            <?php
                            echo esc_html__('Encountering an issue? Our comprehensive and detailed documentation is designed to address your concerns and provide clear, thorough explanations to resolve any confusion.', 'speedblog');
                            ?>
                        </p>
                        <a href="<?php echo esc_url($this->doc_url); ?>"
                           target="_blank"><?php esc_html_e('Documentation', 'speedblog'); ?></a>
                    </div>
                </div>
                <div class="postbox speedblog-postbox-review">
                    <div class="postbox-header">
                        <h3 class="hndle ui-sortable-handle">
                            <?php esc_html_e('Leave us a Review', 'speedblog'); ?>
                        </h3>
                        <div class="hndle-controller">
                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20"
                                 fill="none">
                                <path d="M10.5001 1.66699L13.0751 6.88366L18.8334 7.72533L14.6667 11.7837L15.6501 17.517L10.5001 14.8087L5.35008 17.517L6.33341 11.7837L2.16675 7.72533L7.92508 6.88366L10.5001 1.66699Z"
                                      stroke="#2563EB" stroke-width="1.66667" stroke-linecap="round"
                                      stroke-linejoin="round"/>
                            </svg>
                        </div>
                    </div>
                    <div class="inside">
                        <div class="ratings">
                            <?php
                            echo $star_icon;
                            echo $star_icon;
                            echo $star_icon;
                            echo $star_icon;
                            echo $star_icon;
                            ?>
                        </div>
                        <div><?php esc_html_e('Based on 20+ Reviews', 'speedblog'); ?></div>
                        <p>
                            <?php
                            echo sprintf(
                            /* translators: %s: Theme Name. */
                                esc_html__('What do you think of our theme? Was it a good experience and did it match your expectations? Let us know so we can improve!', 'speedblog'),
                                $theme->Name
                            );
                            ?>
                        </p>
                        <a href="<?php echo esc_url('https://wordpress.org/support/theme/speedblog/reviews/?rate=5#new-post'); ?>"
                           target="_blank"><?php esc_html_e('Submit a Review', 'speedblog'); ?></a>
                    </div>
                </div>

                <div class="postbox speedblog-postbox-support">
                    <div class="postbox-header">
                        <h3 class="hndle ui-sortable-handle">
                            <?php esc_html_e('Support', 'speedblog'); ?>
                        </h3>
                        <div class="hndle-controller">
                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20"
                                 fill="none">
                                <path d="M3 11.6667H5.5C5.94203 11.6667 6.36595 11.8423 6.67851 12.1548C6.99107 12.4674 7.16667 12.8913 7.16667 13.3333V15.8333C7.16667 16.2754 6.99107 16.6993 6.67851 17.0118C6.36595 17.3244 5.94203 17.5 5.5 17.5H4.66667C4.22464 17.5 3.80072 17.3244 3.48816 17.0118C3.17559 16.6993 3 16.2754 3 15.8333V10C3 8.01088 3.79018 6.10322 5.1967 4.6967C6.60322 3.29018 8.51088 2.5 10.5 2.5C12.4891 2.5 14.3968 3.29018 15.8033 4.6967C17.2098 6.10322 18 8.01088 18 10V15.8333C18 16.2754 17.8244 16.6993 17.5118 17.0118C17.1993 17.3244 16.7754 17.5 16.3333 17.5H15.5C15.058 17.5 14.634 17.3244 14.3215 17.0118C14.0089 16.6993 13.8333 16.2754 13.8333 15.8333V13.3333C13.8333 12.8913 14.0089 12.4674 14.3215 12.1548C14.634 11.8423 15.058 11.6667 15.5 11.6667H18"
                                      stroke="#2563EB" stroke-width="1.66667" stroke-linecap="round"
                                      stroke-linejoin="round"/>
                            </svg>
                        </div>
                    </div>
                    <div class="inside">

                        <?php if (!$this->pro_status) { ?>
                            <p>
                                <?php
                                echo sprintf(
                                /* translators: %s: Theme Name */
                                    esc_html__(
                                        'Seek answers on the WordPress.org community support forum where a supportive community is ready to assist. While our primary focus is on delivering premium support to our pro users, we\'re also here to help you with occasional queries regarding our free theme.',
                                        'speedblog'
                                    )
                                );
                                ?>
                            </p>
                            <a href="<?php echo esc_url($this->community_url); ?>" target="_blank">
                                <?php esc_html_e('Community Support', 'speedblog'); ?>
                            </a>
                        <?php } else { ?>
                            <p>
                                <?php
                                echo sprintf(
                                /* translators: %s: Theme Name. */
                                    esc_html__('Need assistance? Reach out to our professional support team by submitting a support ticket, and we\'ll provide you with the help you need.', 'speedblog')
                                );
                                ?>
                            </p>
                            <a href="<?php echo esc_url($this->support_url); ?>" target="_blank">
                                <?php esc_html_e('Create a Ticket', 'speedblog'); ?>
                            </a>
                        <?php } ?>

                    </div>
                </div>
                <div class="postbox speedblog-postbox-plugins">
                    <div class="postbox-header">
                        <h3 class="hndle">
                            <?php esc_html_e('Useful Plugins', 'speedblog'); ?>
                        </h3>
                        <div class="hndle-controller">
                            <span class="dashicons dashicons-admin-plugins"></span>
                        </div>
                    </div>
                    <div class="inside">
                        <?php
                        $plugins = array(
                            array(
                                'name' => 'One Click Demo Import',
                                'file' => 'one-click-demo-import/one-click-demo-import.php',
                                'slug' => 'one-click-demo-import',
                                'color' => '#5317AA',
                                'image' => SPEEDBLOG_PARENT_URL . '/inc/admin/dashboard/images/ocdi-256x256.webp',

                            ),
                            array(
                                'name' => 'WpInterface Add Ons',
                                'file' => 'wpinterface-add-ons/wpinterface-add-ons.php',
                                'slug' => 'wpinterface-add-ons',
                                'color' => '#5317AA',
                                'image' => SPEEDBLOG_PARENT_URL . '/inc/admin/dashboard/images/addons-256x256.webp',

                            ),
                        );
                        // Loop through the plugins
                        foreach ($plugins as $plugin) {
                            $plugin_name = $plugin['name'];
                            $plugin_file = $plugin['file'];
                            $plugin_slug = $plugin['slug'];
                            $is_plugin_installed = speedblog_is_plugin_installed($plugin_file);
                            $is_plugin_activated = is_plugin_active($plugin_file);
                            ?>
                            <div class="postbox-recommended-plugin">
                                <div class="recommended-plugin-content">
                                    <img class="<?php echo $plugin_slug; ?>-logo" src="<?php echo $plugin['image']; ?>" width="100" height="100" alt="<?php echo $plugin['name']; ?>">
                                    <h4><?php echo esc_html($plugin['name']); ?></h4>
                                </div>
                                <?php if ($is_plugin_installed) : ?>
                                    <?php if ($is_plugin_activated) : ?>
                                        <div class="recommended-plugin-action"><?php esc_html_e('Activated', 'speedblog'); ?></div>
                                    <?php else : ?>
                                        <div class="recommended-plugin-action">
                                            <a href="#" class="activate-plugin"
                                               data-plugin="<?php echo esc_attr($plugin_file); ?>"
                                               data-slug="<?php echo esc_attr($plugin_slug); ?> ">
                                                <?php esc_html_e('Activate', 'speedblog'); ?>
                                            </a>
                                        </div>
                                    <?php endif; ?>
                                <?php else : ?>
                                    <div class="recommended-plugin-action">
                                        <a href="#" class="install-plugin"
                                           data-plugin="<?php echo esc_attr($plugin_file); ?>"
                                           data-slug="<?php echo esc_attr($plugin_slug); ?> ">
                                            <?php esc_html_e('Install', 'speedblog'); ?>
                                        </a>
                                    </div>
                                <?php endif; ?>
                            </div>
                            <?php
                        }
                        ?>
                    </div>
                </div>
                <div class="postbox speedblog-postbox-facebook">
                    <div class="postbox-header">
                        <h3 class="hndle">
                            <?php esc_html_e('Facebook Community', 'speedblog'); ?>
                        </h3>
                        <div class="hndle-controller">
                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20"
                                 fill="none">
                                <path d="M13.8327 17.5V15.8333C13.8327 14.9493 13.4815 14.1014 12.8564 13.4763C12.2313 12.8512 11.3834 12.5 10.4993 12.5H5.49935C4.61529 12.5 3.76745 12.8512 3.14233 13.4763C2.51721 14.1014 2.16602 14.9493 2.16602 15.8333V17.5"
                                      stroke="#2563EB" stroke-width="1.5" stroke-linecap="round"
                                      stroke-linejoin="round"/>
                                <path d="M7.99935 9.16667C9.8403 9.16667 11.3327 7.67428 11.3327 5.83333C11.3327 3.99238 9.8403 2.5 7.99935 2.5C6.1584 2.5 4.66602 3.99238 4.66602 5.83333C4.66602 7.67428 6.1584 9.16667 7.99935 9.16667Z"
                                      stroke="#2563EB" stroke-width="1.5" stroke-linecap="round"
                                      stroke-linejoin="round"/>
                                <path d="M18.834 17.5001V15.8334C18.8334 15.0948 18.5876 14.3774 18.1351 13.7937C17.6826 13.2099 17.0491 12.793 16.334 12.6084"
                                      stroke="#2563EB" stroke-width="1.5" stroke-linecap="round"
                                      stroke-linejoin="round"/>
                                <path d="M13.834 2.6084C14.551 2.79198 15.1865 3.20898 15.6403 3.79366C16.0942 4.37833 16.3405 5.09742 16.3405 5.83757C16.3405 6.57771 16.0942 7.2968 15.6403 7.88147C15.1865 8.46615 14.551 8.88315 13.834 9.06673"
                                      stroke="#2563EB" stroke-width="1.5" stroke-linecap="round"
                                      stroke-linejoin="round"/>
                            </svg>
                        </div>
                    </div>
                    <div class="inside">
                        <p>
                            <?php echo esc_html__('Join our Facebook page to connect with like-minded individuals for discussions, help, and support on all things related to the theme!', 'speedblog'); ?>
                        </p>
                        <a href="<?php echo esc_url($this->facebook_url); ?>"
                           target="_blank"><?php esc_html_e('Like or follow our Facebook Page', 'speedblog'); ?></a>
                    </div>
                </div>
            </div>
        </div>
    </div><!--/.speedblog-dashboard-content-->
<?php
