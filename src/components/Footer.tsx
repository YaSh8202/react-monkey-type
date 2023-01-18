import { Box, useTheme } from '@mui/material';
import React from 'react'

function Footer() {
  const theme = useTheme();
  return (
    <Box height={80} width={"100%"} bgcolor={theme.sub.main} ></Box>
  )
}

export default Footer