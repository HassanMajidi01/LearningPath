<?php
/**
 * Sanitization functions.
 *
 * @package SpeedBlog
 */
if ( ! function_exists( 'speedblog_sanitize_checkbox' ) ) :

    /**
     * Sanitize checkbox.
     *
     * @since 1.0.0
     *
     * @param mixed $checked Whether the checkbox is checked.
     * @return bool Whether the checkbox is checked.
     */
    function speedblog_sanitize_checkbox( $checked ) {
        // Return true if the checkbox is checked, otherwise false.
        return (bool) $checked;
    }

endif;

if ( ! function_exists( 'speedblog_sanitize_select' ) ) :

    /**
     * Sanitize select.
     *
     * @since 1.0.0
     *
     * @param mixed                $input   The value to sanitize.
     * @param WP_Customize_Setting $setting WP_Customize_Setting instance.
     * @return mixed Sanitized value.
     */
    function speedblog_sanitize_select( $input, $setting ) {
        // Ensure input is a slug.
        $input = sanitize_key( $input );

        // Get list of choices from the control associated with the setting.
        $choices = $setting->manager->get_control( $setting->id )->choices;

        // If the input is a valid key, return it; otherwise, return the default.
        return array_key_exists( $input, $choices ) ? $input : $setting->default;
    }

endif;

if ( ! function_exists( 'speedblog_sanitize_radio' ) ) :
    /**
     * Sanitize radio.
     *
     * @since 1.0.0
     *
     * @param mixed                $input The value to sanitize.
     * @param WP_Customize_Setting $setting WP_Customize_Setting instance.
     * @return mixed Sanitized value.
     */
    function speedblog_sanitize_radio( $input, $setting ) {

        // input must be a slug: lowercase alphanumeric characters, dashes and underscores are allowed only.
        $input = sanitize_key( $input );

        // get the list of possible radio box options.
        $choices = $setting->manager->get_control( $setting->id )->choices;

        // return input if valid or return default option.
        return ( array_key_exists( $input, $choices ) ? $input : $setting->default );

    }

endif;  


if( !function_exists( 'speedblog_sanitize_archive_layout' ) ) :

    // Single Layout Option Sanitize.
    function speedblog_sanitize_archive_layout( $speedblog_input ){

        $speedblog_single_layout = array( 'archive_style_1','archive_style_2','archive_style_3' );
        if( in_array( $speedblog_input,$speedblog_single_layout ) ){

            return $speedblog_input;

        }

        return;

    }

endif;



if ( ! function_exists( 'speedblog_sanitize_image' ) ) :

    /**
     * Sanitize image.
     *
     * @since 1.0.0
     *
     * @see wp_check_filetype() https://developer.wordpress.org/reference/functions/wp_check_filetype/
     *
     * @param string               $image Image filename.
     * @param WP_Customize_Setting $setting WP_Customize_Setting instance.
     * @return string The image filename if the extension is allowed; otherwise, the setting default.
     */
    function speedblog_sanitize_image( $image, $setting ) {

        /**
         * Array of valid image file types.
         *
         * The array includes image mime types that are included in wp_get_mime_types().
        */
        $mimes = array(
            'jpg|jpeg|jpe' => 'image/jpeg',
            'gif'          => 'image/gif',
            'png'          => 'image/png',
            'bmp'          => 'image/bmp',
            'tiff|tif'     => 'image/tiff',
            'webp'         => 'image/webp',
            'ico'          => 'image/x-icon',
            'heic'         => 'image/heic',
        );

        // Return an array with file extension and mime_type.
        $file = wp_check_filetype( $image, $mimes );

        // If $image has a valid mime_type, return it; otherwise, return the default.
        return ( $file['ext'] ? $image : $setting->default );

    }

endif;