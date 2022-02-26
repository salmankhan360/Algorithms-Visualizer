import React from "react";
import { MenuItem, Select as MUISelect } from "@mui/material";

interface Props {
  value: string;
  prefix?: string;
  active?: boolean;
  options: string[];
  disabled?: boolean;
  onChange: (val: string) => void;
  onOpen?: () => void;
  onClose?: () => void;
}
export default function Select(props: Props) {
  const {
    onChange,
    onOpen,
    onClose,
    prefix,
    active,
    options,
    value = options[0],
    disabled,
  } = props;
  return (
    <MUISelect
      disabled={disabled}
      value={value}
      renderValue={(value) => (
        <div>
          <span style={{ fontSize: "16px" }}>{prefix}: </span> {value}
        </div>
      )}
      onChange={(e: any) => onChange(e.target.value)}
      onOpen={onOpen}
      onClose={onClose}
      sx={{
        minWidth: "220px",
        fontSize: "18px",
        textTransform: "capitalize",
        backgroundColor: active ? "#6c757d" : "transparent",
        color: active ? "white" : "#000",
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
        margin: "0 10px",
        "&:last-child": { mr: "25px" },
      }}
    >
      {options.map((item: any) => (
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
    </MUISelect>
  );
}
