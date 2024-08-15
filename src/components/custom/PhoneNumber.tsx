/* eslint-disable @typescript-eslint/no-unused-vars */
// src/components/CustomPhoneInput.tsx
import React, { useState } from 'react';
import { Input } from '@/components/ui/input'; // Import Shadcn Input component
import { Label } from '@/components/ui/label'; // Import Shadcn Label component
import { countries } from '@/utils/countries'; // Import custom country list

interface CustomPhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}

const CustomPhoneInput: React.FC<CustomPhoneInputProps> = ({ value, onChange, className, placeholder }) => {
  const [countryCode, setCountryCode] = useState<string>('IN');
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCountryCode(event.target.value);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(event.target.value);
    onChange(event.target.value);
  };

  const selectedCountry = countries.find(country => country.code === countryCode);

  return (
    <div className={`relative ${className}`}>
      <Label className="text-white">Phone Number</Label>
      <div className="flex items-center border rounded-lg overflow-hidden">
        {/* Country Code Dropdown */}
        <select
          value={countryCode}
          onChange={handleCountryChange}
          className="p-2  bg-gray-700 text-white border-r border-gray-600 outline-none text-sm w-2/4"
        >
          {countries.map(({ code, name, dialCode }) => (
            <option key={code} value={code}>
              {name} (+{dialCode})
            </option>
          ))}
        </select>

        {/* Phone Number Input */}
        <Input
          type="tel"
          value={phoneNumber}
          onChange={handleInputChange}
          className="w-3/4 p-2 bg-gray-700 text-white border-none outline-none"
          placeholder={placeholder}
        />
        {/* <span className="absolute left-2 text-white text-sm">
          +{selectedCountry?.dialCode || ''}
        </span> */}
      </div>
    </div>
  );
};

export default CustomPhoneInput;
