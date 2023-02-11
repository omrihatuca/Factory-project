using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace finalproject.Models
{
    public class empwithshift
    {
        public int ID { get; set; }

        public int employeeid { get; set; }
        public int shiftid { get; set; }
        public List<employeetab> employeeinfo { get; set; }
        public List<shifttab> shiftinfo { get; set; }

    }
}