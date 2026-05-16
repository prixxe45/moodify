const songModel = require("../model/song.model");
const id3 = require('node-id3');
const storageService = require("../services/storage.service");


async function uplodeSong(req, res) {
 
 const songBuffer = req.file.buffer;
const {mood} = req.body;

 const tags = id3.read(songBuffer);
 console.log(tags);

 
 const uplodePromises = [
 
  storageService.uplodeFile({
  buffer: songBuffer,
  fileName: tags.title + ".mp3",
  folder:'/cohort-2/moodify/songs'
 }),
 ];
  
  if(tags.image && tags.image.imageBuffer){
    uplodePromises.push(
  storageService.uplodeFile({
    buffer: tags.image.imageBuffer,
    fileName: tags.title + ".jpeg",
    folder:'/cohort-2/moodify/posters'
  })
    );
 }
 const [songFile, posterFile] = await Promise.all(uplodePromises);
 

  const song = await songModel.create({
    title: tags.title ,
    artist: tags.artist || "unknown",
    url: songFile.url,
    posterUrl: posterFile?.url ||  "not found",
    mood
 })

 res.status(201).json({
  message: "song uploded successfully",
  song
 })
 
}

async function getSongs(req, res) {
 try {
   const { mood } = req.query;

   const songs = await songModel.aggregate([
     {
       $match: { mood: mood },
     },
     {
       $sample: { size: 1 },
     },
   ]);

   res.status(200).json({
     message: "Random song fetched successfully",
     song: songs[0],
   });
 } catch (error) {
   res.status(500).json({
     message: "Error fetching song",
     error: error.message,
   });
 }
}
 
 

 module.exports = {
    uplodeSong ,
    getSongs 
  };