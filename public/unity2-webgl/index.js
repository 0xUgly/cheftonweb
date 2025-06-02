window.addEventListener("load", function () {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("ServiceWorker.js");
  }
});

var unityInstanceRef;
var unsubscribe;
var container = document.querySelector("#unity-container");
var canvas = document.querySelector("#unity-canvas");
var loadingBar = document.querySelector("#unity-loading-bar");
var progressBarFull = document.querySelector("#unity-progress-bar-full");
var warningBanner = document.querySelector("#unity-warning");

// Shows a temporary message banner/ribbon for a few seconds, or
// a permanent error message on top of the canvas if type=='error'.
// If type=='warning', a yellow highlight color is used.
// Modify or remove this function to customize the visually presented
// way that non-critical warnings and error messages are presented to the
// user.
function unityShowBanner(msg, type) {
  function updateBannerVisibility() {
    warningBanner.style.display = warningBanner.children.length ? 'block' : 'none';
  }
  var div = document.createElement('div');
  div.innerHTML = msg;
  warningBanner.appendChild(div);
  if (type == 'error') div.style = 'background: red; padding: 10px;';
  else {
    if (type == 'warning') div.style = 'background: yellow; padding: 10px;';
    setTimeout(function() {
      warningBanner.removeChild(div);
      updateBannerVisibility();
    }, 5000);
  }
  updateBannerVisibility();
}

var buildUrl = "Build";
var loaderUrl = buildUrl + "/Chefton_Web_Gl.loader.js";
var config = {
  dataUrl: buildUrl + "/Chefton_Web_Gl.data",
  frameworkUrl: buildUrl + "/Chefton_Web_Gl.framework.js",
  codeUrl: buildUrl + "/Chefton_Web_Gl.wasm",
  streamingAssetsUrl: "StreamingAssets",
  companyName: "RuptureLabs",
  productName: "Chefton",
  productVersion: "1.0",
  showBanner: unityShowBanner,
};

// By default Unity keeps WebGL canvas render target size matched with
// the DOM size of the canvas element (scaled by window.devicePixelRatio)
// Set this to false if you want to decouple this synchronization from
// happening inside the engine, and you would instead like to size up
// the canvas DOM size and WebGL render target sizes yourself.
// config.matchWebGLToCanvasSize = false;

// Add fullscreen CSS styles
const style = document.createElement('style');
style.textContent = `
  body, html {
    margin: 0 !important;
    padding: 0 !important;
    height: 100vh !important;
    width: 100vw !important;
    overflow: hidden !important;
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
  }
  #unity-container {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    z-index: 9999 !important;
  }
  #unity-canvas {
    width: 100% !important;
    height: 100% !important;
    display: block !important;
  }
  #unity-loading-bar {
    position: fixed !important;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%) !important;
    z-index: 10000 !important;
  }
`;
document.head.appendChild(style);

if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
  // Mobile device style: fill the whole browser client area with the game canvas:
  var meta = document.createElement('meta');
  meta.name = 'viewport';
  meta.content = 'width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes, viewport-fit=cover';
  document.getElementsByTagName('head')[0].appendChild(meta);
}

canvas.style.background = "url('" + buildUrl + "/Chefton_Web_Gl.jpg') center / cover";
loadingBar.style.display = "block";

// Telegram WebApp initialization function
function initializeTelegramWebApp() {
  if (window.Telegram && window.Telegram.WebApp) {
    let tg = window.Telegram.WebApp;
    
    console.log('Initializing Telegram WebApp...');
    tg.ready();

    // Debug: Check what methods and properties are available
    console.log('Telegram WebApp version:', tg.version);
    console.log('Platform:', tg.platform);
    console.log('Available methods:', Object.getOwnPropertyNames(tg));
    console.log('requestFullscreen available:', typeof tg.requestFullscreen);
    console.log('expand available:', typeof tg.expand);
    console.log('isFullscreen:', tg.isFullscreen);
    console.log('isExpanded:', tg.isExpanded);
    console.log('viewportHeight:', tg.viewportHeight);

    // Set up event listeners first
    tg.onEvent('fullscreenChanged', function(eventData) {
      console.log('Fullscreen changed:', eventData, 'isFullscreen:', tg.isFullscreen);
    });

    tg.onEvent('fullscreenFailed', function(eventData) {
      console.log('Fullscreen failed:', eventData);
    });

    tg.onEvent('viewportChanged', function(eventData) {
      console.log('Viewport changed:', eventData, 'Height:', tg.viewportHeight, 'Stable:', eventData.isStateStable);
    });

    // Try multiple fullscreen approaches
    setTimeout(() => {
      console.log('Attempting fullscreen...');
      
      // Method 1: Try new API (Bot API 8.0+)
      if (typeof tg.requestFullscreen === 'function') {
        console.log('Using requestFullscreen()');
        try {
          tg.requestFullscreen();
        } catch (e) {
          console.error('requestFullscreen failed:', e);
        }
      }
      
      // Method 2: Try legacy expand (always try this as fallback)
      if (typeof tg.expand === 'function') {
        console.log('Using expand()');
        try {
          tg.expand();
        } catch (e) {
          console.error('expand failed:', e);
        }
      }

      // Method 3: Configure UI elements
      try {
        // Hide UI elements
        if (tg.BackButton && typeof tg.BackButton.hide === 'function') {
          tg.BackButton.hide();
        }
        if (tg.MainButton && typeof tg.MainButton.hide === 'function') {
          tg.MainButton.hide();
        }
        if (tg.SecondaryButton && typeof tg.SecondaryButton.hide === 'function') {
          tg.SecondaryButton.hide();
        }

        // Set header color to match background
        if (typeof tg.setHeaderColor === 'function') {
          tg.setHeaderColor('bg_color');
        }

        // Disable closing confirmation
        if (typeof tg.disableClosingConfirmation === 'function') {
          tg.disableClosingConfirmation();
        }

        console.log('UI configuration completed');
      } catch (e) {
        console.error('UI configuration failed:', e);
      }

      // Method 4: Enable vertical swipes if available
      try {
        if (typeof tg.enableVerticalSwipes === 'function') {
          tg.enableVerticalSwipes();
        }
      } catch (e) {
        console.error('enableVerticalSwipes failed:', e);
      }

      // Log final state
      setTimeout(() => {
        console.log('Final state - isFullscreen:', tg.isFullscreen, 'isExpanded:', tg.isExpanded, 'viewportHeight:', tg.viewportHeight);
      }, 1000);
    }, 500);

  } else {
    console.warn('Telegram WebApp not available');
    // Retry after a delay
    setTimeout(initializeTelegramWebApp, 1000);
  }
}

var script = document.createElement("script");
script.src = loaderUrl;
script.onload = () => {
  createUnityInstance(canvas, config, (progress) => {
    progressBarFull.style.width = 100 * progress + "%";
  }).then((unityInstance) => {
    unityInstanceRef = unityInstance;
    loadingBar.style.display = "none";
    
    console.log('Unity instance created successfully');
    
    // Ensure fullscreen after Unity loads
    setTimeout(() => {
      if (window.Telegram && window.Telegram.WebApp) {
        let tg = window.Telegram.WebApp;
        if (typeof tg.expand === 'function') {
          tg.expand();
        }
        if (typeof tg.requestFullscreen === 'function') {
          tg.requestFullscreen();
        }
      }
    }, 1000);
    
  }).catch((message) => {
    console.error('Unity instance creation failed:', message);
    alert(message);
  });
};
document.body.appendChild(script);

// Initialize Telegram WebApp
setTimeout(initializeTelegramWebApp, 100);

// Additional initialization attempts
setTimeout(initializeTelegramWebApp, 1000);
setTimeout(initializeTelegramWebApp, 3000);

// Handle page visibility changes
document.addEventListener('visibilitychange', function() {
  if (!document.hidden && window.Telegram && window.Telegram.WebApp) {
    let tg = window.Telegram.WebApp;
    setTimeout(() => {
      if (typeof tg.expand === 'function') {
        tg.expand();
      }
      if (typeof tg.requestFullscreen === 'function') {
        tg.requestFullscreen();
      }
    }, 100);
  }
});

// Handle window resize
window.addEventListener('resize', function() {
  if (window.Telegram && window.Telegram.WebApp) {
    let tg = window.Telegram.WebApp;
    console.log('Window resized, viewport height:', tg.viewportHeight);
  }
});

// Prevent default touch behaviors that might interfere
document.addEventListener('touchstart', function(e) {
  e.preventDefault();
}, { passive: false });

document.addEventListener('touchmove', function(e) {
  e.preventDefault();
}, { passive: false });