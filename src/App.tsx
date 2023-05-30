import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  Grid,
  Toolbar,
  Typography,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useState } from 'react';
import { campaignData } from './campaignData';
import { Campaign } from './components/CampaignTable/Campaign';
import { CampaignTable } from './components/CampaignTable/CampaignTable';
import { DateRangePickerComponent } from './components/DateRangePicker/DateRangePicker';
import { SearchForm } from './components/SearchForm/SearchForm';

declare global {
  interface Window {
    AddCampaigns: (newCampaigns: Campaign[]) => void;
  }
}

const theme = createTheme();

const App: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>(campaignData);
  const [search, setSearch] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  window.AddCampaigns = (newCampaigns: Campaign[]) => {
    setCampaigns([...campaigns, ...newCampaigns]);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position='static' className='navbar'>
        <Toolbar>
          <Typography variant='h6' component='div'>
            Campaigns
          </Typography>
          <Box marginLeft='auto'>
            <SearchForm search={search} setSearch={setSearch} />
          </Box>
        </Toolbar>
      </AppBar>
      <Container component='main' maxWidth='md' className='main-container'>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <DateRangePickerComponent
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
            />
          </Grid>
          <Grid item xs={12}>
            <CampaignTable
              campaigns={campaigns}
              search={search}
              startDate={startDate}
              endDate={endDate}
            />
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default App;
