import React from "react";
import { Box } from "@mui/system";
import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import { parse, stringify } from "query-string";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
const selectsForms: any = {
  speed: ["slow", "medium", "fast"],
  algorithm: ["djikstra", "aStar"],
};

interface Props {
  isChanged: boolean;
}
export default function Selects(props: Props) {
  const { isChanged } = props;
  const { search } = useLocation();
  const [openStates, setOpenStates] = React.useState<any>({});
  const qs: any = parse(search);
  const navigateTo = useNavigate();
  const [formsStates, setFormsStates] = React.useState<any>({
    algorithm: "djikstra",
    speed: "medium",
  });

  const handleChange = (form: string, val: string) => {
    setFormsStates({ ...formsStates, [form]: val });
    const newQs = { ...qs, [form]: val };
    navigateTo(`/Pathfinding?${stringify(newQs)}`);
  };

  const forms = () => {
    const formsArr = [];
    for (let form in selectsForms) {
      formsArr.push(
        <Select
          value={formsStates[form]}
          renderValue={(value) => (
            <div>
              <span style={{ fontSize: "16px" }}>{form}: </span> {value}
            </div>
          )}
          onChange={(e) => handleChange(form, e.target.value)}
          onOpen={() => setOpenStates({ ...openStates, [form]: true })}
          onClose={() => setOpenStates({ ...openStates, [form]: false })}
          sx={{
            minWidth: "220px",
            fontSize: "18px",

            textTransform: "capitalize",
            backgroundColor: openStates[form] ? "#6c757d" : "transparent",
            color: openStates[form] ? "white" : "#000",
            borderColor: "#6c757d",
            "&:hover": {
              backgroundColor: "#6c757d",
              color: "#fff",
            },
            transition: "all 0.3s ease-in-out",
            padding: "0px",
            "& > div": {
              padding: "6px 20px",
            },
            margin: "0 15px",
          }}
        >
          {selectsForms[form].map((item: any) => (
            <MenuItem
              value={item}
              sx={{
                fontSize: "20px",
                textTransform: "capitalize",
              }}
            >
              {item}
            </MenuItem>
          ))}
        </Select>
      );
    }
    return formsArr;
  };
  function handleReset() {
    const resetBtn = document.getElementById("ResetTree");
    resetBtn?.click();
  }
  return (
    <Box
      display="flex"
      justifyContent={"center"}
      alignItems="center"
      marginBottom={"20px"}
    >
      {forms()}
      {isChanged && (
        <Button
          onClick={handleReset}
          color="error"
          variant="contained"
          sx={{ "&>div": { padding: "10px" }, marginLeft: "20px" }}
        >
          Clear Walls
        </Button>
      )}
    </Box>
  );
}
