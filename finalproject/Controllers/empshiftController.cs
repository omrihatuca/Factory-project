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
    public class empshiftController : ApiController
    {
        empshiftBL empsbl=new empshiftBL();
        // GET: api/empshift
        public IEnumerable<empshifttab> Get()
        {
            return empsbl.getall();
        }

        // GET: api/empshift/5
        public empshifttab Get(int id)
        {
            return empsbl.getallbyid(id);
        }

        // POST: api/empshift
        public string Post(empshifttab e)
        {
            empsbl.addempshift(e);
            return "created " + e.ID;
        }

        // PUT: api/empshift/5
        public string Put(int id, empshifttab e)
        {
            empsbl.updateempshift(id,e);
            return "updated " + id;

        }

        // DELETE: api/empshift/5
        public string Delete(int id)
        {
            empsbl.deleteempshift(id);
            return "deleted " + id;
        }
    }
}
