#!/bin/sh

SHELL_PATH=`pwd -P`
echo $SHELL_PATH

rm -rf ~/Library/Developer/Xcode/DerivedData

cd $SHELL_PATH/ios
rm -rf ./build
rm -rf ./Pods
rm -rf ./Delivery.xcworkspace
rm ./Podfile.lock

cd ../
npx pod-install ios

open -a Xcode ./ios/Delivery.xcworkspace