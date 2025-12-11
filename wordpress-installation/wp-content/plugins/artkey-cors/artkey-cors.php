<?php
/**
 * Plugin Name: ArtKey CORS Headers
 * Description: Allows Next.js frontend to access WordPress REST API from different domains
 * Version: 1.0.0
 * Author: The Artful Experience
 */

if (!defined('ABSPATH')) exit;

/**
 * Configure CORS headers for WordPress REST API
 * Allows Next.js frontend to make API requests
 */
add_action('rest_api_init', function() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function($value) {
        // Add your Next.js domains here
        $allowed_origins = [
            'http://localhost:3000',                    // Local development
            'http://127.0.0.1:3000',                   // Alternative local
            'https://your-nextjs-site.vercel.app',     // Vercel deployment (replace)
            'https://www.theartfulexperience.com',     // Production domain (replace)
            'https://theartfulexperience.com',          // Production domain without www (replace)
        ];
        
        $origin = get_http_origin();
        
        // Allow if origin is in allowed list
        if ($origin && in_array($origin, $allowed_origins, true)) {
            header('Access-Control-Allow-Origin: ' . $origin);
        }
        
        // Set CORS headers
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS, PATCH');
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Headers: Authorization, Content-Type, X-WP-Nonce, X-Requested-With');
        header('Access-Control-Expose-Headers: X-WP-Total, X-WP-TotalPages');
        
        // Handle preflight OPTIONS requests
        if ('OPTIONS' === $_SERVER['REQUEST_METHOD']) {
            status_header(200);
            exit();
        }
        
        return $value;
    });
}, 15);

/**
 * Add CORS headers to all REST API responses
 */
add_filter('rest_pre_serve_request', function($served, $result, $request, $server) {
    if (!$served) {
        return $served;
    }
    
    $origin = get_http_origin();
    $allowed_origins = [
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        'https://your-nextjs-site.vercel.app',
        'https://www.theartfulexperience.com',
        'https://theartfulexperience.com',
    ];
    
    if ($origin && in_array($origin, $allowed_origins, true)) {
        header('Access-Control-Allow-Origin: ' . $origin);
    }
    
    return $served;
}, 10, 4);

