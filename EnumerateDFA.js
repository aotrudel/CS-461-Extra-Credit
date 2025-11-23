//Program made by Andrew Trudell
//I did use Microsoft Copilot to help me with snipits of code, mainly to get the right syntax, as well as with troubleshooting.

let input = "ab";

EnumerateDFA(input,20);

function EnumerateDFA(alphabetInput,numberOfDFAs){

    let alphabet = alphabetInput.split("");

    //how many DFAs we want to make
    let DFAs = numberOfDFAs;

    let count = [];

    let states = 0;

    let DFACount = 0;

    while(DFACount < DFAs){

        //checks if the count is maxed and adding 1 will overflow
        let increaseStates = true;

        for(let i = 0; i < count.length; i++){

            if(count[i] != states - 1){

                increaseStates = false;
                break;

            }

        }

        //if the count is maxed we add another state and reset the count increasing the max count
        if(increaseStates){

            states = states + 1;
            //adds the amount of places as the amount of alphabet characters to make sure to count the new state
            for(let i = 0; i < alphabet.length; i++){

                count.push(0);

            }

            //resets count to 0
            for(let i = 0; i < count.length; i++){

                count[i] = 0;

            }

            //set the first number to -1 so a 1 can be added and we can get the first proper DFA for the amount of states
            count[0] = -1;

        }

        //here we add 1 to the count to discover a new DFA transition
        let addedOne = false;
        let pointer = 0;

        while(addedOne == false){

            count[pointer] = count[pointer] + 1;

            //if the count at the pointer equals the amount of states that means that spot has overflowed so we set the count at that spot back to zero and move the pointer to the next spot to increase the count there (like how we inccrease from 9 to 10)
            if(count[pointer] == states){

                count[pointer] = 0;
                pointer = pointer + 1;

            }
            else{

                addedOne = true;

            }

        }

        let statesA = [];

        for(let i = 0; i < states; i++){

            statesA.push(false);

        }

        for(let i = 0; i < Math.pow(2, states); i++){

            //we make sure to account for where every start state could be
            for(let start = 0; start < states; start++){

                let result = "States: {";

                for(let j = 0; j < states; j++)
                    result = result + j + ",";

                result = result.substring(0,result.length - 1) + "}\nAlphabet: {";

                for(let j = 0; j < alphabet.length; j++)
                    result = result + alphabet[j] + ",";

                result = result.substring(0,result.length - 1) + "}\nStart: " + start + "\nAccepting: {";

                let addedAccepting = false;
                for(let j = 0; j < statesA.length; j++){

                    if(statesA[j] == true){

                        result = result + j + ",";
                        addedAccepting = true;

                    }

                }

                if(addedAccepting){

                    result = result.substring(0,result.length - 1) + "}\nTransitions:";

                }
                else{

                    result = result + "}\nTransitions:";

                }

                for(let j = 0; j < count.length; j = j + alphabet.length){

                    for(let k = j; k < j + alphabet.length; k++){

                        let cur = Math.floor(j / alphabet.length);

                        let input = alphabet[k % alphabet.length];

                        let end = count[k];

                        result = result + "\nδ(" + cur + ", " + input + ") = " + end;

                    }

                }

                result = result + "\n------------------";
                console.log(result);
                DFACount = DFACount + 1;

                if(DFACount == DFAs){

                    break;

                }

            }

            if(DFACount == DFAs){

                break;

            }

            
            //this is basically like a binary counter. we add "1"
            for(let j = 0; j < statesA.length; j++){

                if(statesA[j] == true){

                    statesA[j] = false;

                }
                else{

                    statesA[j] = true;
                    break;

                }

            }


        }

    }

}

