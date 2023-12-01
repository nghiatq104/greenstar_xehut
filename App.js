/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {KeyboardAvoidingView, StatusBar} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import OneSignal from 'react-native-onesignal';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import Progress from './src/components/Progress';
import AppNavigator from './src/navigation/AppNavigator';
import createStore from './src/state';

export const store = createStore();
function myiOSPromptCallback(permission) {
  // do something with permission value
}

export default class App extends Component {
  constructor(props) {
    super(props);
    OneSignal.setLogLevel(6, 0);
    OneSignal.init('c541858d-b495-49c6-b42d-112b49c0aa5a', {
      kOSSettingsKeyAutoPrompt: false,
      kOSSettingsKeyInAppLaunchURL: false,
      kOSSettingsKeyInFocusDisplayOption: 2,
    });
    OneSignal.inFocusDisplaying(2);
    OneSignal.promptForPushNotificationsWithUserResponse(myiOSPromptCallback);

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds); // triggers the ids event
  }

  onReceived(notification) {
    console.log('Notification received: ', notification);
  }

  onOpened(openResult) {
    // console.log("Message: ", openResult.notification.payload.body);
    // console.log("Data: ", openResult.notification.payload.additionalData);
    // console.log("isActive: ", openResult.notification.isAppInFocus);
  }

  onIds(device) {
    console.log('Device info: ', device);
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }
  render() {
    return (
      <SafeAreaProvider>
        <Provider store={store}>
          <StatusBar barStyle="dark-content" backgroundColor="white" />
          {Platform.select({
            ios: (
              <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
                <AppNavigator />
              </KeyboardAvoidingView>
            ),
            android: <AppNavigator />,
          })}
          <Progress />
          <FlashMessage position="top" />
        </Provider>
      </SafeAreaProvider>
    );
  }
}
