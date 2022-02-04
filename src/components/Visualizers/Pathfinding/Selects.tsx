import React from 'react';
import { Box,  } from "@mui/system";
import {InputLabel,
  MenuItem,
  FormControl,
  Select,} from "@mui/material"
  import { parse, stringify } from 'query-string';
  import { useLocation, useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap/lib/Navbar';

    const selectsForms: any = {
    speed: ['slow', 'medium', 'fast'],
    algorithm: ['djikstra', 'aStar'],
  }

export default function Selects() {
    const {search} = useLocation()
    const qs: any = parse(search)
    const navigateTo = useNavigate()
    const [formsStates, setFormsStates] = React.useState<any>({algorithm: 'djikstra', speed: 'medium'});

    const handleChange = (form: string, val:string) => {
        setFormsStates({...formsStates, [form]: val});
        const newQs = {...qs, [form]: val}
        navigateTo(`/Pathfinding?${stringify(newQs)}`)
    }
  
  const forms  = ()=>{
      const formsArr = []
      for(let form in selectsForms){
          formsArr.push(
            <FormControl sx={{ m: 1, minWidth: 80, textTransform: "capitalize" , marginLeft: "20px", marginRight: "20px"}}>
            <InputLabel sx={{fontSize: "20px"}}>{form}</InputLabel>
            <Select
              value={formsStates[form]}
              onChange={(e)=> handleChange(form, e.target.value)}
              label={form}
              sx={{minWidth: "140px", fontSize: "20px"}}
            >
            {selectsForms[form].map((item: any)=>  <MenuItem value={item} sx={{fontSize: "20px"}}>{item}</MenuItem>)}
            </Select>
            </FormControl>
            )
            console.log(formsStates[form])
      }
      return formsArr
  }
  return <Box marginBottom={'50px'}>
     {forms()}
  </Box>;
}
