import { createCharacterTemplates } from './character-sheet';
import { createCrewTemplates } from './crew-sheet';

export function createTemplates(sheetType: string) {
  if (sheetType === 'crew') return createCrewTemplates();
  if (sheetType === 'character') return createCharacterTemplates();
  return {};
}
