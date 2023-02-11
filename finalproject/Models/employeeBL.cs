using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml.Linq;

namespace finalproject.Models
{
    public class employeeBL
    {
        projectEntities2 db=new projectEntities2();

        public List<empwithshift> getallempdata()
        {
            List<empwithshift> empshift = new List<empwithshift>();

            foreach (empshifttab item in db.empshifttab)
            {
                empwithshift newempsh = new empwithshift();

                newempsh.ID = item.ID;
                 newempsh.employeeid = item.employeeid;
                newempsh.shiftid= item.shiftid;

                newempsh.employeeinfo = new List<employeetab>();

                var epsh = db.employeetab.Where(x => x.ID == newempsh.employeeid);

                foreach (var i in epsh)
                {
                    newempsh.employeeinfo.Add(i);
                }

                newempsh.shiftinfo = new List<shifttab>();

                var eshift = db.shifttab.Where(x => x.ID == item.shiftid);

                foreach (var s in eshift)
                {
                    newempsh.shiftinfo.Add(s);
                }



              empshift.Add(newempsh);

            }

            

            return empshift;


        }

        public empwithshift getempdatabyname(string name)
        {

            empwithshift newempsh = new empwithshift();
            var emp = db.employeetab.Where(x => x.firstname == name || x.lastname==name).First() ;
            var emp2=db.empshifttab.Where(x => x.ID==x.ID).First() ;
            newempsh.employeeid = emp.ID; ;
            newempsh.shiftid = emp2.shiftid;
            

            var epsh = db.employeetab.Where(x => x.ID == newempsh.employeeid);
            newempsh.employeeinfo = new List<employeetab>();

            foreach (var i in epsh)
            {
                newempsh.employeeinfo.Add(i);
            }

            newempsh.shiftinfo = new List<shifttab>();

            var eshift = db.shifttab.Where(x => x.ID == emp2.shiftid);

            foreach (var s in eshift)
            {
                newempsh.shiftinfo.Add(s);
            }

            return newempsh;


        }


       


        public empwithshift getempdatabyid(int id)
        {
            
                empwithshift newempsh = new empwithshift();
            var emp = db.empshifttab.Where(x => x.employeeid == id).First();
            newempsh.ID = emp.ID;
                newempsh.employeeid = emp.employeeid;
                newempsh.shiftid = emp.shiftid;

            var epsh = db.employeetab.Where(x => x.ID == newempsh.employeeid );
            newempsh.employeeinfo = new List<employeetab>();

                foreach (var i in epsh)
                {
                    newempsh.employeeinfo.Add(i);
                }

                newempsh.shiftinfo = new List<shifttab>();

                var eshift = db.shifttab.Where(x => x.ID == emp.shiftid);

                foreach (var s in eshift)
                {
                    newempsh.shiftinfo.Add(s);
                }

            return newempsh;


        }

        public void adddemployee(employeetab e)
        {
            db.employeetab.Add(e);
             db.SaveChanges();

        }



        public void updateemployee(int id, employeetab e)
        {
            employeetab a=db.employeetab.Where(x => x.ID == id).First();
           a.firstname = e.firstname;
            a.lastname = e.lastname;
            a.startworkyear = e.startworkyear;
            a.departmentid = e.departmentid;
            db.SaveChanges();
        }




        public void deleteemployee(int id)
        {
            employeetab a = db.employeetab.Where(x => x.ID == id).First();
            db.employeetab.Remove(a);
            empwithshift newempsh = new empwithshift();
            var emp = db.empshifttab.Where(x => x.employeeid == id).First();
            db.empshifttab.Remove(emp);
            db.SaveChanges();

        }

    }
}
