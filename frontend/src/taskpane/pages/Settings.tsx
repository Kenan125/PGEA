import React, { useState } from 'react'
import Button from "../components/Button"
import { makeStyles, optionClassNames } from '@fluentui/react-components';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from "../components/Header"
import { string } from 'yup';
import "../style.css"


const Settings=()=>{
    const navigate = useNavigate();
    const location = useLocation();
    const [charSet, setCharSet] = useState<string>("");
   const handleCharSetChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
       setCharSet(event.target.value);
     };

    const charSetOptions=[
        {value:"Latin", label:"Latin"},
        {value:"Unicode",label:"Unicode"},
        {value:"Türkçe",label:"Türkçe"}
        
    ]

  return (
    <div>
        {/* <Header  logo='./assets/postaguvercinilogodaire.png' message="Ayarlar" /> */}
        <div className="container">
            
            <div className="charSet">
                <label htmlFor='charSet' className="label">Karakter Seti</label>
                    <select
                        name="CharSet"
                        id='charSet'
                        // label={"Karakter Seti"}
                        value={charSet}
                        onChange={handleCharSetChange}
                        // placeholder="Seçiniz"

                    />
                    <option value="">Seçiniz</option>
                    {charSetOptions.map((option)=>(
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </div>   
        
            <div className="buttonRow">
                    <Button
                    label={"Geri"}
                    onClick={()=>navigate(-1)}
                    type="SECONDARY"/>
                    <Button
                    label={"Tamam"}
                    onClick={()=>navigate("/")}
                    type="MAIN"
                />
            </div> 
        </div>
    </div>
    

    
  )
}


export default Settings