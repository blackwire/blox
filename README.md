# blox
A simple framework for storing notes online using a block style display that when clicked opens into a notepad style half window. It uses a hash system to store and retrieve the notes for a given user. It's semi-private because of this. Could be forked to include a login instead of a hash to do the user delineation.

The basic idea was brought about by others who have attempted the same thing. I simply wanted something a little more fluid, beautiful, and permanent (database driven). It's simple for the user and slightly complicated from the code perspective. It has room for improvement like many things I make, but it's a good start. 

Pre-baked code that has SQL injection protection already setup and some other security measures are accounted for. Has an autosave that is setup to save open (expanded) blox every second. This includes the saving of color, heading, and text until the bloc is minimized or deleted.
