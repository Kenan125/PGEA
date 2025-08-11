import React from "react";
const CustomInput = ({label, ...props})=>{
    return (
        <>
        <label >{label}</label>
        <input {...props}/>
        </>
    );
};
export default CustomInput;