import React from "react";
import { Box } from "@mui/system";
import Select from "./Select";
import { parse, stringify } from "query-string";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

interface feildsType {
  [key: string]: string[];
}
interface feildValue {
  [key: string]: string;
}
interface Props {
  feilds: feildsType;
  isChanged?: boolean;
  onReset?: () => void;
  resetText?: string;
}
export default function Selects(props: Props) {
  const { isChanged, feilds, onReset, resetText } = props;
  const { search, pathname } = useLocation();
  const qs: any = parse(search);
  const navigateTo = useNavigate();
  const [openStates, setOpenStates] = React.useState<any>({});

  const defaultStates: feildValue = {};
  Object.keys(feilds).forEach((key) => {
    defaultStates[key] = qs[key] || feilds[key][0];
  });

  const [formsStates, setFormsStates] = React.useState(defaultStates);

  const handleChange = (form: string, val: string) => {
    setFormsStates({ ...formsStates, [form]: val });
    const newQs = { ...qs, [form]: val };
    navigateTo(`${pathname}?${stringify(newQs)}`);
  };

  const renderForms = () => {
    const formsArr = [];
    for (let form in feilds) {
      formsArr.push(
        <Select
          value={formsStates[form]}
          prefix={form}
          onChange={(val: any) => handleChange(form, val)}
          onOpen={() => setOpenStates({ ...openStates, [form]: true })}
          onClose={() => setOpenStates({ ...openStates, [form]: false })}
          active={!!openStates[form]}
          options={feilds[form]}
        />
      );
    }
    return formsArr;
  };

  return (
    <Box display="flex" justifyContent={"center"} alignItems="center">
      {renderForms()}
      {isChanged && (
        <Button
          onClick={onReset}
          color="error"
          variant="contained"
          sx={{ "&>div": { padding: "10px" }, marginLeft: "20px" }}
        >
          {resetText ?? "Reset"}
        </Button>
      )}
    </Box>
  );
}
