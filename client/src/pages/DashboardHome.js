import React from 'react'
import {
  Grid,
  Typography,
  Paper,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material'
import AssessmentIcon from '@mui/icons-material/Assessment'
import HourglassTopIcon from '@mui/icons-material/HourglassTop'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import { useNavigate } from 'react-router-dom'
import { useGetTicketsByUserQuery } from '../store/api/ticketApi'

export default function DashboardHome() {
  const navigate = useNavigate()
  const {
    data: tickets = [],
    isLoading,
    isError,
    error,
  } = useGetTicketsByUserQuery()

  if (isLoading) {
    return (
      <Box textAlign="center" mt={4}>
        <CircularProgress />
      </Box>
    )
  }
  if (isError) {
    return (
      <Alert severity="error" sx={{ mt: 4 }}>
        {error?.data?.message || 'Talepler yüklenirken bir hata oluştu.'}
      </Alert>
    )
  }

  const totalCount = tickets.length
  const openCount = tickets.filter((t) => t.status === 'OPEN').length
  const respondedCount = tickets.filter((t) => t.status === 'RESPONDED').length
  const closedCount = tickets.filter((t) => t.status === 'CLOSED').length

  const stats = [
    {
      label: 'Toplam Talepler',
      value: totalCount,
      icon: <AssessmentIcon color="primary" fontSize="large" />,
    },
    {
      label: 'Açık Talepler',
      value: openCount,
      icon: <HourglassTopIcon color="warning" fontSize="large" />,
    },
    {
      label: 'Yanıtlanan Talepler',
      value: respondedCount,
      icon: <CheckCircleIcon color="success" fontSize="large" />,
    },
    {
      label: 'Kapalı Talepler',
      value: closedCount,
      icon: <CancelIcon color="error" fontSize="large" />,
    },
  ]

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Hoş Geldiniz!
      </Typography>
      <Typography variant="body1" gutterBottom>
        Taleplerinizi görüntüleyebilir veya yeni talep oluşturabilirsiniz.
      </Typography>

      <Grid container spacing={3} mt={2}>
        {stats.map((item) => (
          <Grid item xs={12} md={3} key={item.label}>
            <Paper
              elevation={4}
              sx={{
                p: 3,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                borderRadius: 3,
                cursor: 'pointer',
                '&:hover': { boxShadow: 8 },
              }}
              onClick={() => navigate('/dashboard/requests')}
            >
              {item.icon}
              <Box>
                <Typography variant="subtitle2">{item.label}</Typography>
                <Typography variant="h5">{item.value}</Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </>
  )
}
