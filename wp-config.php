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
define( 'DB_NAME', 'granadaank' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', 'root' );

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
define( 'AUTH_KEY',         'gT%)OZgv$li8HtSF`1$%?B0$qDqr,mXu72Pk80&%dzZ#%zozH/Z9eqP!&NUX!5zR' );
define( 'SECURE_AUTH_KEY',  ']%0;L!<Ro|Qo}hn(~b,XOR9um9+JkADX8!)-R_|*_9&)tv18-hKHDLH6gs%>GQ}H' );
define( 'LOGGED_IN_KEY',    'Yqjy&J)%<5{!!3E1.sKZ<=K + @T2c_>O shPIs9e~Vh,(*KX];wK*s}[BJ +XOJ' );
define( 'NONCE_KEY',        '>9yNWp[C#DjVLNdl_:NH%+MS=pB| {53$F|aQk89}gQ#<LfFy|S]DFY#HH{ vzU^' );
define( 'AUTH_SALT',        'f+z7|1{cKLQ$wq||,jD(_&cK+wY3Jeg.Ofh$]y@T5/m_t;O@WGcCvO-dZ6ZZY@wl' );
define( 'SECURE_AUTH_SALT', '%t_b:Bf{@v:@hEn,zT9%98JsdUsv]%-nhHs3]bQ=1Rbi@ZI:F%TYeRl8FN.. }Ma' );
define( 'LOGGED_IN_SALT',   '.-LIE-j1_)Z@!4sV%.E1%1@_2d`7/glt*{a#6o6O=dwCfiH,#WITH)^*O}5sDlDF' );
define( 'NONCE_SALT',       ',UjS:i1MDZ~Ege;`&<9d6ocaV%$^|[l8; !GQZB >7 B|SEP*:YI{f6hcP3dOw@e' );

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
define('WP_DEBUG', true); // ativa o debug
define('WP_DEBUG_LOG', true); // cria um arquivo de log em wp-content/debug.log
define('WP_DEBUG_DISPLAY', false); //

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';

 
