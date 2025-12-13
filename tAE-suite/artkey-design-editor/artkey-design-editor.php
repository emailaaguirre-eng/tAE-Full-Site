<?php
/**
 * Plugin Name: ArtKey Design Editor
 * Description: Product customization editor for size, material, frame options. Integrates with WooCommerce and ArtKey Editor.
 * Version: 1.0.0
 * Requires PHP: 7.4
 * Requires at least: 5.0
 * Author: The Artful Experience
 */

if (!defined('ABSPATH')) exit;

// ----------------------------
// Constants
// ----------------------------
define('ARTKEY_DESIGN_EDITOR_VERSION', '1.0.0');
define('ARTKEY_DESIGN_EDITOR_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('ARTKEY_DESIGN_EDITOR_PLUGIN_URL', plugin_dir_url(__FILE__));

// ----------------------------
// REST API Endpoints
// ----------------------------
add_action('rest_api_init', function () {
    // Save customization data
    register_rest_route('artkey-design/v1', '/save', [
        'methods'  => 'POST',
        'permission_callback' => '__return_true',
        'callback' => 'artkey_design_save',
    ]);

    // Get customization data
    register_rest_route('artkey-design/v1', '/get/(?P<id>\\d+)', [
        'methods'  => 'GET',
        'permission_callback' => '__return_true',
        'callback' => 'artkey_design_get',
    ]);

    // Get product customization options
    register_rest_route('artkey-design/v1', '/options/(?P<product_id>\\d+)', [
        'methods'  => 'GET',
        'permission_callback' => '__return_true',
        'callback' => 'artkey_design_get_options',
    ]);

    // Calculate price based on options
    register_rest_route('artkey-design/v1', '/calculate-price', [
        'methods'  => 'POST',
        'permission_callback' => '__return_true',
        'callback' => 'artkey_design_calculate_price',
    ]);
});

/**
 * Save customization data
 */
function artkey_design_save($request) {
    $data = $request->get_json_params();
    
    if (empty($data['product_id'])) {
        return new WP_Error('missing_product_id', 'Product ID is required', ['status' => 400]);
    }

    // Store in session or cart item meta
    $customization_id = wp_insert_post([
        'post_type'   => 'artkey_design',
        'post_status' => 'publish',
        'post_title'  => 'Design ' . time(),
    ]);

    if (is_wp_error($customization_id)) {
        return $customization_id;
    }

    // Save customization data
    update_post_meta($customization_id, '_design_data', wp_json_encode($data));
    update_post_meta($customization_id, '_product_id', $data['product_id']);
    update_post_meta($customization_id, '_product_type', $data['product_type'] ?? 'print');
    
    // Calculate and store price
    $price = artkey_design_calculate_price_internal($data);
    update_post_meta($customization_id, '_total_price', $price);

    return [
        'id' => $customization_id,
        'price' => $price,
        'data' => $data,
    ];
}

/**
 * Get customization data
 */
function artkey_design_get($request) {
    $id = (int) $request['id'];
    $raw = get_post_meta($id, '_design_data', true);
    
    if (empty($raw)) {
        return new WP_Error('not_found', 'Design not found', ['status' => 404]);
    }

    return [
        'id' => $id,
        'data' => json_decode($raw, true),
        'price' => get_post_meta($id, '_total_price', true),
    ];
}

/**
 * Get product customization options
 */
function artkey_design_get_options($request) {
    $product_id = (int) $request['product_id'];
    
    if (!function_exists('wc_get_product')) {
        return new WP_Error('woocommerce_missing', 'WooCommerce is required', ['status' => 500]);
    }

    $product = wc_get_product($product_id);
    if (!$product) {
        return new WP_Error('product_not_found', 'Product not found', ['status' => 404]);
    }

    // Get product type
    $product_type = $product->get_type();
    
    // Default options based on product type
    $options = [
        'product_type' => $product_type,
        'sizes' => [],
        'materials' => [],
        'frames' => [],
        'base_price' => (float) $product->get_price(),
    ];

    // Print options
    if (in_array($product_type, ['simple', 'variable'])) {
        $options['sizes'] = [
            ['name' => '5x7', 'price' => 9.99, 'gelato_uid' => 'prints_pt_cl'],
            ['name' => '8x10', 'price' => 14.99, 'gelato_uid' => 'prints_pt_cl'],
            ['name' => '11x14', 'price' => 24.99, 'gelato_uid' => 'prints_pt_cl'],
            ['name' => '16x20', 'price' => 39.99, 'gelato_uid' => 'canvas_print_gallery_wrap'],
            ['name' => '20x24', 'price' => 59.99, 'gelato_uid' => 'canvas_print_gallery_wrap'],
            ['name' => '24x36', 'price' => 89.99, 'gelato_uid' => 'canvas_print_gallery_wrap'],
        ];

        $options['materials'] = [
            ['name' => 'Glossy Paper', 'price' => 0, 'gelato_uid' => 'prints_pt_cl'],
            ['name' => 'Matte Paper', 'price' => 2.00, 'gelato_uid' => 'prints_pt_cl'],
            ['name' => 'Canvas', 'price' => 15.00, 'gelato_uid' => 'canvas_print_gallery_wrap'],
            ['name' => 'Metal', 'price' => 25.00, 'gelato_uid' => 'metal_print'],
        ];

        $options['frames'] = [
            ['name' => 'Unframed', 'price' => 0],
            ['name' => 'Black Frame', 'price' => 0],
            ['name' => 'White Frame', 'price' => 5.00],
            ['name' => 'Silver Frame', 'price' => 6.00],
        ];
    }

    // Card options
    if (strpos(strtolower($product->get_name()), 'card') !== false) {
        $options['card_types'] = [
            ['name' => 'Holiday', 'price' => 0],
            ['name' => 'Birthday', 'price' => 0],
            ['name' => 'Thank You', 'price' => 0],
            ['name' => 'Custom', 'price' => 2.00],
        ];
    }

    return $options;
}

/**
 * Calculate price based on customization options
 */
function artkey_design_calculate_price($request) {
    $data = $request->get_json_params();
    $price = artkey_design_calculate_price_internal($data);
    
    return [
        'price' => $price,
        'breakdown' => artkey_design_get_price_breakdown($data),
    ];
}

/**
 * Internal price calculation
 */
function artkey_design_calculate_price_internal($data) {
    $base_price = (float) ($data['base_price'] ?? 0);
    $size_price = (float) ($data['size_price'] ?? 0);
    $material_price = (float) ($data['material_price'] ?? 0);
    $frame_price = (float) ($data['frame_price'] ?? 0);
    $quantity = (int) ($data['quantity'] ?? 1);

    $total = ($base_price + $size_price + $material_price + $frame_price) * $quantity;
    
    return round($total, 2);
}

/**
 * Get price breakdown
 */
function artkey_design_get_price_breakdown($data) {
    return [
        'base' => (float) ($data['base_price'] ?? 0),
        'size' => (float) ($data['size_price'] ?? 0),
        'material' => (float) ($data['material_price'] ?? 0),
        'frame' => (float) ($data['frame_price'] ?? 0),
        'quantity' => (int) ($data['quantity'] ?? 1),
        'subtotal' => artkey_design_calculate_price_internal($data),
    ];
}

// ----------------------------
// Custom Post Type
// ----------------------------
add_action('init', function () {
    register_post_type('artkey_design', [
        'label' => 'ArtKey Designs',
        'public' => false,
        'show_ui' => true,
        'show_in_rest' => true,
        'supports' => ['title', 'custom-fields'],
    ]);
});

// ----------------------------
// WooCommerce Integration
// ----------------------------
// Add customization data to cart item
add_filter('woocommerce_add_cart_item_data', function ($cart_item_data, $product_id) {
    if (isset($_POST['artkey_design_id'])) {
        $cart_item_data['artkey_design_id'] = sanitize_text_field($_POST['artkey_design_id']);
    }
    return $cart_item_data;
}, 10, 2);

// Display customization in cart
add_filter('woocommerce_cart_item_name', function ($name, $cart_item) {
    if (isset($cart_item['artkey_design_id'])) {
        $design_id = $cart_item['artkey_design_id'];
        $design_data = get_post_meta($design_id, '_design_data', true);
        
        if ($design_data) {
            $data = json_decode($design_data, true);
            $customizations = [];
            
            if (!empty($data['size'])) {
                $customizations[] = 'Size: ' . $data['size'];
            }
            if (!empty($data['material'])) {
                $customizations[] = 'Material: ' . $data['material'];
            }
            if (!empty($data['frame'])) {
                $customizations[] = 'Frame: ' . $data['frame'];
            }
            
            if (!empty($customizations)) {
                $name .= '<br><small>' . implode(' | ', $customizations) . '</small>';
            }
        }
    }
    return $name;
}, 10, 2);

// Attach design to order item
add_action('woocommerce_checkout_create_order_line_item', function ($item, $cart_item_key, $values, $order) {
    if (!empty($values['artkey_design_id'])) {
        $item->add_meta_data('artkey_design_id', $values['artkey_design_id']);
        
        // Also add design data for reference
        $design_data = get_post_meta($values['artkey_design_id'], '_design_data', true);
        if ($design_data) {
            $item->add_meta_data('artkey_design_data', $design_data);
        }
    }
}, 10, 4);

// ----------------------------
// Enqueue Scripts
// ----------------------------
add_action('wp_enqueue_scripts', function () {
    // Only enqueue on product pages or pages with design editor shortcode
    global $post;
    $should_enqueue = false;
    
    if (function_exists('is_product') && is_product()) {
        $should_enqueue = true;
    }
    
    if ($post && has_shortcode($post->post_content, 'artkey_design_editor')) {
        $should_enqueue = true;
    }
    
    if (!$should_enqueue) {
        return;
    }

    wp_enqueue_script(
        'artkey-design-editor',
        plugins_url('build/design-editor.js', __FILE__),
        ['wp-element', 'jquery'],
        ARTKEY_DESIGN_EDITOR_VERSION,
        true
    );

    wp_localize_script('artkey-design-editor', 'ArtKeyDesignEditor', [
        'rest' => [
            'save' => rest_url('artkey-design/v1/save'),
            'get' => rest_url('artkey-design/v1/get'),
            'options' => rest_url('artkey-design/v1/options'),
            'calculate' => rest_url('artkey-design/v1/calculate-price'),
        ],
        'nonce' => wp_create_nonce('wp_rest'),
        'ajax_url' => admin_url('admin-ajax.php'),
        'gelatoApiKey' => get_option('artkey_gelato_api_key', ''),
    ]);
});

// ----------------------------
// Shortcode
// ----------------------------
add_shortcode('artkey_design_editor', function ($atts) {
    $atts = shortcode_atts([
        'product_id' => get_the_ID(),
        'product_type' => 'print',
    ], $atts);

    $product_id = intval($atts['product_id']);
    
    return '<div id="artkey-design-editor-root" 
                 data-product-id="' . esc_attr($product_id) . '"
                 data-product-type="' . esc_attr($atts['product_type']) . '">
            </div>';
});

// ----------------------------
// Admin Settings
// ----------------------------
add_action('admin_menu', function () {
    add_submenu_page(
        'woocommerce',
        'ArtKey Design Editor Settings',
        'Design Editor',
        'manage_options',
        'artkey-design-editor',
        'artkey_design_admin_page'
    );
});

// Register Gelato API key setting
add_action('admin_init', function () {
    register_setting('artkey_design_settings', 'artkey_gelato_api_key');
});

function artkey_design_admin_page() {
    ?>
    <div class="wrap">
        <h1>ArtKey Design Editor Settings</h1>
        <div class="card">
            <h2>Usage</h2>
            <p>Add the design editor to any page or product using the shortcode:</p>
            <pre>[artkey_design_editor product_id="123" product_type="print"]</pre>
            
            <h3>REST API Endpoints</h3>
            <ul>
                <li><strong>Get Options:</strong> <code><?php echo rest_url('artkey-design/v1/options/{product_id}'); ?></code></li>
                <li><strong>Save Design:</strong> <code><?php echo rest_url('artkey-design/v1/save'); ?></code></li>
                <li><strong>Calculate Price:</strong> <code><?php echo rest_url('artkey-design/v1/calculate-price'); ?></code></li>
            </ul>
        </div>

        <div class="card" style="margin-top: 20px;">
            <h2>Gelato API</h2>
            <form method="post" action="options.php">
                <?php settings_fields('artkey_design_settings'); ?>
                <table class="form-table">
                    <tr>
                        <th scope="row"><label for="artkey_gelato_api_key">Gelato API Key</label></th>
                        <td>
                            <input type="text"
                                   id="artkey_gelato_api_key"
                                   name="artkey_gelato_api_key"
                                   value="<?php echo esc_attr(get_option('artkey_gelato_api_key', '')); ?>"
                                   class="regular-text"
                                   placeholder="Enter your Gelato API key" />
                            <p class="description">Used by the Design Editor for Gelato personalization.</p>
                        </td>
                    </tr>
                </table>
                <?php submit_button(); ?>
            </form>
        </div>
    </div>
    <?php
}

