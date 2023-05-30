import { DateRangePicker } from '@mui/lab';
import { TextField } from '@mui/material';
import React from 'react';

interface DateRangePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
}

export const DateRangePickerComponent: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}) => {
  const handleDateChange = (dateRange: [Date | null, Date | null]) => {
    setStartDate(dateRange[0]);
    setEndDate(dateRange[1]);
  };

  return (
    <DateRangePicker
      startText='Start Date'
      endText='End Date'
      value={[startDate, endDate]}
      onChange={handleDateChange}
      renderInput={(startProps: any, endProps: any) => (
        <>
          <TextField {...startProps} />
          <span> to </span>
          <TextField {...endProps} />
        </>
      )}
    />
  );
};
