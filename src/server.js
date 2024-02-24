const express = require('express');
const app = express();

app.use(express.json())
let students = [{
        id: 1,
        name:"Afia",
        age:20,
        department:"Computer Science",
        grade:"A"
        
    },
    {
        id:72,
        name:"Aqsa",
        age:21,
        department:"Software Engineeering",
        grade:"A+"
    }]



app.get('',(req,res)=>{
res.send("Welcome to Students API")
})



app.get('/student', (req, res) => { 
res.send(students)
})


// get a specific student by its ID
app.get('/student/:id',(req,res)=>{
let id = parseInt(req.params.id);
let student = students.find((s)=>{
    return s.id === id
})
if(!student){
    return res.status(404).json({ error: 'Student not found' });
}
else 
res.send(student)

})


//post a student 
app.post('/student',(req,res)=>{

    let newStudent = req.body;
    students.push(newStudent);
    res.send(students);
})


//edit the records of existing student by Id
app.put('/student/:id',(req,res)=>{
        let id = req.params.id;
        const isStudent = students.find((s)=>{
            return s.id == id

        })
        if(!isStudent){
            res.status(404).json('The Student with the given ID was not found');
        }

        else{
            let updatedData = req.body;
                for(let i=0;i<students.length;i++)
                {
                    if(students[i].id===parseInt(id))
                    {
                         students[i] = {...students[i],...updatedData}
                    }
            }
}
res.send(students);
})

//delete an exisiting student against id
app.delete('/student/:id',(req,res)=>{
   let id = parseInt(req.params.id);
   let found = students.find((s)=>{
    return s.id===id;
   })
   if(!found){
    res.status(404).json("The student with the given ID was not found");

   }
   else{
  let studentToKeep = students.filter((s)=>{
    return  s.id !== id;
  })
  students = [...studentToKeep];
      res.send(students)   //updated array of student
    }

}
)

app.listen(3000,()=>{
    console.log(`App is running on port ${3000}`)
})