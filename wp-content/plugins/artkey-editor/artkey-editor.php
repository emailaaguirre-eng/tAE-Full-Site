<?php
/**
 * Plugin Name: ArtKey Editor
 * Description: Complete ArtKey editor with templates, customization, media uploads, QR codes, and shareable URLs. Full WooCommerce integration.
 * Version: 1.0.0
 * Requires PHP: 7.4
 * Requires at least: 5.0
 * Author: The Artful Experience
 */

if (!defined('ABSPATH')) exit;

// Composer autoload (for endroid/qr-code)
if (file_exists(__DIR__ . '/vendor/autoload.php')) {
    require __DIR__ . '/vendor/autoload.php';
}

// ----------------------------
// Helpers
// ----------------------------
function artkey_generate_token(): string {
    return bin2hex(random_bytes(16)); // 32 hex chars
}

// CPT
add_action('init', function () {
    register_post_type('artkey', [
        'label' => 'ArtKeys',
        'public' => false,
        'show_ui' => true,
        'show_in_rest' => true,
        'supports' => ['title', 'custom-fields'],
    ]);
});

// Query var + rewrite for shareable URLs /artkey/{token}
add_filter('query_vars', function ($vars) {
    $vars[] = 'artkey_token';
    return $vars;
});

add_action('init', function () {
    add_rewrite_rule('^artkey/([A-Za-z0-9]{32})/?$', 'index.php?artkey_token=$matches[1]', 'top');
});

// On activation, flush rewrites
register_activation_hook(__FILE__, function () {
    artkey_register_post_type_for_flush();
    flush_rewrite_rules();
});

function artkey_register_post_type_for_flush() {
    register_post_type('artkey', [
        'label' => 'ArtKeys',
        'public' => false,
        'show_ui' => true,
        'show_in_rest' => true,
        'supports' => ['title', 'custom-fields'],
    ]);
}

// REST endpoints
add_action('rest_api_init', function () {
    register_rest_route('artkey/v1', '/save', [
        'methods'  => 'POST',
        'permission_callback' => function () { return current_user_can('edit_posts'); },
        'callback' => function ($req) {
            $data = $req->get_param('data');
            $post_id = wp_insert_post([
                'post_type'   => 'artkey',
                'post_status' => 'publish',
                'post_title'  => 'ArtKey ' . time(),
            ]);
            if (is_wp_error($post_id)) return $post_id;
            update_post_meta($post_id, '_artkey_json', wp_json_encode($data));
            // Token
            $token = artkey_generate_token();
            update_post_meta($post_id, '_artkey_token', $token);
            $share_url = home_url('/artkey/' . $token);
            return ['id' => $post_id, 'token' => $token, 'share_url' => $share_url];
        },
    ]);

    register_rest_route('artkey/v1', '/get/(?P<id>\\d+)', [
        'methods'  => 'GET',
        'permission_callback' => '__return_true',
        'callback' => function ($req) {
            $id  = (int) $req['id'];
            $raw = get_post_meta($id, '_artkey_json', true);
            $token = get_post_meta($id, '_artkey_token', true);
            $share_url = $token ? home_url('/artkey/' . $token) : null;
            return ['id' => $id, 'data' => json_decode($raw, true), 'token' => $token, 'share_url' => $share_url];
        },
    ]);

    // GET by token
    register_rest_route('artkey/v1', '/token/(?P<token>[A-Za-z0-9]{32})', [
        'methods'  => 'GET',
        'permission_callback' => '__return_true',
        'callback' => function ($req) {
            $token = sanitize_text_field($req['token']);
            $post_id = artkey_find_post_by_token($token);
            if (!$post_id) return new WP_Error('not_found', 'ArtKey not found', ['status' => 404]);
            $raw = get_post_meta($post_id, '_artkey_json', true);
            return ['id' => $post_id, 'data' => json_decode($raw, true), 'token' => $token];
        },
    ]);
});

function artkey_find_post_by_token(string $token) {
    $posts = get_posts([
        'post_type'  => 'artkey',
        'meta_query' => [
            [
                'key'   => '_artkey_token',
                'value' => $token,
            ],
        ],
        'posts_per_page' => 1,
        'fields' => 'ids',
    ]);
    return $posts ? $posts[0] : false;
}

// Enqueue React bundle only when shortcode is present
add_action('wp_enqueue_scripts', function () {
    global $post;
    $should_enqueue_editor = $post && has_shortcode($post->post_content, 'artkey_editor');
    $should_enqueue_viewer = $post && has_shortcode($post->post_content, 'artkey_viewer');
    // Also enqueue viewer on token pages if query var exists
    if (get_query_var('artkey_token')) {
        $should_enqueue_viewer = true;
    }

    if ($should_enqueue_editor) {
    wp_enqueue_script(
        'artkey-editor-bundle',
        plugins_url('build/editor.js', __FILE__),
        ['wp-element'],
        '0.1.0',
        true
    );
    wp_localize_script('artkey-editor-bundle', 'ArtKeyEditor', [
        'rest' => [
            'save' => rest_url('artkey/v1/save'),
            'get'  => rest_url('artkey/v1/get'),
            'token' => rest_url('artkey/v1/token'),
            'upload' => rest_url('artkey/v1/upload'),
        ],
        'nonce' => wp_create_nonce('wp_rest'),
        'siteUrl' => home_url(),
        'templates' => artkey_get_available_templates(),
    ]);
    }

    if ($should_enqueue_viewer) {
        wp_enqueue_script(
            'artkey-viewer-bundle',
            plugins_url('build/artkey-viewer.js', __FILE__),
            ['wp-element'],
            '0.1.0',
            true
        );
        wp_enqueue_style(
            'artkey-viewer-style',
            plugins_url('build/artkey-viewer.css', __FILE__),
            [],
            '0.1.0'
        );
        wp_localize_script('artkey-viewer-bundle', 'ArtKeyViewer', [
            'rest' => [
                'token' => rest_url('artkey/v1/token'),
                'guestbookList' => rest_url('artkey/v1/guestbook'),
                'guestbookAdd' => rest_url('artkey/v1/guestbook'),
            ],
            'nonce' => wp_create_nonce('wp_rest'),
        ]);
    }
});

// Shortcode [artkey_editor id="123"]
add_shortcode('artkey_editor', function ($atts) {
    $id = isset($atts['id']) ? intval($atts['id']) : null;
    return '<div id="artkey-editor-root" data-artkey-id="' . esc_attr($id) . '"></div>';
});

// Shortcode [artkey_viewer token="..."]
add_shortcode('artkey_viewer', function ($atts) {
    $atts = shortcode_atts([
        'token' => '',
    ], $atts);
    $token = sanitize_text_field($atts['token']);
    if (empty($token) && get_query_var('artkey_token')) {
        $token = get_query_var('artkey_token');
    }
    return '<div id="artkey-viewer-root" data-token="' . esc_attr($token) . '"></div>';
});

// Auto-render viewer on /artkey/{token}
add_action('template_redirect', function () {
    $token = get_query_var('artkey_token');
    if (!$token) return;

    $post_id = artkey_find_post_by_token($token);
    if (!$post_id) {
        status_header(404);
        echo 'ArtKey not found';
        exit;
    }

    status_header(200);
    nocache_headers();
    header('X-Robots-Tag: noindex, nofollow', true);
    ?>
    <!doctype html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>ArtKey</title>
      <meta name="robots" content="noindex,nofollow">
      <?php
      // Enqueue viewer assets
      wp_enqueue_script('artkey-viewer-bundle', plugins_url('build/artkey-viewer.js', __FILE__), ['wp-element'], '0.1.0', true);
      wp_enqueue_style('artkey-viewer-style', plugins_url('build/artkey-viewer.css', __FILE__), [], '0.1.0');
      wp_localize_script('artkey-viewer-bundle', 'ArtKeyViewer', [
          'rest' => [
              'token' => rest_url('artkey/v1/token'),
              'guestbookList' => rest_url('artkey/v1/guestbook'),
              'guestbookAdd' => rest_url('artkey/v1/guestbook'),
          ],
          'nonce' => wp_create_nonce('wp_rest'),
      ]);
      wp_head();
      ?>
    </head>
    <body>
      <div id="artkey-viewer-root" data-token="<?php echo esc_attr($token); ?>"></div>
      <?php wp_footer(); ?>
    </body>
    </html>
    <?php
    exit;
});

// Woo: attach ArtKey to order item meta (example hook; expects cart item to carry artkey_id)
add_action('woocommerce_checkout_create_order_line_item', function ($item, $cart_item_key, $values, $order) {
    if (!empty($values['artkey_id'])) {
        $item->add_meta_data('artkey_id', $values['artkey_id']);
        // Optional: carry token/share_url if present on cart item
        if (!empty($values['artkey_token'])) {
            $item->add_meta_data('artkey_token', $values['artkey_token']);
        }
        if (!empty($values['artkey_share_url'])) {
            $item->add_meta_data('artkey_share_url', $values['artkey_share_url']);
        } elseif (!empty($values['artkey_token'])) {
            $item->add_meta_data('artkey_share_url', home_url('/artkey/' . $values['artkey_token']));
        }
    }
}, 10, 4);

// Simple front-end resolver for /artkey/{token}
add_action('template_redirect', function () {
    $token = get_query_var('artkey_token');
    if (!$token) return;
    $post_id = artkey_find_post_by_token($token);
    if (!$post_id) {
        status_header(404);
        echo 'ArtKey not found';
        exit;
    }
    $raw = get_post_meta($post_id, '_artkey_json', true);
    // Basic render; replace with your own template/viewer
    status_header(200);
    nocache_headers();
    header('X-Robots-Tag: noindex, nofollow', true);
    ?>
    <!doctype html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>ArtKey</title>
      <meta name="robots" content="noindex,nofollow">
    </head>
    <body>
      <div id="artkey-viewer-root" data-artkey-json="<?php echo esc_attr($raw); ?>"></div>
      <script>
        // TODO: mount your viewer app here
        console.log("ArtKey data", JSON.parse(document.getElementById('artkey-viewer-root').dataset.artkeyJson));
      </script>
    </body>
    </html>
    <?php
    exit;
});

// ----------------------------
// Helper Functions
// ----------------------------
function artkey_get_available_templates() {
    return [
        'classic', 'paper', 'dark', 'bold',
        'aurora', 'sunset', 'ocean', 'rose_gold',
        'lavender', 'mint', 'forest', 'vintage',
        'cosmic', 'midnight', 'coral', 'berry',
    ];
}

// ----------------------------
// Image Upload Endpoint
// ----------------------------
add_action('rest_api_init', function () {
    register_rest_route('artkey/v1', '/upload', [
        'methods'  => 'POST',
        'permission_callback' => function () { return current_user_can('edit_posts'); },
        'callback' => 'artkey_handle_upload',
    ]);

    // Guestbook: add entry
    register_rest_route('artkey/v1', '/guestbook', [
        'methods'  => 'POST',
        'permission_callback' => '__return_true',
        'callback' => 'artkey_guestbook_add',
    ]);

    // Guestbook: list entries by token
    register_rest_route('artkey/v1', '/guestbook/(?P<token>[A-Za-z0-9]{32})', [
        'methods'  => 'GET',
        'permission_callback' => '__return_true',
        'callback' => 'artkey_guestbook_list',
    ]);
});

function artkey_handle_upload($request) {
    if (empty($_FILES['file'])) {
        return new WP_Error('no_file', 'No file uploaded', ['status' => 400]);
    }

    require_once(ABSPATH . 'wp-admin/includes/file.php');
    require_once(ABSPATH . 'wp-admin/includes/media.php');
    require_once(ABSPATH . 'wp-admin/includes/image.php');

    $file = $_FILES['file'];
    $upload = wp_handle_upload($file, ['test_form' => false]);

    if (isset($upload['error'])) {
        return new WP_Error('upload_error', $upload['error'], ['status' => 500]);
    }

    $attachment_id = wp_insert_attachment([
        'post_mime_type' => $upload['type'],
        'post_title' => sanitize_file_name(pathinfo($upload['file'], PATHINFO_FILENAME)),
        'post_content' => '',
        'post_status' => 'inherit',
    ], $upload['file']);

    if (is_wp_error($attachment_id)) {
        return $attachment_id;
    }

    wp_generate_attachment_metadata($attachment_id, $upload['file']);

    return [
        'id' => $attachment_id,
        'url' => $upload['url'],
        'sizes' => wp_get_attachment_image_src($attachment_id, 'full'),
    ];
}

// ----------------------------
// Guestbook storage (custom post type)
// ----------------------------
add_action('init', function () {
    register_post_type('artkey_guestbook', [
        'label' => 'ArtKey Guestbook',
        'public' => false,
        'show_ui' => true,
        'supports' => ['title', 'editor'],
    ]);
});

function artkey_guestbook_add(WP_REST_Request $req) {
    $token = sanitize_text_field($req->get_param('token'));
    $name = sanitize_text_field($req->get_param('name'));
    $message = wp_kses_post($req->get_param('message'));

    if (!$token || !$message) {
        return new WP_Error('missing', 'Token and message are required', ['status' => 400]);
    }

    // Permissions from ArtKey features
    $post_id = artkey_find_post_by_token($token);
    if (!$post_id) return new WP_Error('not_found', 'ArtKey not found', ['status' => 404]);
    $raw = get_post_meta($post_id, '_artkey_json', true);
    $data = json_decode($raw, true);
    $requireApproval = $data['features']['gb_require_approval'] ?? true;

    $entry_id = wp_insert_post([
        'post_type' => 'artkey_guestbook',
        'post_status' => $requireApproval ? 'pending' : 'publish',
        'post_title' => $name ? $name : 'Guest',
        'post_content' => $message,
        'meta_input' => [
            '_artkey_token' => $token,
        ],
    ]);

    if (is_wp_error($entry_id)) return $entry_id;

    return [
        'status' => $requireApproval ? 'pending' : 'published',
        'id' => $entry_id,
    ];
}

function artkey_guestbook_list(WP_REST_Request $req) {
    $token = sanitize_text_field($req['token']);
    if (!$token) return new WP_Error('missing', 'Token required', ['status' => 400]);

    $posts = get_posts([
        'post_type' => 'artkey_guestbook',
        'meta_query' => [
            ['key' => '_artkey_token', 'value' => $token],
        ],
        'post_status' => ['publish'],
        'numberposts' => 100,
        'orderby' => 'date',
        'order' => 'DESC',
    ]);

    $entries = array_map(function ($p) {
        return [
            'id' => $p->ID,
            'name' => $p->post_title,
            'message' => apply_filters('the_content', $p->post_content),
            'date' => $p->post_date_gmt,
        ];
    }, $posts);

    return ['entries' => $entries];
}

// ----------------------------
// QR generation at order creation (uses endroid/qr-code if available)
// ----------------------------
add_action('woocommerce_checkout_create_order_line_item', function ($item, $cart_item_key, $values, $order) {
    // Need share URL
    $share_url = $item->get_meta('artkey_share_url', true);
    if (!$share_url) {
        $token = $item->get_meta('artkey_token', true);
        if ($token) {
            $share_url = home_url('/artkey/' . $token);
            $item->update_meta_data('artkey_share_url', $share_url);
        }
    }
    if (!$share_url) {
        return;
    }

    // Check QR already set
    if ($item->get_meta('_artkey_qr_url', true)) {
        return;
    }

    // Require endroid/qr-code
    if (!class_exists('\\Endroid\\QrCode\\QrCode')) {
        return; // Library not present; install with composer require endroid/qr-code
    }

    try {
        $order_id = $order->get_id();
        $item_id  = $item->get_id();

        $qr   = new \Endroid\QrCode\QrCode($share_url);
        $qr->setSize(400);
        $qr->setMargin(10);
        $qr->setEncoding(new \Endroid\QrCode\Encoding\Encoding('UTF-8'));
        $qr->setErrorCorrectionLevel(new \Endroid\QrCode\ErrorCorrectionLevel\ErrorCorrectionLevelMedium());

        $writer = new \Endroid\QrCode\Writer\PngWriter();
        $result = $writer->write($qr);

        $upload_dir = wp_upload_dir();
        if (!empty($upload_dir['error'])) {
            return;
        }

        $dir = trailingslashit($upload_dir['basedir']) . 'artkey-qr/';
        if (!wp_mkdir_p($dir)) {
            return;
        }

        $filename = "artkey-qr-{$order_id}-{$item_id}.png";
        $path     = $dir . $filename;

        $result->saveToFile($path);

        $url = trailingslashit($upload_dir['baseurl']) . 'artkey-qr/' . $filename;
        $item->update_meta_data('_artkey_qr_url', esc_url_raw($url));
    } catch (\Throwable $e) {
        // swallow errors to not break checkout
        return;
    }
}, 20, 4);

