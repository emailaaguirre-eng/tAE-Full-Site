<?php
// Enqueue theme assets and fonts
add_action('wp_enqueue_scripts', function () {
    wp_enqueue_style('theartful-wp', get_stylesheet_uri(), [], '0.1.0');
    wp_enqueue_style(
        'theartful-google-fonts',
        'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&display=swap',
        [],
        null
    );
});

// Basic theme supports
add_action('after_setup_theme', function () {
    add_theme_support('post-thumbnails');
    add_theme_support('title-tag');
    add_theme_support('editor-styles');
});

// CORS Support for Next.js REST API (if CORS plugin is not installed)
// Note: It's recommended to use the artkey-cors plugin instead
add_action('rest_api_init', function() {
    // Only add if CORS plugin is not active
    if (!function_exists('artkey_cors_headers')) {
        remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
        add_filter('rest_pre_serve_request', function($value) {
            $allowed_origins = [
                'http://localhost:3000',
                'http://127.0.0.1:3000',
                'https://your-nextjs-site.vercel.app',  // Replace with your domain
                'https://www.theartfulexperience.com',   // Replace with your domain
                'https://theartfulexperience.com',        // Replace with your domain
            ];
            
            $origin = get_http_origin();
            if ($origin && in_array($origin, $allowed_origins, true)) {
                header('Access-Control-Allow-Origin: ' . $origin);
            }
            
            header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
            header('Access-Control-Allow-Credentials: true');
            header('Access-Control-Allow-Headers: Authorization, Content-Type, X-WP-Nonce');
            
            if ('OPTIONS' === $_SERVER['REQUEST_METHOD']) {
                status_header(200);
                exit();
            }
            
            return $value;
        }, 15);
    }
});

