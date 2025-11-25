//Program made by Andrew Trudell
//I did use Microsoft Copilot to help me with snipits of code, mainly to get the right syntax, as well as with troubleshooting.

//This is the DFA that was made into this program. It ensures there is always an even amount of ones and zeros.
/*
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
};*/

let exampleString = "101110"

startTM(exampleString);

function startTM(inputString){

    //we have the pointer to keep track of what part of the string we are analyzing
    let pointer = 0;

    //it goes to q1 because that is the start state
    q1(inputString,pointer);

}

function q1(string, pointer){

    //the pointer has gone through the whole string
    if(pointer == string.length){

        console.log("(q1, " + string + "[])");
        qAccept();

    }
    //the pointer is pointing at a 0
    else if(string.substring(pointer,pointer + 1) == "0"){

        console.log("(q1, " + string.substring(0,pointer) + "[]" + string.substring(pointer + 1,string.length) + ")");

        //the input at this state means we go to q3
        //the pointer is moved to the next spot
        q3(string,pointer + 1);

    }
    //the pointer is pointing at a 1
    else{

        console.log("(q1, " + string.substring(0,pointer) + "[]" + string.substring(pointer + 1,string.length) + ")");

        //the input at this state means we go to q2
        //the pointer is moved to the next spot
        q2(string,pointer + 1);

    }

}

function q2(string, pointer){

    //the pointer has gone through the whole string
    if(pointer == string.length){

        console.log("(q2, " + string + "[])");
        qReject();

    }
    //the pointer is pointing at a 0
    else if(string.substring(pointer,pointer + 1) == "0"){

        console.log("(q2, " + string.substring(0,pointer) + "[]" + string.substring(pointer + 1,string.length) + ")");

        //the input at this state means we go to q4
        //the pointer is moved to the next spot
        q4(string,pointer + 1);

    }
    //the pointer is pointing at a 1
    else{

        console.log("(q2, " + string.substring(0,pointer) + "[]" + string.substring(pointer + 1,string.length) + ")");

        //the input at this state means we go to q1
        //the pointer is moved to the next spot
        q1(string,pointer + 1);

    }
    
}

function q3(string, pointer){

    //the pointer has gone through the whole string
    if(pointer == string.length){

        console.log("(q3, " + string + "[])");
        qReject();

    }
    //the pointer is pointing at a 0
    else if(string.substring(pointer,pointer + 1) == "0"){

        console.log("(q3, " + string.substring(0,pointer) + "[]" + string.substring(pointer + 1,string.length) + ")");

        //the input at this state means we go to q1
        //the pointer is moved to the next spot
        q1(string,pointer + 1);

    }
    //the pointer is pointing at a 1
    else{

        console.log("(q3, " + string.substring(0,pointer) + "[]" + string.substring(pointer + 1,string.length) + ")");

        //the input at this state means we go to q4
        //the pointer is moved to the next spot
        q4(string,pointer + 1);

    }
    
}

function q4(string, pointer){

    //the pointer has gone through the whole string
    if(pointer == string.length){

        console.log("(q4, " + string + "[])");
        qReject();

    }
    //the pointer is pointing at a 0
    else if(string.substring(pointer,pointer + 1) == "0"){

        console.log("(q4, " + string.substring(0,pointer) + "[]" + string.substring(pointer + 1,string.length) + ")");

        //the input at this state means we go to q2
        //the pointer is moved to the next spot
        q2(string,pointer + 1);

    }
    //the pointer is pointing at a 1
    else{

        console.log("(q4, " + string.substring(0,pointer) + "[]" + string.substring(pointer + 1,string.length) + ")");

        //the input at this state means we go to q3
        //the pointer is moved to the next spot
        q3(string,pointer + 1);

    }
    
}

//the string is in the language
function qAccept(){

    console.log("String Accepted");

}

//the string is not in the language
function qReject(){

    console.log("String Rejected");

}
