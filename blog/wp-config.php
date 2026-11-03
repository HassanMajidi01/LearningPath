<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'edukiash_blog' );

/** Database username */
define( 'DB_USER', 'edukiash_blog' );

/** Database password */
define( 'DB_PASSWORD', '4q8nd7S8JpV3KiMb' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '^Oc)P`g*MxV,;6(B.$EoqY?c/}Fi41V/yV}y<dal#` X>x3&Q#fP+:NFkJpeneu`' );
define( 'SECURE_AUTH_KEY',  '@(Qr4OqDDvS/y:~_kftm=6E|C#)]8AM<^Xj`)Mw6vUY{]}mEM:kEW*9w3K6p03q<' );
define( 'LOGGED_IN_KEY',    '<nfyAc2etfNY;~lc[J}GZ}B60:oEc)-a^LP2.t94(l* jZ.1 gh3gJOg(7mSAGRy' );
define( 'NONCE_KEY',        's$v7F^2F{```wEc-c~]BSr_[I[j^o!Omv&;c%-BhjNj$l0//K1W-rT8?DY]w-A+4' );
define( 'AUTH_SALT',        'm0.+d8I9[=/zS5WE2Xs}T/z1;N$b8A<ltxOY^XbHL(ie{I8C{pq1?gh236NN)q1c' );
define( 'SECURE_AUTH_SALT', 'tK(qjJ?>YeRtF]cu$ee-fEh0gXc4H]1?z={@yfIH<m}Yau-k;3A}p(.|s&{, Bg/' );
define( 'LOGGED_IN_SALT',   'i9H2fBv/tde!,;4p-zVR)a9HE{qRhp32PR(eZ-RpBYu,e1|8y~5ipF6i}&RXl:~B' );
define( 'NONCE_SALT',       '9tM40D?qwny],GLBo-Ssk=`fx_f3_hM[|/ pw1%II.r.X5.i@aTn!=@k`kbER)^O' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 *
 * At the installation time, database tables are created with the specified prefix.
 * Changing this value after WordPress is installed will make your site think
 * it has not been installed.
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/#table-prefix
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
