function Form({ inputs, onChange, isCustom, onClick, onBlur }) {
    const handleSubmit = (event) => {
        event.prevent.Default();
    }

    return (
    <form className="form" onSubmit={ handleSubmit }>
        <div className="form-group">
            <label><h3>Bill</h3></label>
            <input autoFocus type="number" name="amount" value={inputs.amount} placeholder="0" onChange={onChange} min="0"></input>
        </div>
        <div className="form-group">
            <h3>Select Tip %</h3>
            <div className="radio-wrapper">
                <div>
                    <input id="5%" type="radio" name="tip" value={5} onChange={onChange} checked={ !isCustom && inputs.tip == 5 } ></input>
                    <label htmlFor="5%"><h2>5%</h2></label>
                </div>
                <div>
                    <input id="10%" type="radio" name="tip" value={10} onChange={onChange} checked={ !isCustom && inputs.tip == 10 }></input>
                    <label htmlFor="10%" ><h2>10%</h2></label>
                </div>
                <div>
                    <input id="15%" type="radio" name="tip"  value={15} onChange={onChange} checked={ !isCustom && inputs.tip == 15 }></input>
                    <label htmlFor="15%" ><h2>15%</h2></label>
                </div>
                <div>
                    <input id="25%" type="radio" name="tip" value={25} onChange={onChange} checked={ !isCustom && inputs.tip == 25 }></input>
                    <label htmlFor="25%" ><h2>25%</h2></label>
                </div>
                <div>
                    <input id="50%" type="radio" name="tip" value={50} onChange={onChange} checked={ !isCustom && inputs.tip == 50 }></input>
                    <label htmlFor="50%" ><h2>50%</h2></label>
                </div>
                <div>
                    <input type="number" name="tip" value={ isCustom ? inputs.tip : ""} onChange={onChange} placeholder={ isCustom ? "0" : "Custom" }  onClick={ onClick } onBlur={ onBlur } min="0" max="9999"></input>
                </div>
            </div>
        </div>
        <div className="form-group">
            <label><h3>Number of People</h3></label>
            <input type="number" name="people" value={ inputs.people } onChange={onChange} placeholder="0" min="0"></input>
        </div>
    </form>);
}

export default Form;