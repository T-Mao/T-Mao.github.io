---
layout: post
title: Streamlining Network Calls with a Custom DioInstance
date: 2025-02-12 10:00:00
description: A deep dive into building a refined Dio setup for mobile apps
tags: [mobile, flutter, http, networking]
categories: [mobile-dev]
thumbnail: https://bizimages.withfloats.com/tile/66fbce0df93376ef9cc55c3e.jpg
---

<div class="row">
  <div class="col-sm mt-3 mt-md-0 text-center">
    {% include figure.liquid
       loading="eager"
       path="https://bizimages.withfloats.com/tile/66fbce0df93376ef9cc55c3e.jpg"
       title="Network Calls"
       class="rounded z-depth-1"
       max-width="800px"
    %}
  </div>
</div>

When building mobile apps, reliable HTTP networking is paramount. In the Dart/Flutter ecosystem, [Dio](https://pub.dev/packages/dio) stands out as a robust library for HTTP requests. While you can quickly fire off GETs and POSTs with default configs, more complex applications benefit from a unified, reusable Dio instance (commonly referred to as `DioInstance`).

I’ve personally coded and refined a custom `DioInstance` solution to handle everything from request logging and dynamic headers to file uploads. Below is an overview of the architectural choices that have proven invaluable for large-scale apps.

---

## Why a Single DioInstance?

Most production apps rely on consistent request configurations (headers, timeouts, interceptors, etc.). Creating a single shared `DioInstance` with these policies ensures:

1. **Centralized Configuration:** Modify base URL, timeouts, or content types in one place.
2. **Global Interceptors:** Cleanly integrate logic for logging, authentication tokens, or custom error handling.
3. **Maintainability:** Extending or changing behavior is straightforward—no need to replicate logic across multiple files.

---

## Core Features

In my own work, I structured the code to tackle several real-world concerns:

1. **Initialization & Safety Checks**

   - Enforce a single initialization step, so any subsequent method calls can rely on guaranteed defaults (like timeouts or base URLs).
   - Throw meaningful exceptions if someone forgets to initialize.

2. **HTTP Methods**

   - Provide a set of convenience functions, e.g., `get()`, `post()`, and `upload()`, each using custom options and interceptors under the hood.
   - Support query parameters, form data, JSON bodies, or multipart uploads with minimal friction.

3. **Interceptors**

   - **Header/Token Interceptor**: Attaches custom headers like tokens, language codes, or other user-specific fields.
   - **Logging Interceptor**: Prints requests/responses or sends them to a dedicated logger. This drastically simplifies debugging network issues.
   - **Response Interceptor**: Allows for uniform success/error handling. For instance, you can parse a known `code` field in the response JSON and throw an exception if it isn’t `200`.

4. **File Upload**

   - Simplifies constructing `FormData` with the local file path.
   - Allows a universal code path for multi-file or single-file uploads.

5. **Base URL Switching**
   - Handy for toggling between dev, staging, and production servers without rewriting code.

---

## A Condensed Example

Here’s an abbreviated version of my approach, demonstrating the main ideas:

```dart
import 'dart:io';
import 'package:dio/dio.dart';

class DioInstance {
  static DioInstance? _instance;
  DioInstance._internal(); // Private constructor

  // Public accessor for the singleton
  static DioInstance getInstance() {
    _instance ??= DioInstance._internal();
    return _instance!;
  }

  late Dio _dio;
  bool _initialized = false;

  void initDio({
    required String baseUrl,
    Duration? connectTimeout,
    Duration? receiveTimeout,
    Duration? sendTimeout,
    ResponseType responseType = ResponseType.json,
  }) {
    _dio = Dio(BaseOptions(
      baseUrl: baseUrl,
      connectTimeout: connectTimeout ?? const Duration(seconds: 30),
      receiveTimeout: receiveTimeout ?? const Duration(seconds: 30),
      sendTimeout: sendTimeout ?? const Duration(seconds: 30),
      responseType: responseType,
    ));

    // Custom interceptors (header, logging, response shaping)
    _dio.interceptors.addAll([
      _buildTokenInterceptor(),
      _buildLogInterceptor(),
      _buildResponseInterceptor(),
    ]);

    _initialized = true;
  }

  // GET method
  Future<Response> get({
    required String path,
    Map<String, dynamic>? queryParams,
    Options? options,
    CancelToken? cancelToken,
  }) async {
    _checkInitialized();
    return _dio.get(
      path,
      queryParameters: queryParams,
      options: options,
      cancelToken: cancelToken,
    );
  }

  // POST method
  Future<Response> post({
    required String path,
    dynamic data,
    Map<String, dynamic>? queryParams,
    Options? options,
    CancelToken? cancelToken,
  }) async {
    _checkInitialized();
    return _dio.post(
      path,
      data: data,
      queryParameters: queryParams,
      options: options,
      cancelToken: cancelToken,
    );
  }

  // File upload
  Future<Response> upload({
    required String path,
    required File file,
    Map<String, dynamic>? queryParams,
    Options? options,
    CancelToken? cancelToken,
  }) async {
    _checkInitialized();

    final fileName = file.path.split('/').last;
    final formData = FormData.fromMap({
      'file': await MultipartFile.fromFile(file.path, filename: fileName),
    });

    return _dio.post(
      path,
      data: formData,
      queryParameters: queryParams,
      options: options ??
          Options(contentType: Headers.formUrlEncodedContentType),
      cancelToken: cancelToken,
    );
  }

  // Example: change base URL on the fly
  void changeBaseUrl(String newBaseUrl) {
    _checkInitialized();
    _dio.options.baseUrl = newBaseUrl;
  }

  // --- Interceptors below ---
  Interceptor _buildTokenInterceptor() {
    return InterceptorsWrapper(
      onRequest: (options, handler) {
        // Insert token or language header here
        // options.headers["Authorization"] = "Bearer <token>";
        return handler.next(options);
      },
    );
  }

  Interceptor _buildLogInterceptor() {
    return InterceptorsWrapper(
      onRequest: (options, handler) {
        print(">> [Dio] Request: ${options.method} ${options.uri}");
        return handler.next(options);
      },
      onResponse: (response, handler) {
        print("<< [Dio] Response [${response.statusCode}]: ${response.data}");
        return handler.next(response);
      },
      onError: (err, handler) {
        print("!! [Dio] Error: ${err.error}");
        return handler.next(err);
      },
    );
  }

  Interceptor _buildResponseInterceptor() {
    return InterceptorsWrapper(
      onResponse: (response, handler) {
        // Example logic: parse for known "code" field
        final code = response.data?['code'];
        if (code == 200) {
          return handler.next(response);
        } else {
          return handler.reject(
            DioException(
              requestOptions: response.requestOptions,
              message: "Response error code: $code",
            ),
          );
        }
      },
    );
  }

  void _checkInitialized() {
    if (!_initialized) {
      throw StateError("DioInstance not initialized. Call initDio() first.");
    }
  }
}
```

### Highlights

- **Singleton Pattern**: Prevents accidental creation of multiple `Dio` objects with mismatched settings.
- **Interceptors**: A chain-based approach that injects tokens, logs, and interprets responses.
- **Structured File Upload**: Simplifies constructing `FormData` so you don’t need to repeat this logic in every feature module.

---

## Real-World Usage

Once initialized, the same object can handle any number of requests:

```dart
// Step 1: One-time init
final dioManager = DioInstance.getInstance();
dioManager.initDio(baseUrl: "https://api.myapp.com");

// Step 2: GET example
final listResponse = await dioManager.get(path: "/items", queryParams: {"page": 1});
print("Item list: ${listResponse.data}");

// Step 3: POST example
final loginResponse = await dioManager.post(
  path: "/login",
  data: {"username": "jane", "password": "123456"},
);

// Step 4: Upload example
File file = File("/some/path/to/image.jpg");
await dioManager.upload(path: "/upload/avatar", file: file);
```

No matter the HTTP method, everything goes through the same interceptors, ensuring consistent logs, header injection, and error handling.

---

## Common Pitfalls

1. **Omitting `initDio()`**: Always ensure your app calls it at startup, or you’ll risk exceptions from uninitialized objects.
2. **Forgetting to Add Interceptors**: Missed interceptors means losing global logging or token logic—your logs become silent, and your server might not get correct authentication headers.
3. **Excessive Per-Call Options**: Overriding too many fields each time (like `baseUrl`, timeouts, or contentType) leads to confusion. Keep them in the main initialization if possible.

---

## Conclusion

A well-structured `DioInstance` is a force multiplier in any serious mobile project. By centralizing initialization, interceptors, and request methods, you gain more consistent code, simpler debugging, and a clear separation of concerns. The snippet above is pulled directly from code I’ve developed and iterated on for real-world apps, demonstrating how a single network class can handle everything from JSON-based requests to file transfers.

Whether you’re building a small personal app or a large-scale production system, customizing your own `DioInstance` ensures your network layer remains cohesive, maintainable, and easy to extend.
