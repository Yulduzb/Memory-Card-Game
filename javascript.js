const cards=document.querySelectorAll(".card"),
timeText=document.querySelector(".time b");

let matchedCard=0;
let cardOne,cardTwo,timer;
let disableDesk=false;


/*zaman
const initTimer = maxTime => {
    timer=setInterval(() => {
    if(maxTime>0){
        maxTime--;
        timeText.innerText = maxTime;

    }
    else{
        clearInterval(timer);
       alert("Maalesef, zamanınız doldu. Devam etmek istiyor musunuz?");
            shuffleCard();
            initTimer(60);
        }
       
        
    }, 1000);
}*/


//kart tıklandığında
function flipCard({target:clickCard}){
  
 if(cardOne !== clickCard  &&  !disableDesk){     // İlk kart ile tıklanan kart aynı değil ve masa devre dışı değilse
    clickCard.classList.add("flip");             // Tıklanan kartı çevir
                 
     // Eğer cardOne boşsa (ilk kart çevrilmediyse)
     // cardOne'a tıklanan kartı ata
    if(!cardOne){
        return cardOne=clickCard;
    }
   
    cardTwo=clickCard;                      // cardTwo'ya tıklanan kartı ata
    disableDesk=true;                      // Kartlar kontrol edilirken masa devre dışı bırakılır
                          
    let cardOneImg=cardOne.querySelector(".back-view img").src;
    let cardTwoImg=cardTwo.querySelector(".back-view img").src;
    matchCard(cardOneImg,cardTwoImg);
   
   }
  
}

//kartları karşılaştirmasi
function matchCard(img1, img2){
 //  clearInterval(timer); 
   if(img1 === img2){
    matchedCard++;

    if(matchedCard == 8){
        clearInterval(timer);
        performConfettiAndPlayMusic();// Kazanma durumunda confetti ve müzik çal
            setTimeout(() => {
               // initTimer(60); // Zamanlayıcıyı tekrar başlat
                shuffleCard();
               
    
            }, 1000)
       
       
      
    }
    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);
    cardOne=cardTwo="";
    return disableDesk=false;
   }

   //eğer 2 cart işleşmesse
  setTimeout(()=>{
    cardOne.classList.add("shake");
    cardTwo.classList.add("shake");
  },400);

  setTimeout(()=>{
    cardOne.classList.remove("shake","flip");
    cardTwo.classList.remove("shake","flip");
    cardOne=cardTwo="";
    disableDesk=false;
  },1200);
}


//kazanma durumunda
function performConfettiAndPlayMusic() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });

    const music = document.getElementById('music');
    music.play();
}




//kartlar kariştirilir
function shuffleCard() {
   // initTimer(60);
    matchCards=0;
    disableDesk=false;
    cardOne=cardTwo="";
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];    //Bu satır, "arr" adlı bir dizi oluşturur ve içine 16 adet sayı ekler. 
    arr.sort(()=> Math.random() > 0.5 ? 1 : -1);                   //Bu, sort yönteminin kullanacağı karşılaştırma işlevi (compare function) anlamına gelir. Bu işlev, iki öğeyi karşılaştırırken rastgele bir sıralama yapar. Math.random() metodu 0 ile 1 arasında rastgele bir sayı döndürür. Eğer dönen sayı 0.5'den büyükse, 1 döndürür ve böylece karşılaştırma işlevi iki öğeyi değiştirecektir. Eğer dönen sayı 0.5'den küçükse, -1 döndürür ve böylece iki öğe değiştirilmez.
   cards.forEach((card, i) => {
        card.classList.remove("flip");
        let imgTag=card.querySelector("img");
        imgTag.src=`images/img-${arr[i]}.png`;
        card.addEventListener("click",flipCard);
    });
}

shuffleCard();


// her bir kart için click özelliği atanir ve flip card fonksiyonu çalişir
cards.forEach(card=> {
    card.addEventListener("click",flipCard);
});










