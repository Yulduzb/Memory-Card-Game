const cards=document.querySelectorAll(".card");

let matchedCard=0;
let cardOne,cardTwo;
let disableDesk=false;


function flipCard({target:clickCard}){
 if(cardOne !== clickCard  &&  !disableDesk){
    clickCard.classList.add("flip");
    if(!cardOne){
        return cardOne=clickCard;
    }
    cardTwo=clickCard;
    disableDesk=true;
    let cardOneImg=cardOne.querySelector(".back-view img").src;
    let cardTwoImg=cardTwo.querySelector(".back-view img").src;
    matchCard(cardOneImg,cardTwoImg);
   
   }
  
}

function matchCard(img1, img2){
   if(img1 === img2){
    matchedCard++;

    if(matchedCard == 8){
        setTimeout(() => {
            return  shuffleCard();
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




function shuffleCard() {
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

cards.forEach(card=> {
    card.addEventListener("click",flipCard);
});










