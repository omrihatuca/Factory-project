using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity.Migrations;
using System.Diagnostics;
using System.Linq;
using System.Threading;
using System.Web;


namespace finalproject.Models
{
    public class userBL
    {
        projectEntities2 usdata=new projectEntities2();

        public List<usertab> getall()
        {
            return usdata.usertab.ToList();
        }

        public usertab getallbyuser(string username)
        {
            return usdata.usertab.Where(x=>x.username == username).First();
        }

        public usertab getallbyid(int id)
        {
            return usdata.usertab.Where(x => x.ID == id).First();
        }

        public void adduser(usertab u)
        {
            usdata.usertab.Add(u);
            usdata.SaveChanges();
        }

        public void updateuser(int id, usertab u)
        {
            
        usertab a = usdata.usertab.Where(x => x.ID == id).First();
             a.fullname=u.fullname;
            a.username=u.username;
            a.password=u.password;
            a.numofaction=u.numofaction;
            a.dailyactions=u.dailyactions;
            usdata.SaveChanges();
        }

       
       


        public void deleteuser(int id) 
        {
        usertab a = usdata.usertab.Where(x => x.ID == id).First();
            usdata.usertab.Remove(a);
            usdata.SaveChanges();

        }



        public void UpdateActionCounter(string username)
        {

            usertab a = usdata.usertab.Where(x => x.username == username).First();

            a.numofaction -= 1;
            usdata.SaveChanges();

        }




        public void Updatedateandactions(string fullname , usertab u)
        {

            usertab a = usdata.usertab.Where(x => x.fullname == fullname).First();

            a.numofaction=u.numofaction;
            a.dailyactions = u.dailyactions;
            usdata.SaveChanges();

        }


        public void updateusers()
        {

            foreach (var item in usdata.usertab)
            {
                item.numofaction = 20;
               
            }
            
            usdata.SaveChanges();
        }

    }
}