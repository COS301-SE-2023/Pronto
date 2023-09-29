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
import CheckIcon from '@mui/icons-material/Check';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import EmailIcon from '@mui/icons-material/Email';
import SMSIcons from '@mui/icons-material/Sms';
import PushIcon from '@mui/icons-material/PushPinSharp';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';

import { API, Auth } from 'aws-amplify';
import Email from '@mui/icons-material/Email';


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
  const [deleting, setIsDeleting] = useState(false);

  const [infoModalOpen, setInfoModalOpen] = useState(false);


  //use these for the status of each announcement
  const [emailStatus, setEmailStatus] = useState("");
  const [smsStatus, setSMSstatus] = useState("");
  const [pushStatus, setPushStatus] = useState("");


  const handleInfoModalOpen = () => {
    setInfoModalOpen(true);
    //setting them to defaults, remove once integrated
    setEmailStatus(90);
    setSMSstatus(70);
    setPushStatus(50);

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
    setIsDeleting(true);
    try {
      const rows = [...announcement]
      rows.splice(key, 1)
      setAnnouncement(rows)
      setIsDeleting(false);
    } catch (e) {
      setError("Something went wrong. Please try again later");
      setIsDeleting(false);
    }

    // Close the confirmation modal
    setDeleteConfirmationOpen(false);
  }


  let limit = 5;
  const fetchAnnouncements = async () => {
    try{
      
        setLoading(false);
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
    const data = [  
      {
        id: 1,
        course: "COS341",
        title: "title",
        body: "body.",
        date: "2023-09-30",
      },
      {
        id: 2,
        course: "COS341",
        title: "Semester Test 2",
        body: "Please take note that Semester test 2 is this friday at 17:30, in the colabs.",
        date: "2023-09-30",
      },
      {
        id: 3,
        course: "COS341",
        title: "No lecture today",
        body: "There will be no lecture today as I have a doctors appointment.",
        date: "2023-09-29",
      },
      {
        id: 4,
        course: "COS341",
        title: "Class test 4 results",
        body: "Class test 4 results will be release in today's lecture.",
        date: "2023-09-29",
      },
      {
        id: 5,
        course: "COS341",
        title: "Practical 4 Due",
        body: "Upload you practical 4 submission to the slot on clickup before the deadline.",
        date: "2023-10-02",
      },
      
    ];
    setAnnouncement(data);
    setLoading(false);
    //fetchAnnouncements();
  }, [])




  return (
    <div style={{ display: 'inline-flex', maxHeight: "100vh" }}>
      {error && <ErrorModal className="error" errorMessage={error} setError={setError}> {error} </ErrorModal>}
      <nav style={{ width: '20%' }} data-testid='InstitutionNavigation'>

        {/* Navigation bar content */}
        <LecturerNavigation />

      </nav>

      <main style={{ width: '900px', marginTop: '30px' }}>


        <h1 className="moduleHead" >Recent Announcements</h1>
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
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </StyledDialog>

      <Dialog
        open={infoModalOpen}
        onClose={handleInfoModalClose}
        aria-labelledby="info-dialog-title"
        aria-describedby="info-dialog-description"

        PaperProps={{ style: { height: '550px', width: '550px', borderRadius: "20px", padding: "10px" } }}
      >
        <DialogTitle id="info-dialog-title" style={{ textAlign: 'center', fontWeight: "400" }}>
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
        <DialogContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <DialogContentText id="info-dialog-description">
            <div style={{ textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center" }}>

              <EmailIcon style={{ marginRight: "5px", color: "#e32f45", marginBottom: "14px" }} />
              <p style={{ fontWeight: "500" }}>Email Notifications</p>
            </div>

            <div style={{ display: "flex" }}>
              {emailStatus >= 90 ? (
                <span style={{ color: 'green', marginRight: "5px" }}><CheckIcon /></span>
              ) : (
                <span style={{ color: 'orange', marginRight: "5px" }}><ErrorIcon /></span>
              )}
              <p>Status: <span style={{ fontWeight: "bold" }}>{emailStatus}% </span>of students registered for email received the announcement</p>
            </div>

            <br />

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <SMSIcons style={{ marginRight: "5px", color: "#e32f45", marginBottom: "14px" }} />
              <p style={{ fontWeight: "500" }}>SMS Notifications</p>
            </div>

            <div style={{ display: "flex" }}>
              {smsStatus >= 90 ? (
                <span style={{ color: 'green', marginRight: "5px" }}><CheckIcon /></span>
              ) : (
                <span style={{ color: 'orange', marginRight: "5px" }}><ErrorIcon /></span>
              )}
              <p>Status: <span style={{ fontWeight: "bold" }}>{smsStatus}%</span> of students registered for SMS received the announcement</p>
            </div>

            <br />

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <PushIcon style={{ marginRight: "5px", color: "#e32f45", marginBottom: "14px" }} />
              <p style={{ fontWeight: "500" }}>Push Notifications</p>
            </div>

            <div style={{ display: "flex" }}>
              {pushStatus >= 90 ? (
                <span style={{ color: 'green', marginRight: "5px" }}><CheckIcon /></span>
              ) : (
                <span style={{ color: 'orange', marginRight: "5px" }}><ErrorIcon /></span>
              )}
              <p>Status: <span style={{ fontWeight: "bold" }}>{pushStatus}%</span> of students registered for push notifications received the announcement</p>
            </div>

          </DialogContentText>
          <DialogActions style={{ justifyContent: 'center' }}>
            <Button onClick={handleInfoModalClose} color="primary" sx={{
              backgroundColor: '#e32f45', color: 'white', width: "200px", borderRadius: "20px", '&:hover': {
                backgroundColor: '#e32f45',
                transform: 'scale(1.1)', // Set the same background color for hover state
              },
            }}>
              <span>Okay</span>
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>


      <div>
        <HelpButton pdfUrl={UserManual} /> {/*help user manual for announcements page*/}
      </div>
    </div >
  );
}