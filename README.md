# wemo-dash #

A web dashboard for managing WeMo devices

## About... ##
wemo-dash provides a responsive web-based user interface that is simlar to the mobile app provided by Belkin for
interacting with your Wemo products. 

It is easy to build and run as a stand-alone node.js server or as a Docker container:

```
docker build -t wemo-dash .
docker run --name wemo-dash --net=host -e PORT=3100 --restart="always" -d wemo-dash
```

or:

```
npm run
```

On first run, npm will also pull down the necessary node.js and web app libraries.

## Features ##
By clicking on the name of a device, you can change its on/off state. The app checks once a second for updates on the server, so motion detector activity or changes to device state caused by other apps will also be reflected in the UI.

On web browsers that support it, clicking on the icon to the left of a device will offer a URL that can be used as a bookmark to set the device to its current state. For example, if the device called "Desk Lamp" is currently off, clicking on the on/off icon for that device will return a URL to the server's web service that will turn the device off in the future.

## New Features ##
Collaboration is welcome. Please feel free to submit pull requests.
