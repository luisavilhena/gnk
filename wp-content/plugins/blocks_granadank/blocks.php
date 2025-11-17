<?php
/*
Plugin Name: GranadaNK Blocks
Plugin URI: https://granadank.com
Description: Blocos personalizados do site GranadaNK.
Version: 1.1.0
Author: Luisa Vilhena
Author URI: https://granadank.com
Text Domain: granadank-blocks
*/

 function luisa_blocks_register() {
    // Caminho para a pasta build do plugin
    $build_path = __DIR__ . '/build';

    // Para cada pasta dentro de build
    foreach ( glob( $build_path . '/*', GLOB_ONLYDIR ) as $dir ) {
        // Só registra se existir block.json
        if ( file_exists( $dir . '/block.json' ) ) {
            register_block_type( $dir );
        }
    }
}
add_action( 'init', 'luisa_blocks_register' );
