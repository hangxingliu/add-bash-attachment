# add-bash-attachment

[![Build Status](https://travis-ci.org/hangxingliu/add-bash-attachment.svg?branch=master)](https://travis-ci.org/hangxingliu/add-bash-attachment)

A Node.js utils/module be used for add attachment files into bash script.

## Install

``` bash
npm install add-bash-attachment --global
```

## Usage

### As command line tools:

``` bash
add-bash-attachment --input raw.sh \
	--file signs.key --file sources.list \
	--output install.sh
```

### As a Node.js module:

``` javascript
const { addAttachments } = require('add-bash-attachment');
addAttachments({
	inputFile: 'raw.sh',
	attachments: [{
		name: 'data.bin',
		content: fs.readFileSync('data.bin'),
	}]
}).then(newScript => {
	console.log(newScript);
}).catch(error => {
	console.error(error);
});
```

## Principle

Prepend bash function `get_bash_attachment` and attachment contents as base64 string.


## Author

👨‍💻 [@hangxingliu (Liu Yue)](https://github.com/hangxingliu)

## License

[GPL-3.0](LICENSE)
