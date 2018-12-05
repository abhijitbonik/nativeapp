# react-native-offline-cache-webview

## Features
Offline cache enabled WebView, works for Android and iOS.

iOS | Android
------- | ----
<img title="Android" src="https://i.imgur.com/81c9Gn5.png" width="350"> | <img title="Android" src="https://i.imgur.com/FNlkjkO.png" width="350">


## Install

```bash
npm i react-native-offline-cache-webview --save
react-native link react-native-offline-cache-webview
```

## Usage
```javascript
import OfflineCacheWebView from 'react-native-offline-cache-webview';
export default class webview extends Component {
    render() {
        return (
            <OfflineCacheWebView
                style={styles.webview}
                source={{uri: 'http://facebook.github.io/react-native/blog/2018/06/14/state-of-react-native-2018'}}
            />
        );
    }
}
```
### Example
* Check it [here](https://github.com/zhangtaii/react-native-offline-cache-webview/tree/master/example)


### How does this work?

For iOS, the offline cache is implemented with `RNCachingURLProtocol`
> **RNCachingURLProtocol** is a simple shim for the HTTP protocol (that’s not nearly as scary as it sounds). Anytime a URL is downloaded, the response is cached to disk. Anytime a URL is requested, if we’re online then things proceed normally. If we’re offline, then we retrieve the cached version.

For Android, it's provided by `CacheWebView`
> **CacheWebView** is a custom implement of Android WebView resource interceptor. It beyond system WebView cache space limit, let cache config more simple ,fast and flexible. Visit website by offline.

This library is built on top of `react-native-advanced-webview`, the architecture leveraged for customizing *React Naitve* **WebView**
### TODO

* `offlineCacheMode` property to control `on/off` for cache usage
* `prefetch` method for caching url by advance
* `clearCache` method


### References
* [react-native-create-library](https://github.com/frostney/react-native-create-library)
* [react-native-advanced-webview](https://github.com/magicismight/react-native-advanced-webview)
* [CacheWebView](https://github.com/yale8848/CacheWebView)
* [RNCachingURLProtocol](https://github.com/rnapier/RNCachingURLProtocol)
