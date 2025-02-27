---
layout: post
title: Automatically Keeping Users Logged In on Mobile
date: 2024-12-05 16:00:00
description: A closer look at handling secure, persistent user authentication within mobile apps
tags: [mobile, flutter, security, authentication]
categories: mobile-dev
thumbnail: https://rublon.com/wp-content/uploads/2023/08/MFA-login-for-privileged-access-1024x584.jpg
---

<div class="row">
  <div class="col-sm mt-3 mt-md-0 text-center">
    {% include figure.liquid
       loading="eager"
       path="https://rublon.com/wp-content/uploads/2023/08/MFA-login-for-privileged-access-1024x584.jpg"
       title="Keeping Users Logged In"
       class="rounded z-depth-1"
       max-width="800px"
    %}
  </div>
</div>

Modern mobile applications often require persistent user authentication. In other words, once the user logs in, they should remain authenticated across app restarts—without needing to re-enter credentials each time. Below, I’ll discuss how I build an “auto-login” feature, including some best practices around tokens, local storage, and secure checks.

---

## The Business Logic

### Token-Based Authentication

When a user logs in, the server returns an authentication token (e.g., a JWT or a session token). Typically:

1. **Login**: User submits email/password to a secure API endpoint.
2. **Token Issuance**: Server responds with a short-lived token and (in some cases) a refresh token.
3. **Storage**: The app persists these credentials in local storage (e.g., Keychain on iOS, Keystore on Android, or a library such as `flutter_secure_storage` in Flutter).
4. **Auto-Login**: On each app launch, the application reads these tokens from storage and checks validity, possibly refreshing them if needed.

If the tokens are valid, we skip the sign-in screen; otherwise, the app requires new credentials.

### Architectural Overview

- **Network Layer**: Responsible for injecting the stored token into every outgoing request (e.g., using an interceptor).
- **State Manager**: Tracks if the user is logged in. If tokens are missing or expired, we prompt for login.
- **Token Renewal**: Optionally handle silent token refresh behind the scenes if the server supports that.

One important detail is to **never** hardcode your secret keys in the client, and always use SSL/TLS to prevent man-in-the-middle attacks.

---

## Example Code Snippet (Flutter-Dart)

Below is a **condensed** snippet showing the typical flow: reading an existing token, calling an API to check if it’s valid, and storing user info in your model. This is adapted from an internal codebase I wrote (and I’ve expanded or refined it to illustrate best practices). The actual production version is more extensive.

```dart
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'my_auth_api.dart';

class AuthService {
  Future<bool> checkAutoLogin() async {
    final prefs = await SharedPreferences.getInstance();
    final storedToken = prefs.getString('app_token') ?? '';
    if (storedToken.isEmpty) {
      return false; // no token found
    }

    // Attempt to verify or refresh the token
    try {
      bool valid = await MyAuthApi.checkIsLogin(storedToken);
      if (!valid) {
        // token is invalid => force re-login
        await prefs.remove('app_token');
        return false;
      } else {
        // fetch user info to keep things updated
        final userInfo = await MyAuthApi.getUserInfo(storedToken);
        // store user info in memory, e.g., global singleton or provider
        // ...
        return true;
      }
    } catch (e) {
      // in case of network error or server error
      await prefs.remove('app_token');
      return false;
    }
  }
}
```

1. **SharedPreferences**: This snippet uses `SharedPreferences` for simplicity, but in production, you might prefer an encrypted store for security.
2. **checkIsLogin**: A server call to validate the token or determine if the user is effectively logged in.
3. **User Info**: If valid, we retrieve user metadata (like name, avatar, roles) and store it in memory (or in a global data model).

By hooking `checkAutoLogin()` into your app’s initialization phase, you can automatically guide the user to either their home screen or a login screen.

---

## Handling Expired Tokens

If the server sets short-lived tokens, you typically use a **refresh token** or re-prompt for credentials. A common pattern is:

- On every request, if the token is expired, the client tries to exchange the refresh token for a new access token (completely invisible to the user).
- If the refresh token itself has expired, you redirect to login.

---

## Security Precautions

- **Use Secure Storage**: On iOS, Keychain is recommended; on Android, the Keystore. Flutter wrappers like `flutter_secure_storage` can help.
- **Rotate Tokens**: Invalidate tokens server-side after a reasonable lifespan.
- **Logout**: Provide a reliable logout flow that clears tokens from local storage.
- **SSL/TLS**: Always use HTTPS to prevent interception of token traffic.

---

## Conclusion

Automatic login significantly enhances user experience by skipping repetitive credential prompts. The implementation focuses on **safely storing tokens**, **verifying them on app launch**, and **refreshing** them in the background if needed. By carefully combining secure local storage with a robust server-side authentication flow, you can deliver a streamlined experience without sacrificing security.

In my own projects, I’ve integrated these steps into dedicated methods, ensuring a consistent approach for all user-facing screens. The principle is universal: persist tokens securely, validate them gracefully, and degrade to manual login only if absolutely necessary.
