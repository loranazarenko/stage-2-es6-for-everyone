import { createElement } from '../helpers/domHelper';

export function createFighterPreview(fighter, position) {
  const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
  const fighterElement = createElement({
    tagName: 'div',
    className: `fighter-preview___root ${positionClassName}`,
  });

  // todo: show fighter info (image, name, health, etc.)
  if (fighter) {
    const { name, health, attack, defense } = fighter;
    const imgElement = createFighterImage(fighter);
    fighterElement.innerHTML = `'<img src="' + $img + '" />'; Name: ${name}<br> Health: ${health}<br> Attack: ${attack}<br> Defense: ${defense}<br>`;
    
    fighterElement.append(imgElement);
  };
  
  return fighterElement;
}

export function createFighterImage(fighter) {
  const { source, name } = fighter;
  const attributes = { 
    src: source, 
    title: name,
    alt: name 
  };
  const imgElement = createElement({
    tagName: 'img',
    className: 'fighter-preview___img',
    attributes,
  });

  return imgElement;
}
