<div class="speedblog-dashboard-content products-page">
    <div class="dashboard-content-panel">
        <div class="postbox speedblog-quick-settings">
            <div class="postbox-header">
            <h2 class="hndle ui-sortable-handle">
                <?php esc_html_e('Themes', 'speedblog'); ?>
            </h2>
            </div>
            <div class="inside inside__themes">
                <?php
                $themes_data = array(
                    'blogmarks' => array(
                        'name' => 'BlogMarks',
                        'slug' => 'blogmarks',
                        'image' => SPEEDBLOG_PARENT_URL . '/inc/admin/dashboard/images/blogmarks.webp',
                        'description' => 'BlogMarks is a sleek, elegant, and versatile WordPress blog theme, featuring a minimalistic layout that emphasizes simplicity and readability.',
                        'learn_more_link' => 'https://wpinterface.com/themes/blogmarks',
                        'live_demo_link' => 'https://wpinterface.com/themes/blogmarks/#demo-links',
                    ),
                    'minimal-blog' => array(
                        'name' => 'Minimal Blog',
                        'slug' => 'minimal-blog',
                        'image' => SPEEDBLOG_PARENT_URL . '/inc/admin/dashboard/images/minimal-blog.webp',
                        'description' => 'Minimal Blog is a modern, clean, responsive and retina-ready WordPress blog theme also suitable for magazines, newspapers, or review sites.',
                        'learn_more_link' => 'https://wpinterface.com/themes/minimal-blog',
                        'live_demo_link' => 'https://wpinterface.com/themes/minimal-blog/#demo-links',
                    ),
                    'advance-blog' => array(
                        'name' => 'Advance Blog',
                        'slug' => 'advance-blog',
                        'image' => SPEEDBLOG_PARENT_URL . '/inc/admin/dashboard/images/advance-blog.webp',
                        'description' => ' Clean & minimal blog! Easy installation allows you to start post blogs immediately after the activation.',
                        'learn_more_link' => 'https://wpinterface.com/themes/advance-blog',
                        'live_demo_link' => 'https://wpinterface.com/themes/advance-blog/#demo-links',
                    ),
                    // Add more themes as needed
                );
                foreach ($themes_data as $theme_info) :
                    $theme_slug = $theme_info['slug'];
                    ?>
                    <div class="item item-<?php echo esc_attr($theme_slug); ?>">
                        <img class="<?php echo esc_attr($theme_slug); ?>-logo"
                             src="<?php echo esc_url($theme_info['image']); ?>"
                             alt="<?php echo esc_attr($theme_info['name']); ?>">
                        <div class="content">
                            <h3><?php echo esc_html($theme_info['name']); ?></h3>
                            <p><?php echo esc_html($theme_info['description']); ?></p>
                        </div>
                        <div class="cta">
                            <div class="cta-text">
                                <a href="<?php echo esc_url($theme_info['learn_more_link']); ?>"
                                   target="_blank"><?php esc_html_e('Learn More', 'speedblog'); ?></a>
                                <a href="<?php echo esc_url($theme_info['live_demo_link']); ?>"
                                   target="_blank"><?php esc_html_e('Live demo', 'speedblog'); ?></a>
                            </div>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
        <div class="postbox speedblog-quick-settings">
            <div class="postbox-header">
            <h2 class="hndle ui-sortable-handle">
                <?php esc_html_e('Plugins', 'speedblog'); ?>
            </h2>
            </div>
            <div class="inside inside__plugins">
                <?php
                $plugins_data = array(

                    'elementor' => array(
                        'name' => 'Elementor Website Builder',
                        'file' => 'elementor/elementor.php',
                        'slug' => 'elementor',
                        'image' => SPEEDBLOG_PARENT_URL . '/inc/admin/dashboard/images/elementor-banner.webp',
                        'description' => 'Elementor, the leading WordPress website builder,empowers you to build professional, pixel-perfect websites. With an intuitive, no-code drag and drop interface, you can build any website.',
                        'learn_more_link' => 'https://wordpress.org/plugins/elementor/',
                        'live_demo_link' => 'https://elementor.com/',
                    ),

                    'one-click-demo-import' => array(
                        'name' => 'One Click Demo Import',
                        'file' => 'one-click-demo-import/one-click-demo-import.php',
                        'slug' => 'one-click-demo-import',
                        'image' => SPEEDBLOG_PARENT_URL . '/inc/admin/dashboard/images/ocdi.webp',
                        'description' => '"One Click Demo Import" is a WordPress plugin that effortlessly imports demo content, themes, and settings with a single click, simplifying site setup.',
                        'learn_more_link' => 'https://wordpress.org/plugins/one-click-demo-import/',
                        'live_demo_link' => 'https://ocdi.com/',
                    ),

                    'mailchimp-for-wp' => array(
                        'name' => 'MC4WP: Mailchimp for WordPress',
                        'file' => 'mailchimp-for-wp/mailchimp-for-wp.php',
                        'slug' => 'mailchimp-for-wp',
                        'image' => SPEEDBLOG_PARENT_URL . '/inc/admin/dashboard/images/mc4wp.webp',
                        'description' => 'This plugin effortlessly creates stunning, accessible sign-up forms and integrates seamlessly with your existing WordPress forms, including contact, comment, and checkout forms.',
                        'learn_more_link' => 'https://wordpress.org/plugins/mailchimp-for-wp/',
                        'live_demo_link' => 'https://www.mc4wp.com/',
                    ),

                );
                foreach ($plugins_data as $plugin_info) :
                    $plugin_file = $plugin_info['file'];
                    $plugin_slug = $plugin_info['slug'];
                    $is_plugin_installed = speedblog_is_plugin_installed($plugin_file);
                    $is_plugin_activated = is_plugin_active($plugin_file);
                    ?>
                    <div class="item item-<?php echo $plugin_slug; ?>">
                        <img class="<?php echo $plugin_slug; ?>-logo"
                             src="<?php echo $plugin_info['image']; ?>"
                             alt="<?php echo $plugin_info['name']; ?>">
                        <div class="content">
                            <h3><?php echo $plugin_info['name']; ?></h3>
                            <p><?php echo $plugin_info['description']; ?></p>
                        </div>
                        <div class="cta">
                            <div class="cta-text">
                                <a href="<?php echo $plugin_info['learn_more_link']; ?>"
                                   target="_blank"><?php esc_html_e('Learn More', 'speedblog'); ?></a>
                                <a href="<?php echo $plugin_info['live_demo_link']; ?>"
                                   target="_blank"><?php esc_html_e('Plugin Page', 'speedblog'); ?></a>
                            </div>
                            <div class="cta-button">
                                <?php if ($is_plugin_installed) : ?>
                                    <?php if ($is_plugin_activated) : ?>
                                        <span class="activated"><?php esc_html_e('Activated', 'speedblog'); ?></span>
                                    <?php else : ?>
                                        <a href="#" class="button button-primary dashboard-button dashboard-button-primary activate-plugin" data-plugin="<?php echo $plugin_file; ?>" data-slug="<?php echo $plugin_slug; ?> "><?php esc_html_e('Activate', 'speedblog'); ?></a>
                                    <?php endif; ?>
                                <?php else : ?>
                                    <a href="#" class="button button-secondary dashboard-button dashboard-button-secondary install-plugin" data-plugin="<?php echo $plugin_file; ?>" data-slug="<?php echo $plugin_slug; ?> "><?php esc_html_e('Install', 'speedblog'); ?></a>
                                <?php endif; ?>
                            </div>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </div>
</div>
