import React, { useState } from "react";
import Button from "../components/Button";
import { useNavigate, useLocation } from "react-router-dom";
import { Dropdown, DropdownProps, Option } from "@fluentui/react-components";
//import "../style/style.css";


const Successful = (props: Partial<DropdownProps>) => {
  const navigate = useNavigate();
  
   const options = [
    "Hemen Gönder",
    "İleri Tarihte Gönder",
    "Parçalı Gönder",
    "Sütundaki Tarihe Gönder",
  ];
  return (
    <div>
      <div >
        Basarili
        </div>
        <Dropdown style={{ minWidth: "auto" }}
                
                  id="phoneNumberColumn"
                  name="selectedPhoneNumberColumn"              
                  placeholder="Alıcı Sütunu"
                  {...props}
                >
                  {options.map((col, index) => (
                    <Option key={index} value={col}>
                      {col}
                    </Option>
                  ))}
                </Dropdown>
        <Button id={"tamam"} label={"Tamam"} onClick={() => navigate("/")} type="MAIN" />
    </div>
  );
};

export default Successful;
