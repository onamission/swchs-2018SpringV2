var DealHelper = require( './DealHelper' );

class DealToReplace extends DealHelper{
    dealCards( numberOfPlayers, cardCount, cardsToDealThisRound, howToDealThisRound, remainingDeck ){
        var sel = $(".selected > div.card.front");
        // var sel = $(".selected .front");
        if( sel.length > 3 ){
            alert( "You can only select three cards to replace." );
            round--; //reset the round
        }else{
            // first we must change the cards
            sel.each( s =>{
                var crd = remainingDeck.shift();
                var f = sel[s];
                f.innerHTML = crd.cardValue ;
                f.setAttribute("data-ordr",crd.card.order);
                f.setAttribute("data-suit",crd.suit.name);
                f.setAttribute("data-value",crd.card.value);
                f.style.color=crd.suit.color;
                toggleClass( f.parentElement.id, "selected" );
            });
        }
        return cardCount;
    }
}
module.exports = DealToReplace;