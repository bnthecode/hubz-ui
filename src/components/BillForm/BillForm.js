import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InputAdornment, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import BaseButton from "../BaseButton/BaseButton";
import BaseSelect from "../BaseSelect/BaseSelect";
import BaseTextField from "../BaseTextField/BaseTextField";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  formField: {
    width: "80%",
  },
}));

const BillForm = ({ formData, handleChange }) => {
  const classes = useStyles();
  return (
    <div>
            <div style={{ marginLeft: '20%'}}>
      <BaseTextField
        spacing={18}
        className={classes.formField}
        placeholder="Car payment"
        label="Bill name"
      />
      <BaseTextField
        spacing={18}
        readOnly
        value={moment(formData.date).format("MM/DD/YYYY")}
        className={classes.formField}
        placeholder="Due date"
        label="Due date"
      />
      <BaseTextField
        spacing={18}
        className={classes.formField}
        placeholder="460.45"
        label="Amount due"
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
      />
      <div>
      <Typography style={{ width: '80%', fontSize: 14, color: 'white'}}>
        <BaseButton
          style={{ marginRight: 16, marginTop: 8, width: 4 }}
          onClick={() => handleChange(!formData.is_recurring, "is_recurring")}
        >
          {formData.is_recurring && <FontAwesomeIcon icon={faCheck} />}
        </BaseButton>
        This bill is recurring
      </Typography>
 
      <Typography style={{ width: '80%', fontSize: 14, color: 'white',}}>
        <BaseButton
          style={{ marginRight: 16, marginTop: 8, width: 4 }}
          onClick={() => handleChange(!formData.add_reminders, "add_reminders")}
        >
          {formData.add_reminders && <FontAwesomeIcon icon={faCheck} />}
        </BaseButton>
        Add reminders
      </Typography>
      </div>
      </div>
    </div>
  );
};

export default BillForm;
