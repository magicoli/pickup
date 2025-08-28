# CHANGELOG

2.0.0-beta
* First beta release as a Progressive Web App
* Auto-scaling text that resizes names to fill screen
* Click-to-edit functionality for all text elements
* URL parameters support (f=firstname, l=lastname, n=name, c=comment)
* Customizable logos, colors, and backgrounds
* Progressive Web App with offline support and installation
* Full-screen mode toggle
* Service worker for caching
* Responsive design for all screen sizes

2.0.0-dev-4
* adjust letter spacing

2.0.0-dev-3
* fix size of space between first and lastname
* updated .gitignore
* removed deprecated folder

2.0.0-dev-1
* adjust text size based on the name
* added form to  update the name
* added full screen button
* added optional arguments f=firstname l=lastname n=name c=comment (name overrides firstname and lastname)
* added web app install button. Kinda works

1.4-dev-2 (small fixes)
* manifest.json to enabke webapp for iOS devices
* Disabled Downoad Android App link
* disabled buggy i18n localization
* fit text attempt without jquery
* Revert "pick logo from android library"
* This reverts commit 6961c43c97d7e066049fa8f77fb2423189870277.
* Revert "center logo; remove debug code"
* This reverts commit 3db9097470dd77ba5fd05503e95259780dc93801.

1.4-dev (unstable)
* center logo; remove debug code
* pick logo from android library
* pickup-logo-192x192.png
* localize 'Download Android app' string
* Added French localization
* Update README.md
* Update README.md
* Updated README
* Add LICENSE
* Delete LICENSE
* re-enable logo choice for dev versions (removed hidden field)
* logo updates
* re-enable logo choice for dev versions
* moved image source files outside assets
2 logo
* Generic logo for Google Play store release
* fix header
* get rid of duplicate hidden form
* direct link to download file still doesn't work, revert to download page until I find a fix
* direct link to apk download file
* check if android before using extToAndroid function
* callback form values to android app
* removed useless settings.js
* Update README.md
* switch to new download url
* removed download section, splitted into another project https://git.magiiic.com/tools/updates-manager
* removed debug code
* Direct link to apk seems unreliable, link to update page instead (which has it's own redirect to apk)
* update manager functional
* download fix dollar sign in location
* download fix dev version shown instead of stable
* update section, not yet functional
* dowload manager: allow dev or stable; clean up var names
* download detect last .apk version automatically; allow query without download

apk 1.3.4
apk 1.3.3 (build 126)
apk 1.3.3 (build 124)
apk 1.3.2
* fix nickname not showing again

apk v1.3.1
* set apk download to v1.2.2
* Merge branch 'master' of git.magiiic.com:magic/pickup
* added debug function, fix line height, fix nickname not showing, cleaner cookie code
* git ignore .apk files in download/

1.2
* show download link when not displayed from the app
* save logo in cookies
* pupolate url parameters if found
* Font size relative to viewport
* update page with javascript without reloading
* rm template.xml

1.2 swtiched from PHP to javascript to allow offline use
* pickup-1.0.4.apk
* cosmetic change
* saved logo in cookies
* Added logo select menu
* Added Clear and Reset option
* Different css for form and display
* Better display (relative to viewport)
* pickup-1.0.3.apk
* added icons
* Initial commit
