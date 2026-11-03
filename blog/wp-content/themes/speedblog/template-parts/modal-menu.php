<?php
/**
 * Displays the menu icon and modal
 *
 * @package SpeedBlog
 */

?>

<div class="menu-modal cover-modal" data-modal-target-string=".menu-modal">

	<div class="menu-modal-inner modal-inner">

		<div class="menu-wrapper">

			<div class="menu-top">

				<button class="toggle close-nav-toggle" data-toggle-target=".menu-modal" data-toggle-body-class="showing-menu-modal" data-set-focus=".menu-modal">
                    <?php speedblog_the_theme_svg( 'cross' ); ?>
				</button><!-- .nav-toggle -->

				<?php

				$mobile_menu_location ='';

				// If the mobile menu location is not set, use the primary and expanded locations as fallbacks, in that order.
				if ( has_nav_menu( 'mobile' ) ) {
					$mobile_menu_location = 'mobile';
				} elseif ( has_nav_menu( 'expanded' ) ) {
					$mobile_menu_location = 'expanded';
				}

				if ( has_nav_menu( 'expanded' ) ) {

					$expanded_nav_classes = ' hide-on-tablet hide-on-mobile';

					if ( 'expanded' === $mobile_menu_location ) {
						$expanded_nav_classes .= ' mobile-menu';
					}

					?>

					<nav class="expanded-menu<?php echo esc_attr( $expanded_nav_classes ); ?>" aria-label="<?php echo esc_attr_x( 'Expanded', 'menu', 'speedblog' ); ?>">

						<ul class="modal-menu reset-list-style">
							<?php
							if ( has_nav_menu( 'expanded' ) ) {
								wp_nav_menu(
									array(
										'container'      => '',
										'items_wrap'     => '%3$s',
										'show_toggles'   => true,
										'theme_location' => 'expanded',
									)
								);
							}
							?>
						</ul>

					</nav>

					<?php
				}

				if ( 'expanded' !== $mobile_menu_location ) {
					?>

					<nav class="mobile-menu hide-on-desktop" aria-label="<?php echo esc_attr_x( 'Mobile', 'menu', 'speedblog' ); ?>">

						<ul class="modal-menu reset-list-style">

						<?php
						if ( $mobile_menu_location ) {

							wp_nav_menu(
								array(
									'container'      => '',
									'items_wrap'     => '%3$s',
									'show_toggles'   => true,
									'theme_location' => $mobile_menu_location,
								)
							);

						} else {

							wp_list_pages(
								array(
									'match_menu_classes' => true,
									'show_toggles'       => true,
									'title_li'           => false,
									'walker'             => new SpeedBlog_Walker_Page(),
								)
							);

						}
						?>

						</ul>

					</nav>

					<?php
				}
				?>

			</div><!-- .menu-top -->

			<div class="menu-bottom">
				<?php 
				$enable_social_mobile_menu = speedblog_get_option('enable_social_mobile_menu');
				$enable_mobile_social_nav_border_radius = speedblog_get_option('enable_mobile_social_nav_border_radius');
				$select_mobile_social_menu_style = speedblog_get_option('select_mobile_social_menu_style');
				if ( has_nav_menu( 'social' ) && $enable_social_mobile_menu ) { ?>

					<nav aria-label="<?php esc_attr_e( 'Expanded Social links', 'speedblog' ); ?>">
						<ul class="social-menu reset-list-style social-icons <?php echo esc_attr($select_mobile_social_menu_style); ?> <?php if ($enable_mobile_social_nav_border_radius) { echo "has-border-radius";} ?>">

							<?php
							wp_nav_menu(
								array(
									'theme_location'  => 'social',
									'container'       => '',
									'container_class' => '',
									'items_wrap'      => '%3$s',
									'menu_id'         => '',
									'menu_class'      => '',
									'depth'           => 1,
									'link_before'     => '<span class="screen-reader-text">',
									'link_after'      => '</span>',
									'fallback_cb'     => '',
								)
							);
							?>

						</ul>
					</nav><!-- .social-menu -->

				<?php } ?>

			</div><!-- .menu-bottom -->

            <?php
            $enable_copyright_in_menu = speedblog_get_option('enable_copyright_in_menu');
            if ($enable_copyright_in_menu) { ?>
            <div class="menu-copyright">
                <?php
                speedblog_get_copyright_text();
                } ?>
            </div>
            <?php
            ?>
		</div><!-- .menu-wrapper -->

	</div><!-- .menu-modal-inner -->

</div><!-- .menu-modal -->
