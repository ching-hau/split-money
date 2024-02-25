import { useState } from "react";
function ExpenseOwner(props) {
    const [isChecked, setIsChecked] = useState(true);

    const handleIsChecked = () => {
        setIsChecked(!isChecked);
    }
    return (
        <>
            <input type="checkbox" className="form-control expenseDetailCheckBox" checked={isChecked} onChange={handleIsChecked}/>
            <label className="form-control">{props.name}</label>
        </>
    );
}

export default ExpenseOwner;