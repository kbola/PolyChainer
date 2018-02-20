/*

PolyChainer BETA 0.0.2
by Karl Scholz
Bolasol, Inc.

https://bolasol.com/polychainer

*/


//HEEEERE'S THE CODE!

var MAX_POLYPHONY = 8;

//On screen controls
var PluginParameters = [{name:"Group Polyphony", type:"lin", defaultValue:4, minValue:1, maxValue:MAX_POLYPHONY, numberOfSteps:MAX_POLYPHONY - 1}, {name:"Voice Index", type:"lin", defaultValue:1, minValue:1, maxValue:MAX_POLYPHONY, numberOfSteps:MAX_POLYPHONY - 1}];

//Count notes in
var voiceCounter = 0;

//Keep track of held notes for this voice
var heldNotes = {};

//Called whenever a MIDI event happens
function HandleMIDI(event)
{

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

      //Listen for MIDI Note 0 to reset the voiceCounter if needed
      if(event.pitch === 0){
        voiceCounter = 0;
      }

      if(event.pitch in heldNotes) {
          event.send();
          delete heldNotes[event.pitch];
      }
  }
  
  //pass all other MIDI through
  else {
      event.send();
  }   
    
}

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