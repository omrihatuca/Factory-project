using finalproject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
namespace finalproject.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class departmentController : ApiController
    {
        private departmentBL debl=new departmentBL();
        // GET: api/department
        public IEnumerable<departmentwithemployee> Get()
        {
            return debl.getalld();
        }

        // GET: api/department/5
        public departmentwithemployee Get(int id)
        {
            return debl.getdbyid(id);
        }

        public departmentwithemployee Get(string name)
        {
            return debl.getdbydepname(name);
        }

        // POST: api/department
        public string Post(departmenttab d)
        {
            debl.adddepartment(d);
            return "created department " + d.ID;
        }

        // PUT: api/department/5
        public string Put(int id, departmenttab d)
        {
            debl.updatedepartment(id, d);
            return "uptaded department " + id;
        }

        // DELETE: api/department/5
        public string Delete(int id)
        {
            debl.deleteuser(id);
            return "deleted department "+ id;
        }
    }
}
