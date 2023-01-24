// import libs
import { mat4, vec2, vec3, vec4 } from "gl-matrix";

// my Imports
import Shader from "./comons/Shader";
import Texture from "./comons/Texture";
import Colors from "./comons/Colors";
import Timer from "./comons/Timer";

// import resources
import "./resources/css/style.css";
import * as  img_icon  from "./resources/img/webgl_logo.svg";
import * as cyberpunk from "./resources/musics/Tomorrow.mp3";



import Program from "./lib/Program";
import Music from "./lib/Music";
import Columns from "./lib/Columns";


// ----------------------------------------------------------------------------------------
// WebGl 2.0


function main()
{
    const music = new Music(cyberpunk.default);


    // set icon html  
    const icon = document.createElement("link");
    icon.rel = "icon";
    icon.type = "image/png";
    icon.href = img_icon.default;
    document.head.appendChild(icon);
    
    const audio = document.createElement("audio");
    audio.style.width = "500px";
    audio.style.height = "800px";
    audio.style.margin = "50px";
    audio.style.position = "absolute";
    document.body.appendChild(audio);


    const vol = document.createElement("input");
    document.body.appendChild(vol);
    vol.type = "range";
    vol.name = "vol";
    vol.min = "-1.0";
    vol.max = "1.0";
    vol.step = "0.0001";
    vol.style.marginLeft = "25%";
    vol.style.marginTop = "15px";
    vol.style.width = "100px";
    vol.style.position = "absolute";
    vol.value = "0.0";
    
    const buttonMusic = document.createElement("button");
    document.body.appendChild(buttonMusic);
    buttonMusic.innerText = "PLAY";
    buttonMusic.style.position = "absolute";
    buttonMusic.style.width = "80px";
    buttonMusic.style.height = "40px";
    buttonMusic.style.borderRadius = "5px";
    buttonMusic.style.border = "2px solid blueviolet"
    buttonMusic.style.backgroundColor = "tomato";
    buttonMusic.style.marginLeft = "15%";
    buttonMusic.style.marginTop = "5px";
    buttonMusic.addEventListener("mouseenter", function()
    {
        buttonMusic.style.cursor = "pointer";
        buttonMusic.style.backgroundColor = "blueviolet";
    });
    buttonMusic.addEventListener("mouseleave", () =>
    {
        buttonMusic.style.backgroundColor = "tomato";
    });

    buttonMusic.onclick = function()
    {
        buttonMusic.style.backgroundColor = "white";
        music.PlaySound();
        console.log(music.BufferLenght);
        console.log(music.DataArray.length);
    }
    
    const stopButoon = document.createElement("button");
    document.body.appendChild(stopButoon);
    stopButoon.innerText = "Stop";
    stopButoon.style.position = "absolute";
    stopButoon.style.width = "80px";
    stopButoon.style.height = "40px";
    stopButoon.style.borderRadius = "5px";
    stopButoon.style.border = "2px solid blueviolet"
    stopButoon.style.backgroundColor = "red";
    stopButoon.style.marginLeft = "7%";
    stopButoon.style.marginTop = "5px";

    stopButoon.addEventListener("mouseenter", function()
    {
        stopButoon.style.cursor = "pointer";
        stopButoon.style.backgroundColor = "blueviolet";
    });
    stopButoon.addEventListener("mouseleave", () =>
    {
        stopButoon.style.backgroundColor = "red";
    });

    stopButoon.onclick = function()
    {
        stopButoon.style.backgroundColor = "white";
        music.StopSound();
    }



    const inputColor = document.createElement("input");
    document.body.appendChild(inputColor);
    inputColor.type = "color";
    inputColor.style.position = "absolute";
    inputColor.value = "#ffffff";
    inputColor.style.marginLeft = "1%";
    inputColor.style.marginTop = "10px";
    inputColor.addEventListener("mouseenter", function()
    {
        inputColor.style.cursor = "pointer";
    });
    

    var color4 = vec4.create();
    vec4.set(color4, 1.0, 1.0, 1.0, 1.0);

    inputColor.onchange = function getColor(ev: Event)
    {
        const color = inputColor.value;
        
        vec4.set(color4,
            parseInt(color.substr(1,2), 16) / 255.0,
            parseInt(color.substr(3,2), 16) / 255.0,
            parseInt(color.substr(5,2), 16) / 255.0,
            1.0);


    }
    
    Program.Init();
    const timer = new Timer();


    
    window.onresize = function WinResizeSize()
    {
        Program.ResizeDisplay(window.innerWidth, window.innerHeight);

    }
    
    
    const GL = Program.GL;
    GL.viewport(0, 0, Program.Size.Width, Program.Size.Height);
    GL.clearDepth(1.0);                 // Clear everything
    GL.enable(GL.DEPTH_TEST);           // Enable depth testing
    GL.depthFunc(GL.LEQUAL);            // Near things obscure far things
    GL.clearColor(0.1, 0.1, 0.1, 1.0);

    var coluns: Array<Columns> = new Array();
    var Beat: Array<number> = new Array();

    for(let i = 0; i < 256; i++)
    {   
        coluns[i] = new Columns();

        Beat[i] = 0.0;
    }

    
    
    function render()
    {
        music.ControlerVolume(+vol.value);
        
        GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);
        
        var pos = -650;

        
        for(let i = 0; i < Beat.length; i++)
        {
            if(!music.Start)
            {
                music.ByteFrequencyData();
                
                Beat[i] = music.DataArray[i];
                
            }
            coluns[i].Render(Beat[i], pos, color4);
            pos += 5;
        }
                

        // devemos chamar essa função a cad frame
        requestAnimationFrame(render);
    }

    render();

    // iniciamos a nossa classe timer

}

main();
