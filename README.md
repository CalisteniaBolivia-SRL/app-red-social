# TAPEKE

## v 1.6

```bash

npm install

#IOS
grep -rl "s.dependency 'React/Core'" node_modules/ | xargs sed -i '' 's=React/Core=React-Core=g'
cd ios && pod install

```


## FACEBOOK
https://developers.facebook.com/apps/1004324290192134/settings/basic/

### generar claves Hashes para facebook
```bash
#DEBUG (pass: android)
keytool -exportcert -alias androiddebugkey -keystore ./android/app/debug.keystore | openssl sha1 -binary | openssl base64
```
```bash
#RELEASE
keytool -exportcert -alias YOUR_RELEASE_KEY_ALIAS -keystore YOUR_RELEASE_KEY_PATH | openssl sha1 -binary | openssl base64
```
## GOOGLE
https://console.firebase.google.com/u/4/project/tapeke-20bb6/settings/general/android:com.calistenia_rs_app
### generar claves SHA para google
```bash
#DEBUG (pass: android)
 keytool -list -v -alias androiddebugkey -keystore ./android/app/debug.keystore
```
```bash
#RELEASE
keytool -list -v -alias YOUR_RELEASE_KEY_ALIAS -keystore YOUR_RELEASE_KEY_PATH
```

