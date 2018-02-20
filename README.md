# PolyChainer

PolyChainer BETA 0.0.2
by Karl Scholz
Bolasol, Inc.

https://bolasol.com/polychainer

PolyChainer lets you play multiple instrument channels in Logic Pro X as if they were voices
of a single polyphonic instrument. 

# Background and context:

Logic Pro X lets you create 'Track Stacks' that are groups of individual instruments.

The Track Stack allows us to easily send the same MIDI info to all of the 
instruments in the stack at once.

Track stacks are useful for layering instruments and creating submixes from groups of tracks.

With the help of Logic Pro X's MIDI FX Scripter plugin, we can also achieve poly chaining with minimal headache!

# Enter PolyChainer:

A PolyChainer sits on each track in the stack and filters the incoming MIDI.

You'll tell each PolyChainer how big the group is and where the individual track falls in line.

Voice 1 will be triggered first, then voice 2, 3, 4, etc.

After each voice in the group has been triggered, it will wrap back to voice 1.

This works on the assumption that all tracks will be recieving the same MIDI. If they get differing signals, the tracks
will fall out of sync and notes will trigger at the wrong time.

If this happens, you can reset their internal state by sending MIDI Note 0 to the group track.

# HOW TO INSTALL:

Install PolyChainer on your system by placing the PolyChainer.pst file in:
/Users/{your username}/Music/Audio Music Apps/Plug-In Settings/Scripter/

# HOW TO USE:

1) Create a track stack of the instruments that you want to polychain.

2) On each instrument in your stack, add a Scripter plugin in the 
MIDI FX section of the channel strip.

3) In the Scripter for each instrument, choose the 'PolyChainer' preset from the 
dropdown menu. 

4) Set the 'Group Polyphony' to the number of tracks in your stack.

5) Set the 'Voice Index' for the keystroke it should play on (up to the Polyphony).

It is possible for the tracks to fall out of sync if they recieve MIDI information that differs from the other tracks.
This can happen if you select on of the tracks in the stack and send MIDI to it.

You can rememdy this my sending MIDI Note 0 to the group track. All of the PolyChainers will reset their internal state.

Good Luck and happy polychaining! 

Questions or Comments can be sent to 
karl@bolasol*com
