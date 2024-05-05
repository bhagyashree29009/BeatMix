console.log("Welcome to TuneHub");
//initialize the variables
let songIndex = 0;
let audioElement = new Audio('Music/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItem = Array.from(document.getElementsByClassName("songItem"));
let songs = [
    { songName : "Malang Sajana", filePath : "Music/1.mp3", coverPath : "coverPhoto/Photo1.jpg" },
    { songName : "Perfect-Song by Ed Sheeran", filePath : "Music/2.mp3", coverPath : "coverPhoto/Photo2.jpg" },
    { songName : "Jaane Kyun - Dostana", filePath : "Music/3.mp3", coverPath : "coverPhoto/Photo3.jpg" },
    { songName : "Channa Mereya - Arijit Singh", filePath : "Music/4.mp3", coverPath : "coverPhoto/Photo4.jpg" },
    { songName : "Tum Mile-KK", filePath : "Music/5.mp3", coverPath : "coverPhoto/IMG_3143.jpg" },
    { songName : "Tu Hi Haqeeqat-Javed Ali", filePath : "Music/6.mp3", coverPath : "coverPhoto/Photo6.jpg" },
    { songName : "Saanware-Akhil Sachdeva", filePath : "Music/7.mp3", coverPath : "coverPhoto/Photo7.jpg" },
    { songName : "Saude Bazi - Javed Ali", filePath : "Music/8.mp3", coverPath : "coverPhoto/Photo8.jpg" },
    { songName : "Tere Hawaale-Arijit Singh", filePath : "Music/9.mp3", coverPath : "coverPhoto/Photo9.jpg" },
    { songName : "O Maahi - Song by Arijit Singh", filePath : "Music/10.mp3", coverPath : "coverPhoto/Photo0.jpg" },

]

songItem.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    
});

//audioElement.play();


//handle Play/Pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;

    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;

    }
})
//listen to events



// Update seek bar during audio playback
audioElement.addEventListener('timeupdate', () => {
    // Calculate progress
    const progress = (audioElement.currentTime / audioElement.duration) * 100;
    myProgressBar.value = progress; 
})

// Seek audio when progress bar is interacted with
myProgressBar.addEventListener('input', () => {
    // Calculate new time based on progress bar value
    const newTime = myProgressBar.value * audioElement.duration / 100;
    audioElement.currentTime = newTime;
})


// Function to update the play/pause icon in the playlist
function updatePlaylistIcon(songIndex) {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, i) => {
        if (i === songIndex) {
            element.classList.remove('fa-play-circle');
            element.classList.add('fa-pause-circle');
        } else {
            element.classList.remove('fa-pause-circle');
            element.classList.add('fa-play-circle');
        }
    });
}



const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle'); 
        element.classList.add('fa-play-circle');
       })


   
}

// Play the selected song and show its GIF




Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `Music/${songIndex+1}.mp3`; // Use template literal here
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        updatePlaylistIcon(songIndex);
    })
})

document.getElementById('next').addEventListener('click', ()=>
{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex +=1;

    }
    audioElement.src = `Music/${songIndex+1}.mp3`; // Use template literal here
    masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        updatePlaylistIcon(songIndex);
})


document.getElementById('previous').addEventListener('click', ()=>
{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -=1;

    }
    audioElement.src = `Music/${songIndex+1}.mp3`; 
    // Use template literal here
    masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        updatePlaylistIcon(songIndex);
})


// Function to play the next song
function playNextSong() {
    songIndex = (songIndex + 1) % songs.length; // Calculate the next song index
    audioElement.src = songs[songIndex].filePath; // Update the audio element source
    masterSongName.innerText = songs[songIndex].songName; // Update the song name
    
    // Play the audio
    audioElement.currentTime = 0; // Reset the audio playback position
    audioElement.play(); // Play the audio
    
    gif.style.opacity = 1; // Show the GIF
    masterPlay.classList.remove('fa-play-circle'); // Update play/pause icon
    masterPlay.classList.add('fa-pause-circle'); // Update play/pause icon
    updatePlaylistIcon(songIndex); // Update the playlist icon
}

// Function to play the previous song
function playPreviousSong() {
    songIndex = (songIndex - 1 + songs.length) % songs.length; // Calculate the previous song index
    audioElement.src = songs[songIndex].filePath; // Update the audio element source
    masterSongName.innerText = songs[songIndex].songName; // Update the song name
    
    // Play the audio
    audioElement.currentTime = 0; // Reset the audio playback position
    audioElement.play(); // Play the audio
    
    gif.style.opacity = 1; // Show the GIF
    masterPlay.classList.remove('fa-play-circle'); // Update play/pause icon
    masterPlay.classList.add('fa-pause-circle'); // Update play/pause icon
    updatePlaylistIcon(songIndex); // Update the playlist icon
}

// Event listener for the 'ended' event on the audio element
audioElement.addEventListener('ended', playNextSong);



//for the time duration

//const audio = document.getElementById('audioElement');
//const timestamp = document.getElementById('timestamp');

//audio.addEventListener('timeupdate', () => {
   // const minutes = Math.floor(audio.currentTime / 60);
    //const seconds = Math.floor(audio.currentTime % 60);
    //const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    //timestamp.textContent = formattedTime;
//});

// Debug logs
//console.log('Audio element:', audio);


document.getElementById("clickableWord").addEventListener("click", function() {
    
    var githubURL = "https://github.com/bhagyashree29009";
    // Open the GitHub account in a new tab/window
    window.open(githubURL, "_blank");
});







