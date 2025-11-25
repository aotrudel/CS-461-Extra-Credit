//Program made by Andrew Trudell
//I did use Microsoft Copilot to help me with snipits of code, mainly to get the right syntax, as well as with troubleshooting.
//I got the things I need to check for from the example code but I made the validation code without using the example code except for the exampleDFA obhect

// Example DFA for testing
const goodDFA = {
  states: [0, 1, 2, 3],
  alphabet: ["a", "b"],
  transitions: {
    0: { a: 1, b: 2 },
    1: { a: 0, b: 3 },
    2: { a: 3, b: 0 },
    3: { a: 2, b: 1 }
  },
  start_state: 0,
  accept_states: [0,3]
};

console.log(ValidateDFA(goodDFA));

// Example DFA for testing
const badDFA = {
  states: [0, 1, 2, 3],
  alphabet: ["a", "b"],
  transitions: {
    0: { a: 1, b: 2 },
    1: { a: 0, b: 3 },
    2: { a: 3, b: 0 },
    3: { a: 2, c: 1 }
  },
  start_state: 0,
  accept_states: [0,3]
};

console.log(ValidateDFA(badDFA));

function ValidateDFA(DFA){

    // Check that required properties exist
    if(DFA.states == undefined){

        return 0;

    }
    if(DFA.alphabet == undefined){

        return 0;

    }
    if(DFA.transitions == undefined){

        return 0;

    }
    if(DFA.start_state == undefined){

        return 0;

    }
    if(DFA.accept_states == undefined){

        return 0;

    }

    // Check that states is an array and contains unique values
    if(Array.isArray(DFA.states) == false){

        return 0;

    }

    for(let i = 0; i < DFA.states.length; i++){

        for(let j = 1; j < DFA.states.length; j++){

            //we don't want to check if a state in the array is the same as itself
            if(j == i){

                continue;

            }

            //if this is true that means at least 2 states are the same meaning not all are unique
            if(DFA.states[i] == DFA.states[j]){

                return 0;

            }

        }

    }

    // Check that alphabet is an array and contains unique values
    if(Array.isArray(DFA.alphabet) == false){

        return 0;

    }

    for(let i = 0; i < DFA.alphabet.length; i++){

        for(let j = 1; j < DFA.alphabet.length; j++){

            //we don't want to check if a symbol in the array is the same as itself
            if(j == i){

                continue;

            }

            //if this is true that means at least 2 symbols are the same meaning not all are unique
            if(DFA.alphabet[i] == DFA.alphabet[j]){

                return 0;

            }

        }

    }

    // Check that transitions is an object
    if((typeof DFA.transitions === "object") == false){

        return 0;

    }

    // Validate the transition function

    let correctTransitions = true;
    let transitionsSymbols = [];

    Object.keys(DFA.transitions).forEach(transition => {

        let foundTransition = false;

        for(let i = 0; i < DFA.states.length; i++){

            if((DFA.states[i] == transition) == false){

                foundTransition = true;

            }

        }

        correctTransitions = foundTransition;

        let symbols = [];

        Object.keys(DFA.transitions[transition]).forEach(symbol => {

            symbols.push(symbol);

        });

        transitionsSymbols.push(symbols);

    });

    //this means there was a transition that had a state that doesn't exist
    if(correctTransitions == false){

        return 0;

    }

    //this checks to see if each transition handles every posible input from the alphabet. no more no less.
    for(let i = 0; i < transitionsSymbols.length; i++){

        //this means a transition has more or less inputs than the amount of inputs in the alphabet
        if((transitionsSymbols[i].length == DFA.alphabet.length) == false){
            
            return 0;

        }

        for(let j = 0; j < transitionsSymbols[i].length; j++){

            //this means that there is a symbol that is not in the alphabet
            if(DFA.alphabet.includes(transitionsSymbols[i][j]) == false){

                return 0;

            }

        }

    }

    // Check that start_state is a valid state
    if(DFA.states.includes(DFA.start_state) == false){

        return 0;

    }

    // Check that accept_states is an array and all values are valid states
    if(Array.isArray(DFA.accept_states) == false){

        return 0;

    }

    for(let i = 0; i < DFA.accept_states.length; i++){

        if(DFA.states.includes(DFA.accept_states[i]) == false){

            return 0;

        }

    }

    return 1;

}
