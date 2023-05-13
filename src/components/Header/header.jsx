import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { styled } from '@mui/system';
import Logo from '../../assets/laith_fitness_website_logo_tiny_31789308-c473-4487-8fd9-cb0caf465735.png';

const HeaderButton = styled(Button)`
  color: white;
  margin-right: 12px;
`;

const mainMenuItems = [
    { label: 'Home', link: '/' },
    {
        label: 'Calculators',
        link: '#',
        subMenu: [
            { label: 'Body Mass Index Calculator', link: '/BMI' },
            { label: 'Calorie Intake Calculator', link: '/calorie' },
            { label: 'Macronutrient Calculator', link: '/macro' },
        ],
    },
    { label: 'Workout Suggestions', link: '/workout' },
    { label: 'Nutrition Analysis', link: '/diet-suggestions' },
    { label: 'Blog', link: '/blog' },
];

function Header() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleOpenSubMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseSubMenu = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="relative" sx={{ backgroundColor: '#144971' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <img src={Logo} alt="Logo" style={{ height: '48px', marginRight: '16px' }} />
                    <Box sx={{ flexGrow: 1 }}>
                        {mainMenuItems.slice(0, -1).map((item) => {
                            if (item.subMenu) {
                                return (
                                    <HeaderButton
                                        key={item.label}
                                        id={`header-button-${item.label}`}
                                        aria-controls={`sub-menu-${item.label}`}
                                        aria-haspopup="true"
                                        onClick={handleOpenSubMenu}
                                        endIcon={<ArrowDropDownIcon />}
                                    >
                                        {item.label}
                                    </HeaderButton>
                                );
                            } else {
                                return (
                                    <HeaderButton key={item.label} href={item.link}>
                                        {item.label}
                                    </HeaderButton>
                                );
                            }
                        })}
                    </Box>
                    <HeaderButton href={mainMenuItems[mainMenuItems.length - 1].link}>
                        {mainMenuItems[mainMenuItems.length - 1].label}
                    </HeaderButton>
                    {mainMenuItems
                        .filter((item) => item.subMenu)
                        .map((item) => (
                            <Menu
                                key={item.label}
                                id={`sub-menu-${item.label}`}
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl) && anchorEl.id === `header-button-${item.label}`}
                                onClose={handleCloseSubMenu}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                }}
                            >
                                {item.subMenu.map((subItem) => (
                                    <MenuItem
                                        key={subItem.label}
                                        onClick={() => {
                                            handleCloseSubMenu();
                                            window.location.href = subItem.link;
                                        }}
                                    >
                                        <Typography textAlign="center">{subItem.label}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        ))}
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Header;    
