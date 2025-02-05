import { useEffect, useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

const CountryInput = () => {
  const [countryCode, setCountryCode] = useState("");
  useEffect(() => {
    async function getUserCountry() {
      try {
        const response = await fetch(
          "https://ipinfo.io/json?token=your_token_here"
        );
        const data = await response.json();
        setCountryCode(data.country_code);
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    }

    getUserCountry();
  }, []);

  return (
    <PhoneInput
      international
      countryCallingCodeEditable={false}
      defaultCountry={countryCode}
      className="w-full p-2 border-2 border-muted-foreground bg-input rounded"
      onChange={() => console.log("changed")}
    />
  );
};

export default CountryInput;
