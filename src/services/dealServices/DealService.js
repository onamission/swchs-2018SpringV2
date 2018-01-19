class DealService{
    findFirstUnplayedCard( player, cards, cardsThisRound ){
        var nextCardFound = false;
        var nextCardToPlay = cards;
        do{
            var e = $("#" + player + "c" + nextCardToPlay + " div.front" );
            if ( e ){
                if ( !e.data() ){
                    nextCardFound = true;
                }else{
                    nextCardToPlay++;
                }
            }
        }while( nextCardFound === false && nextCardToPlay < cardsThisRound + cards );
        return nextCardToPlay;
    }
}
module.exports = DealService;