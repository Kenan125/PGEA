import React, { useState } from "react";
import Button from "../components/Button";
import { useNavigate, useLocation } from "react-router-dom";
import "../style/style.css";

const Settings = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [charSet, setCharSet] = useState<string>("");
  const handleCharSetChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCharSet(event.target.value);
  };

  const charSetOptions = [
    { value: "Latin", label: "Latin" },
    { value: "Unicode", label: "Unicode" },
    { value: "Türkçe", label: "Türkçe" },
  ];

  return (
    <div>

      <div className="container">
        <label className="title">Ayarlar</label>
        <div className="charSet">
          <label className="label">Karakter Seti</label>
          <select title="Karakter Seti" id="charSet" value={charSet} onChange={handleCharSetChange}>
            <option value="">Seçiniz</option>
            {charSetOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>


        <div className="buttonRow">
          <Button id={"geri"} label={"Geri"} onClick={() => navigate(-1)} type="SECONDARY" />
          <Button id={"tamam"}  label={"Tamam"} onClick={() => navigate("/")} type="MAIN" />
        </div>
      </div>
    </div>
  );
};

export default Settings;
