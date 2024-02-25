import React, { useState, useRef, useEffect} from "react";

// import ReactDOM from 'react-dom';
import AddPersonForm from "./AddPersonForm";
import { CountContext } from "./Context/CountContext";


const getAllNames = () => {
    const nameObj = {};
    document.querySelectorAll(".expenseCardName").forEach((obj) => nameObj[obj.innerText] = Object.keys(nameObj).length);
    return nameObj;
};

const getIndexToName = () => {
    const nameObj = {};
    document.querySelectorAll(".expenseCardName").forEach((obj) => nameObj[Object.keys(nameObj).length] = obj.innerText);
    return nameObj;
};

const getPersonalExpenseArray = (nameObj) => {
    const expenses = Array(Object.keys(nameObj).length).fill(0)
    document.querySelectorAll(".single-expenses").forEach((expenseDiv) => {
        const inclusivePeopleIndex = [];
        expenseDiv.querySelectorAll(".expenseDetailCheckBox").forEach((expenseDetailCheckBox, index) => {
            if(expenseDetailCheckBox.checked) {
                inclusivePeopleIndex.push(index);
            }

        });
        inclusivePeopleIndex.forEach((index) => {
            expenses[index] += Number(expenseDiv.querySelector(".curExpense").value) / inclusivePeopleIndex.length;
        });
    });
    return expenses;
}

const getPersonalOutcome = () => {
    const outcomes = [];
    document.querySelectorAll(".outcome").forEach((outcomeSpan) => {
        outcomes.push(Number(outcomeSpan.innerText));
    });
    return outcomes;

}

const calculateBalance = (balance, nameObj) => {
    const indexToName = getIndexToName();
    const positiveIndex = {};
    const negativeIndex = {};
    const positiveValues = [];
    const negativeValues = [];
    const conclusionText = [];
    balance.forEach((value, index) => {
        console.log(value, index);
        if(value > 0) {
            positiveIndex[Object.keys(positiveIndex).length] = index;
            positiveValues.push(value);
        }
        else if(value < 0) {
            negativeIndex[Object.keys(negativeIndex).length] = index;
            negativeValues.push(value);
        }
    });
    let negativePos = 0;
    positiveValues.forEach((value, index) => {
        while(value > 0 && negativePos < negativeValues.length) {
            for(let i = negativePos; i < negativeValues.length; i ++) {
                if(value + negativeValues[i] > 0) {
                    if(Number(Math.abs(negativeValues[i]).toFixed(2)) > 0) {
                        conclusionText.push(indexToName[negativeIndex[i]] + " should give " + indexToName[positiveIndex[index]] + " $" + Math.abs(negativeValues[i]).toFixed(2) + ".");
                    }
                    value += negativeValues[i];
                    negativePos = i + 1;
                }
                else {
                    if(Number(value.toFixed(2)) > 0) {
                        conclusionText.push(indexToName[negativeIndex[i]] + " should give " + indexToName[positiveIndex[index]] + " $" + value.toFixed(2) + ".");
                    }
                    negativeValues[i] += value;
                    if(negativeValues[i] === 0) negativePos = i + 1;
                }
            }
        }
    });
    return conclusionText;
}


function Main() {
    const [count, setCount] = useState(0);
    const [personBlocks, setPersonBlock] = useState([]);
    const [formVisible, setFormVisible] = useState(true);
    const [inputValue, setInputValue] = useState("");
    const [conclusions, setConclusion] = useState([]);


    const handleAddPerson = () => {
        setFormVisible(true);
        setConclusion([]);
    }
    const cardsRef = useRef(null);

    const handlePersonBlock = (curBlock) => {
        setPersonBlock(prevBlock => [...prevBlock, curBlock]);
    };
    const handleRemovePersonBlock = (newPersonBlocks) => {
        setPersonBlock(newPersonBlocks);
    }
    const handleSetCountAdd = (isAdd) => {
        const allExpenseCard = document.querySelectorAll(".expenseCard");
        let newCount = isAdd ? allExpenseCard.length + 1 : allExpenseCard.length - 1;
        setCount(newCount);
    };

    const handleCalculate = () => {
        const nameObj = getAllNames();
        const personalExpenses = getPersonalExpenseArray(nameObj);
        const personalOutcomes = getPersonalOutcome();
        const personalBalance = [];
        for(let i = 0; i < personalExpenses.length; i ++) personalBalance.push(personalOutcomes[i] - personalExpenses[i]);
        console.log("Expenses", personalExpenses);
        console.log("Outcomes", personalOutcomes);
        console.log("Balance", personalBalance);
        let conclusionText = calculateBalance(personalBalance, nameObj);
        conclusionText = conclusionText.length > 0 ? conclusionText : ["No transaction needed."]
        setConclusion(conclusionText);
    };

    useEffect(() => {
        setConclusion([]);
    }, [personBlocks]);

    return (
        <CountContext.Provider value={{handleSetCountAdd, personBlocks, handlePersonBlock, handleRemovePersonBlock}}>
            <main className="containier">
                {formVisible && (
                    <h1>Add New Person</h1>
                )}
                {!formVisible && count === 0 && (
                    <h1 className="allExpenseTitle">Please add people.</h1>
                )}
                {!formVisible && count > 0 && (
                    <>
                        <h1 className="allExpenseTitle">All expense</h1>
                    </>
                )}

                <div className="main-btn-div">
                    <div className="main-btn-div-child">
                    <button className="btn btn-secondary btn-lg main-btn" onClick={handleAddPerson}>Person +</button>
                    {!formVisible && (
                        <button className="btn btn-secondary btn-lg main-btn" onClick={handleCalculate}>Calculate</button>
                    )}
                    </div>

                </div>
                {
                    conclusions.length > 0 && (
                        <div className="conclusionDiv">
                            <div className="conclusion">
                                <h1 className="conslusion-element">Conclusion</h1>
                                {conclusions.map((conclusion, index) => {
                                    return <h3 key={index} className="conslusion-element">{conclusion}</h3>
                                })}
                            </div>
                        </div>
                    )
                }
                <div className="expenseDiv">
                    {formVisible && (
                        <AddPersonForm inputValue={inputValue} setInputValue={setInputValue} setFormVisible={setFormVisible} cardsRef={cardsRef}/>
                    )}
                    <ul className="expenseCards" style={{ display: formVisible ? 'none' : count === 1 ? "block" : "flex", width: count === 1 ? "" : "60%" }} ref={cardsRef}>
                        {personBlocks.map((personBlock) => {return personBlock})}
                    </ul>
                </div>

            </main>
        </CountContext.Provider>
    );
};

export default Main;