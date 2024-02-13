import { EventEmitter } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { mockedMoons } from 'playground-api/mocks';
import { MoonsService } from 'playground-api/services';
import { MoonNamePipe } from './moon-name.pipe';

describe('MoonNamePipe', () => {
  let translateServiceMock: { onLangChange: EventEmitter<LangChangeEvent> };

  beforeEach(() => {
    translateServiceMock = {
      onLangChange: new EventEmitter<LangChangeEvent>()
    };
  });

  it('create an instance', () => {
    const moonsServiceMock = {getMoons: () => mockedMoons} as unknown as MoonsService;
    const pipe = new MoonNamePipe(moonsServiceMock, translateServiceMock as TranslateService);
    expect(pipe).toBeTruthy();
  });

  it('should update on language change', () => {
    translateServiceMock.onLangChange.emit({ lang: 'en', translations: {} });
  });
});
