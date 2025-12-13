<?php
/**
 * Plugin Name: ArtKey QR Code Generator
 * Description: Standalone QR code generator plugin for ArtKey URLs. Works independently or with ArtKey Editor plugin.
 * Version: 1.0.0
 * Requires PHP: 7.4
 * Requires at least: 5.0
 * Author: The Artful Experience
 */

if (!defined('ABSPATH')) exit;

// Check if endroid/qr-code is available via Composer
$composer_autoload = __DIR__ . '/vendor/autoload.php';
if (file_exists($composer_autoload)) {
    require $composer_autoload;
}

// Check if endroid/qr-code is available in parent directory (if ArtKey Editor plugin is installed)
$parent_composer = dirname(__DIR__) . '/artkey-editor/vendor/autoload.php';
if (file_exists($parent_composer)) {
    require $parent_composer;
}

// ----------------------------
// REST API Endpoints
// ----------------------------
add_action('rest_api_init', function () {
    // Generate QR code for any URL
    register_rest_route('artkey-qr/v1', '/generate', [
        'methods'  => 'POST',
        'permission_callback' => '__return_true',
        'callback' => 'artkey_qr_generate',
    ]);

    // Generate QR code for ArtKey token
    register_rest_route('artkey-qr/v1', '/artkey/(?P<token>[A-Za-z0-9]{32})', [
        'methods'  => 'GET',
        'permission_callback' => '__return_true',
        'callback' => 'artkey_qr_for_token',
    ]);

    // Generate QR code for any URL (GET method)
    register_rest_route('artkey-qr/v1', '/url', [
        'methods'  => 'GET',
        'permission_callback' => '__return_true',
        'callback' => 'artkey_qr_for_url',
        'args' => [
            'url' => [
                'required' => true,
                'type' => 'string',
                'sanitize_callback' => 'esc_url_raw',
            ],
            'size' => [
                'default' => 400,
                'type' => 'integer',
            ],
        ],
    ]);
});

/**
 * Generate QR code for any URL (POST)
 */
function artkey_qr_generate($request) {
    $url = $request->get_param('url');
    $size = $request->get_param('size') ?: 400;
    $margin = $request->get_param('margin') ?: 10;

    if (empty($url)) {
        return new WP_Error('missing_url', 'URL parameter is required', ['status' => 400]);
    }

    return artkey_qr_create($url, $size, $margin);
}

/**
 * Generate QR code for ArtKey token
 */
function artkey_qr_for_token($request) {
    $token = $request['token'];
    $size = $request->get_param('size') ?: 400;
    
    $share_url = home_url('/artkey/' . $token);
    
    return artkey_qr_create($share_url, $size);
}

/**
 * Generate QR code for URL (GET)
 */
function artkey_qr_for_url($request) {
    $url = $request->get_param('url');
    $size = $request->get_param('size') ?: 400;
    
    return artkey_qr_create($url, $size);
}

/**
 * Create QR code image
 */
function artkey_qr_create($url, $size = 400, $margin = 10) {
    // Check if endroid/qr-code library is available
    if (!class_exists('\\Endroid\\QrCode\\QrCode')) {
        return new WP_Error(
            'library_missing',
            'QR code library not found. Please install: composer require endroid/qr-code',
            ['status' => 500]
        );
    }

    try {
        $qr = new \Endroid\QrCode\QrCode($url);
        $qr->setSize($size);
        $qr->setMargin($margin);
        $qr->setEncoding(new \Endroid\QrCode\Encoding\Encoding('UTF-8'));
        $qr->setErrorCorrectionLevel(
            new \Endroid\QrCode\ErrorCorrectionLevel\ErrorCorrectionLevelMedium()
        );

        $writer = new \Endroid\QrCode\Writer\PngWriter();
        $result = $writer->write($qr);

        // Save to uploads directory
        $upload_dir = wp_upload_dir();
        if (!empty($upload_dir['error'])) {
            return new WP_Error('upload_error', 'Failed to get upload directory', ['status' => 500]);
        }

        $dir = trailingslashit($upload_dir['basedir']) . 'artkey-qr/';
        if (!wp_mkdir_p($dir)) {
            return new WP_Error('directory_error', 'Failed to create QR directory', ['status' => 500]);
        }

        $filename = 'qr-' . md5($url) . '-' . time() . '.png';
        $path = $dir . $filename;

        $result->saveToFile($path);

        $url_path = trailingslashit($upload_dir['baseurl']) . 'artkey-qr/' . $filename;

        return [
            'success' => true,
            'url' => esc_url_raw($url_path),
            'path' => $path,
            'size' => $size,
        ];
    } catch (\Throwable $e) {
        return new WP_Error(
            'qr_error',
            'Failed to generate QR code: ' . $e->getMessage(),
            ['status' => 500]
        );
    }
}

// ----------------------------
// Admin Settings Page
// ----------------------------
add_action('admin_menu', function () {
    add_options_page(
        'ArtKey QR Generator',
        'ArtKey QR Generator',
        'manage_options',
        'artkey-qr-generator',
        'artkey_qr_admin_page'
    );
});

function artkey_qr_admin_page() {
    $library_available = class_exists('\\Endroid\\QrCode\\QrCode');
    ?>
    <div class="wrap">
        <h1>ArtKey QR Code Generator</h1>
        
        <?php if (!$library_available): ?>
            <div class="notice notice-error">
                <p><strong>QR Code Library Not Found!</strong></p>
                <p>Please install the required library using one of these methods:</p>
                <ol>
                    <li><strong>Via Composer (Recommended):</strong>
                        <pre style="background: #f0f0f0; padding: 10px; margin: 10px 0;">cd wp-content/plugins/artkey-qr-generator
composer require endroid/qr-code</pre>
                    </li>
                    <li><strong>Via cPanel:</strong>
                        <ul>
                            <li>Install Composer in cPanel</li>
                            <li>Navigate to plugin directory</li>
                            <li>Run: <code>composer require endroid/qr-code</code></li>
                        </ul>
                    </li>
                </ol>
            </div>
        <?php else: ?>
            <div class="notice notice-success">
                <p><strong>✓ QR Code Library is installed and ready!</strong></p>
            </div>
        <?php endif; ?>

        <div class="card">
            <h2>API Endpoints</h2>
            <p>Use these REST API endpoints to generate QR codes:</p>
            
            <h3>1. Generate QR for any URL (POST)</h3>
            <pre style="background: #f0f0f0; padding: 10px; margin: 10px 0;">
POST <?php echo rest_url('artkey-qr/v1/generate'); ?>

Body:
{
    "url": "https://example.com",
    "size": 400,
    "margin": 10
}
            </pre>

            <h3>2. Generate QR for ArtKey token (GET)</h3>
            <pre style="background: #f0f0f0; padding: 10px; margin: 10px 0;">
GET <?php echo rest_url('artkey-qr/v1/artkey/{32-char-token}?size=400'); ?>
            </pre>

            <h3>3. Generate QR for URL (GET)</h3>
            <pre style="background: #f0f0f0; padding: 10px; margin: 10px 0;">
GET <?php echo rest_url('artkey-qr/v1/url?url=https://example.com&size=400'); ?>
            </pre>
        </div>

        <div class="card">
            <h2>Test QR Generation</h2>
            <form id="qr-test-form">
                <table class="form-table">
                    <tr>
                        <th><label for="test-url">URL</label></th>
                        <td>
                            <input type="url" id="test-url" class="regular-text" 
                                   value="<?php echo home_url('/artkey/test-token-123456789012345678901234'); ?>" />
                        </td>
                    </tr>
                    <tr>
                        <th><label for="test-size">Size</label></th>
                        <td>
                            <input type="number" id="test-size" value="400" min="100" max="1000" />
                        </td>
                    </tr>
                </table>
                <p class="submit">
                    <button type="button" class="button button-primary" onclick="testQRGeneration()">
                        Generate QR Code
                    </button>
                </p>
            </form>
            <div id="qr-result" style="margin-top: 20px;"></div>
        </div>
    </div>

    <script>
    function testQRGeneration() {
        const url = document.getElementById('test-url').value;
        const size = document.getElementById('test-size').value;
        const resultDiv = document.getElementById('qr-result');
        
        resultDiv.innerHTML = '<p>Generating QR code...</p>';
        
        fetch('<?php echo rest_url('artkey-qr/v1/generate'); ?>', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-WP-Nonce': '<?php echo wp_create_nonce('wp_rest'); ?>'
            },
            body: JSON.stringify({ url: url, size: parseInt(size) })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                resultDiv.innerHTML = `
                    <div style="background: #f0f0f0; padding: 20px; border-radius: 5px;">
                        <h3>QR Code Generated!</h3>
                        <img src="${data.url}" alt="QR Code" style="max-width: 400px; border: 1px solid #ddd;" />
                        <p><strong>URL:</strong> <a href="${data.url}" target="_blank">${data.url}</a></p>
                    </div>
                `;
            } else {
                resultDiv.innerHTML = `<div class="notice notice-error"><p>Error: ${data.message || 'Unknown error'}</p></div>`;
            }
        })
        .catch(error => {
            resultDiv.innerHTML = `<div class="notice notice-error"><p>Error: ${error.message}</p></div>`;
        });
    }
    </script>
    <?php
}

// ----------------------------
// WooCommerce Integration
// ----------------------------
// Auto-generate QR codes for ArtKey orders
add_action('woocommerce_checkout_create_order_line_item', function ($item, $cart_item_key, $values, $order) {
    // Check if this item has an ArtKey
    $artkey_token = $item->get_meta('artkey_token', true);
    $artkey_share_url = $item->get_meta('artkey_share_url', true);
    
    if (!$artkey_token && !$artkey_share_url) {
        return;
    }

    // Check if QR already exists
    if ($item->get_meta('_artkey_qr_url', true)) {
        return;
    }

    // Generate share URL if not present
    if (!$artkey_share_url && $artkey_token) {
        $artkey_share_url = home_url('/artkey/' . $artkey_token);
        $item->update_meta_data('artkey_share_url', $artkey_share_url);
    }

    // Generate QR code
    $qr_result = artkey_qr_create($artkey_share_url, 400, 10);
    
    if (!is_wp_error($qr_result) && isset($qr_result['url'])) {
        $item->update_meta_data('_artkey_qr_url', esc_url_raw($qr_result['url']));
    }
}, 20, 4);

