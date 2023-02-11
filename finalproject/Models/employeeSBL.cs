using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml.Linq;

namespace finalproject.Models
{
    public class employeeSBL
    {
        projectEntities2 db = new projectEntities2();
        public List<employeetab> getall()
        {
            return db.employeetab.ToList();
        }

 
        public employeetab getallbyid(int id)
        {
            return db.employeetab.Where(x => x.ID == id).First();
        }

    }
}