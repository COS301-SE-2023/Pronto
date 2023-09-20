import { useEffect, useState } from 'react';
import { listLecturers, announcementsByDate } from '../../Graphql/queries';
import { deleteAnnouncement } from '../../Graphql/mutations';
import { ErrorModal } from '../../Components/ErrorModal';
import LecturerNavigation from "../Navigation/LecturerNavigation";
import UserManual from "../HelpFiles/Announcements.pdf";
import HelpButton from '../../Components/HelpButton';
import { useAnnouncement } from '../../ContextProviders/AnnouncementContext';
import { useLecturer } from '../../ContextProviders/LecturerContext';
import recentAnnouncementImage from "../Images/recentAnnouncementImage.png"
import "../Dashboard/LectureHome.css";
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';

import { API, Auth } from 'aws-amplify';


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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const { lecturer, setLecturer } = useLecturer();
  const { announcement, setAnnouncement, nextToken, setNextToken } = useAnnouncement();



  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [deleteConfirmationIndex, setDeleteConfirmationIndex] = useState(null);

  const [infoModalOpen, setInfoModalOpen] = useState(false);


  const handleInfoModalOpen = () => {
    setInfoModalOpen(true);
  };

  const handleInfoModalClose = () => {
    setInfoModalOpen(false);
  };


  const handleDelete = (key) => {
    // Set the index of the announcement to be deleted and open the confirmation dialog
    setDeleteConfirmationIndex(key);
    setDeleteConfirmationOpen(true);
  }

  const handleConfirmDelete = async (key) => {
    try {
      let del = await API.graphql({
        query: deleteAnnouncement,
        variables: { input: { id: announcement[key].id } },
      })
      const rows = [...announcement]
      rows.splice(key, 1)
      setAnnouncement(rows)
    } catch (e) {
      setError("Something went wrong. Please try again later")
    }

    // Close the confirmation modal
    setDeleteConfirmationOpen(false);
  }


  let limit = 5;
  const fetchAnnouncements = async () => {
    try {
      let lec = lecturer;
      //Lecturers information was not passed successfuly so fecth it again
      if (lecturer === null || lecturer === undefined || lecturer.courses === undefined) {
        let user = await Auth.currentAuthenticatedUser();
        let lecturer_email = user.attributes.email
        lec = await API.graphql({
          query: listLecturers,
          variables: {
            filter: {
              email: {
                eq: lecturer_email
              }
            }
          },
        });
        lec = lec.data.listLecturers.items[0];
        await setLecturer(lec);
      }

      if (lec.courses.items.length > 0) {
        if (announcement.length === 0) {
          setLoading(true);
          //Build a filter based on courses
          let courses = lec.courses.items;
          let year = new Date().getFullYear();
          let filter = `{"filter" : { "or" : [`;
          for (let i = 0; i < courses.length; i++) {
            if (i === courses.length - 1) {
              filter += `{"courseId":{"eq":"${courses[i].id}" } }`;
            }
            else {
              filter += `{"courseId":{"eq":"${courses[i].id}" } },`;
            }
          }
          filter += `] },"limit":"${limit}" ,"year":"${year}","sortDirection":"DESC"}`;
          let variables = JSON.parse(filter);

          //Fecth annnouncements and order them by date
          let announcementList = await API.graphql({
            query: announcementsByDate,
            variables: variables,
          });
          announcementList = announcementList.data.announcementsByDate;
          setAnnouncement(announcementList.items);
          if (announcementList.items.length < limit) {
            setNextToken(null);
          }
          else {
            setNextToken(announcementList.nextToken);
          }
        }
        setLoading(false);
      }
    } catch (error) {
      if (error.errors !== undefined) {
        let e = error.errors[0].message
        if (e.search("Network") !== -1) {
          setError("Request failed due to network issues");
        }
        else {
          setError("Something went wrong.Please try again later");
        }
      }
      else {
        setError("Your request could not be processed at this time");
      }
    }
  }


  const loadMore = async () => { //load more announcements
    try {
      let courses = lecturer.courses.items;
      let year = new Date().getFullYear();
      let filter = `{"filter" : { "or" : [`;
      for (let i = 0; i < courses.length; i++) {
        if (i === courses.length - 1) {
          filter += `{"courseId":{"eq":"${courses[i].id}" } }`;
        }
        else {
          filter += `{"courseId":{"eq":"${courses[i].id}" } },`;
        }
      }
      filter += `] },"limit":"${limit}" ,"year":"${year}","sortDirection":"DESC","nextToken":"${nextToken}"}`;
      let variables = JSON.parse(filter);
      let announcementList = await API.graphql({
        query: announcementsByDate,
        variables: variables,
      });

      let list = announcementList.data.announcementsByDate.items;
      for (let i = 0; i < list.length; i++) {
        announcement.push(list[i]);
      }
      if (announcementList.data.announcementsByDate.items.length < limit) {
        setNextToken(null);
      }
      else {
        setNextToken(announcementList.data.announcementsByDate.nextToken);
      }
      setAnnouncement(announcement);
    } catch (error) {
      setError("Your request could not be processed at this time");
    }
  }

  useEffect(() => {
    fetchAnnouncements();
  }, [])


  return (
    <div style={{ display: 'inline-flex', maxHeight: "100vh" }}>
      {error && <ErrorModal className="error" errorMessage={error} setError={setError}> {error} </ErrorModal>}
      <nav style={{ width: '20%' }} data-testid='InstitutionNavigation'>

        {/* Navigation bar content */}
        <LecturerNavigation />

      </nav>

      <main style={{ width: '900px', marginTop: '30px' }}>


        <h1 className="moduleHead" style={{ textShadow: "2px 2px 4px rgba(0, 0.3, 0.2, 0.3)" }}>Recent Announcements</h1>
        <div style={{ textAlign: 'center' }}>
          <p>This page allows you view the announcents you've made to students on the mobile app. You can delete or sort these announcements.</p>
          <img src={recentAnnouncementImage} alt="ModulesImage" style={{ maxWidth: '100%', maxHeight: '200px' }} />
        </div>

        {loading === true ? (

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
          announcement.length === 0 ? (
            <p style={
              {
                color: "#e32f45",
                opacity: 0.9,
                fontWeight: "50",
                fontSize: "50px",
                display: "flex",
                justifyContent: "center"
              }
            }>No Annoucements Posted</p>

          )

            :
            (announcement.map((val, key) => {
              return (
                <div className="card" data-testid="card1" key={key}>
                  <div className="card-header">
                    <div className="subjectCode">{val.course.coursecode}</div>
                    <div className="postDate">{val.date}</div>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{val.title}</h5>
                    <p className="card-text">{val.body}</p>

                    <div style={{ display: 'flex', alignItems: 'center', float: "right", cursor: "pointer" }}>
                      <InfoIcon
                        style={{ marginRight: '8px', color: "#2da2e1", cursor: "pointer" }}
                        onClick={handleInfoModalOpen}
                      />

                      <DeleteIcon
                        style={{ marginRight: '8px', color: "#e32f45", cursor: "pointer" }}
                        onClick={() => handleDelete(key)} // delete an announcement
                      />
                    </div>

                  </div>
                </div>

              );
            }))
        )}

        <div>
          <div style={{ paddingLeft: "42.5%", paddingRight: "42.5%" }}>
            {nextToken && <button className="btn btn-danger w-100" type="button" onClick={loadMore}> Load More </button>}
          </div>
        </div>
        <br />

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

      <Dialog
        open={infoModalOpen}
        onClose={handleInfoModalClose}
        aria-labelledby="info-dialog-title"
        aria-describedby="info-dialog-description"
        fullWidth
        maxWidth="md"
        PaperProps={{ style: { minHeight: '400px', maxHeight: '80vh' } }}
      >
        <DialogTitle id="info-dialog-title" style={{ textAlign: 'center' }}>
          Notification Delivery Status
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleInfoModalClose}
            aria-label="close"
            style={{ position: 'absolute', right: '30px', top: '10px', color: "#e32f45" }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="info-dialog-description">
            <h2>Email Notifications</h2>
            {/* Add content about email notifications here */}
            <p>Status: Delivered</p>
            <p>Date: September 20, 2023</p>

            <h2>SMS Notifications</h2>
            {/* Add content about SMS notifications here */}
            <p>Status: Not Delivered</p>
            <p>Date: September 19, 2023</p>

            <h2>Push Notifications</h2>
            {/* Add content about push notifications here */}
            <p>Status: Pending</p>
            <p>Date: September 18, 2023</p>
          </DialogContentText>
        </DialogContent>
      </Dialog>


      <div>
        <HelpButton pdfUrl={UserManual} /> {/*help user manual for announcements page*/}
      </div>
    </div >
  );
}