//@ts-check

const fs = require('fs');
const path = require('path');
const crypto = require('crypto')
const { exec } = require('child_process');
const { Assert } = require('@hangxingliu/assert');
const { addAttachments } = require('../..');

const ATTACHMENT_FILENAME = 'attachment1.bin';
const INPUT_FILENAME = 'input.sh';
const OUTPUT_FILENAME = 'output.sh';

const EXPECTED_STRING = '0374 e6e0 d180 9157 2581 a026 d6b5 9f20';

let expectedSHA1SUM = '';

function sha1sum(input) {
	const sha1 = crypto.createHash('sha1');
	sha1.update(input);
	return sha1.digest('hex');
}

describe('example1', () => {
	describe('by API', () => {
		it('# generate', (then) => {
			addAttachments({
				inputFile: path.join(__dirname, INPUT_FILENAME),
				attachments: [{
					name: ATTACHMENT_FILENAME,
					content: fs.readFileSync(path.join(__dirname, ATTACHMENT_FILENAME)),
				}]
			}).then(newScript => {
				expectedSHA1SUM = sha1sum(newScript);
				fs.writeFileSync(path.join(__dirname, OUTPUT_FILENAME), newScript);
				then();
			}).catch(error => {
				then(error);
			});
		});
		it('# test execute generated script', then => {
			exec(`bash ${OUTPUT_FILENAME}`, { cwd: __dirname }, (error, stdout, stderr) => {
				if (error) return then(error);
				try {
					Assert(stdout).containsSubString(EXPECTED_STRING);
				} catch (ex) { return then(ex); }
				then();
			});
		});
		it('# clean', () => {
			fs.unlinkSync(path.join(__dirname, OUTPUT_FILENAME));
		});
	});


	describe('by command line', () => {
		it('# generate', function (then) {
			this.slow(200);

			exec(`../../bin --input ${INPUT_FILENAME} --output ${OUTPUT_FILENAME} --attachment ${ATTACHMENT_FILENAME}`, {
				cwd: __dirname,
			}, (error, stdout, stderr) => {
				if (error) return then(error);
				then();
			});
		});
		it('# test sha1sum', () => {
			Assert(sha1sum(fs.readFileSync(path.join(__dirname, OUTPUT_FILENAME), 'utf8')))
				.equals(expectedSHA1SUM);
		});
		it('# test execute generated script', then => {
			exec(`bash ${OUTPUT_FILENAME}`, { cwd: __dirname }, (error, stdout, stderr) => {
				if (error) return then(error);
				try {
					Assert(stdout).containsSubString(EXPECTED_STRING);
				} catch (ex) { return then(ex); }
				then();
			});
		});
		it('# clean', () => {
			fs.unlinkSync(path.join(__dirname, OUTPUT_FILENAME));
		});
	});
})
