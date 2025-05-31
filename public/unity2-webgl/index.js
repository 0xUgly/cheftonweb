// First, ensure Telegram WebApp is available
declare global {;
  interface Window {
    Telegram: {
      WebApp: any;
    };
  }
}

// Initialize and configure the WebApp
//const tg = window.Telegram.WebApp;

// Expand to fullscreen
//tg.expand();

// Enable fullscreen mode (MiniApp 2.0 feature)
//if (tg.isFullscreen !== undefined) {
//  tg.requestFullscreen();
//}

// Request landscape orientation
async function requestLandscapeMode() {
  try {
    // Modern approach using Screen Orientation API
    if ('orientation' in screen) {
      await (screen.orientation as any).lock('landscape');
    }
    // Fallback for older browsers
    else if ('lockOrientation' in screen) {
      (screen as any).lockOrientation('landscape');
    }
  } catch (error) {
    console.log('Orientation lock not supported or failed:', error);
  }
}

// Set up viewport meta tag for landscape
function setupViewport() {
  const viewport = document.querySelector('meta[name="viewport"]');
  if (viewport) {
    viewport.setAttribute('content',
      'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover'
    );
  }
}

// Configure your WebGL canvas for fullscreen landscape
function setupWebGLCanvas() {
  const canvas = document.getElementById('unity-canvas') as HTMLCanvasElement;

  if (canvas) {
    // Set canvas to full viewport size
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '1000';

    // Handle resize events
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('orientationchange', () => {
      setTimeout(resizeCanvas, 100); // Delay to ensure orientation change is complete
    });

    resizeCanvas();
  }
}

async function initializeMiniApp() {
  // Setup Telegram WebApp
  const tg = window.Telegram.WebApp;

  // Configure WebApp settings
  tg.ready();
  tg.expand();

  // Request fullscreen (MiniApp 2.0)
  if (typeof tg.requestFullscreen === 'function') {
    tg.requestFullscreen();
  }

  // Setup viewport and orientation
  setupViewport();
  await requestLandscapeMode();

  // Configure WebGL canvas
  setupWebGLCanvas();

  // Hide Telegram UI elements
  tg.MainButton.hide();
  tg.BackButton.hide();

  // Prevent default touch behaviors that might interfere
  document.body.style.touchAction = 'none';
  document.body.style.overflow = 'hidden';

  // Optional: Handle hardware back button
  tg.onEvent('backButtonClicked', () => {
    // Handle back navigation or show exit confirmation
    if (confirm('Exit the game?')) {
      tg.close();
    }
  });
}

// Check for MiniApp 2.0 support
function checkMiniApp2Support() {
  const tg = window.Telegram.WebApp;

  // Check version
  const version = tg.version;
  const supports2_0 = parseFloat(version) >= 8.0; // Adjust version as needed

  if (supports2_0) {
    // Use MiniApp 2.0 features
    if (typeof tg.requestFullscreen === 'function') {
      tg.requestFullscreen();
    }

    // Additional 2.0 features
    if (typeof tg.lockOrientation === 'function') {
      tg.lockOrientation('landscape');
    }
  }

  return supports2_0;
}

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
  var loaderUrl = buildUrl + "/CheftonBuild.loader.js";
  var config = {
    dataUrl: buildUrl + "/CheftonBuild.data",
    frameworkUrl: buildUrl + "/CheftonBuild.framework.js",
    codeUrl: buildUrl + "/CheftonBuild.wasm",
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

  if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
    // Mobile device style: fill the whole browser client area with the game canvas:
    var meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes';
    document.getElementsByTagName('head')[0].appendChild(meta);
  }

  canvas.style.background = "url('" + buildUrl + "/CheftonBuild.jpg') center / cover";
  loadingBar.style.display = "block";

  var script = document.createElement("script");
  script.src = loaderUrl;
  script.onload = () => {
    createUnityInstance(canvas, config, (progress) => {
      progressBarFull.style.width = 100 * progress + "%";
    }).then((unityInstance) => {
      unityInstanceRef = unityInstance;
      loadingBar.style.display = "none";
    }).catch((message) => {
      alert(message);
    });
  };
  document.body.appendChild(script);
