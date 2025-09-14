# Multi-stage Dockerfile for Flutter multi-platform development
# Base stage with Flutter SDK and Android SDK
FROM ubuntu:22.04 as base

# Avoid interactive prompts during package installation
ENV DEBIAN_FRONTEND=noninteractive
ENV TZ=UTC

# Install base dependencies
RUN apt-get update && apt-get install -y \
    curl \
    git \
    wget \
    unzip \
    xz-utils \
    zip \
    libglu1-mesa \
    openjdk-17-jdk \
    clang \
    cmake \
    ninja-build \
    pkg-config \
    libgtk-3-dev \
    liblzma-dev \
    libstdc++-12-dev \
    && rm -rf /var/lib/apt/lists/*

# Set JAVA_HOME
ENV JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
ENV PATH=$JAVA_HOME/bin:$PATH

# Install Flutter SDK
ENV FLUTTER_HOME=/opt/flutter
ENV PATH=$FLUTTER_HOME/bin:$PATH
RUN git clone https://github.com/flutter/flutter.git -b stable $FLUTTER_HOME \
    && $FLUTTER_HOME/bin/flutter doctor

# Install Android SDK
ENV ANDROID_HOME=/opt/android-sdk
ENV PATH=$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools:$PATH

RUN mkdir -p $ANDROID_HOME/cmdline-tools \
    && wget -q https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip \
    && unzip commandlinetools-linux-11076708_latest.zip -d $ANDROID_HOME/cmdline-tools \
    && mv $ANDROID_HOME/cmdline-tools/cmdline-tools $ANDROID_HOME/cmdline-tools/latest \
    && rm commandlinetools-linux-11076708_latest.zip

# Accept licenses and install Android SDK components
RUN yes | sdkmanager --licenses \
    && sdkmanager "platform-tools" "platforms;android-34" "build-tools;34.0.0"

# Configure Flutter
RUN flutter config --no-enable-ios \
    && flutter config --enable-linux-desktop \
    && flutter config --enable-web \
    && flutter config --enable-android \
    && flutter doctor

# Development stage with additional dev tools
FROM base as development

# Install development dependencies
RUN apt-get update && apt-get install -y \
    vim \
    nano \
    htop \
    tree \
    procps \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy pub dependencies first for better layer caching
COPY pubspec.yaml pubspec.lock* ./
RUN flutter pub get || echo "No pubspec found yet"

# Default command for development
CMD ["flutter", "doctor", "-v"]

# Production build stage
FROM base as builder

WORKDIR /app

# Copy source code
COPY . .

# Get dependencies
RUN flutter pub get

# Build for all platforms (selectively based on build args)
ARG BUILD_WEB=true
ARG BUILD_ANDROID=true
ARG BUILD_LINUX=true

RUN if [ "$BUILD_WEB" = "true" ]; then flutter build web --release; fi
RUN if [ "$BUILD_ANDROID" = "true" ]; then flutter build apk --release; fi
RUN if [ "$BUILD_LINUX" = "true" ]; then flutter build linux --release; fi

# Production stage - minimal runtime
FROM nginx:alpine as production

# Copy web build if exists
COPY --from=builder /app/build/web /usr/share/nginx/html

# Copy other builds to accessible location
COPY --from=builder /app/build/app/outputs/flutter-apk/app-release.apk /builds/ 2>/dev/null || true
COPY --from=builder /app/build/linux/x64/release/bundle /builds/linux/ 2>/dev/null || true

# Expose port for web app
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]