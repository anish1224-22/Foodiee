import React,{useState} from 'react'
import { Link } from 'react-router-dom';
export default function SignUp() {
    const [credentials,setcredentials]=useState({name:"",email:"",password:"",geolocation:""})
    const handleSubmit = async(e)=>{ 
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/CreateUser",{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({name:credentials.name, email:credentials.email, password:credentials.password, location:credentials.geolocation})});
        const json = await response.json();
        console.log(json);
        window.location.href = "/";
        if(!json.success)
        {
            alert("ENTER VALID CREDENTIALS");
        }
    }
  const onChange=(event)=>{
    setcredentials({...credentials,[event.target.name]:event.target.value})
  }
  return (
    <>
    <div className="bg-success">
    <div className='container bg-success'>
    <form onSubmit={handleSubmit}>
  <div className="mb-8">
    <label htmlFor="name" style={{color:"white"}}>Name</label>
    <input type="text" className="form-control" id ="name" name ="name" style={{width:"40%"}} value={credentials.name} onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" style={{color:"white"}}>Email address</label>
    <input type="email" className="form-control" id= "email" name="email" style={{width:"40%"}} value={credentials.email} onChange={onChange}/>
    <small id="emailHelp" className="form-text text-black">(Must be a valid and previously unused email id)We'll never share your email with anyone else.</small>
  </div>
  <div className="mb-3">
    <label htmlFor="location" style={{color:"white"}}>Location</label>
    <input type="text" className="form-control" id ="geolocation" name="geolocation" style={{width:"40%"}} value={credentials.geolocation} onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" style={{color:"white"}}>Password</label>
    <input type="password" className="form-control" id="password" name="password" style={{width:"40%"}} value={credentials.password} onChange={onChange}/>
    <small id="PasswordHelp" className="form-text text-black">(Minimum Length must be 5)</small>
  </div>
  <button type="submit" className="btn btn-primary m-3 bg-cyan">Submit</button>
  <Link to="/login" className="btn btn-primary m-3 bg-danger">Already a user</Link>
</form>
</div>
</div>
</>
  )
}
