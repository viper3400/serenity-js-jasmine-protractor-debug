import 'jasmine';

import { Ensure, includes } from '@serenity-js/assertions';
import { actorCalled, engage, Log, Loop } from '@serenity-js/core';
import {
    Click,
    Navigate,
    Text,
    UseAngular,
    Website,
} from '@serenity-js/protractor';

import {
    Actors,
    DemoTargets,
    Merits,
    MyTestDataObject,
    WebsiteTitle,
} from '../src';

const testDataObject = new MyTestDataObject(
    new WebsiteTitle('Serenity/JS'),
    new Merits(['FULL-STACK', 'BUSINESS-FOCUSED', 'SCALABLE', 'COMPREHENSIVE']),
    ['Handbook', 'Modules']
);

const targets = new DemoTargets();

describe('serenity-js.org website', () => {
    beforeEach(() => engage(new Actors()));

    it(`ensures, that desired targets are visible / clickable at all`, () =>
        actorCalled('Jasmine').attemptsTo(
            UseAngular.disableSynchronisation(),
            Navigate.to('https://serenity-js.org'),
            Ensure.that(
                Website.title(),
                includes(testDataObject.websiteTitle.value)
            ),
            Loop.over(testDataObject.merits.value).to(
                Ensure.that(
                    Text.of(targets.meritsSection),
                    includes(Loop.item<string>())
                )
            ),
            Click.on(targets.link('Handbook')),
            Click.on(targets.link('Module'))
        ));

    fit(`clicks on a link using a string array`, () =>
        actorCalled('Jasmine').attemptsTo(
            UseAngular.disableSynchronisation(),
            Navigate.to('https://serenity-js.org'),
            Ensure.that(
                Website.title(),
                includes(testDataObject.websiteTitle.value)
            ),
            Loop.over(testDataObject.merits.value).to(
                Ensure.that(
                    Text.of(targets.meritsSection),
                    includes(Loop.item<string>())
                )
            ),
            Loop.over(testDataObject.menuLinks).to(
                Log.the(Loop.item<string>()),
                Click.on(targets.LinkSwitcher(Loop.item<string>()))
            )
        ));
});
