import { Button } from "../atoms/NewButton"
import { Input } from "../atoms/NewInput"
import { useState } from "react"

export const PageTest = () => {
    const [password, setPassword] = useState("");
    return (

        <>
            <Button name="probando" onClick={() => console.log("hola")} style="bg-green-500" />

            <Input label={"contraseña"}
                placeHolder={"ingrese contraseña"}
                type={"password"} value={password} onChange={(e) => setPassword(e.target.value)} />
        </>
    )
}