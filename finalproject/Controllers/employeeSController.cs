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
    public class employeeSController : ApiController
    {
        private employeeSBL ebl = new employeeSBL();
        // GET: api/employeeS
        public IEnumerable<employeetab> Get()
        {
            return ebl.getall();
        }

        // GET: api/employeeS/5
        public employeetab Get(int id)
        {
            return ebl.getallbyid(id);
        }

        // POST: api/employeeS
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/employeeS/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/employeeS/5
        public void Delete(int id)
        {
        }
    }
}
