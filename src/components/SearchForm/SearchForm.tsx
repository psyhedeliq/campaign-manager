import SearchIcon from '@mui/icons-material/Search';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';
import { SearchBox, SearchInput } from './SearchForm.styles';

export interface SearchFormProps {
  search: string;
  setSearch: (search: string) => void;
}

export const SearchForm: React.FC<SearchFormProps> = ({
  search,
  setSearch,
}) => {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <SearchBox>
      <SearchInput
        placeholder='Search'
        value={search}
        onChange={handleSearchChange}
        InputProps={{
          disableUnderline: true,
          startAdornment: (
            <InputAdornment position='start'>
              <IconButton edge='start' disableRipple>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        fullWidth
      />
    </SearchBox>
  );
};
