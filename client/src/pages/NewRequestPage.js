import React from 'react'
import { useForm } from 'react-hook-form'
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Alert
} from '@mui/material'
import { CATEGORY_LIST } from '../constants/categories'
import { useCreateTicketMutation } from '../store/api/ticketApi'
import { useNavigate } from 'react-router-dom'

export default function NewRequestPage() {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm()

  const [createTicket, { isLoading, isSuccess }] = useCreateTicketMutation()
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    try {
      await createTicket(data).unwrap()
      reset()
      navigate('/dashboard/requests')
    } catch (err) {
      const fieldErrors = err?.data?.errors
      if (fieldErrors) {
        Object.entries(fieldErrors).forEach(([field, message]) => {
          setError(field, { type: 'manual', message })
        })
      } else {
        console.error('Talep oluşturulamadı:', err)
      }
    }
  }

  return (
    <Box display="flex" justifyContent="center">
      <Paper elevation={4} sx={{ p: 4, maxWidth: 600, width: '100%' }}>
        <Typography variant="h5" gutterBottom>
          Yeni Destek Talebi Oluştur
        </Typography>

        {isSuccess && <Alert severity="success">Talebiniz başarıyla oluşturuldu!</Alert>}

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            fullWidth
            label="Başlık"
            {...register('title', { required: 'Başlık gerekli' })}
            error={!!errors.title}
            helperText={errors.title?.message}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Açıklama"
            multiline
            rows={5}
            {...register('description', {
              required: 'Açıklama gerekli',
              minLength: { value: 10, message: 'En az 10 karakter girin' },
            })}
            error={!!errors.description}
            helperText={errors.description?.message}
            margin="normal"
          />

          <FormControl fullWidth margin="normal" error={!!errors.category}>
            <InputLabel id="category-label">Kategori</InputLabel>
            <Select
              labelId="category-label"
              label="Kategori"
              defaultValue=""
              {...register('category', { required: 'Kategori gerekli' })}
            >
              {CATEGORY_LIST.map((cat) => (
                <MenuItem key={cat.value} value={cat.value}>
                  {cat.label}
                </MenuItem>
              ))}
            </Select>
            {errors.category && (
              <Typography variant="caption" color="error">
                {errors.category.message}
              </Typography>
            )}
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 2 }}
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? 'Gönderiliyor...' : 'Gönder'}
          </Button>
        </form>
      </Paper>
    </Box>
  )
}
