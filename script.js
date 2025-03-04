addEventListener("load", function(){

    Array.prototype.shuffle = function () {
        for (let index = this.length - 1; index > 0; index--) {
           let random = Math.floor(Math.random() * (index + 1));
           let aux = this[index];
           this[index] = this[random];
           this[random] = aux;
        }
     };

    function Card(card_id){
        this.number = card_id;
        this.element = null;
        this.trava = false;
    }
    Card.prototype.render = function(){
        let game_div = document.getElementById("game");



        let card_container = document.createElement("div");
        card_container.classList.add("card");
        //card_container.classList.add("back");

        let img = document.createElement("img");
        img.src = "imagens/"+parseInt(this.number+1)+".png";
        

        let card_title = document.createElement("h1");
        card_title.innerText = this.number;

        //card_container.appendChild(card_title);
        card_container.appendChild(img);
        this.element = card_container;
        game_div.appendChild(card_container);
    }

    function check_pairs(){
        if(first.number == second.number){
            pairs++;
            first.trava = true;
            second.trava = true;
            first = null;
            second = null;
            lock_game = false;
        }else{
            setTimeout(()=>{
                first.element.classList.add("back");
                second.element.classList.add("back");
                first.trava = false;
                second.trava = false;
                first = null;
                second = null;
                lock_game = false;
             }, 1000)
        }
        if(pairs == 6)
        {
            alert("yey!");
        }
    }

    var lock_game = false;
    var first = null;
    var second = null;
    var pairs = 0;
    var cards = [];
    
    for(let i = 0; i < 6; i++)
    {
        cards.push(new Card(i));
        cards.push(new Card(i));
    }

    cards.shuffle();
    //cards.forEach(card => {
    //    card.render();
    //});   
    
    for (let index = 0; index < cards.length; index++) {
        this.setTimeout(function(){
            cards[index].render();
        },100*index)
        
    }
    cards.forEach(card => {
        setTimeout(function(){
            card.element.classList.add("back");
        card.element.addEventListener("click", function(){
            if(!card.trava && !lock_game){
                card.trava = true;
                card.element.classList.remove("back");
                if(!first){ 
                    first = card;
                }else{
                    second = card;
                    lock_game = true;
                    check_pairs();
                }  
            }   
        })
        }, 3000)
        
    });  
})
    