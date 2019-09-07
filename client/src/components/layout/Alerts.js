import React, { useContext } from "react";
import AlertContext from "../../context/alert/alertContext";
import SimpleSnackbar from "./SimpleSnackbar";

const Alerts = () => {
  const alertContext = useContext(AlertContext);

  return (
    alertContext.alerts.length > 0 &&
    alertContext.alerts.map(alert => (
      <SimpleSnackbar key={alert.id} text={alert.msg} />
    ))
  );
};

export default Alerts;
