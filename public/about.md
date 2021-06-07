# About SwitchTwitch

## What is this?

SwitchTwitch helps Twitch viewers quickly preview and switch between many Twitch streams.

I made it so I could switch between multiple streamer's perspective in competitive games.

## What kinda features does SwitchTwitch have?

Seamless muting of side streams, unmuting of preview and main streams.

Automatic quality switching (currently 360p for side streams, 480p for preview, and source quality for main stream).

## Is this free?

Yeap! I hope I can make it free as far as possible.

The cost of making this is mostly my own time, domain registration, and potentially bandwidth fees.

However, unless this explodes in popularity, I think bandwidth usage will be pretty minimal because it's only a front end wrapper around Twitch's embeds.

## How can I help?

Give me suggestions, feedback, encouragement on [GitHub](https://github.com/weiliddat/switchtwitch) or [Twitter](twitter.com/weiliddat)!


# Upcoming Features

* Add more settings
  * Reduced/no animation mode
  * Save volume setting while muting/unmuting
  * Use preview popup or just the side bar for previewing
  * Quality settings for side, preview, main streams
* Playlist to save added channels
* Permalink to list of channels or playlist for sharing
* Embed Twitch Chat

# Privacy Policy, Terms

I don't collect any data.

Twitch is embedded and can access your profile if you're logged on Twitch, and I assume also collects data for their service.

SwitchTwitch is [open source](https://github.com/weiliddat/switchtwitch) and subject to the [Mozilla Public License 2.0](https://www.mozilla.org/en-US/MPL/2.0/FAQ/).

# 


# Changelog

2021-06-07
* add quality, preview, and animation settings

2021-06-06
* add changelog
* refactor state management
* viewing stream will automatically close other streams on main player

2021-06-05
* add feature list
* fix side channel deletion bug (keyed items)
* add logo and text to main area

2021-06-05
* add channel names

2021-06-04
* set default quality and mute status when viewing channel on main player
* animate viewing a channel on main player instead of a separate instance
* animate previewing channels on side bar
* new favicon

2021-06-03
* short about message
* mute/unmute when previewing
* main player size should follow window
* delete and view channel
* initial prototype to preview side bar channels
