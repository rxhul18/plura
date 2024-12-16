import { Mail, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Mail[]> {
  // Fetch data from your API here.
  return [
    {
      Email: "saidevdhal@gmail.com",
      Source: "Agent2",
      date: "13-03-2023",
      id: "bsd456ghty",
    },
    {
      Email: "sarahsmith@gmail.com",
      Source: "Agent2",
      date: "13-03-2023",
      id: "bsd456ghty",
    },
    {
      Email: "rahulshah0728@gmail.com",
      Source: "Agent1",
      date: "12-01-2023",
      id: "asd123nadsf",
    },
    {
      Email: "gautam@gmail.com",
      Source: "Agent1",
      date: "14-02-2023",
      id: "csd789jklu",
    },
    {
      Email: "ayush@gmail.com",
      Source: "Agent2",
      date: "15-05-2023",
      id: "dsd012mnop",
    },
    {
      Email: "piyushgarg@gmail.com",
      Source: "Agent1",
      date: "16-04-2023",
      id: "esd345qrst",
    },
    {
      Email: "hiteshchoudhary@gmail.com",
      Source: "Agent2",
      date: "17-07-2023",
      id: "fsd678uvwx",
    },
    {
      Email: "rahuldev@gmail.com",
      Source: "Agent1",
      date: "18-06-2023",
      id: "gsd901yzab",
    },
    {
      Email: "shaurya@gmail.com",
      Source: "Agent2",
      date: "19-09-2023",
      id: "hsd234cdef",
    },
    {
      Email: "narendrachoudhary@gmail.com",
      Source: "Agent1",
      date: "20-08-2023",
      id: "isd567ghij",
    },
    {
      Email: "anshshukla@gmail.com",
      Source: "Agent2",
      date: "21-11-2023",
      id: "jsd890klmn",
    },
    {
      Email: "williamtaylor@gmail.com",
      Source: "Agent1",
      date: "22-10-2023",
      id: "ksd123opqr",
    },
    {
      Email: "rithik@gmail.com",
      Source: "Agent2",
      date: "23-12-2023",
      id: "lsd456stuv",
    },
    {
      Email: "mehulshah18@gmail.com",
      Source: "Agent2",
      date: "23-12-2023",
      id: "lsd456stuv",
    },
    {
      Email: "shreyashjambhulkar@gmail.com",
      Source: "Agent2",
      date: "23-12-2023",
      id: "lsd456stuv",
    },
    {
      Email: "kavitagupta@gmail.com",
      Source: "Agent2",
      date: "23-12-2023",
      id: "lsd456stuv",
    },
    {
      Email: "shrinivash@gmail.com",
      Source: "Agent2",
      date: "23-12-2023",
      id: "lsd456stuv",
    },
    {
      Email: "rahul18@gmail.com",
      Source: "Agent2",
      date: "23-12-2023",
      id: "lsd456stuv",
    },
    {
      Email: "omkarpathak@gmail.com",
      Source: "Agent2",
      date: "23-12-2023",
      id: "lsd456stuv",
    },
    {
      Email: "divyasingh@gmail.com",
      Source: "Agent2",
      date: "23-12-2023",
      id: "lsd456stuv",
    },
    {
      Email: "sohampawar@gmail.com",
      Source: "Agent2",
      date: "23-12-2023",
      id: "lsd456stuv",
    },
  ];
}

export default async function Mails() {
  const data = await getData();

  return (
    <div className="container px-5 pb-5 md:px-2">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
