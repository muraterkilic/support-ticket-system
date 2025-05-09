import React, { useState, useMemo } from 'react'
import {
  Box,
  Typography,
  TextField,
  CircularProgress,
  Alert,
  Chip,
  Grid,
  Paper,
  Button,
  useTheme,
  useMediaQuery
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useNavigate } from 'react-router-dom'
import { useGetAllTicketsQuery } from '../store/api/adminApi'
import { STATUS_MAP } from '../constants/statusMap'

export default function AdminRequestsPage() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const navigate = useNavigate()
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [sortModel, setSortModel] = useState([{ field: 'createdAt', sort: 'desc' }])
  const [search, setSearch] = useState('')

  const { data = { content: [], totalElements: 0 }, isLoading, isError, error } = useGetAllTicketsQuery({
    page,
    size: pageSize,
    sort: sortModel
      .map(({ field, sort }) =>
        `${field === 'username' ? 'user.username' : field},${sort}`
      )
      .join(',')
  })
  

  const filtered = useMemo(() => {
    return data.content.filter((ticket) =>
      [ticket.title, ticket.username].join(' ').toLowerCase().includes(search.toLowerCase())
    )
  }, [data.content, search])

  const columns = useMemo(() => ([
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Başlık', flex: 1, minWidth: 150 },
    { field: 'username', headerName: 'Kullanıcı', width: 150 },
    {
      field: 'status',
      headerName: 'Durum',
      width: 130,
      renderCell: ({ value }) => (
        <Chip label={STATUS_MAP[value]?.label || value} color={STATUS_MAP[value]?.color || 'default'} size="small" />
      )
    },
    {
      field: 'actions',
      headerName: 'İşlem',
      width: 120,
      renderCell: ({ row }) => (
        <Button variant="outlined" size="small" onClick={() => navigate(`/admin/tickets/${row.id}`)}>
          Detay
        </Button>
      )
    }
  ]), [navigate])

  if (isMobile) {
    return (
      <Box>
        <Typography variant="h5" sx={{ mb: 2 }}>Destek Talepleri</Typography>
        <TextField
          placeholder="Ara..."
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ mb: 2 }}
        />
        {isLoading && <CircularProgress />}
        {isError && <Alert severity="error">{error.data?.message}</Alert>}
        <Grid container spacing={2}>
          {filtered.map((t) => (
            <Grid item xs={12} key={t.id}>
              <Paper sx={{ p: 2 }} onClick={() => navigate(`/admin/tickets/${t.id}`)}>
                <Typography variant="subtitle1" fontWeight="bold">{t.title}</Typography>
                <Typography variant="body2">{t.username}</Typography>
                <Chip label={STATUS_MAP[t.status]?.label} color={STATUS_MAP[t.status]?.color} sx={{ mt: 1 }} />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    )
  }

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>Destek Talepleri</Typography>
      <TextField
        placeholder="Ara başlık veya kullanıcı..."
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 2 }}
      />
      {isLoading && <CircularProgress />}
      {isError && <Alert severity="error">{error.data?.message}</Alert>}
      {!isLoading && !isError && (
        <Paper sx={{ width: '100%', overflowX: 'auto' }}>
          <Box sx={{ minWidth: 700, p: 2 }}>
            <DataGrid
              autoHeight
              rows={filtered}
              columns={columns}
              pageSize={pageSize}
              page={page}
              pagination
              paginationMode="server"
              rowCount={data.totalElements}
              onPageChange={setPage}
              onPageSizeChange={setPageSize}
              rowsPerPageOptions={[10, 20, 50]}
              sortingMode="server"
              sortModel={sortModel}
              onSortModelChange={setSortModel}
              disableSelectionOnClick
            />
          </Box>
        </Paper>
      )}
    </Box>
  )
}
