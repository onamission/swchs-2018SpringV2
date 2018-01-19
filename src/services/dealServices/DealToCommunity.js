var DealService = require( './DealService' );

class DealToCommunity extends DealService{
    dealCards( numberOfPlayers, cardCount, cardsToDealThisRound, howToDealThisRound, remainingDeck ){
        var nextCardToPlay = this.findFirstUnplayedCard( "comm", cardCount.cards_already_dealt, cardsToDealThisRound );
        for( var c = nextCardToPlay; c < ( cardsToDealThisRound + nextCardToPlay ); c++ ){
            var f = $("#comm_c" + c + " div.front");
            var b = $("#comm_c" + c + " div.back");
            var crd = remainingDeck.shift();
            f.html(crd.cardValue );
            f.attr("data-ordr", crd.card.order);
            f.attr("data-suit", crd.suit.name);
            f.attr("data-value", crd.card.value);
            if( howToDealThisRound == "up" || p==0 ){
                b.css({transform: "rotateY(180deg)"});
            }else{
                f.css({transform: "rotateY(180deg)"});
            }
        }
        cardCount.community += cardsToDealThisRound;
        return cardCount;
    }
}
module.exports = DealToCommunity;