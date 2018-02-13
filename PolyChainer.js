/*

PolyChainer BETA 0.0.1
by Karl Scholz
Bolasol, Inc.

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