import React, { useState } from "react";
import { authService } from "fbase";

const AuthGuest = () => {

    // const [testEmail, setTestEmail] = useState("");
    const [guestAccount, setGuestAccount] = useState("Guest Login");

    const onSubmit = async (event) => {
        event.preventDefault();
        let data;
        data = await authService.signInWithEmailAndPassword
            ("test@gmail.com", "10041004");
    }

    return (
        <>
            <form onSubmit={onSubmit} className="container">
                <input
                    type="submit"
                    className="authInput authSubmit"
                    value={guestAccount}>
                </input>
            </form>
        </>
    );
}



export default AuthGuest;