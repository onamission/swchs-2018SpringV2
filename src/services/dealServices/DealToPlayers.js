var DealHelper = require( './DealHelper' );

class DealToPlayers extends DealHelper{
    dealCards( numberOfPlayers, cardCount, cardsToDealThisRound, howToDealThisRound, remainingDeck ){
        for( var p = 0; p < numberOfPlayers; p++){
            // find the first unplayed card in the hand
            var nextCardToPlay = this.findFirstUnplayedCard( p, cardCount.cards_already_dealt, cardsToDealThisRound );
            for( var c = nextCardToPlay; c < ( cardsToDealThisRound + nextCardToPlay ); c++ ){
                var f = $("#p" + p + "c" + c + " div.front");
                var b = $("#p" + p + "c" + c + " div.back");
                var crd = remainingDeck.shift();
                f.html(crd.cardValue);
                f.attr("data-ordr", crd.card.order);
                f.attr("data-suit", crd.suit.name);
                f.attr("data-value", crd.card.value);
                f.css( "color", crd.suit.color);
                if( howToDealThisRound == "up" || p==0 ){
                    b.css({transform: "rotateY(180deg)"});
                }else{
                    f.css({transform: "rotateY(180deg)"});
                }
            }
        }
        cardCount.player += cardsToDealThisRound;
        return cardCount;
    }
}
module.exports = DealToPlayers;