# react-native-xcode

Plugin to quickly launch XCode from a react-native project. Automatically detects whether your XCode environment is a project or a workspace. (The latter are used for projects with [CocoaPods](https://cocoapods.org))

# Installation

```bash
yarn add react-native-xcode
```

# Usage

```bash
# From your react-native project where you installed it...
react-native xcode # Opens with your default xcode installation - usually whatever you installed last
react-native xcode -a # Force to only open with released version of XCode in your /Applications folder.
```
