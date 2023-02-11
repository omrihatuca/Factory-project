using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml.Linq;

namespace finalproject.Models
{
    public class empshiftBL
    {
        projectEntities2 db=new projectEntities2();

        public List<empshifttab> getall()
        {
            return db.empshifttab.ToList();
        }

        public empshifttab getallbyid(int id)
        {
            return db.empshifttab.Where(x => x.ID == id).First();
        }

        public void addempshift(empshifttab e)
        {
            db.empshifttab.Add(e);
            db.SaveChanges();
        }

        public void updateempshift(int id, empshifttab e)
        {

            empshifttab a = db.empshifttab.Where(x => x.ID == id).First();
            a.employeeid = e.employeeid;
            a.shiftid = e.shiftid;
            db.SaveChanges();
        }


        public void deleteempshift(int id)
        {

            empshifttab a = db.empshifttab.Where(x => x.ID == id).First();
           db.empshifttab.Remove(a);
            db.SaveChanges();
        }




    }
}