"use client";
import React, {
  DetailedHTMLProps,
  InputHTMLAttributes,
  useEffect,
  useState,
} from "react";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const CountryPhoneCodeSelector = (
  props:
    | DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
    | any
) => {
  const [value, setValue] = useState<any>();
  useEffect(() => {
    // console.log("+" + value);

    props.setValue(props.name, `+${value}`);
  }, [value]);
  return (
    <PhoneInput
      onChange={setValue}
      value={value}
      placeholder="Phone No"
      country="in"
    />
  );
};

export default CountryPhoneCodeSelector;
