# Desktop app for Jira (Work In Progress)

[![latest-tag](https://badgen.net/github/release/adrianjagielak/jira-electron)](https://github.com/adrianjagielak/jira-electron/releases)
[![downloads](https://img.shields.io/github/downloads/adrianjagielak/jira-electron/total?cacheSeconds=3600)](https://somsubhra.github.io/github-release-stats/?username=adrianjagielak&repository=jira-electron&page=1&per_page=30)
[![homebrew](https://badgen.net/homebrew/cask/dy/jira-electron)](https://formulae.brew.sh/cask/jira-electron)
[![release-linux](https://github.com/adrianjagielak/jira-electron/actions/workflows/release-linux.yml/badge.svg)](https://github.com/adrianjagielak/jira-electron/actions/workflows/release-linux.yml)
[![release-mac](https://github.com/adrianjagielak/jira-electron/actions/workflows/release-mac.yml/badge.svg)](https://github.com/adrianjagielak/jira-electron/actions/workflows/release-mac.yml)
[![release-windows](https://github.com/adrianjagielak/jira-electron/actions/workflows/release-windows.yml/badge.svg)](https://github.com/adrianjagielak/jira-electron/actions/workflows/release-windows.yml)
[![snapcraft](https://snapcraft.io/jira-electron/badge.svg)](https://snapcraft.io/jira-electron)

An unofficial desktop app for [Jira](https://jira.com) built
with [Electron](https://www.electronjs.org/apps/jira-electron)

### Motivation

* Atlassian is [sunsetting](https://community.atlassian.com/t5/Jira-Mobile-Apps-articles/Announcement-Sunsetting-the-Jira-Cloud-for-Mac-App/ba-p/1911778) the official [Jira Desktop Mac App](https://apps.apple.com/us/app/jira-cloud-by-atlassian/id1475897096) starting in February
  2022
* Atlassian is forcing users to use its website which is less native

### Installation (Linux)

* Install via [snap](https://snapcraft.io/jira-electron) (recommended)

```bash
sudo snap install jira-electron

# grant permissions 
sudo snap connect jira-electron:home :home
sudo snap connect jira-electron:removable-media :removable-media
```

* Alternatively you can download the latest debian installer from
  [releases](https://github.com/adrianjagielak/jira-electron/releases/latest) section
* Install the debian package with this command: (correct the file path yourself)

```bash
sudo apt install ~/path/to/Jira-xxx-amd64.deb
```

* :warning: Debian package does not have automatic background updates

### Uninstallation (Linux)

* Logout and Quit from app
* Remove the app with this command if installed via snap

```bash
sudo snap remove jira-electron
```

or if installed via debian package

```bash
sudo apt-get remove --purge jira-electron
```

* The uninstallation script should remove all relevant files and folders.

### Installation (Mac)

* Homebrew users can run `brew install --cask jira-electron`

or

* Download the zip (darwin) file from [releases](https://github.com/adrianjagielak/jira-electron/releases/latest)
* Extract the zip file
* Move the app to your `~/Applications` folder
* Fix the permission issue with this command

```bash
sudo xattr -rd com.apple.quarantine ~/Applications/Jira.app
```

* Above command should fix the Mac-OS Gatekeeper [issue](https://apple.stackexchange.com/questions/262355/)

### Uninstallation (Mac)

* Logout and Quit from app
* Move the app to trash

### Installation Windows 

* Download the installer from [releases](https://github.com/adrianjagielak/jira-electron/releases/latest)

### Supported Platforms

The app should work on all x64 platforms, but due to lack of time; we test on most popular only.

| OS/Platform         |  Version  |
|:--------------------|:---------:|
| Ubuntu GNOME        |   20.x    |
| Linux Mint Cinnamon |   20.x    |
| MacOS               | 10.15, 11 |
| Windows             | 7, 10, 11 |

### Major features

* Automatic dark theme

### Acknowledgements

* [@robyf](https://github.com/robyf/google-chat-linux) for the initial work
* [@squalou](https://github.com/squalou/google-chat-linux) and [@ankurk91](https://github.com/ankurk91/google-chat-electron) for enhancements
* All other [contributors](https://github.com/adrianjagielak/jira-electron/graphs/contributors)

## Disclaimer

This desktop app is just a wrapper which starts a chromium instance locally and runs the actual web-app in it. All
rights to the [Jira](https://jira.com) product is reserved by
[Atlassian](https://en.wikipedia.org/wiki/Atlassian)
This desktop client has no way to access none of your data.

[![Snap Store](https://snapcraft.io/static/images/badges/en/snap-store-black.svg)](https://snapcraft.io/jira-electron)

## License

[GNU GPLv3](LICENSE.txt) License
