import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";
import "./index.css";
import {styles} from './shared/styles';
import {useDataApi} from './utils/useDataApi'
import Pagination from "@material-ui/lab/Pagination";
import { FormModal } from "./FormModal";


function App({ classes }) {
  const [{ data: datas, isLoading, isError }] = useDataApi();
  const firstIndex = 0;
  const pageSize = 10;
  useEffect(()=> {setActualData(datas)},[datas]);

  const[actualData, setActualData]= useState(null);
  const[updatedData, setUpdateData]= useState(null);
  
  const [page, setPage] = React.useState(1);
  const [data, setData] = React.useState(actualData?.slice(firstIndex, pageSize));

  React.useEffect(() => {
    setData(actualData?.slice(firstIndex, pageSize));
  }, [actualData]);

  const handleChange = (event,value) => {
    const dataArr = updatedData ? updatedData : actualData;
    setPage(value);
    setData(dataArr?.slice(firstIndex + pageSize * (value - 1), pageSize * value));
  };

  const [openModal, setOpenModal] = useState({open: false});

  const onCloseModal = () => {
    setOpenModal({open: false });
  };
  const handleOpenModal = (item,index) => {
    setOpenModal({...item,open: true, index: index});
  };

  const updateData = (updateVal) => {
    const filterdData=data.filter(item => item.id !== updateVal.id);
    filterdData.splice(updateVal.index, 0, updateVal);
    setData(filterdData);

    const dataArr = updatedData ? updatedData : actualData;
    const filteredDataArr = dataArr?.filter(item => item.id !== updateVal.id);
    let index;
    for(let i = 0; i < dataArr.length; i++) {
    if(dataArr[i].id === updateVal.id) {
        index = i;
        break;
    }
  }
  filteredDataArr.splice(index, 0, updateVal);
  setUpdateData(filteredDataArr);
  };

  return (
    <div className="App">
      {data?.map((item,index) => 
      <Box m={1} pt={2}>
      <Card className={classes.card} key={`${item.title}${item.id}`}>
        <CardContent className={classes.content}>
          <CardHeader
          action={
            <div>
              <IconButton aria-label="settings" onClick={() => handleOpenModal(item,index)}>
                <MoreVertIcon />
              </IconButton>
            </div>
          }
          title={item.title}  
        />
          <Typography
            className={"MuiTypography--subheading"}
            variant={"caption"}
          >
            {item.body}
          </Typography>
        </CardContent>
      </Card>
      </Box>
)}

<FormModal
          title="Form modal"
          onCloseModal={onCloseModal}
          maxWidth="sm"
          modelData={openModal}
          updateData={updateData}
          cancelButton
        />

<Typography>Page: {page}</Typography>
<Pagination
        count={Math.ceil(actualData?.length / pageSize)}
        page={page}
        onChange={handleChange}
      />

    </div>
  );
}

const WrappedApp = withStyles(styles)(App);

const rootElement = document.getElementById("root");
ReactDOM.render(<WrappedApp />, rootElement);

