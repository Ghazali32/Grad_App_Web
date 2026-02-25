# Expo Migration - Code Adaptation Guide

## Files that Need Updates

### 1. Push Notifications (3 files)
- `/src/screens/DashboardScreen/DashboardScreen.js` - Uses `react-native-push-notification`
- `/src/push_notification/pushNotification.js` - Uses `react-native-push-notification`
- `App.js` - ✅ Already updated

**Solution**: Comment out or use Firebase Messaging instead

### 2. File Operations (1 file)
- `/src/screens/components/AudioRecorder.js` - Uses `rn-fetch-blob`

**Solution**: Replace with `expo-file-system`

### 3. Device Info
- Search for `react-native-device-info` imports

**Solution**: Replace with `expo-device`, `expo-application`, `expo-constants`

### 4. Geolocation
- Search for `@react-native-community/geolocation` imports

**Solution**: Replace with `expo-location`

## Migration Strategy
1. Comment out non-critical features first (push notifications)
2. Replace file operations (AudioRecorder)
3. Test basic build
4. Gradually re-enable features with Expo equivalents
