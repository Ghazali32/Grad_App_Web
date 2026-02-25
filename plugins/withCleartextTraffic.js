const { withAndroidManifest } = require('expo/config-plugins');

/**
 * Expo config plugin to enable cleartext (HTTP) traffic for Android release builds.
 * This is needed because Android API 28+ blocks HTTP traffic by default.
 */
const withCleartextTraffic = (config) => {
    return withAndroidManifest(config, async (config) => {
        const androidManifest = config.modResults;

        // Find the application tag and add android:usesCleartextTraffic="true"
        const application = androidManifest.manifest.application?.[0];
        if (application) {
            application.$['android:usesCleartextTraffic'] = 'true';
        }

        return config;
    });
};

module.exports = withCleartextTraffic;
