import React, { useState } from 'react'
import {
  Typography,
  Paper,
  Box,
  Chip,
  Stack,
  CircularProgress,
  Alert,
  ToggleButtonGroup,
  ToggleButton,
  useTheme,
} from '@mui/material'
import {
  HourglassTop as HourglassTopIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  List as ListIcon,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useGetTicketsByUserQuery } from '../store/api/ticketApi'
import { STATUS_MAP } from '../constants/statusMap'

export default function MyRequestsPage() {
  const theme = useTheme()
  const navigate = useNavigate()
  const { data: tickets = [], isLoading, isError, error } = useGetTicketsByUserQuery()
  const [statusFilter, setStatusFilter] = useState('ALL')

  const handleFilterChange = (e, newFilter) => {
    if (newFilter !== null) setStatusFilter(newFilter)
  }

  const filtered = tickets.filter(t =>
    statusFilter === 'ALL' ? true : t.status === statusFilter
  )

  if (isLoading) {
    return (
      <Box textAlign="center" mt={4}>
        <CircularProgress />
      </Box>
    )
  }
  if (isError) {
    return (
      <Alert severity="error" sx={{ my: 2 }}>
        {error?.data?.message || 'Talepler yüklenirken hata oluştu.'}
      </Alert>
    )
  }

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Taleplerim
      </Typography>

      <ToggleButtonGroup
        value={statusFilter}
        exclusive
        onChange={handleFilterChange}
        sx={{
          mb: 2,
          '& .MuiToggleButton-root': {
            textTransform: 'none',
            px: 2,
            py: 1,
            border: `1px solid ${theme.palette.divider}`,
            '&:not(:first-of-type)': { borderLeft: 0 },
          },
          '& .Mui-selected': {
            color: theme.palette.common.white,
            '&.open': {
              bgcolor: theme.palette.warning.main,
            },
            '&.responded': {
              bgcolor: theme.palette.info.main,
            },
            '&.closed': {
              bgcolor: theme.palette.success.main,
            },
            '&.all': {
              bgcolor: theme.palette.primary.main,
            },
          },
        }}
      >
        <ToggleButton value="ALL" className="all">
          <ListIcon sx={{ mr: 0.5 }} /> Tümü
        </ToggleButton>
        <ToggleButton value="OPEN" className="open">
          <HourglassTopIcon sx={{ mr: 0.5 }} /> Açık
        </ToggleButton>
        <ToggleButton value="RESPONDED" className="responded">
          <CheckCircleIcon sx={{ mr: 0.5 }} /> Yanıtlandı
        </ToggleButton>
        <ToggleButton value="CLOSED" className="closed">
          <CancelIcon sx={{ mr: 0.5 }} /> Kapalı
        </ToggleButton>
      </ToggleButtonGroup>

      {!isLoading && filtered.length === 0 && (
        <Alert severity="info">
          {statusFilter === 'ALL'
            ? 'Henüz destek talebiniz bulunmuyor.'
            : `${STATUS_MAP[statusFilter]?.label || statusFilter} talebiniz bulunmuyor.`}
        </Alert>
      )}

      <Stack spacing={2}>
        {filtered.map(ticket => {
          const info = STATUS_MAP[ticket.status] || { label: ticket.status, color: 'default' }
          return (
            <Paper
              key={ticket.id}
              elevation={3}
              sx={{
                p: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'pointer',
                transition: 'box-shadow 0.2s',
                '&:hover': { boxShadow: 6 },
              }}
              onClick={() => navigate(`/dashboard/requests/${ticket.id}`)}
            >
              <Box>
                <Typography variant="subtitle1" fontWeight={600}>
                  {ticket.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap maxWidth={400}>
                  {ticket.description}
                </Typography>
              </Box>
              <Chip label={info.label} color={info.color} size="small" />
            </Paper>
          )
        })}
      </Stack>
    </>
  )
}
