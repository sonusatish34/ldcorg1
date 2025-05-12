// utils/redirectUtils.js

export const handleStoreRedirect = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        // Redirect to App Store if iOS
        window.open(
            "https://apps.apple.com/in/app/long-drive-cars/id6466695391",
            "_blank"
        );
    } else if (/android/i.test(userAgent)) {
        // Redirect to Play Store if Android
        window.open(
            "https://play.google.com/store/search?q=long+drive+cars&c=apps",
            "_blank"
        );
    } else {
        // Optional: Provide a message for non-mobile devices
        alert("App is available only on mobile devices.");
    }
};
