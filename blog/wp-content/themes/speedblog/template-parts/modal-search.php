<?php
/**
 * Displays the search icon and modal
 *
 * @package SpeedBlog
 */
?>
<div class="search-modal cover-modal" data-modal-target-string=".search-modal" role="dialog" aria-modal="true" aria-label="<?php esc_attr_e('Search', 'speedblog'); ?>">
    <div class="search-modal-inner modal-inner">
        <div class="wrapper">
            <div class="search-modal-panel">
                <?php
                get_search_form(
                    array(
                        'aria_label' => __('Search for:', 'speedblog'),
                    )
                );
                ?>
                <button class="toggle search-untoggle close-search-toggle" data-toggle-target=".search-modal" data-toggle-body-class="showing-search-modal" data-set-focus=".search-modal .search-field">
				<span class="screen-reader-text">
					<?php _e('Close search', 'speedblog'); ?>
				</span>
                <?php speedblog_the_theme_svg('cross'); ?>
                </button><!-- .search-toggle -->
            </div>
        </div>
    </div><!-- .search-modal-inner -->
</div><!-- .menu-modal -->
