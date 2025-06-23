import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Button,
  Stack,
  Divider,
  Avatar,
} from '@mui/material';
import { Home, Calculator, Settings, ArrowRight } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function Sidebar({ activeRoute = 'Main' }) {
  const navigate = useNavigate();
  const [hoveredItem, setHoveredItem] = useState(null);

  const navItems = [
    {
      title: 'Calculators',
      icon: <Calculator />,
      items: [
        {
          href: 'Gastroenterology',
          label: 'Gastroenterology',
          icon: 'nutrition',
          category: 'Gastroenterology',
        },
        {
          href: 'ICU',
          label: 'ICU',
          icon: 'medical-bag',
          category: 'ICU',
        },
        {
          href: 'Pulmonary',
          label: 'Pulmonary',
          icon: 'lungs',
          category: 'Pulmonary',
        },
        {
          href: 'Orthopedics',
          label: 'Orthopedics',
          icon: 'bone',
          category: 'Orthopedics',
        },
      ],
    },
  ];

  const handlePress = (href) => {
    navigate(`/calculators/${href}`);
  };

  const renderNavItem = (item, isChild = false) => {
    const isActive = activeRoute === item.href;
    const isHovered = hoveredItem === item.href;

    return (
      <Button
        key={item.href}
        startIcon={<Avatar sx={{ bgcolor: isActive ? '#34d8c8' : 'rgba(255, 255, 255, 0.1)' }}>
          {item.icon}
        </Avatar>}
        onClick={() => handlePress(item.href)}
        onMouseEnter={() => setHoveredItem(item.href)}
        onMouseLeave={() => setHoveredItem(null)}
        sx={{
          justifyContent: 'flex-start',
          textTransform: 'none',
          bgcolor: isActive 
            ? 'rgba(52, 216, 200, 0.2)' 
            : isHovered 
            ? 'rgba(255, 255, 255, 0.1)' 
            : 'transparent',
          color: isActive ? '#fff' : '#f1f5f9',
          width: '100%',
          padding: 2,
          borderRadius: 2,
          '&:hover': {
            bgcolor: 'rgba(255, 255, 255, 0.1)',
          },
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="body1" sx={{ fontWeight: isActive ? '600' : '500' }}>
            {item.label}
          </Typography>
          {isActive && <ArrowRight sx={{ color: '#34d8c8' }} />}
        </Stack>
      </Button>
    );
  };

  return (
    <Box
      sx={{
        width: 280,
        bgcolor: '#004d4d',
        borderRight: '1px solid rgba(255, 255, 255, 0.1)',
        color: '#f1f5f9',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      <Stack sx={{ flexGrow: 1, padding: 2 }}>
        {/* Home Navigation */}
        {renderNavItem({
          href: 'Main',
          label: 'Home',
          icon: <Home />,
        })}

        {navItems.map((section, index) => (
          <Box key={index} sx={{ marginBottom: 3 }}>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ marginBottom: 1 }}>
              {section.icon}
              <Typography variant="body2" sx={{ textTransform: 'uppercase', letterSpacing: 0.5 }}>
                {section.title}
              </Typography>
            </Stack>
            {section.items.map((item) => renderNavItem(item, true))}
          </Box>
        ))}
      </Stack>

      {/* Footer Actions */}
      <Divider />
      <Box sx={{ padding: 2 }}>
        <Button
          startIcon={<Settings />}
          sx={{
            justifyContent: 'flex-start',
            textTransform: 'none',
            bgcolor: 'rgba(255, 255, 255, 0.1)',
            color: '#fff',
            width: '100%',
            padding: 2,
            borderRadius: 2,
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          Settings
        </Button>
      </Box>
    </Box>
  );
}