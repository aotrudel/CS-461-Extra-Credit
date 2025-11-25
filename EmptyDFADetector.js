//Program made by Andrew Trudell
//I did use Microsoft Copilot to help me with snipits of code, mainly to get the right syntax, as well as with troubleshooting.

const emptyDFA1 = {
  states: ["q1", "q2", "q3", "q4"],
  alphabet: [0, 1],
  transitions: {
    q1: { 0: "q3", 1: "q2" },
    q2: { 0: "q4", 1: "q1" },
    q3: { 0: "q1", 1: "q4" },
    q4: { 0: "q2", 1: "q3" }
  },
  start_state: "q1",
  accept_states: []
};

const emptyDFA2 = {
  states: ["q1", "q2", "q3", "q4", "q5"],
  alphabet: [0, 1],
  transitions: {
    q1: { 0: "q3", 1: "q2" },
    q2: { 0: "q4", 1: "q1" },
    q3: { 0: "q1", 1: "q4" },
    q4: { 0: "q2", 1: "q3" },
    q5: { 0: "q1", 1: "q5" }
  },
  start_state: "q1",
  accept_states: ["q5"]
};

const nonEmptyDFA1 = {
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

const nonEmptyDFA2 = {
  states: ["q1", "q2", "q3", "q4"],
  alphabet: [0, 1],
  transitions: {
    q1: { 0: "q3", 1: "q2" },
    q2: { 0: "q4", 1: "q1" },
    q3: { 0: "q1", 1: "q4" },
    q4: { 0: "q2", 1: "q3" }
  },
  start_state: "q1",
  accept_states: ["q4"]
};

console.log(emptyLanguage(emptyDFA1));
console.log(emptyLanguage(emptyDFA2));
console.log(emptyLanguage(nonEmptyDFA1));
console.log(emptyLanguage(nonEmptyDFA2));

function emptyLanguage(DFA){

    //if this is true that means the start state is accepting meaning the language is not empty (accepts ε)
    if(DFA.accept_states.includes(DFA.start_state)){

        return false;

    }
    //since the start state is not accepting that means we need to check every state you can get to from the start state to seeing if they are accepting.
    //we add the start state to the list of checked states
    else{

        let checked = [];

        checked.push(DFA.start_state);

        let isEmpty = true;

        //loops through every transition from the start start state
        //if there is an accepting state anywhere then this will make isEmpty false
        for (let transition in DFA.transitions[DFA.start_state]) {
        
            if(checkIfEmpty(DFA,DFA.transitions[DFA.start_state][transition],checked) == false){

                isEmpty = false;

            }

        }

        return isEmpty;

    }

}

function checkIfEmpty(DFA, curState, checked){

    //if this is true that means the current state (which can be accessed from the start state in some way) is accepting meaning the language is not empty
    if(DFA.accept_states.includes(curState)){

        return false;

    }
    //since the start state is not accepting that means we need to check every state you can get to from the start state to seeing if they are accepting.
    //we add the start state to the list of checked states
    else{

        checked.push(curState);

        let isEmpty = true;

        //loops through every transition from this state
        //if there is an accepting state anywhere then this will make isEmpty false
        for (let transition in DFA.transitions[curState]) {
        
            if(checked.includes(DFA.transitions[curState][transition])){

                //this state has already been checked so we won't check it again as to avoid an infinite loop

            }
            else if(checkIfEmpty(DFA,DFA.transitions[curState][transition],checked) == false){

                isEmpty = false;

            }

        }

        return isEmpty;

    }

}
