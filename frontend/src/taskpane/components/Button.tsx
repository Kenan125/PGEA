import React from 'react'
import {makeStyles} from '@fluentui/react-components'
import {useNavigate} from 'react-router-dom'


const useStyles=makeStyles({
    PrimaryButton:{
        backgroundColor:"#353535",
        color: "#ffffff",
        cursor: "pointer",
        padding:"8px 30px",
        borderRadius:"4px"
    },
    SecondaryButton:{
        color: "#484848",
        backgroundColor: "transparent",
        border: "1px solid #d9d9d9",
        cursor: "pointer",
        padding:"8px 40px",
        borderRadius:"4px"
    },
    TertiaryButton:{
        padding: "5px 7px",
        fontSize: "13px",
        border:"1px solid #757575",
        backgroundColor: "#d9d9d9",
        color:"#6a6969ff",
        cursor: "pointer",
        borderRadius:"5px"
    }
})

const Button = ({id,label,onClick,type}) => {
    const styles=useStyles();
    const navigate=useNavigate();
    const record ={
      MAIN:styles.PrimaryButton,
      SECONDARY:styles.SecondaryButton,
      TERTIARY:styles.TertiaryButton
    }

  return (
    <button id={id} className={record[type]} onClick={onClick} >{label}</button>
  )
}

export default Button