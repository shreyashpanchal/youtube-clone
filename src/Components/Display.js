import React,{useState,useEffect} from 'react'
import yt from '../Images/yt.png'
import AppsIcon from '@material-ui/icons/Apps';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import MicIcon from '@material-ui/icons/Mic';
import SearchIcon from '@material-ui/icons/Search';
import ShareIcon from '@material-ui/icons/Share';
import SaveIcon from '@material-ui/icons/Save';
import firebase from '../firebase'
import './Header.css'
import Header from './Header'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,useParams
  } from "react-router-dom";

  const API_KEY="22310446-1ec0174d78c9ac60bcce3f0e2";
  //function preventBack() {window.history.forward();}  setTimeout(preventBack(), 0);  window.onunload = function () {null};
function Display() {
    const id=useParams();
    const [url,setUrl]=useState("");
    const [turl,setTurl]=useState([]);
    const [color,sco]=useState("red");
    const [sw,sesw]=useState();
 const [search,setSearch]=useState("");
 const [swich,setSwich]=useState(false)
    const [url123,set123]=useState("");
    const [tags,setTags]=useState("");
    const [ui,sui]=useState("");
    const [user,su]=useState("");
           const [view,setView]=useState("");
        const [color23,setColor]=useState("rgb(59, 59, 59)");
        const [color24,setColor2]=useState("rgb(59, 59, 59)");
    const handler=async(e)=>{
       
        e.preventDefault();
        if(search==="")
        {
            setSwich(false);
            alert("Search Meaningful")
        }
        else
        {
           
            try{
                fetch(`https://pixabay.com/api/videos/?key=${API_KEY}&q=${search}&per_page=200`).then((res)=>{
                    return res.json()
                }).then((data)=>{
                    console.log(data)
                    if(data.total===0)
                    {
                       alert("No Videos")
                       setSwich(false);
                    }
                    else{
                    setUrl(data.hits[0].videos.large.url)
                    setTurl(data.hits);
                    setSwich(true);
                    }

                }).catch(()=>{
                    console.log("eror in fetching")
                    setSwich(false);
                })
            } 
            catch(err){
                console.log("Error")
                setSwich(false);
            }
        }
    }
    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
           sesw(true)
            
            } else {
             
             sesw(false);
            
             
            }
          });
        fetch(`https://pixabay.com/api/videos/?key=${API_KEY}&id=${id.vid}`).then((res)=>{
       return res.json();
   }).then((data)=>{
      
       set123(data.hits[0].videos.large.url)
       setTags(data.hits[0].tags)
       su(data.hits[0].user)
       sui(data.hits[0].userImageURL)
       setView(data.hits[0].views)
   })
       
    }, [id.vid])
    useEffect(() => {
        
        const g=Math.floor(Math.random()*10)+1;
        fetch(`https://pixabay.com/api/videos/?key=${API_KEY}&page=${g}&per_page=30`).then((res)=>{
       return res.json();
   }).then((data)=>{
      
       setTurl(data.hits);
   }).catch((err)=>{
       console.log(err);
   })
       
    }, [id.vid])
    return (

        
        <>
        {sw? <><div className="nav-bar">
            <div className="nav1">
                <Link to='/'>
              <img src={yt} alt="yt-logo"/></Link>
            </div>
            <div className="nav2">
                
                <input id="search" type="text"  value={search} onChange={(e)=>{
                    setSearch(e.target.value)
                }} />
                  
                    <SearchIcon onClick={handler} id="sicon"/>
                   
                   
                <MicIcon id="mic"/> 
            </div>
            <div className="nav3">
                <VideoCallIcon id="videoicon"/>
                <AppsIcon id="appicon"/>
                <NotificationsIcon id="notiicon"/>
                <AccountCircleIcon   id="accicon"/>
          <button onClick={()=>{
              console.log(sw);
              sesw(false)
              firebase.auth().signOut();
          }}  >Sign Out</button>
            </div>
        </div>

        <div className="single">
            <div className="videosection">
                {swich===true?<>
                    <video src={url}  height="409px" width="727px" controls/>
                </>:<>
                <video src={url123} height="409px" width="727px" controls/>
                </>}
           <h2 style={{fontFamily:"times new roman"}}>{tags.toUpperCase()}</h2><br></br>
           <div class="bar">
               <div style={{color:"rgb(89, 82, 81)",fontWeight:"600",fontSize:"1rem"}}>{view} views</div>
              <div className="thike">
               <div  className="like">
                   <ThumbUpIcon onClick={()=>{
                       setColor((prev)=>{
                           if(prev==="rgb(59, 59, 59)")
                           {
                               return "rgb(26, 52, 199)"
                           }
                           else{
                               return "rgb(59, 59, 59)"
                           }
                       })
                   }} style={{fontSize:"2.2rem",color:color23}} className="like1"/>
                   
               </div>
               <div  className="like" >
                   <ThumbDownIcon 
                   onClick={()=>{
                    setColor2((prev)=>{
                        if(prev==="rgb(59, 59, 59)" )
                        {
                            return "red"
                        }
                        else{
                            return "rgb(59, 59, 59)"
                        }
                    })
                }}
                   
                   style={{fontSize:"2.2rem",color:color24}} className="like1"/>
                   
               </div>
               <div className="like" >
                   <ShareIcon style={{fontSize:"2rem"}} className="like1"/>
                   <div>SHARE</div>
               </div>
               <div className="like" >
                   <SaveIcon style={{fontSize:"2rem"}} className="like1"/>
                   <div>SAVE</div>
               </div>
               </div>
           </div>
           <hr></hr>
           <div className="subs">
               <div className="uid">
                   <img src={ui}/>
                   <div>{user.toUpperCase()}</div>
               </div>
               <div id="space"><button style={{background:color}} onClick={()=>{
                   if(color==="red")
                   {
                       sco("grey");
                   }
                   else{
                       sco("red");
                   }
               }} id="bny">SUBSCRIBE</button></div>
           </div>
           <hr></hr>
            </div>
            <div className="nextvideos">
                {turl.map((data,index1)=>{
                 let an=`/video/${data.id}`;
                    return(
                        
                        <Link style={{textDecoration:"none"}} to={an}>
                        <div key={index1} className="card">
                        <div className='thumbnail'>
                        <video src={data.videos.large.url}  height="94px" width="168px" />
                        </div>
                        <div className="thumbnaicontent">
                                <h4 id="th4">{data.tags.toUpperCase()
                                }</h4>
                                <h5 id="th5">{data.user}</h5>
                                <h6 id="th6">{((data.views)/1000).toFixed(2)}K views</h6>
                        </div>
                    </div>
                    </Link>)
                })}
               
            </div>
            
           
            </div></>:<Header/>}
           
        </>
       )
}

export default Display
