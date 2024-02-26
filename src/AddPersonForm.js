import React, { useContext, useState } from "react";
import ExpenseCard from "./ExpenseCard";
import { CountContext } from "./Context/CountContext";

function AddPersonForm(props) {
    const { handleSetCountAdd, personBlocks, handlePersonBlock, handleRemovePersonBlock } = useContext(CountContext);
    const [errorMsg, setErrorMsg] = useState("");

    const handleNewPerson = (e) => {
        e.preventDefault();
        const nameSet = new Set();

        personBlocks.forEach((personBlock) => {
            nameSet.add(personBlock.key.trim().toLowerCase())
        });

        if(nameSet.has(props.inputValue.trim().toLowerCase())) {
            setErrorMsg(props.inputValue + " has already been in the list.");
            return;
        }

        if(props.inputValue.trim().toLowerCase().length === 0) {
            setErrorMsg("New name should not be empty, or you can cancel.");
            return;
        }

        props.setFormVisible(false);

        handlePersonBlock(
            <li key={props.inputValue}>
                <ExpenseCard name={props.inputValue} handleSetCountAdd={handleSetCountAdd}/>
            </li>
        );

        handleSetCountAdd(true);
        props.setInputValue("");
    };

    const handleInputValue = (e) => {
        props.setInputValue(e.target.value)
    };

    const handleCancelAddPerson = () => {
        props.setFormVisible(false);
        props.setInputValue("");
        setErrorMsg("");
    }

    const handleKeyPress = (e) => {
        setErrorMsg("");
        if(e.key === "Enter") {
            e.preventDefault();
        }
    }

    return (
        <div id="addPersonForm">
            <div id="addPersonFormDiv">
                <span className="text-danger">{errorMsg}</span>
                <form id="addPersonFormInput">
                    <label htmlFor="addPersonName" id="addPersonNameLabel">Name:&nbsp;</label>
                    <input
                        type="name"
                        id="addPersonName"
                        value={props.inputValue}
                        onKeyPress={handleKeyPress}
                        onChange={handleInputValue}
                        className="form-control"
                        maxLength={15}
                    />
                </form>
                <button className="btn btn-outline-secondary" onClick={handleNewPerson}>Submit</button>
                <button className="btn btn-outline-warning" onClick={handleCancelAddPerson}>Cancel</button>
            </div>
        </div>
    );
}

export default AddPersonForm;