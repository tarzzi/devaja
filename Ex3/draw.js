function openForm() {
    document.getElementById("nameForm").style.display = "block";
    }

    function closeForm() {
    document.getElementById("nameForm").style.display = "none";
    }

    // Initialize
    for(let x = 1; x <= 64; x++){
        let element = $('<canvas id='+x+'></canvas>');
        $('#grid').append(element);
    }
    toBlack();

    // Handle led clicks
    $('canvas').click(function(ev){
        canvas = ev.target;
        let ctx = canvas.getContext("2d");
        colorData = ctx.getImageData(0,0,300,200);
        let r = colorData.data[0];  
        ctx.beginPath();
        ctx.rect(0, 0, canvas.width, canvas.height);
        if(r == 0){              
            ctx.fillStyle = "white";
        }
        else{
            ctx.fillStyle = "black";
        }            
        ctx.fill();
    })

    $('#reset').click(function() {toBlack();})
    
    function toBlack(){
        for(let x = 1; x <= 64; x++){
            let c = document.getElementById(x.toString());
            let ctx = c.getContext("2d");
            ctx.beginPath();
            ctx.rect(0, 0, 300, 200);
            ctx.fillStyle = "black";
            ctx.fill();
        }
    }

    function saveEmoji(e){
        closeForm();
        let emoji = [];
        let value = 1;
        for(let x = 1; x <= 64; x++){
            let canvas = document.getElementById(x.toString());
            let ctx = canvas.getContext("2d");
            colorData = ctx.getImageData(0,0,300,200);
            let r = colorData.data[0];  
            if(r == 0){              
                value = 1;
            }
            else{
                value = 0;
            }
            emoji.push(value);
        }
        let name = $('#name').val();
        database.ref('emojis/'+name).set({
            data:emoji,
        })
    }
/*
    $('#save').click(function(){
        let emoji = saveEmoji();
        database.ref('emojis/').set({
            id:emoji,
        })
        readDB();
    });
*/
    var emojiRef = firebase.database().ref('emojis/');
    emojiRef.on('value', (snapshot) => {
    var data = snapshot.val();
    displayData(data);
    });


    // #TODO create maby an image from entry? grid too much trouble
    function displayData(data){      
        for (let [key,value] of Object.entries(data)){
            console.log(key,value);
            
            let item = $('<canvas class="minicanvas"></canvas>');
            for(let [key2,value2] of Object.entries(value)){
            //Create minigrid w/ 64 canvases
                for(let x = 1; x< 64; x++){
                    let ctx = canvas.getContext("2d");
                    colorData = ctx.getImageData(0,0,300,200);
                    let r = colorData.data[0];  
                    ctx.beginPath();
                    ctx.rect(0, 0, canvas.width, canvas.height);
                    if(r == 0){              
                        ctx.fillStyle = "white";
                    }
                    else{
                        ctx.fillStyle = "black";
                    }            
                    ctx.fill();
                }

            }
            $('#emojis').append(item);
        }
    }
