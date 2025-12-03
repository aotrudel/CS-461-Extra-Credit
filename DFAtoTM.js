//Program made by Andrew Trudell
//I did use Microsoft Copilot to help me with snipits of code, mainly to get the right syntax, as well as with troubleshooting.

const exampleDFA = {
  states: ["q1", "q2", "q3", "q4"],
  alphabet: [0, 1],
  transitions: {
    q1: { 0: "q3", 1: "q2" },
    q2: { 0: "q4", 1: "q1" },
    q3: { 0: "q1", 1: "q4" },
    q4: { 0: "q2", 1: "q3" }
  },
  start_state: "q1",
  accept_states: ["q1"]
};

const TM = DFAtoTM(exampleDFA);

console.log("DFA:");

console.log(exampleDFA);

console.log("");

console.log("================================================================================================================================");

console.log("");

console.log("TM:")

console.log(TM);

console.log("");

console.log("TM transitions:");

console.log(TM.transitions)

console.log("");

console.log("================================================================================================================================");

console.log("");

console.log("Tape put into TM:")

useTapeOnTM(TM,"010010");

function DFAtoTM(DFA){

    const TM = {};

    TM.states = [];

    for(let i = 0; i < DFA.states.length; i++){

        TM.states.push(DFA.states[i]);

    }

    TM.states.push("qAccept");
    TM.states.push("qReject");

    TM.input_alphabet = [];
    TM.tape_alphabet = [];

    for(let i = 0; i < DFA.alphabet.length; i++){

        TM.input_alphabet.push(DFA.alphabet[i]);
        TM.tape_alphabet.push(DFA.alphabet[i]);

    }

    TM.tape_alphabet.push("_");

    TM.transitions = {};

    for (let state in DFA.transitions) {

        TM.transitions[state] = {};
        
        for(let transition in DFA.transitions[state]){

            TM.transitions[state][transition] = {};
            
            TM.transitions[state][transition].next = DFA.transitions[state][transition];

            TM.transitions[state][transition].write = transition;

            TM.transitions[state][transition].move = "R";

        }

        //the current state in the DFA is an accept state so we add a transition to the accept state in the TM
        if(DFA.accept_states.includes(state)){

            TM.transitions[state]["_"] = {};

            TM.transitions[state]["_"].next = "qAccept";

            TM.transitions[state]["_"].write = "_";

            TM.transitions[state]["_"].move = "R";

        }
        //the current state in the DFA is not an accept state so we add a transition to the reject state in the TM
        else{

            TM.transitions[state]["_"] = {};

            TM.transitions[state]["_"].next = "qReject";

            TM.transitions[state]["_"].write = "_";

            TM.transitions[state]["_"].move = "R";

        }

    }

    TM.start_state = DFA.start_state;

    TM.accept_state = "qAccept";
    TM.reject_state = "qReject";

    return TM;

}

function useTapeOnTM(TM,tape){

    tape = tape + "_";

    doTM(TM, tape, TM.start_state, 0);

}

function doTM(TM, tape, state, pointer){

    if(state == "qAccept"){

        console.log("Tape Accepted. Tape: " + tape);
        return;

    }
    else if(state == "qReject"){

        console.log("Tape Rejected. Tape: " + tape);
        return;

    }

    console.log(tape.substring(0,pointer) + ">" + tape.substring(pointer,tape.length));

    let input = tape.substring(pointer,pointer + 1);

    let transition = TM.transitions[state][input];

    tape = tape.substring(0,pointer) + transition.write + tape.substring(pointer + 1, tape.length);

    if(transition.move == "R"){

        doTM(TM,tape,transition.next,pointer + 1);

    }
    else{

        doTM(TM,tape,transition.next,pointer - 1);

    }

}
