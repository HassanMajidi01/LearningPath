<?php
$next_post = get_next_post();
$prev_post = get_previous_post(); ?>
<div class="sticky-article-navigation">
    <?php if (isset($prev_post->ID)) {
        $prev_link = get_permalink($prev_post->ID); ?>
        <a class="sticky-article-link sticky-article-prev" href="<?php echo esc_url($prev_link); ?>">
            <div class="sticky-article-icon">
                <?php speedblog_the_theme_svg('chevron-left'); ?>
            </div>
            <article id="sticky-post-<?php the_ID(); ?>" <?php post_class('wpi-post site-sticky-article'); ?>>
                <?php if (has_post_thumbnail()): ?>
                    <div class="entry-image entry-image-small">
                        <?php if (get_the_post_thumbnail($prev_post->ID, 'medium')) { ?>
                            <?php echo wp_kses_post(get_the_post_thumbnail($prev_post->ID, 'medium')); ?>
                        <?php } ?>
                    </div>
                <?php endif; ?>
                <div class="entry-details">
                    <header class="entry-header">
                        <h3 class="entry-title entry-title-small">
                            <?php echo esc_html(get_the_title($prev_post->ID)); ?>
                        </h3>
                    </header>
                </div>
            </article>
        </a>
    <?php }
    if (isset($next_post->ID)) {
        $next_link = get_permalink($next_post->ID); ?>
        <a class="sticky-article-link sticky-article-next" href="<?php echo esc_url($next_link); ?>">
            <div class="sticky-article-icon">
                <?php speedblog_the_theme_svg('chevron-right'); ?>
            </div>
            <article id="sticky-post-<?php the_ID(); ?>" <?php post_class('wpi-post site-sticky-article'); ?>>
                <?php if (has_post_thumbnail()): ?>
                    <div class="entry-image entry-image-small">
                        <?php if (get_the_post_thumbnail($next_post->ID, 'medium')) { ?>
                            <?php echo wp_kses_post(get_the_post_thumbnail($next_post->ID, 'medium')); ?>
                        <?php } ?>
                    </div>
                <?php endif; ?>
                <div class="entry-details">
                    <header class="entry-header">
                        <h3 class="entry-title entry-title-small">
                            <?php echo esc_html(get_the_title($next_post->ID)); ?>
                        </h3>
                    </header>
                </div>
            </article>
        </a>
        <?php
    } ?>
</div>