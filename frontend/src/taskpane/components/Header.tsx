import * as React from "react";
import PropTypes from "prop-types";
import { Image, makeStyles } from "@fluentui/react-components";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "./Button"

const useStyles = makeStyles({
  welcome__header: {
    display: "flex",
    flexDirection: "row",
    paddingLeft: "5px",
    backgroundColor: "#f5f5f5",
    borderRadius: "12px 12px 0 0",
    width: "100%",
    maxWidth: "auto",
    margin: "30px auto",
    boxSizing: "border-box",
    fontFamily: "Segoe UI, sans-serif",
    marginTop: "1px",
    marginBottom: "0px",
    
  },
  message: {
    color: "#a3a3a3",
    marginBottom: "20px",
    paddingTop: "8px",
  },

  settingsButton: {
    marginLeft: "auto",
    cursor: "pointer",
    marginRight: "10px",
    marginTop: "20px",
    padding: "4px 12px",     
    height: "25px", 
    lineHeight: "1",
    
  }
});

const Header = (props) => {
  const { title, logo, message } = props;
  const styles = useStyles();
  const navigate = useNavigate();
  const location = useLocation();

  const isSettingsPage = location.pathname === "/Settings";

  return (
    <section className={styles.welcome__header}>
      <Image width="70" height="70" src={logo} alt={title} />
      <h1 className={styles.message}>{message}</h1>
      
      {/* SADECE AYARLAR SAYFASI DIŞINDA BUTON GÖRÜNMESİ İÇİN!!! */}
      {!isSettingsPage && (
        <div className={styles.settingsButton}>
        <Button
        label={"Ayarlar"}
        onClick={()=>navigate("/Settings")}
        type="TERTIARY"
      /> </div>
      )}
      
    </section>
  );
};

Header.propTypes = {
  title: PropTypes.string,
  logo: PropTypes.string,
  message: PropTypes.string,
};

export default Header;
