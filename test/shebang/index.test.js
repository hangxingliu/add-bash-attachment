//@ts-check

const { Assert } = require('@hangxingliu/assert');
const { extractShebang } = require('../..');


describe('extract shebang function', () => {
	it('# normal', () => {
		Assert(extractShebang([
			'#!/usr/bin/env',
			'echo "OK!";'
		].join('\n'))).fieldsEqual({
			shebang: '#!/usr/bin/env',
			scripts: '\necho "OK!";'
		})
	})
	it('# no shebang', () => {
		Assert(extractShebang([
			'echo "OK!";'
		].join('\n'))).fieldsEqual({
			shebang: '',
			scripts: 'echo "OK!";'
		})
	})
	it('# empty scripts', () => {
		Assert(extractShebang('')).fieldsEqual({
			shebang: '',
			scripts: ''
		})
	})
	it('# only shebang', () => {
		Assert(extractShebang('#!/usr/bin/env')).fieldsEqual({
			shebang: '#!/usr/bin/env',
			scripts: ''
		})
	})
})
