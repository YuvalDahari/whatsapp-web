function FormItem({ type: formType, labelText, inputText, value, onChange, onKeyUp, error, tooltip }) {
    return (
        <div className="col-md-6 mb-3">
            <div className="row">
                <div className="col-12">
                    <label className="form-label field">{labelText}</label>
                </div>
                <div className="col-12" data-tip={tooltip}>
                    <input type={formType} className="form-control" placeholder={inputText} value={value} onChange={onChange} onKeyUp={onKeyUp} required></input>
                </div>
                <div className="col-12 error-message">{error}</div>
            </div>
        </div>
    );
}

export default FormItem;