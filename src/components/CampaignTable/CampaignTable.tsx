import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {
  Box,
  FormControl,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { Campaign } from './Campaign';

interface CampaignTableProps {
  campaigns: Campaign[];
  search: string;
  startDate: Date | null;
  endDate: Date | null;
}

export const CampaignTable: React.FC<CampaignTableProps> = ({
  campaigns,
  search,
  startDate,
  endDate,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Calculate the index range for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = campaigns
    .filter(
      (campaign) =>
        campaign.name.toLowerCase().includes(search.toLowerCase()) &&
        (!startDate ||
          !endDate ||
          (campaign.startDate >= startDate && campaign.endDate <= endDate))
    )
    .slice(indexOfFirstItem, indexOfLastItem);

  // Handle items per page change
  const handleItemsPerPageChange = (event: any) => {
    setItemsPerPage(event.target.value);
    setCurrentPage(1);
  };

  const isActive = (campaign: Campaign) => {
    const today = new Date();
    const startDate = new Date(campaign.startDate);
    const endDate = new Date(campaign.endDate);
    return today >= startDate && today <= endDate;
  };

  return (
    <TableContainer component={Paper} sx={{ width: '100%' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell>Budget</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentItems.map((campaign) => (
            <TableRow key={campaign.id}>
              <TableCell>{campaign.name}</TableCell>
              <TableCell>
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  {isActive(campaign) ? (
                    <>
                      <CheckCircleIcon
                        style={{
                          color: 'green',
                          fontSize: '16px',
                          marginRight: '4px',
                        }}
                      />
                      Active
                    </>
                  ) : (
                    <>
                      <CancelIcon
                        style={{
                          color: 'red',
                          fontSize: '16px',
                          marginRight: '4px',
                        }}
                      />
                      Inactive
                    </>
                  )}
                </span>
              </TableCell>
              <TableCell>{campaign.startDate.toLocaleDateString()}</TableCell>
              <TableCell>{campaign.endDate.toLocaleDateString()}</TableCell>
              <TableCell>${campaign.budget}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        marginTop={2}
        padding={1}
        borderTop='1px solid rgba(224, 224, 224, 1)'
      >
        <Box display='flex' alignItems='center'>
          <Typography variant='caption' sx={{ marginRight: 1 }}>
            Rows per page:
          </Typography>
          <FormControl variant='standard' size='small'>
            <Select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Rows per page' }}
              sx={{ padding: 0, fontSize: '0.875rem' }}
            >
              <MenuItem value={10} sx={{ fontSize: '0.875rem' }}>
                10
              </MenuItem>
              <MenuItem value={25} sx={{ fontSize: '0.875rem' }}>
                25
              </MenuItem>
              <MenuItem value={50} sx={{ fontSize: '0.875rem' }}>
                50
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Typography variant='caption'>
          {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, campaigns.length)}{' '}
          of {campaigns.length}
        </Typography>
        <Box>
          <IconButton
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
            aria-label='Previous Page'
          >
            <NavigateBeforeIcon />
          </IconButton>
          <IconButton
            disabled={indexOfLastItem >= campaigns.length}
            onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
            aria-label='Next Page'
          >
            <NavigateNextIcon />
          </IconButton>
        </Box>
      </Box>
    </TableContainer>
  );
};
