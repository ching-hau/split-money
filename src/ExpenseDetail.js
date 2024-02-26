import { useState, useContext, useEffect } from "react";
import ExpenseOwner from "./ExpenseOwner";
import { CountContext } from "./Context/CountContext";

function ExpenseDetail(props) {
    const [isValid, setIsValid] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [allNames, setAllNames] = useState([]);
    const { handleSetCountAdd, personBlocks, handlePersonBlock, handleRemovePersonBlock } = useContext(CountContext);

    const handleDelete = (e) => {
        const allExpenseInputParent = e.target.parentNode.parentNode.parentNode;
        e.target.parentNode.parentNode.remove();
        const allExpenseInput = allExpenseInputParent.querySelectorAll(".curExpense");
        let curOutcome = 0;
        for(let i = 0; i < allExpenseInput.length; i ++) {
            if(allExpenseInput[i] !== "") curOutcome += Number(allExpenseInput[i].value);
        }
        props.handleSetOutcome(curOutcome);
    };

    const handleChange = (e) => {
        const newValue = e.target.value;
        if((!isNaN(newValue) && newValue >= 0)) {
            let curOutcome = 0;
            const allExpenseInput = e.target.parentNode.parentNode.parentNode.querySelectorAll(".curExpense");
            for(let i = 0; i < allExpenseInput.length; i ++) {
                if(allExpenseInput[i] !== "") curOutcome += Number(allExpenseInput[i].value);
            }
            props.handleSetOutcome(curOutcome);
            e.target.className="form-control curExpense";
            setIsValid(true);
        }
        else {
            setIsValid(false);
        }
    };

    const handleEdit = (e) => {
        setIsOpen(!isOpen);
    }

    const handleBlur = (e) => {
        setIsValid(e.target.value.trim() !== "");
    };

    const handleKeyPress = (e) => {
        if(e.key === "-") e.preventDefault();
    }

    useEffect(() => {
        const newNameList = [];
        personBlocks.forEach((personBlock) => {
            newNameList.push(personBlock.key.trim());
        });
        setAllNames(newNameList);
    }, [personBlocks]);


    return (
        <>
            <div className="input-group expense-detail">
                <input placeholder="Pay for?" className="form-control"/>
                <input
                    type="number"
                    min="0"
                    placeholder="How much?"
                    className={isValid ? "form-control curExpense": "form-control invalidInput curExpense"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onKeyPress={handleKeyPress}
                    required
                />
                <button
                    className="btn-secondary cbtn"
                    type="button"
                    onClick={handleEdit}
                >
                    Edit
                </button>
                <button className="btn-danger cbtn round-end" onClick={handleDelete}>Delete</button>
            </div>
            <div className="card expenseDetailNameCard" style={{display : isOpen ? "block" : "none"}}>
                <form>
                    <ul className="expenseDetailNameUl">

                        {allNames.map((names) => {
                            return (
                                <li key={names} className="expenseDetailNameContainer">
                                    <ExpenseOwner name={names}/>
                                </li>
                            );
                        })}
                    </ul>
                </form>
            </div>
        </>
    );
};

export default ExpenseDetail;