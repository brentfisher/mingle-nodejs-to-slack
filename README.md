mingle-nodejs-to-slack
======================

Given an outbound hook from Slack, grab mingle card info, send back to Slack

Attach to a Slack outgoing webhook, given a user types #card{number} into a channel. Slack fires a post to this expressjs app, and we post back to the slack channel with mingle info.
