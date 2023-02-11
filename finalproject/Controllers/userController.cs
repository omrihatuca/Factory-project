using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using finalproject.Models;
using System.Web.Http.Cors;
using System.Web.ModelBinding;

namespace finalproject.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class userController : ApiController
    {
        private userBL ubl=new userBL();
        // GET: api/user
        public IEnumerable<usertab> Get()
        {
            return ubl.getall();
        }
        
        // GET: api/user/5
        public usertab Get(int id)
        {
            return ubl.getallbyid(id);
        }

        public usertab Get(string username)
        {
            return ubl.getallbyuser(username);
        }

        // POST: api/user
        public string Post(usertab u)
        {
            ubl.adduser(u);
            return "created new user " + u.ID;
        }

        // PUT: api/user/5
        public string Put(int id, usertab u)
        {
            ubl.updateuser(id, u);
            return "updated user "+ id;
        }

        public string Put(string username)
        {
            ubl.UpdateActionCounter(username);
            return "updated action " + username;
            
        }

        public string Put(string fullname, usertab u)
        {
            ubl.Updatedateandactions(fullname, u);
            return "updated date and actions for " + fullname;

        }

        public string Put()
        {
            ubl.updateusers();
            return "daily actions = 15 ";

        }



        // DELETE: api/user/5
        public string Delete(int id)
        {
            ubl.deleteuser(id);
            return "deleted user " + id;
        }
    }
}
