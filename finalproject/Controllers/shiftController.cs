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
    public class shiftController : ApiController
    {
        shiftBL sbl=new shiftBL();
        // GET: api/shift
        public IEnumerable<shifttab> Get()
        {
            return sbl.getall();
        }

        // GET: api/shift/5
        public shifttab Get(int id)
        {
            return sbl.getallbyid(id);
        }

        // POST: api/shift
        public string Post(shifttab s)
        {
            sbl.addshift(s);
            return "created shift " + s.ID;
        }

        // PUT: api/shift/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/shift/5
        public void Delete(int id)
        {
        }
    }
}
