function ResultBoard({ result, onClick }) {
    return (
        <div className="result-board">
            <div>
                <div>
                    <h3>Tip Amount</h3>
                    <h4>/ person</h4> 
                </div>
                <h1>${ result.tip }</h1>
            </div>
            <div>
                <div>
                    <h3>Total</h3>
                    <h4>/ person</h4> 
                </div>
                <h1>${ result.total }</h1>
            </div>
            <button onClick={ onClick } disabled={ result.total > 0 && result.tip > 0 ? false : true }>RESET</button>
        </div>
    )}

export default ResultBoard;