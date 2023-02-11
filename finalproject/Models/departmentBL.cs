using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml.Linq;

namespace finalproject.Models
{
    public class departmentBL
    {
        projectEntities2 dpdata=new projectEntities2();

        public List<departmentwithemployee> getalld()
        {
            List<departmentwithemployee> demp=new List<departmentwithemployee>();

            foreach (departmenttab item in dpdata.departmenttab)
            {
                departmentwithemployee newdemp= new departmentwithemployee();

                newdemp.ID= item.ID;
                newdemp.name = item.name;
                newdemp.manager = item.manager;
                newdemp.numofemployees= item.numofemployees;

                newdemp.allemployeesdepartment = new List<employeetab>();

                var edp= dpdata.employeetab.Where(x=>x.departmentid==newdemp.ID);

                foreach (var i in edp)
                {
                    newdemp.allemployeesdepartment.Add(i);
                }

                demp.Add(newdemp);

            }



            return demp;
        }


        public departmentwithemployee getdbydepname(string name)
        {

            departmentwithemployee newdemp = new departmentwithemployee();
            var dep = dpdata.departmenttab.Where(x => x.name==name).First();
            newdemp.ID = dep.ID;
            newdemp.name = dep.name;
            newdemp.manager = dep.manager;
            newdemp.numofemployees = dep.numofemployees;

            var edp = dpdata.employeetab.Where(x => x.departmentid == newdemp.ID);

            newdemp.allemployeesdepartment = new List<employeetab>();

            foreach (var i in edp)
            {
                newdemp.allemployeesdepartment.Add(i);
            }

            return newdemp;

        }


        public departmentwithemployee getdbyid(int id)
        {
            
                departmentwithemployee newdemp = new departmentwithemployee();
            var dep=dpdata.departmenttab.Where(x=>x.ID==id).First();
                newdemp.ID= dep.ID;
                newdemp.name = dep.name;
                newdemp.manager = dep.manager;
                newdemp.numofemployees = dep.numofemployees;

            var edp = dpdata.employeetab.Where(x => x.departmentid == newdemp.ID);

            newdemp.allemployeesdepartment = new List<employeetab>();

                foreach (var i in edp)
                {
                    newdemp.allemployeesdepartment.Add(i);
                }

                return newdemp;
            
        }


        public void adddepartment(departmenttab d)
        {
            dpdata.departmenttab.Add(d);
            dpdata.SaveChanges();
        }

        public void updatedepartment(int id, departmenttab d)
        {
            departmenttab a = dpdata.departmenttab.Where(x => x.ID == id).First();
            a.name = d.name;
            a.manager = d.manager;
            a.numofemployees = d.numofemployees;
            dpdata.SaveChanges();
        }

 


        public void deleteuser(int id)
        {
            departmenttab a = dpdata.departmenttab.Where(x => x.ID == id).First();
            dpdata.departmenttab.Remove(a);
            dpdata.SaveChanges();

        }

    }

    
   
}