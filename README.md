# PolyChainer

PolyChainer BETA 0.0.1
by Karl Scholz
Bolasol, Inc.

INTRO:
PolyChainer lets you play multiple instrument channels in Logic X as if they were voices
of a single polyphonic instrument. 

# Back story:

Logic X lets you create 'Track Stacks' that are groups of individual instruments.

The Track Stack allows us to easily send the same MIDI info to all of the 
instruments in the stack at once.

# Enter PolyChainer:

PolyChainer sits on each track and has a kind of 'quite understanding' as to how it should behave. 

A track's PolyChainer assumes that it is playing part in a bigger game.

Good news! You make the rules.

PolyChainer works as a MIDI filter that only passes the notes that are meant 
for its track. 

You'll tell each track how big the group is and where it falls in line. You can lie.

Group size is 'Group Polyphony' 

'Voice Index' is the position in line (or polyphonic phase).

Channels with the same "Group Polyphony" and 'Voice Index' will trigger at the same time.

If the 'Voice Index' is greater than the 'Group Polyphony', it won't be triggered. 

# HOW TO INSTALL:

Install PolyChainer on your system by placing the PolyChainer.pst file in:
/Users/<your username>/Music/Audio Music Apps/Plug-In Settings/

# HOW TO USE:

1) Create a track stack of the instruments that you want to polychain.

2) On each instrument in your stack, add a Scripter plugin in the 
MIDI FX section of the channel strip.

3) In the Scripter for each instrument, choose the 'PolyChainer' preset from the 
dropdown menu. 

4) Set the 'Group Polyphony' to the number of tracks in your stack.

5) Set the 'Voice Index' for the keystroke it should play on (up to the Polyphony).

Good Luck and happy polychaining! 

Questions or Comments can be sent to 
karl@bolasol*com
