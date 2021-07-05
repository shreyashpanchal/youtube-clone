import {React,useEffect,useState,useRef} from 'react'
import './Header.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import yt from '../Images/yt.png'
import twitter from '../Images/twitter.png'
import fb from '../Images/fb.png'
import google from '../Images/google.png'
import HomeIcon from '@material-ui/icons/Home';
import YouTubeIcon from '@material-ui/icons/YouTube';
import MovieCreationIcon from '@material-ui/icons/MovieCreation';
import HelpIcon from '@material-ui/icons/Help';
import FeedbackIcon from '@material-ui/icons/Feedback';
import ReportIcon from '@material-ui/icons/Report';
import WifiIcon from '@material-ui/icons/Wifi';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import SettingsIcon from '@material-ui/icons/Settings';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import HistoryIcon from '@material-ui/icons/History';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import ExploreIcon from '@material-ui/icons/Explore';
import AppsIcon from '@material-ui/icons/Apps';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import MicIcon from '@material-ui/icons/Mic';
import SearchIcon from '@material-ui/icons/Search';
import { Email } from '@material-ui/icons';
import firebase from "../firebase";
const API_KEY="22310446-1ec0174d78c9ac60bcce3f0e2";
const hg=window.innerHeight;

//function preventBack() {window.history.forward();}  setTimeout(preventBack(), 0);  window.onunload = function () {null};

function Header() {
    const [login,setLogin]=useState(true);
    const con=useRef();
    const [hide,setHide]=useState("none");
    const [hide1,setHide1]=useState("none");
    const [Email,setEmail]=useState("");
    const [Password,setPassword]=useState("");
    const [Email1,setEmail1]=useState("");
    const [Password1,setPassword1]=useState("");
    const [url,setUrl]=useState([]);
    const [cred,setCred]=useState();
    const [ck,setck]=useState(false);
    const [search,setSearch]=useState("");
    
    
      
    useEffect(async() => {
      
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
             setLogin(false)
             setCred(user)
            
            } else {
              setLogin(true)
             
            
             
            }
          });
         
        try{
            const g=Math.floor(Math.random()*10)+1;
            
            fetch(`https://pixabay.com/api/videos/?key=${API_KEY}&page=${g}`).then((res)=>{
                return res.json()
            }).then((data)=>{
                
                if(data.total===0)
                {
                   alert("No Videos")
                }
                else
                setUrl(data.hits)
                console.log(data.hits);
            }).catch(()=>{
                console.log("eror in fetching")
            })
        } 
        catch(err){
            console.log("Error")
        }
      
    }, [])
    const handler=async(e)=>{
        e.preventDefault();
        if(search==="")
        {
            alert("Search Meaningful")
        }
        else
        {
            try{
                fetch(`https://pixabay.com/api/videos/?key=${API_KEY}&q=${search}&per_page=100`).then((res)=>{
                    return res.json()
                }).then((data)=>{
                    console.log(data)
                    if(data.total===0)
                    {
                       alert("No Videos")
                    }
                    else
                    setUrl(data.hits)
                }).catch(()=>{
                    console.log("eror in fetching")
                })
            } 
            catch(err){
                console.log("Error")
            }
        }
    }
    return (<>
        
    {login?<>
    
<div ref={con} class="container" id="container">
	<div class="form-container sign-up-container">
		<form className="fm" onSubmit={(e)=>{
                e.preventDefault();
       if(Password.length<6)
       {
           setHide("block");
       }
       else{
           setHide("none");
                firebase.auth().createUserWithEmailAndPassword(Email,Password).then((cred1)=>{
                    console.log("success",cred1)
                    //sp(true);
                    setCred(cred1)
                }).catch(()=>{
                    console.log("error sccess")
                })
            }
            }} >
			<h1 className="ca">Create Account</h1>
			
		
			
			<input className="ic1" required type="email" placeholder="Email" value={Email} onChange={(e)=>{
                setEmail(e.target.value);
            }} />
			<input  className="ic1" required type="password" value={Password} onChange={(e)=>{
                setPassword(e.target.value);
            }}  placeholder="Password" />
            <div style={{color:"red",display:hide}}>*Password-Minimum 6 Characters Long</div>
             <div syle={{textAlign:"center"}} >Or</div>
            <div class="social-container">
            <img onClick={(e)=>{
                e.preventDefault();
                const provider=new firebase.auth.GoogleAuthProvider();
                firebase.auth()
               .signInWithPopup(provider).then((cred1)=>{
                setCred(cred1);
                   
               }).catch((err)=>{
                   console.log(err);
               })
            }} style={{objectFit:"contain",height:"60px",width:"60px"}} src={google}/>
                <img onClick={(e)=>{
                e.preventDefault();
                const provider=new firebase.auth.FacebookAuthProvider();
                firebase.auth()
               .signInWithPopup(provider).then((cred1)=>{
                setCred(cred1);
            }).catch((err)=>{
                console.log(err);
            })
            }} style={{objectFit:"contain",height:"60px",width:"60px"}} src={fb}/>
                <img onClick={(e)=>{
                e.preventDefault();
                const provider=new firebase.auth.TwitterAuthProvider();
                firebase.auth()
               .signInWithPopup(provider).then((cred1)=>{
                setCred(cred1);
            }).catch((err)=>{
                console.log(err);
            })
            }} style={{objectFit:"contain",height:"60px",width:"60px",borderRadius:"0%"}} src={twitter}/>
			</div>
			<button className="gh" id="signIn23">Sign Up</button>
		</form>
	</div>
	<div class="form-container sign-in-container">
		<form className="fm" onSubmit={(e)=>{
                e.preventDefault();
                firebase.auth().signInWithEmailAndPassword(Email1, Password1).then((cred1)=>{
                    setHide1("none")
                    setCred(cred1);
                    //sp(true);
                    console.log("done")
                }).catch((err)=>{
                    setHide1("block")
                    console.log(err)
                })
            }}>
			<h1 className="ca">Sign in</h1>
			
			<br></br>
			<input className="ic1" required type="email" value={Email1} onChange={(e)=>{
                setEmail1(e.target.value);
            }}  placeholder="Email" />
			<input className="ic1" value={Password1} onChange={(e)=>{
                setPassword1(e.target.value);
            }}  required type="password" placeholder="Password" />
            <div style={{color:"red",display:hide1}}>*Wrong Credentials</div>
			<br></br>
            <div syle={{textAlign:"center"}} >Or</div>
            <div class="social-container">
            <img onClick={(e)=>{
                e.preventDefault();
                const provider=new firebase.auth.GoogleAuthProvider();
                firebase.auth()
               .signInWithPopup(provider).then((cred1)=>{
                setCred(cred1);
            }).catch((err)=>{
                console.log(err);
            })
            }} style={{objectFit:"contain",height:"60px",width:"60px"}} src={google}/>
                <img onClick={(e)=>{
                e.preventDefault();
                const provider=new firebase.auth.FacebookAuthProvider();
                firebase.auth()
               .signInWithPopup(provider).then((cred1)=>{
                setCred(cred1);
            }).catch((err)=>{
                console.log(err);
            })
            }} style={{objectFit:"contain",height:"60px",width:"60px"}} src={fb}/>
                <img onClick={(e)=>{
                e.preventDefault();
                const provider=new firebase.auth.TwitterAuthProvider();
                firebase.auth()
               .signInWithPopup(provider).then((cred1)=>{
                setCred(cred1);
            }).catch((err)=>{
                console.log(err);
            })
            }} style={{objectFit:"contain",height:"60px",width:"60px",borderRadius:"0%"}} src={twitter}/>
			</div>
			<button className="gh" id="signIn23">Sign In</button>
		</form>
	</div>
	<div class="overlay-container">
		<div class="overlay">
			<div class="overlay-panel overlay-left">
				<h1 className="ca">Welcome Back!</h1>
				<p className="p">To keep connected with us please login with your personal info</p>
				<button class="ghost gh" onClick={()=>{
                    setEmail("");
                    setPassword("");
                    con.current.classList.remove("right-panel-active");
                }} id="signIn">Sign In</button>
			</div>
			<div class="overlay-panel overlay-right">
				<h1 className="ca">Hello, Friend!</h1>
				<p className="p">Enter your personal details and start journey with us</p>
				<button class="ghost gh"  onClick={()=>{
                      setEmail1("");
                      setPassword1("");
                    con.current.classList.add("right-panel-active");
                }} id="signUp">Sign Up</button>
			</div>
		</div>
	</div>
</div>


    </>:
    <>
   
    <div className="nav-bar">
        <div className="nav1">
            <Link to='/'>
          <img onClick={async()=>{
               try{
                console.log(cred.user.photoURL);
                const g=Math.floor(Math.random()*40);
                console.log(g);
                fetch(`https://pixabay.com/api/videos/?key=${API_KEY}&page=${g}`).then((res)=>{
                    return res.json()
                }).then((data)=>{
                    console.log(data)
                    if(data.total===0)
                    {
                       alert("No Videos")
                    }
                    else
                    setUrl(data.hits)
                }).catch(()=>{
                    console.log("eror in fetching")
                })
            } 
            catch(err){
                console.log("Error")
            }
          }} src={yt} alt="yt-logo"/></Link>
        </div>
        <div className="nav2">
            
            <input placeholder="Search" id="search" type="text" value={search} onChange={(e)=>{
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
               console.log(cred)
                firebase.auth().signOut();
            }} >Sign Out</button>
           
        </div>
    </div>
     <div  className="main">
     <div style={{height:`${hg-70}px`}} className="sidebar">
            
            <div onClick={async()=>{
                 try{
                    
                    const g=Math.floor(Math.random()*40);
                    console.log(g);
                    fetch(`https://pixabay.com/api/videos/?key=${API_KEY}&page=${g}&per_page=40`).then((res)=>{
                        return res.json()
                    }).then((data)=>{
                        console.log(data)
                        if(data.total===0)
                        {
                           alert("No Videos")
                        }
                        else
                        setUrl(data.hits)
                    }).catch(()=>{
                        console.log("eror in fetching")
                    })
                } 
                catch(err){
                    console.log("Error")
                }
            }} className="highlight">
              <HomeIcon className="col"/>
              <h4>Home</h4>
            </div>
            <div className="highlight">
                <ExploreIcon className="col"/>
                <h4>Explore</h4>
            </div>
            <div style={{borderBottom:"1px solid lightgrey"}} className="highlight">
                <SubscriptionsIcon className="col"/>
                <h4>Subscription</h4>
            </div>
           
            <div className="highlight">
                <VideoLibraryIcon className="col"/>
                <h4>Library</h4>
            </div>
            <div className="highlight">
                <HistoryIcon className="col"/>
                <h4>History</h4>
            </div>
            <div style={{borderBottom:"1px solid lightgrey"}} className="highlight">
                <WatchLaterIcon className="col"/>
                <h4>Watch Later</h4>
            </div>
           
            <div id="og" style={{borderBottom:"1px solid lightgrey",height:"253px",overflow:"scroll"}}>
                <p id="para">Subscription</p>
                <div className="highlight1">
                    <img src="https://cdn.pixabay.com/user/2020/06/22/14-49-14-114_250x250.jpg"/>
                    <div>Hel56lo</div>
                </div> <div className="highlight1">
                    <img src="https://cdn.pixabay.com/user/2020/06/22/14-49-14-114_250x250.jpg"/>
                    <div>He56llo</div>
                </div>
                <div className="highlight1">
                    <img src="https://cdn.pixabay.com/user/2020/06/22/14-49-14-114_250x250.jpg"/>
                    <div>He545llo</div>
                </div>
                <div className="highlight1">
                    <img src="https://cdn.pixabay.com/user/2020/06/22/14-49-14-114_250x250.jpg"/>
                    <div>Hell45o</div>
                </div>
                <div className="highlight1">
                    <img src="https://cdn.pixabay.com/user/2020/06/22/14-49-14-114_250x250.jpg"/>
                    <div>He32llo</div>
                </div>
                 <div className="highlight1">
                    <img src="https://cdn.pixabay.com/user/2020/06/22/14-49-14-114_250x250.jpg"/>
                    <div>Hel32lo</div>
                </div>
                <div className="highlight1">
                    <img src="https://cdn.pixabay.com/user/2020/06/22/14-49-14-114_250x250.jpg"/>
                    <div>Hel23lo</div>
                </div>
                <div className="highlight1">
                    <img src="https://cdn.pixabay.com/user/2020/06/22/14-49-14-114_250x250.jpg"/>
                    <div>Hello12</div>
                </div>
            </div>
           
            <div>
                <p id="para">More From Youtube</p>
                <div className="highlight">
                <YouTubeIcon className="col"/>
                <h4>Youtube Premium</h4>
            </div>
            <div className="highlight">
                <MovieCreationIcon className="col"/>
                <h4>Films</h4>
            </div>
            <div className="highlight">
                <EmojiObjectsIcon className="col"/>
                <h4>Learning</h4>
            </div>
            <div className="highlight">
                <WifiIcon className="col"/>
                <h4>Live</h4>
            </div>
            <div style={{borderBottom:"1px solid lightgrey"}} className="highlight">
                <SportsEsportsIcon className="col"/>
                <h4>Sports</h4>
            </div >
           
           <div className="highlight">
                <SettingsIcon className="col"/>
                <h4>Setting</h4>
            </div>
            <div className="highlight">
                <ReportIcon className="col"/>
                <h4>Report History</h4>
            </div>
            <div className="highlight">
                <HelpIcon className="col"/>
                <h4>Help</h4>
            </div>
            <div className="highlight">
                <FeedbackIcon className="col"/>
                <h4>Send Feedback</h4>
            </div>
          
            </div>

     </div>
     <div  className="main-content">
        <div className="tags">
             
                 <button onClick={async()=>{
                      try{
                        fetch(`https://pixabay.com/api/videos/?key=${API_KEY}&q=nature&per_page=100`).then((res)=>{
                            return res.json()
                        }).then((data)=>{
                            console.log(data)
                            if(data.total===0)
                            {
                               alert("No Videos")
                            }
                            else
                            setUrl(data.hits)
                        }).catch(()=>{
                            console.log("eror in fetching")
                        })
                    } 
                    catch(err){
                        console.log("Error")
                    }
                 }}>Nature</button>
                 <button onClick={async()=>{
                      try{
                        fetch(`https://pixabay.com/api/videos/?key=${API_KEY}&q=fashion&per_page=100`).then((res)=>{
                            return res.json()
                        }).then((data)=>{
                            console.log(data)
                            if(data.total===0)
                            {
                               alert("No Videos")
                            }
                            else
                            setUrl(data.hits)
                        }).catch(()=>{
                            console.log("eror in fetching")
                        })
                    } 
                    catch(err){
                        console.log("Error")
                    }
                 }}>Fashion</button>
                 <button onClick={async()=>{
                      try{
                        fetch(`https://pixabay.com/api/videos/?key=${API_KEY}&q=Science&per_page=100`).then((res)=>{
                            return res.json()
                        }).then((data)=>{
                            console.log(data)
                            if(data.total===0)
                            {
                               alert("No Videos")
                            }
                            else
                            setUrl(data.hits)
                        }).catch(()=>{
                            console.log("eror in fetching")
                        })
                    } 
                    catch(err){
                        console.log("Error")
                    }
                 }} >Science</button>
                 <button onClick={async()=>{
                      try{
                        fetch(`https://pixabay.com/api/videos/?key=${API_KEY}&q=Education&per_page=100`).then((res)=>{
                            return res.json()
                        }).then((data)=>{
                            console.log(data)
                            if(data.total===0)
                            {
                               alert("No Videos")
                            }
                            else
                            setUrl(data.hits)
                        }).catch(()=>{
                            console.log("eror in fetching")
                        })
                    } 
                    catch(err){
                        console.log("Error")
                    }
                 }} >Education</button>
                 <button onClick={async()=>{
                      try{
                        fetch(`https://pixabay.com/api/videos/?key=${API_KEY}&q=Health&per_page=100`).then((res)=>{
                            return res.json()
                        }).then((data)=>{
                            console.log(data)
                            if(data.total===0)
                            {
                               alert("No Videos")
                            }
                            else
                            setUrl(data.hits)
                        }).catch(()=>{
                            console.log("eror in fetching")
                        })
                    } 
                    catch(err){
                        console.log("Error")
                    }
                 }} >Health</button>
                 <button onClick={async()=>{
                      try{
                        fetch(`https://pixabay.com/api/videos/?key=${API_KEY}&q=Religion&per_page=100`).then((res)=>{
                            return res.json()
                        }).then((data)=>{
                            console.log(data)
                            if(data.total===0)
                            {
                               alert("No Videos")
                            }
                            else
                            setUrl(data.hits)
                        }).catch(()=>{
                            console.log("eror in fetching")
                        })
                    } 
                    catch(err){
                        console.log("Error")
                    }
                 }} >Religion</button>
                 <button onClick={async()=>{
                      try{
                        fetch(`https://pixabay.com/api/videos/?key=${API_KEY}&q=Sports&per_page=100`).then((res)=>{
                            return res.json()
                        }).then((data)=>{
                            console.log(data)
                            if(data.total===0)
                            {
                               alert("No Videos")
                            }
                            else
                            setUrl(data.hits)
                        }).catch(()=>{
                            console.log("eror in fetching")
                        })
                    } 
                    catch(err){
                        console.log("Error")
                    }
                 }} >Sports</button>
                 <button onClick={async()=>{
                      try{
                        fetch(`https://pixabay.com/api/videos/?key=${API_KEY}&q=Animals&per_page=100`).then((res)=>{
                            return res.json()
                        }).then((data)=>{
                            console.log(data)
                            if(data.total===0)
                            {
                               alert("No Videos")
                            }
                            else
                            setUrl(data.hits)
                        }).catch(()=>{
                            console.log("eror in fetching")
                        })
                    } 
                    catch(err){
                        console.log("Error")
                    }
                 }} >Animals</button>
                 <button onClick={async()=>{
                      try{
                        fetch(`https://pixabay.com/api/videos/?key=${API_KEY}&q=Computer&per_page=100`).then((res)=>{
                            return res.json()
                        }).then((data)=>{
                            console.log(data)
                            if(data.total===0)
                            {
                               alert("No Videos")
                            }
                            else
                            setUrl(data.hits)
                        }).catch(()=>{
                            console.log("eror in fetching")
                        })
                    } 
                    catch(err){
                        console.log("Error")
                    }
                 }} >Computer</button>
                 <button onClick={async()=>{
                      try{
                        fetch(`https://pixabay.com/api/videos/?key=${API_KEY}&q=Food&per_page=100`).then((res)=>{
                            return res.json()
                        }).then((data)=>{
                            console.log(data)
                            if(data.total===0)
                            {
                               alert("No Videos")
                            }
                            else
                            setUrl(data.hits)
                        }).catch(()=>{
                            console.log("eror in fetching")
                        })
                    } 
                    catch(err){
                        console.log("Error")
                    }
                 }} >Food</button>
                 <button onClick={async()=>{
                      try{
                        fetch(`https://pixabay.com/api/videos/?key=${API_KEY}&q=Music&per_page=100`).then((res)=>{
                            return res.json()
                        }).then((data)=>{
                            console.log(data)
                            if(data.total===0)
                            {
                               alert("No Videos")
                            }
                            else
                            setUrl(data.hits)
                        }).catch(()=>{
                            console.log("eror in fetching")
                        })
                    } 
                    catch(err){
                        console.log("Error")
                    }
                 }} >Music</button>
                 <button onClick={async()=>{
                      try{
                        fetch(`https://pixabay.com/api/videos/?key=${API_KEY}&q=Feelings&per_page=100`).then((res)=>{
                            return res.json()
                        }).then((data)=>{
                            console.log(data)
                            if(data.total===0)
                            {
                               alert("No Videos")
                            }
                            else
                            setUrl(data.hits)
                        }).catch(()=>{
                            console.log("eror in fetching")
                        })
                    } 
                    catch(err){
                        console.log("Error")
                    }
                 }} >Feelings</button>
                 <button onClick={async()=>{
                      try{
                        fetch(`https://pixabay.com/api/videos/?key=${API_KEY}&q=Travel&per_page=100`).then((res)=>{
                            return res.json()
                        }).then((data)=>{
                            console.log(data)
                            if(data.total===0)
                            {
                               alert("No Videos")
                            }
                            else
                            setUrl(data.hits)
                        }).catch(()=>{
                            console.log("eror in fetching")
                        })
                    } 
                    catch(err){
                        console.log("Error")
                    }
                 }} >Travel</button>
             
        </div>
        <div style={{height:`${hg-120}px`}} className="video-content">
               {url.map((data,index)=>{
                  
                  let an=`/video/${data.id}`;
                   
                   return(
                    <Link style={{textDecoration:"none"}} to={an}>
                       <div id="div" key={index}>
                         
                               <div>
                       <video width="253" onMouseOver={(e)=>{
                           e.target.currentTime=0;
                         e.target.play();
                       }}  onMouseOut={(e)=>{
                        e.target.pause();
                      }} height="142"  src={data.videos.tiny.url} ></video>
                     </div>
                     
                     <div className="videodesc">
                         <div className="photo">
                             <img id="avatar" src={data.userImageURL} alt="-"/>
                         </div>
                         <div className="details">
                             <div id="vt" >{data.tags.toUpperCase().slice(0,20)+"..."}</div>
                             <div id="vu">{data.user}</div>
                             <div id="vv">{((data.views)/1000).toFixed(2)}K views</div>
                         </div>
                     </div>
                       </div>
                       </Link>  )
                    
                  
                       

                   
               })}
        </div>
        
     </div>
 </div>
</>
    
    }
    </>)
}

export default Header
