//</script><script type = "text/babel">
class User extends React.Component{
    state:{
        
    }
    render(){
        return(
           <div>
           </div> 
        )
    }
}

const Loader =()=>{
    return (
        <div>
        </div>
    )
}
const UserCard =({name,img,link})=>{    
 return(
   <div className="user">
     <img src ={img} alt="loading..."/>
     <br/><hr/>       
     <p>{name}</p>
     <a href={link}><button>Follow</button></a>
   </div>
    )    
}
const Users =(props)=>{    
 return(
      <div className="UserCon">
       {props.users.map((user,k)=>           
            <UserCard
             key={k}
             name={user.login}
             img={user.avatar_url}
             link={user.html_url}
            />            
        )}            
      </div>
   )    
}
class SearchBar extends React.Component{
   state={
        text:"",
   }
       setTxtValue=(e)=>this.setState({text:e.target.value});   
   searchUsers = () =>{
       if(this.state.text){
                              this.props.searchUser(this.state.text);
     this.setState({text:""})
       }
       else{
           alert("Enter Required Data..")
       }
   }
   render(){
      return(
          <div className="searchCon">
            <input type="text" value={this.state.text} placeholder="Search User..." onChange={this.setTxtValue}/>
            <button onClick={this.searchUsers}>Search</button>            
          </div>
       )
   }
}
const Navbar =(props)=>{    
    return(
     <div className="header">
           <p> Github Profile Finder </p>
           <button onClick={props.clrUsers}>Clear</button>
     </div>
    )
}
class App extends React.Component{
   state={
       users : [],
   }
   componentDidMount(){ 
                                                                                  fetch("https://cors-anywhere.herokuapp.com/https://api.github.com/users")
.then(res=>{
    return res.json();
    }).then(k=>{
    this.setState({users:k})
    })    
   }
   searchUser=(e)=>{      
           fetch(`https://cors-anywhere.herokuapp.com/https://api.github.com/search/users?q=${e}`)
.then(res=>{
    return res.json();
    }).then(k=>{
   // console.log(JSON.stringify(k))
    this.setState({users:k.items})
    })      
   }
   clrUsers=(e)=>this.setState({users:[]});
   render(){
        return (
            <div>
            <Navbar
            clrUsers={this.clrUsers}
             />        
            <SearchBar 
            searchUser={this.searchUser}
            />
            <Users
             users={this.state.users}
            />
            </div>
        )
    }
}
ReactDOM.render(
    <App />,
    document.getElementById("root")
)
//</script>
