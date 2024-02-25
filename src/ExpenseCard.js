import { useState, useRef, useContext, useEffect } from "react";
import ExpenseDetail from "./ExpenseDetail";
import { createRoot } from 'react-dom/client';
import { CountContext } from "./Context/CountContext";

function ExpenseCard(props) {
    const [outcome, setOutcome] = useState(0);
    const [expensesDetails, setExpensesDetails] = useState([]);
    // const { handleSetCountAdd, nameList, handleSetNameList } = useContext(CountContext);
    const { handleSetCountAdd, personBlocks, handlePersonBlock, handleRemovePersonBlock } = useContext(CountContext);

    const ref = useRef(null);
    const handleSetOutcome = (value) => {
        setOutcome(value);
    }

    const handleExpensesDetails = (curDetail) => {
        setExpensesDetails(prevDetails => [...prevDetails, curDetail]);
    };
    const addMoreExpense = (e) => {
        const parentNode = e.target.parentNode;
        let flag = true;
        const allIputExpense = parentNode.querySelectorAll(".curExpense");
        for(let i = 0; i < allIputExpense.length; i ++) {
            if(allIputExpense[i].value === "") {
                allIputExpense[i].className = "form-control invalidInput curExpense";
                flag = false;
            }
        }
        if(!flag) return;
        handleExpensesDetails(<ExpenseDetail outcome={outcome} handleSetOutcome={handleSetOutcome}/>);
    };

    const handleClose = (e) => {
        const removeName = e.target.parentNode.querySelector(".expenseCardName").innerText;
        const newBlocks = personBlocks.filter((personBlock) => {return personBlock.key !== removeName});
        handleRemovePersonBlock(newBlocks);
        props.handleSetCountAdd(false);
    };
    return (
        <div className="expenseCard" ref={ref}>
            <div className="expenseCardTitle">
                <span className="expenseCardName">{props.name}</span>
                <span className="">Outcome: $&nbsp;</span>
                <span className="outcome">{outcome}</span>
                <span className="expenseCardClose" onClick={handleClose}>x</span>
            </div>
            <div>
                {expensesDetails.map((expensesDetail, index) => {return <span key={index} className="single-expenses">{expensesDetail}</span>})}
                <button
                    className="btn btn-outline-secondary moreExpenseBtn"
                    onClick={addMoreExpense}
                >
                more +
                </button>
            </div>
        </div>
    );


}

export default ExpenseCard;