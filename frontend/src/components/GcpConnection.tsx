import React from "react";
const GcpConnection=()=>{
    return(
        <>
            <div className="form-container">
                <form className="gcp-connection-form"action="">
                    <label for="gcp-details" className="service-account-json">Service Account Detail:JSON </label>
                    <textarea name="" id="gcp-details" cols="50" rows="15" className="input-text-area"></textarea>  
                    <input type="submit" value="Submit" className="submit-sercice-account"/>
                </form>
            </div>
        </>
    )
}
export default GcpConnection;