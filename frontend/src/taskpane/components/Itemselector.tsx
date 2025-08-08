import { makeStyles } from '@fluentui/react-components'
import React from 'react'
type MyComponentProps = {
  label: any;
  selectedValue: any;
  onChange: any;
  optionList: any;
  placeholder: any;
  className?: string; // ✅ add this
};

const Itemselector = (MyComponentProps) => {
    //if (!optionList || optionList.length === 0) return <></>
    const localOnChange = (e) => {
        MyComponentProps.onChange(e.target.value)
    }
      const styles = useStyles();
  return (
        // style={{ width: "40%" }}
        <div >
          <label htmlFor='SendMethod' className={styles.label}>{MyComponentProps.label}</label>
          <select id="SendMethod"
            className={styles.select}
            value={MyComponentProps.selectedValue}
            onChange={(e) => localOnChange(e)}
          >
            <option value="">{MyComponentProps.placeholder || "Seçiniz"}</option>
            {/* {optionList.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))} */}
            {MyComponentProps.optionList && MyComponentProps.optionList.length>0 &&
            MyComponentProps.optionList.map((option)=>(
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
  )
}
const useStyles = makeStyles({

  label: {
    fontWeight: 600,
    marginBottom: "4px",
    color: "#353535",
  },

 
  //gönderim şekli
  select: {
    padding: "8px 10px",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    height:"35px",
    width:"160px",
    //width: "100%",
    marginBottom: "8px",
    color: "#757575",
  },


});
export default Itemselector