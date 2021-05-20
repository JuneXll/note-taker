const fs = require("fs");
const path = require("path");

const server = ()=>{
    fs.readFile("db/db.json","utf-8",(error,result)=>{
        if(error){
            console.log(error);
        } else {
            let notes = JSON.parse(result);

            server.get("/api/notes", (req,res)=>{
                res.json(notes);
            });

            server.post("/api/notes", (req,res)=>{
                let newNote = req.body;
                notes.push(newNote);
                dbUpdate();
                console.log(`New note added: ${newNote.title}`);
            });

            server.get("/api/notes/:id",(req,res)=>{
                res.json(notes[req.params.id]);
            });

            server.delete("api/notes/:id",(req,res)=>{
                notes.splice(req.params.id,1);
                dbUpdated();
                console.log(`Note deleted with id:${req.params.id}`);
            });

            server.get("/api/notes", (req,res)=>{
                res.sendFile(path.join(__dirname,"../public/notes.html"));
            });

            server.get("*",(req,res)=>{
                res.sendFile(path.join(__dirname,"../public/index.html"));
            });

            const dbUpdated=()=>{
                fs.writeFile("db/db.json",JSON.stringify(notes,'\t'),err=>{
                    if(err) {
                        console.log(err);
                        return true;
                    }
                });
            }
        }
    })
}

module.exports=server();