<?php
/**
 * Plugin Name: ArtKey Hover Config
 * Description: Admin UI for hotspot config + frontend hover script.
 * Version: 0.1.0
 * Requires PHP: 8.4
 */

if (!defined('ABSPATH')) exit;

const ARTKEY_HOVER_OPT = 'artkey_hover_config';

// Admin page
add_action('admin_menu', function () {
    add_menu_page('ArtKey Hover', 'ArtKey Hover', 'manage_options', 'artkey-hover', function () {
        echo '<div class="wrap"><h1>ArtKey Hover Config</h1><div id="artkey-hover-admin"></div></div>';
    });
});

// REST endpoints
add_action('rest_api_init', function () {
    register_rest_route('artkey/v1', '/hover', [
        'methods'  => 'GET',
        'permission_callback' => '__return_true',
        'callback' => function () { return get_option(ARTKEY_HOVER_OPT, []); },
    ]);
    register_rest_route('artkey/v1', '/hover', [
        'methods'  => 'POST',
        'permission_callback' => function () { return current_user_can('manage_options'); },
        'callback' => function ($req) {
            $data = $req->get_json_params();
            update_option(ARTKEY_HOVER_OPT, $data);
            return ['ok' => true];
        },
    ]);
});

// Admin enqueue
add_action('admin_enqueue_scripts', function ($hook) {
    if ($hook !== 'toplevel_page_artkey-hover') return;
    wp_enqueue_script(
        'artkey-hover-admin',
        plugins_url('build/hover-admin.js', __FILE__),
        ['wp-element'],
        '0.1.0',
        true
    );
    wp_localize_script('artkey-hover-admin', 'ArtKeyHoverAdmin', [
        'rest'  => [
            'get' => rest_url('artkey/v1/hover'),
            'set' => rest_url('artkey/v1/hover'),
        ],
        'nonce' => wp_create_nonce('wp_rest'),
    ]);
});

// Frontend enqueue on product pages
add_action('wp_enqueue_scripts', function () {
    if (!function_exists('is_product') || !is_product()) return;
    wp_enqueue_script(
        'artkey-hover-frontend',
        plugins_url('build/hover-frontend.js', __FILE__),
        [],
        '0.1.0',
        true
    );
    wp_localize_script('artkey-hover-frontend', 'ArtKeyHoverData', [
        'config' => get_option(ARTKEY_HOVER_OPT, []),
    ]);
});

