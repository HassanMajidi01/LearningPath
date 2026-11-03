<?php
/**
 * Displays preloader
 *
 * @package SpeedBlog
 */
?>
<div id="wpi-preloader">
    <div class="wpi-preloader-wrapper">
        <?php
        $preloader_style = speedblog_get_option('speedblog_preloader_style');
        switch ($preloader_style) {
            case 'style-1': ?>
                <div class="site-preloader site-preloader-1"></div>
                <?php
                break;
            case 'style-2': ?>
                <div class="site-preloader site-preloader-2">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                </div>
                <?php
                break;
            case 'style-3': ?>
                <div class="site-preloader site-preloader-3">
                    <div class="slice"></div>
                    <div class="slice"></div>
                    <div class="slice"></div>
                    <div class="slice"></div>
                    <div class="slice"></div>
                    <div class="slice"></div>
                </div>
                <?php
                break;
            case 'style-4': ?>
                <div class="site-preloader site-preloader-4"></div>
                <?php
                break;
            case 'style-5': ?>
                <div class="site-preloader site-preloader-5">
                    <div class="line"></div>
                    <div class="line"></div>
                    <div class="line"></div>
                    <div class="line"></div>
                    <div class="line"></div>
                    <div class="line"></div>
                    <div class="line"></div>
                    <div class="line"></div>
                    <div class="line"></div>
                    <div class="line"></div>
                    <div class="line"></div>
                    <div class="line"></div>
                </div>
                <?php
                break;
            case 'style-6': ?>
                <div class="site-preloader site-preloader-6">
                    <svg class="preloader-6-container" x="0px" y="0px" viewBox="0 0 55 23.1" height="23.1" width="55" preserveAspectRatio='xMidYMid meet'>
                        <path class="track" fill="none" stroke-width="4" pathlength="100" d="M26.7,12.2c3.5,3.4,7.4,7.8,12.7,7.8c5.5,0,9.6-4.4,9.6-9.5C49,5,45.1,1,39.8,1c-5.5,0-9.5,4.2-13.1,7.8l-3.4,3.3c-3.6,3.6-7.6,7.8-13.1,7.8C4.9,20,1,16,1,10.5C1,5.4,5.1,1,10.6,1c5.3,0,9.2,4.5,12.7,7.8L26.7,12.2z"/>
                        <path class="car" fill="none" stroke-width="4" pathlength="100" d="M26.7,12.2c3.5,3.4,7.4,7.8,12.7,7.8c5.5,0,9.6-4.4,9.6-9.5C49,5,45.1,1,39.8,1c-5.5,0-9.5,4.2-13.1,7.8l-3.4,3.3c-3.6,3.6-7.6,7.8-13.1,7.8C4.9,20,1,16,1,10.5C1,5.4,5.1,1,10.6,1c5.3,0,9.2,4.5,12.7,7.8L26.7,12.2z"/>
                    </svg>
                </div>
                <?php
                break;
            case 'style-7': ?>
                <div class="site-preloader site-preloader-7">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                </div>
                <?php
                break;
            case 'style-8': ?>
                <div class="site-preloader site-preloader-8">
                    <svg class="preloader-8-container" viewBox="0 0 200 200" width="200" height="200" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="pl-grad1" x1="1" y1="0.5" x2="0" y2="0.5">
                                <stop offset="0%" stop-color="hsl(313,90%,55%)"/>
                                <stop offset="100%" stop-color="hsl(223,90%,55%)"/>
                            </linearGradient>
                            <linearGradient id="pl-grad2" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stop-color="hsl(313,90%,55%)"/>
                                <stop offset="100%" stop-color="hsl(223,90%,55%)"/>
                            </linearGradient>
                        </defs>
                        <circle class="loader-animate-ring" cx="100" cy="100" r="82" fill="none" stroke="url(#pl-grad1)" stroke-width="36" stroke-dasharray="0 257 1 257" stroke-dashoffset="0.01" stroke-linecap="round" transform="rotate(-90,100,100)"/>
                        <line class="loader-animate-ball" stroke="url(#pl-grad2)" x1="100" y1="18" x2="100.01" y2="182" stroke-width="36" stroke-dasharray="1 165" stroke-linecap="round"/>
                    </svg>
                </div>
                <?php
                break;
            case 'style-9': ?>
                <div class="site-preloader site-preloader-9">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <?php
                break;
            case 'style-10': ?>
                <div class="site-preloader site-preloader-10">
                    <span></span>
                </div>
                <?php
                break;
            default:
        } ?>
    </div>
</div>
