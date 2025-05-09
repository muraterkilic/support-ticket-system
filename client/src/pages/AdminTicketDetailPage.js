// src/pages/AdminTicketDetailPage.js
import React, { useState } from 'react'
import {
  Box,
  Paper,
  Typography,
  Chip,
  Divider,
  TextField,
  Button,
  Alert,
  CircularProgress,
} from '@mui/material'
import { useParams, useNavigate } from 'react-router-dom'
import {
  useReplyToTicketMutation,
  useCloseTicketMutation,
  useGetTicketDetailByIdQuery,
} from '../store/api/adminApi'
import { STATUS_MAP } from '../constants/statusMap'

export default function AdminTicketDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const {
    data: ticket,
    isLoading,
    isError,
    error,
  } = useGetTicketDetailByIdQuery(id)

  const [replyToTicket, { isLoading: replying, isError: replyError, error: replyErr, isSuccess: replySuccess }] = 
    useReplyToTicketMutation()
  const [closeTicket, { isLoading: closing, isError: closeError, error: closeErr, isSuccess: closeSuccess }] = 
    useCloseTicketMutation()

  const [responseText, setResponseText] = useState('')

  const handleReply = async () => {
    try {
      await replyToTicket({ id, adminResponse: responseText }).unwrap()
      setResponseText('')
    } catch (e) {
      console.error(e)
    }
  }

  const handleClose = async () => {
    try {
      await closeTicket(id).unwrap()
    } catch (e) {
      console.error(e)
    }
  }

  if (isLoading) {
    return (
      <Box textAlign="center" mt={4}>
        <CircularProgress />
      </Box>
    )
  }
  if (isError || !ticket) {
    return (
      <Alert severity="error" sx={{ mt: 4 }}>
        {error?.data?.message || 'Talep yüklenirken hata oluştu.'}
      </Alert>
    )
  }

  const statusInfo = STATUS_MAP[ticket.status] || { label: ticket.status, color: 'default' }

  return (
    <Paper elevation={4} sx={{ p: { xs: 2, md: 4 }, maxWidth: 800, mx: 'auto' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap">
        <Typography variant="h5" sx={{ mr: 2 }}>{ticket.title}</Typography>
        <Chip label={statusInfo.label} color={statusInfo.color} />
      </Box>

      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        Oluşturulma: {new Date(ticket.createdAt).toLocaleString('tr-TR')}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Kategori: {ticket.category}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Typography variant="subtitle1" gutterBottom>Açıklama</Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>{ticket.description}</Typography>

      <Divider sx={{ my: 2 }} />

      <Typography variant="subtitle1" gutterBottom>Admin Yanıtı</Typography>

      {ticket.adminResponse ? (
        <Alert severity="info" sx={{ mb: 2 }}>
          {ticket.adminResponse}
        </Alert>
      ) : (
        <Alert severity="warning" sx={{ mb: 2 }}>
          Henüz yanıt eklenmemiş.
        </Alert>
      )}

      <TextField
        label="Yanıtınızı buraya yazın"
        multiline
        fullWidth
        rows={4}
        value={responseText}
        onChange={(e) => setResponseText(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Box display="flex" gap={2} flexWrap="wrap">
        <Button
          variant="contained"
          color="primary"
          disabled={!responseText || replying}
          onClick={handleReply}
        >
          {replying ? 'Gönderiliyor...' : 'Yanıtı Gönder'}
        </Button>
        {replyError && (
          <Typography color="error" variant="body2">
            {replyErr?.data?.message || 'Yanıt gönderilemedi.'}
          </Typography>
        )}
        {replySuccess && (
          <Typography color="success.main" variant="body2">
            Yanıt başarıyla gönderildi.
          </Typography>
        )}

        {ticket.status !== 'CLOSED' && (
          <Button
            variant="outlined"
            color="error"
            disabled={closing}
            onClick={handleClose}
          >
            {closing ? 'Kapatılıyor...' : 'Talebi Kapat'}
          </Button>
        )}
        {closeError && (
          <Typography color="error" variant="body2">
            {closeErr?.data?.message || 'Kapatma işleminde hata.'}
          </Typography>
        )}
        {closeSuccess && (
          <Typography color="success.main" variant="body2">
            Talep kapatıldı.
          </Typography>
        )}
      </Box>

      <Button sx={{ mt: 3 }} onClick={() => navigate(-1)}>
        Geri Dön
      </Button>
    </Paper>
  )
}
