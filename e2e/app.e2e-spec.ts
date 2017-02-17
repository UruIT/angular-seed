import { AppPo } from './app.po';

describe('App', () => {
	beforeEach(() => {
		AppPo.browse();
	});

	it('should have a title', () => {
		const subject = AppPo.getTitle();
		const result = 'UruIT Angular Seed';
		expect(subject).toEqual(result);
	});

	it('should have header', () => {
		const subject = AppPo.getHeading().isPresent();
		const result = true;
		expect(subject).toEqual(result);
	});
});
