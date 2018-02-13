/*

PolyChainer BETA 0.0.1
by Karl Scholz
Bolasol, Inc.

INTRO:

PolyChainer lets you play multiple instruments in Logic X as if they were voices
of a single polyphonic synth. 

Here's whats happening:

Logic X lets you create 'Track Stacks' that are groups of individual instruments.

The Track Stack allows us to easily send the same MIDI info to all of the 
instruments in the stack at once.

PolyChainer makes use of this and does some processing to make a 
polyphonic 'synth' out of those instruments!

A PolyChainer plugin goes on each track in the stack and works as a MIDI filter 
that only passes on the notes that are meant for that track. 

It does this by counting the incoming MIDI notes and only playing a sound 
when it is that track's turn.
 
It's a bit like a dealer passing out cards for a game of poker.

Each track will need it's own Scripter plugin running PolyChainer. The 
individual tracks don't know about each other so you'll have to tell each 
track how big the group is and where it falls in line. 

We've given you easy controls for those two values called 'Group Polyphony' 
and 'Voice Index' respectively. You'll set them on each track in 
the stack.

HOW TO INSTALL:

Install PolyChainer on your system by placing the PolyChainer.pst file in:
/Users/<your username>/Music/Audio Music Apps/Plug-In Settings/

HOW TO USE:

1) Create a track stack of the instruments that you want to polychain.

2) On each instrument in your stack, add a Scripter plugin in the 
MIDI FX section of the channel strip.

3) In the Scripter for each instrument, choose the 'PolyChainer' preset from the 
dropdown menu. 

4) On each instance of PolyChainer, set the 'Group Polyphony' 
to the number of tracks in your stack

5) Set the Voice index for each track to a unique value (e.g. Instrument 1 gets a
voice index of 1, instrument 2 gets a voice index of 2). 

The Voice Index must be less than or equal to the Group Polyphony or else it will 
never get triggered.

Good Luck and happy polychaining! Questions or Comments can be sent to 
karl@bolasol*com

*/

//HEEEERE'S THE CODE!

//Called whenever a MIDI event happens
function HandleMIDI(event)
{

    //reset voices when sequencer starts
  var info = GetTimingInfo();
  if(info.playing){
        if(!isPlaying){
      voiceIndex = 0;
      isPlaying = true;
    }
  } 
  else {
      isPlaying = false;
  }

  //Here we filter incoming note messages
  if (event instanceof NoteOn) { 
      if(voiceCounter === GetParameter("Voice Index") - 1){
          heldNotes[event.pitch] = true;
          event.send();
      }
      voiceCounter++;
      voiceCounter %= GetParameter("Group Polyphony");
  }
  
  //If we get a 'note off' message that this voice is holding, turn it off. 
  else if(event instanceof NoteOff) {
      if(event.pitch in heldNotes) {
          event.send();
          delete heldNotes[event.pitch];
      }
  }
  
  //pass all other MIDI else through
  else {
      event.send();
  }   
    
}

var voiceCounter = 0;
var heldNotes = {};
var isPlaying = false;

//lets Logic know that our script needs timeline info
NeedsTimingInfo = true;

//On screen controls
var PluginParameters = [{name:"Group Polyphony", type:"lin", defaultValue:4, minValue:1, maxValue:8, numberOfSteps:7}, {name:"Voice Index", type:"lin", defaultValue:1, minValue:1, maxValue:8, numberOfSteps:7}];


//LICENSE INFO:

/* MIT License

Copyright (c) 2018 Bolasol, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE. */