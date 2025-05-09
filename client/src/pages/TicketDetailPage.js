import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Box,
  Typography,
  Paper,
  Chip,
  CircularProgress,
  Alert,
  Button,
} from '@mui/material'
import { useGetTicketByIdAndUserQuery, useCloseTicketMutation } from '../store/api/ticketApi'
import { STATUS_MAP } from '../constants/statusMap'

export default function TicketDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const {
    data: ticket,
    isLoading,
    isError,
    error,
  } = useGetTicketByIdAndUserQuery(id)  

  const [closeTicket, { isLoading: isClosing }] = useCloseTicketMutation()

  const handleClose = async () => {
    try {
      await closeTicket(id).unwrap()
      navigate('/dashboard/requests')  
    } catch (err) {
      console.error('Bileti kapatma hatası:', err)
    }
  }

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
        {error?.data?.message || 'Bilet yüklenirken hata oluştu.'}
      </Alert>
    )
  }

  const statusInfo = STATUS_MAP[ticket.status] || { label: ticket.status, color: 'default' }

  return (
    <Paper elevation={4} sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">{ticket.title}</Typography>
        <Chip label={statusInfo.label} color={statusInfo.color} />
      </Box>

      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        Kategori: {ticket.category}
      </Typography>
      <Typography variant="body1" paragraph>
        {ticket.description}
      </Typography>

      <Box mt={3}>
        <Typography variant="subtitle1">Admin Yanıtı:</Typography>
        {ticket.adminResponse
          ? <Paper sx={{ p: 2, mt: 1 }}>{ticket.adminResponse}</Paper>
          : <Alert severity="info" sx={{ mt: 1 }}>Henüz yanıtlanmadı.</Alert>
        }
      </Box>

      {ticket.status !== 'CLOSED' && (
        <Box mt={4} textAlign="right">
          <Button
            variant="contained"
            color="error"
            disabled={isClosing}
            onClick={handleClose}
          >
            {isClosing ? 'Kapatılıyor...' : 'Bileti Kapat'}
          </Button>
        </Box>
      )}
    </Paper>
  )
}
