import React, { useEffect } from 'react'
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  Divider,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { useLoginMutation } from '../store/api/authApi'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [login, { isLoading, isError, error }] = useLoginMutation();
  const navigate = useNavigate()
  const isAuthenticated = useSelector((state) => state.authentication.isAuthenticated);
  const account = useSelector((state) => state.authentication.account);

  useEffect(() => {
    if(isAuthenticated && account){
        const isAdmin = account?.roles.includes('ROLE_ADMIN')
        navigate(isAdmin ? '/admin' : '/dashboard')
    }
  }, [isAuthenticated, navigate, account])



  const onSubmit = async (data) => {
    try {
      const result = await login(data).unwrap();
      console.log('Giriş başarılı:', result)
    } catch (err) {
      console.error('Giriş hatası:', err)
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 10 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Kullanıcı Girişi
        </Typography>

        {isError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Giriş başarısız. Lütfen bilgilerinizi kontrol edin.
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            label="Kullanıcı Adı"
            {...register('username', { required: 'Kullanıcı adı gerekli' })}
            error={!!errors.username}
            helperText={errors.username?.message}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Şifre"
            type="password"
            {...register('password', { required: 'Şifre gerekli' })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading}
            sx={{ mt: 3, mb: 2 }}
          >
            {isLoading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
          </Button>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box>
          <Typography variant="subtitle2" color="textSecondary" gutterBottom>
            <strong>Test Kullanıcı Bilgileri:</strong>
          </Typography>
          <Typography variant="body2">
            <strong>Admin:</strong> Kullanıcı adı: <code>admin</code> – Şifre: <code>admin</code>
          </Typography>
          <Typography variant="body2">
            <strong>Kullanıcı:</strong> Kullanıcı adı: <code>user</code> – Şifre: <code>user</code>
          </Typography>
        </Box>
      </Paper>
    </Container>
  )
}
