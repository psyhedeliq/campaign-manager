import { styled } from '@mui/system';
import { TextField } from '@mui/material';

export const SearchBox = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  borderRadius: '4px',
  overflow: 'hidden',
  backgroundColor: '#F0F2F5',
  transition: 'width 0.3s ease',
  width: '150px', // Initial width
  '&:focus-within': {
    width: '250px', // Expanded width
  },
}));

export const SearchInput = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    color: '#212529',
    height: '36px',
    transition: 'padding 0.3s ease',
  },
  '& .MuiInputBase-input': {
    paddingLeft: theme.spacing(1),
    transition: 'padding 0.3s ease',
  },
}));
