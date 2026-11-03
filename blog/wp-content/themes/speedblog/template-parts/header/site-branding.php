<?php
/**
 * Displays header site branding
 *
 * @package SpeedBlog
 */

$blog_info = get_bloginfo('name');
$description = get_bloginfo('description', 'display');
$hide_title = speedblog_get_option('hide_title');
$hide_tagline = speedblog_get_option('hide_tagline');
$header_class = $hide_title ? 'screen-reader-text' : 'site-title';
?>

<div class="site-branding">
    <?php
    if (has_custom_logo()) {
        ?>
        <div class="site-logo">
            <?php the_custom_logo(); ?>
        </div>
        <?php
    }

    if ($blog_info) {
        if (is_front_page() || is_home()) {
            ?>
            <h1 class="<?php echo esc_attr($header_class); ?>">
                <a href="<?php echo esc_url(home_url('/')); ?>"><?php echo esc_html($blog_info); ?></a>
            </h1>
            <?php
        } else {
            ?>
            <div class="<?php echo esc_attr($header_class); ?>">
                <a href="<?php echo esc_url(home_url('/')); ?>"><?php echo esc_html($blog_info); ?></a>
            </div>
            <?php
        }
    }
    ?>

    <?php if ($description && !$hide_tagline) : ?>
        <div class="site-description">
            <?php echo $description; // phpcs:ignore WordPress.Security.EscapeOutput ?>
        </div>
    <?php endif; ?>
</div><!-- .site-branding -->
