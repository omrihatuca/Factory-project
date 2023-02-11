using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace finalproject.Models
{
    public class shiftBL
    {
        projectEntities2 db = new projectEntities2();

        public List<shifttab> getall()
        {
            return db.shifttab.ToList();
        }

        public shifttab getallbyid(int id)
        {
            return db.shifttab.Where(x => x.ID == id).First();
        }

        public void addshift(shifttab s)
        {
            db.shifttab.Add(s);
            db.SaveChanges();
        }

        



    }
}