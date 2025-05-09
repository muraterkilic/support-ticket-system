import React, { useState } from 'react'
import {
  Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography,
  Divider, IconButton, AppBar, Toolbar, useTheme, useMediaQuery, CssBaseline, Button, Avatar
} from '@mui/material'
import {
  Dashboard as DashboardIcon,
  ListAlt as ListIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon
} from '@mui/icons-material'
import { useNavigate, useLocation } from 'react-router-dom'
import { clearAuth } from '../store/slices/authSlice'
import { useDispatch } from 'react-redux'

const drawerWidth = 260

export default function AdminLayout({ children }) {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen)
  const handleNav = (path) => {
    navigate(path)
    if (isMobile) setMobileOpen(false)
  }

  const handleLogout = () => {
    dispatch(clearAuth())
    navigate('/')
  }

  const drawerContent = (
    <Box sx={{ height: '100%', bgcolor: 'background.paper', display: 'flex', flexDirection: 'column' }}>
      <Toolbar sx={{ justifyContent: 'center', py: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
          Yönetim Paneli
        </Typography>
      </Toolbar>
      <Divider />
      <List sx={{ flexGrow: 1 }}>
        <ListItem disablePadding>
          <ListItemButton
            selected={location.pathname === '/admin'}
            onClick={() => handleNav('/admin')}
            sx={{ px: 3, py: 1.5 }}
          >
            <ListItemIcon><ListIcon /></ListItemIcon>
            <ListItemText primary="Tüm İstekler" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Button variant="contained" color="error" startIcon={<LogoutIcon />} fullWidth onClick={handleLogout}>
          Çıkış Yap
        </Button>
      </Box>
    </Box>
  )

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      {isMobile && (
        <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <IconButton color="inherit" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6">Admin Paneli</Typography>
          </Toolbar>
        </AppBar>
      )}
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{ '& .MuiDrawer-paper': { width: drawerWidth } }}
      >
        {drawerContent}
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 4 },
          mt: isMobile ? 8 : 0,
          ml: { xs: 0, md: `${drawerWidth}px` },
          width: { xs: '100%', md: `calc(100% - ${drawerWidth}px)` },
          overflowX: 'auto' 
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
