console.log("this is js");
let currentsong = new Audio();
let songs;
async function getsongs(){
    let a = await fetch("http://127.0.0.1:5500/project%206%20spotify%20clone/static/songs/");
    let response = await a.text();
    // console.log(response);
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    console.log(as);
    let songs = [];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if(element.href.endsWith(".mp3")){
            songs.push(element.href.split("/project%206%20spotify%20clone/static/songs/")[1]);

            
        }
        
    }
    return songs;

    
}
 const playmusic = (track, pause = false) => {
    currentsong.src = "/project%206%20spotify%20clone/static/songs/" + track;
    if(!pause){
    currentsong.play();
    playbtn.src = "/project 6 spotify clone/static/pause.svg";
    }
    document.querySelector(".songinfo").innerHTML = track.replaceAll("%20", " ").replace(".mp3", " ") ;
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
}


async function main(){

    songs = await getsongs();
    playmusic(songs[0], true);
    let songlist = document.querySelector(".library").getElementsByTagName("ul")[0]
    for (const song of songs) {
        songlist.innerHTML = songlist.innerHTML + `<li><img src="static/song.svg" alt="404">
                    <div class="cardinfo"><div>${song.replaceAll("%20", " ")}</div><div id="artist">Nusrat Fateh Ali Khan</div></div>
                    <img src="static/play.svg" alt="404"></li>`;
    }

    Array.from(document.querySelector(".library").getElementsByTagName("li")).forEach(e=>{
        e.addEventListener('click', ()=>{
            console.log(e.querySelector(".cardinfo").firstElementChild.innerHTML.trim());
            playmusic(e.querySelector(".cardinfo").firstElementChild.innerHTML.trim());
        })
    })
    
    playbtn.addEventListener('click', () =>{
        if(currentsong.paused){
            currentsong.play()
            playbtn.src = "/project 6 spotify clone/static/pause.svg";
        }
        else{
            currentsong.pause()
            playbtn.src = "/project 6 spotify clone/static/playbtn.svg";
        }
    })

    function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) 
        return "00:00";

    let mins = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);

    if (mins < 10) mins = "0" + mins;
    if (secs < 10) secs = "0" + secs;

    return `${mins}:${secs}`;
}


    currentsong.addEventListener("timeupdate", ()=>{
        document.querySelector(".songtime").innerHTML = `${formatTime(Math.floor(currentsong.currentTime))} / ${formatTime(currentsong.duration)}`;
        document.querySelector(".circle").style.left = (Math.floor(currentsong.currentTime)/Math.floor(currentsong.duration))*100 + "%";
    })

    document.querySelector(".seekbar").addEventListener("click", e=>{
        let percent = (e.offsetX/e.target.getBoundingClientRect().width)*100;
        document.querySelector(".circle").style.left = percent + "%";
        currentsong.currentTime = ((currentsong.duration)*percent)/100;

    })

    document.querySelector(".hamburger1").addEventListener("click", ()=>{
        document.querySelector("section#left").style.left = 0 + "%";
    })

    
    document.querySelector(".hamburger2").addEventListener("click", ()=>{
        let menu = document.querySelector("#menu1");
        if(menu.style.top == 7 + "%"){
            menu.style.top = "-100%";
        }
        else{
            menu.style.top = 7 + "%";
        }
        
    })
    
    document.querySelector(".cross").addEventListener("click", ()=>{
        document.querySelector("section#left").style.left = -100 + "%";
    })

    document.querySelector("#prev").addEventListener("click", ()=>{
        console.log("Previous clicked");
        let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0]);
        if((index-1)>=0){
        playmusic(songs[index-1]);
        }
        else{
            playmusic(songs[songs.length-1]);
        }
        
    })
    document.querySelector("#next").addEventListener("click", ()=>{
        console.log("Next clicked");
        let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0]);
        if((index+1)<songs.length){
        playmusic(songs[index+1]);
        }
        else{
            playmusic(songs[0]);
        }

    })

    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e)=>{
        currentsong.volume = parseInt(e.target.value)/100;
    })

   document.querySelector(".volume > img").addEventListener("click", (e)=>{
    console.log(e.target.src);
    if(e.target.src.includes("vol.svg")){
        e.target.src = e.target.src.replace("vol.svg", "mute.svg");
        console.log(e.target.src);
        currentsong.volume = 0;
        document.querySelector(".range").getElementsByTagName("input")[0].value = 0;
    }
    else{
        e.target.src = e.target.src.replace("mute.svg", "vol.svg");
        currentsong.volume = 0.3;
        document.querySelector(".range").getElementsByTagName("input")[0].value = 50;

    }
   })
    

    



   
    


}

main();
