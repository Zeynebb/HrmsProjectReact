import React from 'react'

const ZYTextInput = ({ name, label, onChange, placeHolder, values, error }) => {

    let warpperClass = "form-greoup"
    if (error && error.length > 0) {
        warpperClass += " has-error"
    }

    return (
        <div className={warpperClass}>
            <label htmlFor={name}></label>
            <div className="field">
                <input type="text" name={name} className="form-control" placeholder={placeHolder}
                    value={values} onChange={onChange} />

                    {error&&<div className="alert alert-danger">{error}</div>}
            </div>

        </div>
    )

};

export default ZYTextInput;