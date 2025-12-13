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

