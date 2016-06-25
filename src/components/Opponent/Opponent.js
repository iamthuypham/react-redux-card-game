import React, { PropTypes } from 'react';
import { List } from 'immutable';
import { TargetableHero, TargetableMinion } from 'containers';
import { OpponentHand, MinionsOnBoard, BoardSide } from 'components';

const Opponent = ({ name, character, handCount, board, actions }) => {
  const { mana, health } = character;
  const styles = require('./Opponent.scss');

  const minions = board.map((card, index) => (
    <TargetableMinion key={index} index={index} card={card} hitMinion={actions.hitMinion} />
  ));

  return (
    <div className={styles.Opponent}>
      <h1 className={styles.OpponentName}>
        { name || 'Unnamed' } - Mana: { mana } and Health: { health }
        <TargetableHero ownedBy="OPPONENT" health={health} hitFace={actions.hitFace} />
      </h1>
      <div className={styles.OpponentHandWrapper}>
        <OpponentHand handCount={handCount} />
      </div>
      <BoardSide>
        <MinionsOnBoard>
          { minions }
        </MinionsOnBoard>
      </BoardSide>
    </div>
  );
};

Opponent.propTypes = {
  name: PropTypes.string,
  character: PropTypes.shape({
    health: PropTypes.number.isRequired,
    mana: PropTypes.number.isRequired,
  }),
  handCount: PropTypes.number,
  deckCount: PropTypes.number,
  board: PropTypes.instanceOf(List),
  actions: PropTypes.shape({
    playCard: PropTypes.func.isRequired,
    drawCard: PropTypes.func.isRequired,
    hitFace: PropTypes.func.isRequired,
    hitMinion: PropTypes.func.isRequired,
  }).isRequired,
};

export default Opponent;
