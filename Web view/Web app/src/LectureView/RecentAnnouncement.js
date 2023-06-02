import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LecturerNavigation from "./LecturerNavigation";
import DeleteIcon from '@mui/icons-material/Delete';
import "./LectureHome.css";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

export default function RecentAnnouncement() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{ display: 'inline-flex' }}>
      <nav style={{ width: '20%' }}>
          {/* Navigation bar content */}
          <LecturerNavigation />
      </nav>
    
        <main style={{ width: '900px',marginTop: '30px' }}>
            <h1 className="moduleHead">Recent Announcements</h1>

            <div className="announcement">
                <div className="Title">
                    Date of final exam
                </div>

                <div className = "Description">
                    Please note that the exam date is the 15th of June at 09.30. The exam will be 3 hours.
                </div>

                <div className="subject">COS341</div>

                <Button 
                id="demo-customized-button"
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="contained"
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
                >
                Options
                </Button>

                <StyledMenu
                    id="demo-customized-menu"
                    MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    >
                    <MenuItem onClick={handleClose} disableRipple>
                    <EditIcon />
                    Edit
                    </MenuItem>
                    <MenuItem onClick={handleClose} disableRipple>
                    <DeleteIcon />
                    Delete
                    </MenuItem>
                </StyledMenu>
                
            </div>

            <div className="announcement">
                <div className="Title">
                    No class from Thursday 1 June
                </div>

                <div className = "Description">
                    Please note that due to the completeion of the sylabus in this mornings lecture,
                    there will be no class tomorrow or from here forth:) 
                </div>

                <div className="subject">COS132</div>

                <Button 
                id="demo-customized-button"
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="contained"
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
                >
                Options
                </Button>

                <StyledMenu
                    id="demo-customized-menu"
                    MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    >
                    <MenuItem onClick={handleClose} disableRipple>
                    <EditIcon />
                    Edit
                    </MenuItem>
                    <MenuItem onClick={handleClose} disableRipple>
                    <DeleteIcon />
                    Delete
                    </MenuItem>
                </StyledMenu>
                
            </div>
        </main>

    </div>
  );
}