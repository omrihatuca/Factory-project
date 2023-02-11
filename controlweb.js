/////////////////Log-in//////////////////////////////////////////////////////////////////////////////////////////////////////////////
var today = new Date();
var date= today.getDate() ;
localStorage.setItem("date",date)
   
async function sendtopage()
{
  let resp = await fetch("https://localhost:44321/api/user");
   let fulldata = await resp.json() 
   let a= "https://localhost:44321/api/user/"+fulldata.ID
 let b= document.getElementById('user').value;
 let c= document.getElementById('pass').value;

 fulldata.forEach(async data =>
 {
  
  if (data.username==b && data.password==c) 
  {
 localStorage.setItem("full name user",data.fullname)
localStorage.setItem("username", data.username);
localStorage.setItem("session_action", data.numofaction);
localStorage.setItem("sessionID", data.ID)
sessionStorage.setItem("full name user",data.fullname)


if (data.numofaction>0&&data.dailyactions==date)
 {
let a = localStorage.getItem("session_action")-1;
localStorage.setItem("session_action", a)


  let obj = {"dailyactions" : date,
              "numofaction" : data.numofaction-1
                                                                        }

                let fetchParams = { method : 'PUT',
                          body : JSON.stringify(obj),
                         headers : {'Content-Type' : "application/json"}
   }

    let resp = await fetch("https://localhost:44321/api/user?fullname="+data.fullname, fetchParams);
     let update = await resp.json();

    
    window.location.href = "homepage.html"


}else if (data.dailyactions!=date)
{
  let obj = {"numofaction": 20,
            "dailyactions" : date,
                                    }


                let fetchParams = { method : 'PUT',
                          body : JSON.stringify(obj),
                         headers : {'Content-Type' : "application/json"}
   }

    let resp = await fetch("https://localhost:44321/api/user?fullname="+data.fullname, fetchParams);
     let update = await resp.json();
     localStorage.setItem("session_action",20)
     
    window.location.href = "homepage.html"


}else
{
  alert("sorry your daily actions is over for today, comeback tomorrow");

}

  }
  else if(data.username!==b && data.password!==c)
  {
    let error=document.getElementById("span");
      error.innerText="please try again";
  }


 });

}

/////////////////Log-in/////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////shift-page///////////////////////////////////////////////////////////////////////////////////////////////////////////
async function showinfoforshift()
    {
        document.getElementById("h3").innerText="Hello "+sessionStorage.getItem("full name user")+" "+
        "welcome to shift page"
    

        let resp = await fetch("https://localhost:44321/api/employee");
        let fulldata = await resp.json()

        let respshift = await fetch("https://localhost:44321/api/shift");
        let shiftdata = await respshift.json()

        let tab=document.getElementById("tbody")

        shiftdata.forEach(data => 
        {
            let tro=document.createElement("tr");
            let tdshiftid=document.createElement("td");
            let tdshift=document.createElement("td");
            let tdname=document.createElement("td");
            let ulo=document.createElement("ul");

            tdshiftid.innerText=data.ID;
            tdshift.innerText="date: "+data.date;
            ulo.innerText="hours: "+data.startshift+"-"+data.endshift;

            fulldata.forEach(info => 
            {
                for (let i = 0; i < info.employeeinfo.length; i++) 
                {
                   if (info.shiftid==data.ID)
                    {
                    let lio=document.createElement("li")
                    let namelink = document.createElement("a");
                    namelink.href = "editemployee.html?empid="+info.employeeid;
                    namelink.innerText=info.employeeinfo[i].firstname+" "+info.employeeinfo[i].lastname;
                        lio.appendChild(namelink)
                        tdname.appendChild(lio)
                   }
                    
                }


            });

            tdshift.appendChild(ulo);
            tro.appendChild(tdshiftid)
            tro.appendChild(tdshift);
            tro.appendChild(tdname);
            tab.appendChild(tro);

        });



     }

    function addshift()
{
    updatebyclick()
    window.location.href = "addshift.html"
    let a = localStorage.getItem("session_action");
     localStorage.setItem("session_action",a-1);
    sendout()
}



/////////////////shift-page///////////////////////////////////////////////////////////////////////////////////////////////////////


/////////////////shift information-page///////////////////////////////////////////////////////////////////////////////////////////////
async function showinfoforshiftinfo()
{
    document.getElementById("h3").innerText="Hello "+sessionStorage.getItem("full name user")+" "+
    "welcome to shift information page"

    let resp = await fetch("https://localhost:44321/api/shift");
let fulldata = await resp.json()


let tab = document.getElementById("tBody");

fulldata.forEach(data => {
let tdid=document.createElement("td");
let tddate=document.createElement("td");
let tdstart=document.createElement("td");
let tdend=document.createElement("td");

tdid.innerText=data.ID;
tddate.innerText=data.date;
tdstart.innerText=data.startshift;
tdend.innerText=data.endshift;

let tro=document.createElement("tr");
tro.appendChild(tdid);
tro.appendChild(tddate);
tro.appendChild(tdstart);
tro.appendChild(tdend);
tab.appendChild(tro)


});

}

/////////////////shift information-page//////////////////////////////////////////////////////////////////////////////////////////////

/////////////////result-page////////////////////////////////////////////////////////////////////////////////////////////////////////
async function showdataforresult()
{
    document.getElementById("h3").innerText="Hello "+sessionStorage.getItem("full name user")+" "+
    "welcome to result page"

     let result=sessionStorage.getItem("searchresult");
    
     let resp = await fetch("https://localhost:44321/api/employee");
    let fulldata = await resp.json()

    let tab=document.getElementById("tbody")


    fulldata.forEach(data => 
    {

    for (let i = 0; i < data.employeeinfo.length; i++) 
    {
       
    if (result==data.employeeinfo[i].firstname || result==data.employeeinfo[i].lastname || 
    result==data.employeeinfo[i].firstname+" "+data.employeeinfo[i].lastname || result==data.employeeinfo[i].departmentid) 
    {
        
    

        let tdempid=document.createElement("td");
        let tdfirstname=document.createElement("td");
        let tdlastname=document.createElement("td");
        let tdstartwork=document.createElement("td");
        let tddepid=document.createElement("td");
        let tddate=document.createElement("td");
        let tdshifts=document.createElement("td");
        let tdeshift=document.createElement("td");
        let tdedit=document.createElement("td");
        let tddelete=document.createElement("td");
        let tdaddshift=document.createElement("td");

     for (let i = 0; i < data.employeeinfo.length; i++)
      {
       
      if (data.employeeinfo[i].ID==data.employeeid) 
      {
        var eid=data.employeeinfo[i].ID;
        var fname=data.employeeinfo[i].firstname;
        var lname=data.employeeinfo[i].lastname;
        var startw=data.employeeinfo[i].startworkyear;
        var dep=data.employeeinfo[i].departmentid;
        break

      }
      
     }

     for (let i = 0; i < data.shiftinfo.length; i++)
      {
       if (data.shiftinfo[i].ID==data.shiftid) 
       
        {
            var sdate=data.shiftinfo[i].date;
            var shiftst=data.shiftinfo[i].startshift;
            var shiftend=data.shiftinfo[i].endshift;

            break

       }
        
     }

     
 let button=document.createElement("button");
     button.innerText="edit";

 let button2=document.createElement("button");
     button2.innerText="delete";

     let button3=document.createElement("button");
     button3.innerText="add shift";


     tdempid.innerText=eid;
     tdfirstname.innerText=fname;
     tdlastname.innerText=lname;
     tdstartwork.innerText=startw;
     tddepid.innerText=dep;
     tddate.innerText=sdate;
     tdshifts.innerText=shiftst;
     tdeshift.innerText=shiftend;

     tdedit.appendChild(button);
      tddelete.appendChild(button2);
      tdaddshift.appendChild(button3);

     let tro=document.createElement("tr");
    tro.appendChild(tdempid);
    tro.appendChild(tdfirstname);
    tro.appendChild(tdlastname);
    tro.appendChild(tdstartwork);
    tro.appendChild(tddepid);
    tro.appendChild(tddate);
    tro.appendChild(tdshifts);
    tro.appendChild(tdeshift);
    tro.appendChild(tdedit);
     tro.appendChild(tddelete);
     tro.appendChild(tdaddshift);
    tab.appendChild(tro);


  button.onclick= function update()
{
    window.location.href="editemployee.html?empid="+data.employeeid; 
    let a = localStorage.getItem("session_action");
 localStorage.setItem("session_action",a-1);
updatebyclick()
sendout()
}

button2.onclick= async function deleteemp()
{
    let id=eid;
   

    let fetchParams = { method : 'DELETE',
                  headers : {'Content-Type' : "application/json"}
                                                                     }  
                                                                     
    let resp = await fetch("https://localhost:44321/api/employee?ID="+id, fetchParams);
    let deletedata = await resp.json();    
            
    window.location.href = "employeepage.html"    
    let a = localStorage.getItem("session_action");
 localStorage.setItem("session_action",a-1);
updatebyclick()
sendout()                                                            
}


button3.onclick= function add()
{
window.location.href="addemployeeshift.html" 
let a = localStorage.getItem("session_action");
 localStorage.setItem("session_action",a-1);
updatebyclick()
sendout()

}


    }
    }
    });

    

 }

 function backtoemp()
 {
     updatebyclick()
     window.location.href="employeepage.html"
     let a = localStorage.getItem("session_action");
      localStorage.setItem("session_action",a-1);
     sendout()
 
 
 }

 /////////////////result-page///////////////////////////////////////////////////////////////////////////////////////////////////////

 /////////////////home-page///////////////////////////////////////////////////////////////////////////////////////////////////////////
 function showinfoforhome()
 {
     document.getElementById("h3").innerText="Hello "+sessionStorage.getItem("full name user")+" "+
     "welcome to Home page"
     
 }

 function senddepartmentpadge()
 {
     updatebyclick()
    window.location.href="departmentpage.html" ;
     let a = localStorage.getItem("session_action");
      localStorage.setItem("session_action",a-1);
        sendout()

 } 

 function sendemployeepage()
 {
    updatebyclick()
     window.location.href="employeepage.html" ;
      let a = localStorage.getItem("session_action");
      localStorage.setItem("session_action",a-1);
   sendout()
 }

 function sendshiftpage()
 {
    updatebyclick()
     window.location.href="shiftpage.html" ;
      let a = localStorage.getItem("session_action");
      localStorage.setItem("session_action",a-1);
  sendout()
 }

 function sendshiftinfopage()
 {
    updatebyclick()
     window.location.href="shiftinformation.html" ;
      let a = localStorage.getItem("session_action");
      localStorage.setItem("session_action",a-1);
  sendout()
 }

 /////////////////home-page///////////////////////////////////////////////////////////////////////////////////////////////////////////

 /////////////////employee-page///////////////////////////////////////////////////////////////////////////////////////////////////////////

 async function showinfoforemployee()
    {
        
        document.getElementById("h3").innerText="Hello "+sessionStorage.getItem("full name user")+" "+
        "welcome to Employee page"
    
    

        let resp = await fetch("https://localhost:44321/api/employee");
        let fulldata = await resp.json()

        let tab=document.getElementById("tbody")
    

        fulldata.forEach(data => 
        {
            let tdempid=document.createElement("td");
            let tdfirstname=document.createElement("td");
            let tdlastname=document.createElement("td");
            let tdstartwork=document.createElement("td");
            let tddepid=document.createElement("td");
            let tddate=document.createElement("td");
            let tdshifts=document.createElement("td");
            let tdeshift=document.createElement("td");
            let tdedit=document.createElement("td");
            let tddelete=document.createElement("td");
            let tdaddshift=document.createElement("td");

         for (let i = 0; i < data.employeeinfo.length; i++)
          {
           
          if (data.employeeinfo[i].ID==data.employeeid) 
          {
            var eid=data.employeeinfo[i].ID;
            var fname=data.employeeinfo[i].firstname;
            var lname=data.employeeinfo[i].lastname;
            var startw=data.employeeinfo[i].startworkyear;
            var dep=data.employeeinfo[i].departmentid;
            break

          }
          
         }

         for (let i = 0; i < data.shiftinfo.length; i++)
          {
           if (data.shiftinfo[i].ID==data.shiftid) 
           
            {
                var sdate=data.shiftinfo[i].date;
                var shiftst=data.shiftinfo[i].startshift;
                var shiftend=data.shiftinfo[i].endshift;

                break

           }
            
         }

         
     let button=document.createElement("button");
         button.innerText="edit";

     let button2=document.createElement("button");
         button2.innerText="delete";

         let button3=document.createElement("button");
         button3.innerText="add shift";


         tdempid.innerText=eid;
         tdfirstname.innerText=fname;
         tdlastname.innerText=lname;
         tdstartwork.innerText=startw;
         tddepid.innerText=dep;
         tddate.innerText=sdate;
         tdshifts.innerText=shiftst;
         tdeshift.innerText=shiftend;

         tdedit.appendChild(button);
          tddelete.appendChild(button2);
          tdaddshift.appendChild(button3);

         let tro=document.createElement("tr");
        tro.appendChild(tdempid);
        tro.appendChild(tdfirstname);
        tro.appendChild(tdlastname);
        tro.appendChild(tdstartwork);
        tro.appendChild(tddepid);
        tro.appendChild(tddate);
        tro.appendChild(tdshifts);
        tro.appendChild(tdeshift);
        tro.appendChild(tdedit);
         tro.appendChild(tddelete);
         tro.appendChild(tdaddshift);
        tab.appendChild(tro);


      button.onclick= function update()
    {
        updatebyclick()
        window.location.href="editemployee.html?empid="+data.employeeid; 
        let a = localStorage.getItem("session_action");
     localStorage.setItem("session_action",a-1);
    sendout()
    }

    button2.onclick= async function deleteemp()
    {
        let id=eid;
        

        let fetchParams = { method : 'DELETE',
                      headers : {'Content-Type' : "application/json"}
                                                                         }  
                                                                         
        let resp = await fetch("https://localhost:44321/api/employee?ID="+id, fetchParams);
        let deletedata = await resp.json();    
                
        window.location.href = "employeepage.html" 
        let a = localStorage.getItem("session_action");
     localStorage.setItem("session_action",a-1);
    updatebyclick()
    sendout()                                                               
    }


button3.onclick= function add()
{
    updatebyclick()
    window.location.href="addemployeeshift.html"
    let a = localStorage.getItem("session_action");
     localStorage.setItem("session_action",a-1);
    sendout() 
}




        });




    }

    function addemp()
{
    updatebyclick()
    window.location.href="addemployee.html" 
    let a = localStorage.getItem("session_action");
     localStorage.setItem("session_action",a-1);
    sendout()
}

function addemps()
{
    updatebyclick()
    window.location.href="addemployeeshift.html" 
    let a = localStorage.getItem("session_action");
     localStorage.setItem("session_action",a-1);
    sendout()
}

function empinfo()
{
    updatebyclick()
    window.location.href="employeeinformation.html"
    let a = localStorage.getItem("session_action");
     localStorage.setItem("session_action",a-1);
    sendout()
}

async function search()
{
    updatebyclick()
    let text = document.getElementById("text").value;

sessionStorage.setItem("searchresult",text)

window.location.href="resultpage.html"
let a = localStorage.getItem("session_action");
     localStorage.setItem("session_action",a-1);
    sendout()


}

/////////////////employee-page///////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////employee information-page///////////////////////////////////////////////////////////////////////////////////////////////////////////

async function showinfoforemployeeinfo()
{
    document.getElementById("h3").innerText="Hello "+sessionStorage.getItem("full name user")+" "+
    "welcome to employee information page"

    let resp = await fetch("https://localhost:44321/api/employeeS");
let fulldata = await resp.json()


let tab = document.getElementById("tBody");

fulldata.forEach(data => {
let tdid=document.createElement("td");
let tdfirst=document.createElement("td");
let tdlast=document.createElement("td");
let tdstart=document.createElement("td");
let tddep=document.createElement("td");

tdid.innerText=data.ID;
tdfirst.innerText=data.firstname;
tdlast.innerText=data.lastname;
tdstart.innerText=data.startworkyear;
tddep.innerText=data.departmentid;


let tro=document.createElement("tr");
tro.appendChild(tdid);
tro.appendChild(tdfirst);
tro.appendChild(tdlast);
tro.appendChild(tdstart);
tro.appendChild(tddep)
tab.appendChild(tro)


});

}
/////////////////employee information-page///////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////edit employee-page///////////////////////////////////////////////////////////////////////////////////////////////////////////
async function showdataforeditemployee()
{
  document.getElementById("h3").innerText="Hello "+sessionStorage.getItem("full name user")+" "+
    "welcome to Edit employees page"
    const params=new URLSearchParams(location.search);
    let id=params.get("empid")
  

    let resp = await fetch("https://localhost:44321/api/employee/"+id);
    let emp = await resp.json();

    let resp1 = await fetch("https://localhost:44321/api/department");
    let depart = await resp1.json();
    
       
    let sel=document.getElementById("sel");

      for (let i = 0; i < emp.employeeinfo.length; i++)
       {
       
          var eid=emp.employeeinfo[i].ID;
         var fname=emp.employeeinfo[i].firstname;
         var lname=emp.employeeinfo[i].lastname;
         var startw=emp.employeeinfo[i].startworkyear;
         var dep=emp.employeeinfo[i].departmentid;
      }
   
     
 document.getElementById("id").value=eid;
 document.getElementById("fname").value=fname;
 document.getElementById("lname").value=lname;
document.getElementById("start").value=startw;
  document.getElementById("dep").value=dep;

 for (let i = 0; i < emp.shiftinfo.length; i++)
       {
       
          var sdate=emp.shiftinfo[i].date;
         var shifts=emp.shiftinfo[i].startshift;
         var shifte=emp.shiftinfo[i].endshift;
        
      }

      document.getElementById("date").value=sdate;
 document.getElementById("startshift").value=shifts;
 document.getElementById("end").value=shifte;

     depart.forEach(data1=>
     {
        let op= document.createElement("option");
       let a= op.innerText=data1.name;
        op.value=data1.ID;
        sel.appendChild(op);
        console.log(a)
     })
    
};
   
async function updateemp()
{
    updatebyclick()
   let empid= document.getElementById("id").value;
    let obj = {"firstname" : document.getElementById("fname").value,
              "lastname" : document.getElementById("lname").value,
              "startworkyear" : document.getElementById("start").value ,
              "departmentid" : document.getElementById("sel").value};


  let fetchParams = { method : 'PUT',
                      body : JSON.stringify(obj),
                      headers : {'Content-Type' : "application/json"}
}

  let resp = await fetch("https://localhost:44321/api/employee/"+empid, fetchParams);
  let update = await resp.json();

 
 window.location.href = "employeepage.html"
 let a = localStorage.getItem("session_action");
     localStorage.setItem("session_action",a-1);
    sendout()
}
/////////////////edit employee-page///////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////edit department-page///////////////////////////////////////////////////////////////////////////////////////////////////////////
async function showdataforeditdep()
{
    document.getElementById("h3").innerText="Hello "+sessionStorage.getItem("full name user")+" "+
    "welcome to Edit department page"
    const params=new URLSearchParams(location.search);
    let id=params.get("depid")
    

    let resp = await fetch("https://localhost:44321/api/department/"+id);
    let dep = await resp.json();

document.getElementById("id").value=dep.ID;
document.getElementById("name").value=dep.name;
document.getElementById("manager").value=dep.manager;
document.getElementById("emp").value=dep.numofemployees;
}

async function updatedep()
{
updatebyclick()
let depid= document.getElementById("id").value;
let obj = {"name" : document.getElementById("name").value,
          "manager" : document.getElementById("manager").value,
          "numofemployees" : document.getElementById("emp").value };


let fetchParams = { method : 'PUT',
                  body : JSON.stringify(obj),
                  headers : {'Content-Type' : "application/json"}
}

let resp = await fetch("https://localhost:44321/api/department/"+depid, fetchParams);
let update = await resp.json();


window.location.href = "departmentpage.html"
let a = localStorage.getItem("session_action");
 localStorage.setItem("session_action",a-1);
sendout()
}
/////////////////edit department-page///////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////// department-page///////////////////////////////////////////////////////////////////////////////////////////////////////////

async function showinfofordepartment()
{
    document.getElementById("h3").innerText="Hello "+sessionStorage.getItem("full name user")+" "+
    "welcome to Department page"

    let resp = await fetch("https://localhost:44321/api/department");
let fulldata = await resp.json()


let tab = document.getElementById("tBody");

fulldata.forEach(data => {

let tdid = document.createElement("td");
tdid.innerText=data.ID;

let tdname = document.createElement("td");
tdname.innerText=data.name;

let tdmanager = document.createElement("td");


let tdnumofemp= document.createElement("td")

let tdedit= document.createElement("td");

let tddelete=document.createElement("td")
  
 let namelink = document.createElement("a");
 namelink.href = "editdepartment.html?depid="+data.ID;
 namelink.innerText=data.name;

 tdedit.appendChild(namelink);

 let button=document.createElement("button");
     button.innerText="delete";
     tddelete.appendChild(button);   

for (let i = 0; i < data.allemployeesdepartment.length; i++) 
{
if ( data.allemployeesdepartment[i].ID==data.manager)
{
    var namem=data.allemployeesdepartment[i].firstname+" "+data.allemployeesdepartment[i].lastname;
    break
}

}

tdnumofemp.innerText=data.allemployeesdepartment.length
tdmanager.innerText=namem;//inner text for tdmanager;

let tro = document.createElement("tr");

tro.appendChild(tdid);
tro.appendChild(tdname);
tro.appendChild(tdmanager);
tro.appendChild(tdnumofemp);
tro.appendChild(tdedit)
tro.appendChild(tddelete)
tab.appendChild(tro);

if (tdnumofemp.innerText>=1) 
{
    tddelete.innerText=null;
}

button.onclick = async function deletedep()
{
    updatebyclick()
   let id=data.ID
    

    let fetchParams = { method : 'DELETE',
                  headers : {'Content-Type' : "application/json"}
                                                                     }  
                                                                     
    let resp = await fetch("https://localhost:44321/api/department?ID="+id, fetchParams);
    let deletedata = await resp.json();    
           

    window.location.href = "departmentpage.html"
    let a = localStorage.getItem("session_action");
 localStorage.setItem("session_action",a-1);
sendout()
}

});

}

function adddep()
{
    updatebyclick()
    window.location.href="adddepartment.html" 
    let a = localStorage.getItem("session_action");
 localStorage.setItem("session_action",a-1);
sendout()
}
///////////////// department-page///////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////// add shift-page///////////////////////////////////////////////////////////////////////////////////////////////////////////
function showinfoforaddshift()
    {
        document.getElementById("h3").innerText="Hello "+sessionStorage.getItem("full name user")+" "+
        "welcome to Add shift page"
    }


async function addshiftaction()
{
    updatebyclick() 
  let obj = {"date" : document.getElementById("date").value,
              "startshift" : document.getElementById("shifts").value,
              "endshift" : document.getElementById("shifte").value,
                                                                         };

  let fetchParams = { method : 'POST',
                      body : JSON.stringify(obj),
                      headers : {'Content-Type' : "application/json"}
}

  let resp = await fetch("https://localhost:44321/api/shift", fetchParams);
  let add = await resp.json();


 window.location.href = "shiftinformation.html"
 let a = localStorage.getItem("session_action");
     localStorage.setItem("session_action",a-1);
    sendout()
}
///////////////// add shift-page///////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////// add employeeshift-page///////////////////////////////////////////////////////////////////////////////////////////////////////////
function showinfoforempshift()
    {
        document.getElementById("h3").innerText="Hello "+sessionStorage.getItem("full name user")+" "+
        "welcome to Scheduling page"

    }

    async function addshiftemp()
{
    updatebyclick() 
  let obj = {"employeeid" : document.getElementById("emp").value,
              "shiftid" : document.getElementById("shift").value,
                                                                    };

  let fetchParams = { method : 'POST',
                      body : JSON.stringify(obj),
                      headers : {'Content-Type' : "application/json"}
}

  let resp = await fetch("https://localhost:44321/api/empshift", fetchParams);
  let add = await resp.json();

 
 window.location.href = "employeepage.html"
 let a = localStorage.getItem("session_action");
     localStorage.setItem("session_action",a-1);
    sendout()
}
///////////////// add employeeshift-page///////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////// add employee-page///////////////////////////////////////////////////////////////////////////////////////////////////////////
function showinfoforaddemployee()
    {
        document.getElementById("h3").innerText="Hello "+sessionStorage.getItem("full name user")+" "+
        "welcome to Add employees page"


    }


async function addemployee()
{
    updatebyclick() 
  let obj = {"firstname" : document.getElementById("fname").value,
              "lastname" : document.getElementById("lname").value,
              "startworkyear" : document.getElementById("start").value,
              "departmentid" : document.getElementById("dep").value,                                                     };

  let fetchParams = { method : 'POST',
                      body : JSON.stringify(obj),
                      headers : {'Content-Type' : "application/json"}
}

  let resp = await fetch("https://localhost:44321/api/employee", fetchParams);
  let add = await resp.json();

 
 window.location.href = "employeeinformation.html"
 let a = localStorage.getItem("session_action");
     localStorage.setItem("session_action",a-1);
    sendout()
}

///////////////// add employee-page///////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////// add department-page///////////////////////////////////////////////////////////////////////////////////////////////////////////
function showinfoforadddepartment()
    {
        document.getElementById("h3").innerText="Hello "+sessionStorage.getItem("full name user")+" "+
        "welcome to Add depatment page"
    }

    async function addnewdep()
{
    updatebyclick()
  let obj = {"name" : document.getElementById("name").value,
              "manager" : document.getElementById("manager").value,
              "numofemployees" : document.getElementById("emp").value };

  let fetchParams = { method : 'POST',
                      body : JSON.stringify(obj),
                      headers : {'Content-Type' : "application/json"}
}

  let resp = await fetch("https://localhost:44321/api/department", fetchParams);
  let add = await resp.json();

 
 window.location.href = "departmentpage.html"
 let a = localStorage.getItem("session_action");
     localStorage.setItem("session_action",a-1);
    sendout()
}
///////////////// add department-page///////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////// general functions ///////////////////////////////////////////////////////////////////////////////////////////////////////////

function alertaction()
{
 let act = localStorage.getItem("session_action");
 let text = sessionStorage.getItem("full name user");
 if (act==5 || act==1)
  {
   alert("hello "+text+" you left "+act+" actions to do") 
 }
}



async function updatebyclick()
    {
        let local= localStorage.getItem("username");
  
  let fetchParams = { method : 'PUT',
                      headers : {'Content-Type' : "application/json"}
                                                                        }

  let resp = await fetch("https://localhost:44321//api/user?username="+local, fetchParams);
  let update = await resp.json();

    }


    function sendout()
{
    let CurrentActions = localStorage.getItem("session_action");
    
    if(CurrentActions == -1)
    {
       
        window.location.href="userpage.html"
    }
}

function homepage()
{
    updatebyclick()
    window.location.href="homepage.html"
    let a = localStorage.getItem("session_action");
     localStorage.setItem("session_action",a-1);
    sendout()
}

function back()
{
    updatebyclick()
    window.location.href="userpage.html"
    let a = localStorage.getItem("session_action");
     localStorage.setItem("session_action",a-1);
    sendout()
}
///////////////// general functions ///////////////////////////////////////////////////////////////////////////////////////////////////////////
