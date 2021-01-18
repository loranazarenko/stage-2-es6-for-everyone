import { showModal } from './modal';

export function showWinnerModal(fighter) {
  // call showModal function 
  const win = {
    title: "  YOU ARE THE WINNER",
    bodyElement: fighter.name
  }

  return showModal(win);
}
