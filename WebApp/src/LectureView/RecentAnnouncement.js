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
import { API, Auth } from 'aws-amplify'
import { listLecturers, listAnnouncements, listCourses } from '../graphql/queries';
import { deleteAnnouncement } from '../graphql/mutations';
import { ErrorModal } from '../ErrorModal';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import UserManual from "./HelpFiles/LecturerInstructions.pdf";
import HelpButton from '../HelpButton';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    minWidth: '400px',
    borderRadius: '8px',
    padding: theme.spacing(2),
    boxShadow: '2', // Remove the shadow
    backdropFilter: "blur(5px)",
  },
}));

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
  const [lecturer, setLecturer] = React.useState('')
  const [courses, setCourses] = React.useState([])
  const [announcements, setAnnouncements] = React.useState([])
  const [error, setError] = React.useState("")

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const fetchAnnouncements = async () => {
    try {
      let user = await Auth.currentAuthenticatedUser();
      if (user === undefined) {
        setError("You are not logged in! Please click on the logout button and log in to use Pronto")
      }

      else {
        let lecturer_email = user.attributes.email
        const lec = await API.graphql({
          query: listLecturers,
          variables: {
            filter: {
              email: {
                eq: lecturer_email
              }
            }
          },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        })
        await setLecturer(lec.data.listLecturers.items[0])
        if (lec.data.listLecturers.items.length > 0) {
          let course = await API.graphql({
            query: listCourses,
            variables: {
              filter: {
                lecturerId: {
                  eq: lec.data.listLecturers.items[0].id
                }
              }
            },
            authMode: "AMAZON_COGNITO_USER_POOLS",
          })
          await setCourses(course.data.listCourses.items)
          let announcementList = []
          for (let i = 0; i < course.data.listCourses.items.length; i++) {
            const announcement = await API.graphql({
              query: listAnnouncements,
              variables: {
                filter: {
                  courseId: {
                    eq: course.data.listCourses.items[i].id
                  }
                }
              },
              authMode: "AMAZON_COGNITO_USER_POOLS",
            })
            if (announcement.data.listAnnouncements.items.length > 0) {
              announcementList.push.apply(announcementList, announcement.data.listAnnouncements.items)
            }
          }
          announcementList = announcementList.sort((a, b) => {
            if (a.createdAt >= b.createdAt)
              return -1
            else
              return 1
          })
          announcementList = announcementList.filter(a=>a.type!==null)
          setAnnouncements(announcementList)
        }
      }
    } catch (error) {
      let e = error.errors[0].message
      if (e.search("Not Authorized") !== -1) {
        setError("You are not authorized to perform this action. Please log out and log in")
      }
      else if (e.search("Network") !== -1) {
        setError("Request failed due to network issues")
      }
      else {
        setError("Something went wrong. Please try again later")
      }
    }
  }


  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = React.useState(false);
  const [deleteConfirmationIndex, setDeleteConfirmationIndex] = React.useState(null);

  const handleDelete = (key) => {
    // Set the index of the announcement to be deleted and open the confirmation dialog
    setDeleteConfirmationIndex(key);
    setDeleteConfirmationOpen(true);
  }

  const handleConfirmDelete = async (key) => {
    try {
      let del = await API.graphql({
        query: deleteAnnouncement,
        variables: { input: { id: announcements[key].id } },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      })
      const rows = [...announcements]
      rows.splice(key, 1)
      setAnnouncements(rows)
    } catch (e) {
      setError("Something went wrong. Please try again later")
    }

    // Close the confirmation modal
    setDeleteConfirmationOpen(false);
  }


  React.useEffect(() => {
    // Set initial state to indicate that announcements are being fetched
    setAnnouncements([]);

    fetchAnnouncements();
  }, []);




  return (
    <div style={{ display: 'inline-flex' }}>
      {error && <ErrorModal className="error" errorMessage={error} setError={setError}> {error} </ErrorModal>}
      <nav style={{ width: '20%' }} data-testid='InstitutionNavigation'>
        {/* Navigation bar content */}
        <LecturerNavigation />
      </nav>

      <main style={{ width: '900px', marginTop: '30px' }}>

        <h1 className="moduleHead">Recent Announcements</h1>

        {announcements.length === 0 ? (
          // Display "Fetching announcements..." when announcements are being fetched
          <p style={
            {
              color: "#e32f45",
              opacity: 0.9,
              fontWeight: "50",
              fontSize: "50px",
              display: "flex",
              justifyContent: "center"
            }
          }>Fetching announcements...</p>
        ) : (
          announcements.map((val, key) => {
            return (
              <div className="card" data-testid="card1" key={key}>
                <div className="card-header">
                  <div className="subjectCode">{val.course.coursecode}</div>
                  <div className="postDate">{val.date}</div>
                </div>
                <div className="card-body">
                  <h5 className="card-title">{val.title}</h5>
                  <p className="card-text">{val.body}</p>




                  <Button
                    id="demo-customized-button"
                    aria-controls={open ? 'demo-customized-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    variant="contained"
                    disableElevation
                    onClick={(e) => handleDelete(e.target.value)}
                    value={key}
                  // endIcon={<KeyboardArrowDownIcon />}
                  >
                    {/* Options */}
                    {/* <DeleteIcon /> */}
                    Delete
                  </Button>

                  {/* <StyledMenu
                        id="demo-customized-menu"
                        MenuListProps={{
                        'aria-labelledby': 'demo-customized-button',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                      >
                        <MenuItem 
                        value={key}
                        onClick={(e)=>handleDelete(e.target.value)} disableRipple>
                          <DeleteIcon />
                            Delete
                        </MenuItem>
                      </StyledMenu> */}
                </div>
              </div>
            );
          })
        )}

      </main >
      <StyledDialog
        open={deleteConfirmationOpen}
        onClose={() => setDeleteConfirmationOpen(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this announcement?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmationOpen(false)} color="primary">
            Cancel
          </Button>
          <Button value={deleteConfirmationIndex} onClick={(e) => handleConfirmDelete(e.target.value)} variant="contained" color="error" sx={{ ml: 2 }}>
            Delete
          </Button>
        </DialogActions>
      </StyledDialog>

      <div>
        <HelpButton pdfUrl={UserManual} />
      </div>
    </div >
  );
}