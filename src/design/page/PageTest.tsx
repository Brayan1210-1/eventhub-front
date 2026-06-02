import { Button } from "../atoms/button"
import { Input } from "../atoms/input"
import { useState } from "react"

export const PageTest = () => {
    const [password, setPassword] = useState("");
    return (

        <>
            <Button name="probando" onClick={() => console.log("hola")} className="bg-green-500" >
                jh
            </Button>

            <Input label={"contraseña"}
                placeholder={"ingrese contraseña"}
                type={"password"} value={password} onChange={(e) => setPassword(e.target.value)} />
        </>
    )
}
