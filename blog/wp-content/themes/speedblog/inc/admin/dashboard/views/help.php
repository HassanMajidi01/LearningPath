<?php
if (!is_child_theme()) {
    $theme = wp_get_theme();
} else {
    $theme = wp_get_theme()->parent();
}
$star_icon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M24,9l-19.655,15l2.821,-8.866l-7.166,-6.134l9.153,0l2.846,-9l2.853,9l9.148,0Zm-4.216,15l-6.361,-4.429l3.872,-2.96l2.489,7.389Z" /></svg>';
?>
<div class="speedblog-dashboard-content speedblog-help-panel">
    <div class="dashboard-content-panel content-panel-lower">
        <div class="dashboard-content-left">
            <div class="speedblog-support-channels">
                <div class="postbox">
                    <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33" fill="none">
                        <path d="M19.833 3.00977H8.49967C7.79243 3.00977 7.11415 3.29072 6.61406 3.79081C6.11396 4.29091 5.83301 4.96919 5.83301 5.67643V27.0098C5.83301 27.717 6.11396 28.3953 6.61406 28.8954C7.11415 29.3955 7.79243 29.6764 8.49967 29.6764H24.4997C25.2069 29.6764 25.8852 29.3955 26.3853 28.8954C26.8854 28.3953 27.1663 27.717 27.1663 27.0098V10.3431L19.833 3.00977Z"
                              stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M19.1665 3.00977V11.0098H27.1665" stroke="#2563EB" stroke-width="2"
                              stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M21.8332 17.6758H11.1665" stroke="#2563EB" stroke-width="2" stroke-linecap="round"
                              stroke-linejoin="round"/>
                        <path d="M21.8332 23.0098H11.1665" stroke="#2563EB" stroke-width="2" stroke-linecap="round"
                              stroke-linejoin="round"/>
                        <path d="M13.8332 12.3428H11.1665" stroke="#2563EB" stroke-width="2" stroke-linecap="round"
                              stroke-linejoin="round"/>
                    </svg>
                    <h3><?php esc_html_e('Read Theme Documentation', 'speedblog'); ?></h3>
                    <p><?php esc_html_e('Please check out basic documentation for detailed information on how to use SpeedBlog.', 'speedblog'); ?></p>

                    <a href="<?php echo esc_url($this->doc_url); ?>" class="button button-secondary dashboard-button dashboard-button-primary" target="_blank">
                        <?php esc_html_e('View Now', 'speedblog'); ?>
                    </a>
                </div>
                <div class="postbox">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 33 33" fill="none">
                        <path d="M19.1667 20.3428V23.0094C19.1667 23.3631 19.0262 23.7022 18.7761 23.9523C18.5261 24.2023 18.187 24.3428 17.8333 24.3428H8.5L4.5 28.3428V15.0094C4.5 14.6558 4.64048 14.3167 4.89052 14.0666C5.14057 13.8166 5.47971 13.6761 5.83333 13.6761H8.5M28.5 19.0094L24.5 15.0094H15.1667C14.813 15.0094 14.4739 14.869 14.2239 14.6189C13.9738 14.3689 13.8333 14.0297 13.8333 13.6761V5.67611C13.8333 5.32248 13.9738 4.98335 14.2239 4.7333C14.4739 4.48325 14.813 4.34277 15.1667 4.34277H27.1667C27.5203 4.34277 27.8594 4.48325 28.1095 4.7333C28.3595 4.98335 28.5 5.32248 28.5 5.67611V19.0094Z" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <h3><?php esc_html_e('Support', 'speedblog'); ?></h3>
                    <p><?php esc_html_e('We would be happy to guide you through any issues and queries you have regarding SpeedBlog!', 'speedblog'); ?></p>


                    <?php if (!$this->pro_status) { ?>
                        <a href="<?php echo esc_url($this->community_url); ?>" class="button button-secondary dashboard-button dashboard-button-primary" target="_blank">
                            <?php esc_html_e('Community Support', 'speedblog'); ?>
                        </a>
                    <?php } else { ?>
                        <a href="<?php echo esc_url($this->support_url); ?>" class="button button-secondary dashboard-button dashboard-button-secondary" target="_blank">
                            <?php esc_html_e('Contact Support', 'speedblog'); ?>
                        </a>
                    <?php } ?>

                </div>
            </div>
            <h2><?php esc_html_e('Join Our Community', 'speedblog'); ?></h2>
            <div class="postbox speedblog-postbox-community">
                <div class="community-image">
                    <img src="<?php echo esc_url(SPEEDBLOG_PARENT_URL . '/inc/admin/dashboard/images/facebook.webp'); ?>" alt="<?php esc_attr_e('facebook', 'speedblog'); ?>">
                </div>
                <div class="community-details">
                    <h3><?php esc_html_e('Facebook Community', 'speedblog'); ?></h3>
                    <p><?php esc_html_e('Join our Facebook haven, where the latest news and updates eagerly await your arrival.', 'speedblog'); ?></p>
                    <a href="<?php echo esc_url($this->facebook_url); ?>" class="button button-secondary dashboard-button dashboard-button-secondary" target="_blank"><?php esc_html_e('Like or follow us on Facebook', 'speedblog'); ?></a>
                </div>
            </div>
            <div class="postbox speedblog-postbox-community">
                <div class="community-image">
                    <img src="<?php echo esc_url(SPEEDBLOG_PARENT_URL . '/inc/admin/dashboard/images/x.webp'); ?>" alt="<?php esc_attr_e('x', 'speedblog'); ?>">
                </div>
                <div class="community-details">
                    <h3><?php esc_html_e('X Community', 'speedblog'); ?></h3>
                    <p><?php esc_html_e('Join our Twitter haven, where the latest news and updates eagerly await your arrival.', 'speedblog'); ?></p>
                    <a href="<?php echo esc_url($this->x_url); ?>" class="button button-secondary dashboard-button dashboard-button-secondary" target="_blank"><?php esc_html_e('Connect with us on X', 'speedblog'); ?></a>
                </div>
            </div>
            <div class="postbox speedblog-postbox-community">
                <div class="community-image">
                    <img src="<?php echo esc_url(SPEEDBLOG_PARENT_URL . '/inc/admin/dashboard/images/youtube.webp'); ?>" alt="<?php esc_attr_e('youtube', 'speedblog'); ?>">
                </div>
                <div class="community-details">
                    <h3><?php esc_html_e('Youtube Community', 'speedblog'); ?></h3>
                    <p><?php esc_html_e('Join our YouTube haven, where the latest news and updates eagerly await your arrival.', 'speedblog'); ?></p>
                    <a href="<?php echo esc_url($this->youtube_url); ?>" class="button button-secondary dashboard-button dashboard-button-secondary" target="_blank"><?php esc_html_e('Subscribe', 'speedblog'); ?></a>
                </div>
            </div>
        </div>
        <div class="dashboard-content-right">
            <div class="postbox speedblog-postbox-review">
                <div class="postbox-header">
                    <h3 class="hndle">
                        <?php esc_html_e('Leave us a Review', 'speedblog'); ?>
                    </h3>
                    <div class="hndle-controller">
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
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
                            esc_html__('Sharing your review is a valuable way to help us enhance your experience.', 'speedblog'),
                            $theme->Name
                        );
                        ?>
                    </p>
                    <a href="<?php echo esc_url('https://wordpress.org/support/theme/speedblog/reviews/?rate=5#new-post'); ?>"
                       target="_blank"><?php esc_html_e('Submit a Review', 'speedblog'); ?></a>
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
                                        <a href="#" class="activate-plugin" data-plugin="<?php echo esc_attr($plugin_file); ?>" data-slug="<?php echo esc_attr($plugin_slug); ?> "><?php esc_html_e('Activate', 'speedblog'); ?></a>
                                    </div>
                                <?php endif; ?>
                            <?php else : ?>
                                <div class="recommended-plugin-action">
                                    <a href="#" class="install-plugin" data-plugin="<?php echo esc_attr($plugin_file); ?>" data-slug="<?php echo esc_attr($plugin_slug); ?> "><?php esc_html_e('Install', 'speedblog'); ?></a>
                                </div>
                            <?php endif; ?>
                        </div>
                        <?php
                    }
                    ?>
                </div>
            </div>
        </div>
    </div>
</div>
