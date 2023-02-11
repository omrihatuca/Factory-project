using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace finalproject.Models
{
    public class departmentwithemployee
    {
        public int ID { get; set; }
        public string name { get; set; }
        public string manager { get; set; }
        public int numofemployees { get; set; }

        public List<employeetab> allemployeesdepartment { get; set; }
    }
}