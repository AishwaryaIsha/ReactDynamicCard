import React, { useEffect, useRef} from "react";
import { Button, Dialog, IconButton, Typography } from "@material-ui/core";
import {
  createStyles,
  withStyles,
} from "@material-ui/core/styles";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import CloseIcon from "@material-ui/icons/Close";

import TextField from '@material-ui/core/TextField';


const styles = (theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2)
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500]
    }
  });


const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose && (
        <IconButton
          aria-label="close"
          data-testid="close-modal"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      )}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions);

export const FormModal = ({
  onCloseModal,
  maxWidth,
  modelData,
  cancelButton,
  updateData,
}) => {


const [inputVal, setInputVal] = React.useState(modelData); 
const [saveButton, setSaveButton] = React.useState(true); 
useEffect(() => {setInputVal(modelData)},[modelData]); 


useEffect(() => {
  (inputVal.title !== modelData.title ||  inputVal.body !== modelData.body) ? setSaveButton(false) : setSaveButton(true);
},[inputVal]); 

const handleChange = (key,e) => {
  key === "title" ? setInputVal({...inputVal, title: e.target.value}) : setInputVal({...inputVal, body: e.target.value});
};

const onSubmit = () => {
  console.log(inputVal);
  updateData(inputVal);
  onCloseModal();
};

  return (
    <Dialog
      onClose={onCloseModal}
      aria-labelledby="customized-dialog-title"
      open={modelData.open}
      fullWidth
      maxWidth={maxWidth}
      data-testid="form-modal"
    >

        <DialogTitle id="form-dialog-title" onClose={onCloseModal}>
          Dialog Box
        </DialogTitle>
        <DialogContent dividers>
        <TextField
        id="outlined-multiline-static"
        fullWidth
        multiline
        minRows={3}
        variant="outlined"
        defaultValue={inputVal.title}
        label="title"
        name="body"
        onChange={e => handleChange("title",e)}
      />
      <DialogContent />
      <TextField
        id="outlined-multiline-static"
        fullWidth
        multiline
        minRows={3}
        variant="outlined"
        defaultValue={inputVal.body} 
        name="Content"
        label="Content"
        onChange={e => handleChange("body",e)}
      />
      </DialogContent>
        <DialogActions>
          {cancelButton && (
            <Button
              onClick={onCloseModal}
              color="secondary"
              data-testid="cancel-button"
            >
              Cancel
            </Button>
          )}
          <Button
            autoFocus
            color="primary"
            data-testid="submit-button"
            disabled={saveButton}
            onClick={onSubmit}
          >
            Save changes
          </Button>
        </DialogActions>

    </Dialog>
  );
};
