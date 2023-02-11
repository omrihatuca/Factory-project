using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using finalproject.Models;
using System.Web.Http.Cors;

namespace finalproject.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class employeeController : ApiController
    {
        private employeeBL esbl=new employeeBL();   
        // GET: api/employee
        public IEnumerable<empwithshift> Get()
        {
            return esbl.getallempdata();
        }

        // GET: api/employee/5
        public empwithshift Get(int id)
        {
            return esbl.getempdatabyid(id);
        }

        public empwithshift Get(string name)
        {
            return esbl.getempdatabyname(name);
        }

        



        // POST: api/employee
        public string Post(employeetab e)
        {
            esbl.adddemployee(e);
            return "created employee " + e.ID;
        }

       

        // PUT: api/employee/5
        public string Put(int id,employeetab e)
        {
            esbl.updateemployee(id, e);
            return "updeted employee " + id;
        }

        // DELETE: api/employee/5
        public string Delete(int id)
        {
            esbl.deleteemployee(id);
            return "deleted employee " + id;
        }

       
    }
}
