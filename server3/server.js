const express = require("express");
const  cors = reqire('cors');

const app = express();

app.use(express.json());

const users = [
  { name: "ABDUL HAQUE", university: "SUxCG 714", uid: "108444", totalSubjects:14, bonus:20, attendance:80 },
  { name: "ADITYA KUMAR", university: "SUxCG 702", uid: "108716", totalSubjects:14, bonus:20, attendance:80 },
  { name: "AMAN KUMAR", university: "SUxCG 702", uid: "108500", totalSubjects:14, bonus:20, attendance:80 },
  { name: "AMRIT RAJ", university: "SUxCG 702", uid: "108587", totalSubjects:14, bonus:20, attendance:80 }
];



app.get("/", (req, res) => {
  res.json({ message: "API is running " });
});



app.get("/users", (req, res) => {
  res.json(users);
});


app.get("/users/:uid", (req, res) => {
  const { uid } = req.params;

  if (!/^\d+$/.test(uid)) {
    return res.status(400).json({ error: "Invalid UID format" });
  }

  const student = users.find(s => s.uid === uid);

  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }

  res.json(student);
});


app.post("/user", (req, res) => {
  const { name, university, uid, totalSubjects, bonus, attendance } = req.body;

  if (!name || !university || !uid) {
    return res.status(400).json({ error: "Required fields missing" });
  }

  const existingUser = users.find(u => u.uid === uid);
  if (existingUser) {
    return res.status(400).json({ error: "User with this UID already exists" });
  }

  const newUser = {
    name,
    university,
    uid,
    totalSubjects: totalSubjects || 0,
    bonus: bonus || 0,
    attendance: attendance || 0
  };

  users.push(newUser);

  res.status(201).json({
    message: "User added successfully",
    user: newUser
  });
});



app.put("/user/:uid", (req, res) => {
  const { uid } = req.params;

  const userIndex = users.findIndex(u => u.uid === uid);

  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }


  users[userIndex] = {
    ...users[userIndex],
    ...req.body
  };

  res.json({
    message: "User updated successfully",
    user: users[userIndex]
  });
});



app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
