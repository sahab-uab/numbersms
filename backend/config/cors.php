<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    | To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |
    */

    // Define paths where CORS is enabled
    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    // Allow all HTTP methods (GET, POST, etc.)
    'allowed_methods' => ['*'],

    // Restrict the allowed origins (e.g., your frontend URL)
    'allowed_origins' => ['http://localhost:5174'], // Update with your frontend URL

    // Allow any patterns for origins if needed (optional)
    'allowed_origins_patterns' => [],

    // Allow all headers to be sent in requests
    'allowed_headers' => ['*'],

    // Expose specific headers in responses (optional)
    'exposed_headers' => [],

    // Set max age for preflight requests (optional)
    'max_age' => 0,

    // Allow cookies and credentials to be included in requests
    'supports_credentials' => true, // Enable if cookies or authorization headers are needed
];
