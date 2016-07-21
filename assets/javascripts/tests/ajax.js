import Ajax from '../helpers/ajax';

describe('Ajax module', () => {
	let ajax;

	beforeEach(() => {
		ajax = new Ajax();
	})

	describe('GET', () => {
		it ('should have get method', () => {
			expect(ajax.get).toBeDefined();
		});

		it ('should return done fn in get method', () => {
			expect(ajax.get().done).toBeDefined();
		});

		it ('should return error fn in get method', () => {
			expect(ajax.get().error).toBeDefined();
		});
	});

	describe('POST', () => {
		it ('should have post method', () => {
			expect(ajax.post).toBeDefined();
		});

		it ('should return done fn in get method', () => {
			expect(ajax.post().done).toBeDefined();
		});

		it ('should return error fn in get method', () => {
			expect(ajax.post().error).toBeDefined();
		});
	});

});