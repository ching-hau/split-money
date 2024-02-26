import { useState } from "react";
function ExpenseOwner(props) {
    const [isChecked, setIsChecked] = useState(true);

    const handleIsChecked = (e) => {
        let count = 0;
        e.target.parentNode.parentNode.querySelectorAll(".expenseDetailCheckBox").forEach((inputBox) => {
            console.log(inputBox.parentNode.querySelector(".expenseDetailCheckBox").checked);
            if(inputBox.checked) count++;
        });
        // console.log(count);
        if(count >= 1) {
            setIsChecked(!isChecked);
        }
    }
    return (
        <>
            <input type="checkbox" className="form-control expenseDetailCheckBox" checked={isChecked} onChange={handleIsChecked}/>
            <label className="form-control">{props.name}</label>
        </>
    );
}

export default ExpenseOwner;