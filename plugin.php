<?php
/**
 * Plugin Name: Quotable Block
 * Plugin URI: https://github.com/marklchaves/quotable-block/
 * Description: A simple custom Gutenberg block for posting quotes that supports copy/paste.
 * Author: caught my eye
 * Author URI: https://www.caughtmyeye.cc/
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
