import React,{useState,useEffect} from "react";
import "./Post.css"


const Post=(()=>{

    const[post,setpost]=useState([])
    const[c,setc]=useState(1);
const Api=async()=>{
    if(c==1){
    const res=await fetch("https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc")
    const data=await res.json();
    

    setpost(data.items)
    }else{
        const temp="https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc&page="+c;
        const res=await fetch(temp)
        const data=await res.json();
    
        setpost(data.items)
    }
}
useEffect(()=>{
    Api()
},[c])

const prev=(()=>{
    if(c>0){
    setc(c-1)
    }
})


const next=(()=>{
    setc(c+1);
})
console.log(c)
console.log(post)
    return(
        <>
        <h1>Most Starred Repos</h1>
        {
            post.map((e,i)=>{
                return (
                <div key={i}  >
               <div  className="Repo" >
               <div className="box"  >
               <div className="child"><img src={e.owner.avatar_url} alt="img"  width={"200px"}  /></div>
               <div className="child"   >{e.name}</div>
               <div  className="child"  >{e.description}</div>
               <div className="child">{e.stargazers_count}</div>
                <div className="child">{e.open_issues_count}</div>
                <div className="child">Last pushed:{e.pushed_at}by{e.owner.login}   </div>
                
                
                </div>
                


               </div>
               </div>
                
                )
            })
        }
       
   <div><button onClick={prev} >previous</button><button  onClick={next}>Next</button></div>
        </>
        
    )
})

export default Post;