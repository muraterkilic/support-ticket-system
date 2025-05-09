import React, { useState } from 'react'
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Divider,
  Button,
  IconButton,
  AppBar,
  Toolbar,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { clearAuth } from '../store/slices/authSlice'

const drawerWidth = 240

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('userInfo'))
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [mobileOpen, setMobileOpen] = useState(false)
  const dispatch = useDispatch();


  const handleDrawerToggle = () => setMobileOpen(!mobileOpen)

  const handleNav = (path) => {
    navigate(path)
    if (isMobile) setMobileOpen(false)
  }

  const handleLogout = () => {
    dispatch(clearAuth());
    navigate('/')
  }

  const drawerContent = (
    <Box>
      <Box sx={{ padding: 2 }}>
        <Typography variant="h6">Destek Paneli</Typography>
        <Typography variant="body2" color="text.secondary">
          {user?.username}
        </Typography>
      </Box>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleNav('/dashboard')}>
            <ListItemText primary="Anasayfa" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleNav('/dashboard/requests')}>
            <ListItemText primary="Taleplerim" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleNav('/dashboard/new')}>
            <ListItemText primary="Talep Oluştur" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Button variant="outlined" color="error" fullWidth onClick={handleLogout}>
          Çıkış Yap
        </Button>
      </Box>
    </Box>
  )

  return (
    <Box sx={{ display: 'flex' }}>
      {isMobile && (
        <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <IconButton color="inherit" edge="start" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Destek Paneli
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
        <Drawer
          variant={isMobile ? 'temporary' : 'permanent'}
          open={isMobile ? mobileOpen : true}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          mt: isMobile ? 8 : 0,
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

export default DashboardLayout
