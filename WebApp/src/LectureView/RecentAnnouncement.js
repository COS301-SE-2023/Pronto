import {useEffect,useState} from 'react';
import {useLocation} from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import LecturerNavigation from "./LecturerNavigation";
import "./LectureHome.css";
import {API,Auth} from 'aws-amplify';
import { listLecturers,listAnnouncements,announcementsByDate, listCourses } from '../graphql/queries';
import { deleteAnnouncement } from '../graphql/mutations';
import { ErrorModal } from '../ErrorModal';

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
  
  const [anchorEl, setAnchorEl] = useState(null);
  const state=useLocation();
  const [lecturer,setLecturer]=useState(state.state);
  const[courses,setCourses]=useState([]);
  const[announcements,setAnnouncements]=useState([]);
  const[error,setError]=useState("");
  const[nextToken,setNextToken]=useState("");

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  let limit=2;
  const fetchAnnouncements = async()=>{ 
      try{
        let lec=lecturer;
        if(lecturer===null || lecturer===undefined || lecturer.courses===undefined){
          let user=await Auth.currentAuthenticatedUser();
          let lecturer_email=user.attributes.email
           lec=await API.graphql({ 
                    query:listLecturers,
                    variables:{ 
                       filter: { 
                          email: { 
                           eq : lecturer_email
                       }
                    }
                  },
                authMode:"AMAZON_COGNITO_USER_POOLS",
              });
          lec=lec.data.listLecturers.items[0];  
          await setLecturer(lec);
        }

        let courses=lec.courses.items;
        let year=new Date().getFullYear();
        let filter=`{"filter" : { "or" : [`;
        for(let i=0;i<courses.length;i++){
          if(i===courses.length-1){
            filter+=`{"courseId":{"eq":"${courses[i].id}" } }`;
          }
          else{
          filter+=`{"courseId":{"eq":"${courses[i].id}" } },`;
          }
        }
        filter+=`] },"limit":"${limit}" ,"year":"${year}","sortDirection":"DESC"}`;
        let variables=JSON.parse(filter);

        let announcementList=await API.graphql({
            query:announcementsByDate,
            variables:variables, 
            authMode:"AMAZON_COGNITO_USER_POOLS"
          });
         console.log(announcementList);
         setAnnouncements(announcementList.data.announcementsByDate.items);         
         setNextToken(announcementList.data.announcementsByDate.nextToken);
      }catch(error){
          console.log(error);
          if(error.errors!==undefined){
          let e=error.errors[0].message
          if(e.search("Not Authorized")!==-1){ 
            setError("You are not authorized to perform this action.Please log out and log in")
          }
          else if(e.search("Network")!==-1){
            setError("Request failed due to network issues")
          }
          else{ 
            setError("Something went wrong.Please try again later")
          }
      }
    }
  }
  
  const handleDelete = async(key)=>{
    try{
        let del= await API.graphql({
          query:deleteAnnouncement,
          variables:{input:{id:announcements[key].id}},
          authMode:"AMAZON_COGNITO_USER_POOLS",
        })
        const rows=[...announcements]
        rows.splice(key,1)
        setAnnouncements(rows)
    }catch(e){
      setError("Something went wrong.Please try again later")
    }  

        //setAnchorEl(null)
  }

  const loadMore = async()=>{
    try{
      //console.log("More");
      let courses=lecturer.courses.items;
        let year=new Date().getFullYear();
        let filter=`{"filter" : { "or" : [`;
        for(let i=0;i<courses.length;i++){
          if(i===courses.length-1){
            filter+=`{"courseId":{"eq":"${courses[i].id}" } }`;
          }
          else{
          filter+=`{"courseId":{"eq":"${courses[i].id}" } },`;
          }
        }
        filter+=`] },"limit":"${limit}" ,"year":"${year}","sortDirection":"DESC","nextToken":"${nextToken}"}`;
        let variables=JSON.parse(filter);
        let announcementList=await API.graphql({
            query:announcementsByDate,
            variables:variables, 
            authMode:"AMAZON_COGNITO_USER_POOLS"
          });
          //console.log(announcementList);
        let list=announcementList.data.announcementsByDate.items;
        for(let i=0;i<list.length;i++){
          announcements.push(list[i]);
        }
        //announcements.push.apply(announcementList.data.announcementsByDate.items);  
        setNextToken(announcementList.data.announcementsByDate.nextToken);
        setAnnouncements(announcements);
    }catch(error){
      console.log(error);
    }
  }

  useEffect(()=>  { 
      fetchAnnouncements(); 
    } , [])

  return (
    <div style={{ display: 'inline-flex' }}>
       {error && <ErrorModal className="error" errorMessage={error} setError={setError}> {error} </ErrorModal>}
      <nav style={{ width: '20%' }} data-testid='InstitutionNavigation'>
          {/* Navigation bar content */}
          <LecturerNavigation />
      </nav>
       
        <main style={{ width: '900px',marginTop: '30px' }}>

            <h1 className="moduleHead">Recent Announcements</h1>
                { announcements.map((val,key)=>{ 
                  return(
                    <div className="card" data-testid="card1" key={key}>
                      <div className="card-header">
                        <div className = "subjectCode">{val.course.coursecode}</div>
                        <div className = "postDate">{val.date}</div>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{val.title}</h5>
                      <p className="card-text">{val.body}</p>

                      <Button 
                        id="demo-customized-button"
                        ///aria-controls={open ? 'demo-customized-menu' : undefined}
                        aria-haspopup="true"
                        //aria-expanded={open ? 'true' : undefined}
                        variant="contained"
                        disableElevation
                        onClick={(e)=>handleDelete(e.target.value)}
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
               )
            })}
            <div>
              <div style={{paddingLeft:"42.5%",paddingRight:"42.5%"}}>
              {nextToken && <button className="btn btn-danger w-100" type="button" onClick={loadMore}> Load More </button>}
              </div>
            </div> 

          </main>
      </div>
  );
}